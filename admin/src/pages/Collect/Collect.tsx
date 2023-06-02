import React, { useEffect, useState } from "react";
import { useCollects, useDrawer, useModal, useNotification } from "../../hooks";
import { Col, Empty, Row } from "antd";
import CollectList from "./components/CollectList";
import ProductListByCollect from "./components/ProductListByCollect";
import FilterList from "./components/FilterList";
import { useDrop } from "react-dnd";
import { deleteCollect, queryProduct, updateCollect } from "../../api";
import { CollectType } from "../../types";
import Button from "../../components/Button";
import Create from "./components/Create";
import Update from "./components/Update";

const removeAttrs = (obj) => {
  delete obj?.category_data;
  delete obj?.description;
  delete obj?.information;
  delete obj?.review_count;
  delete obj?.short_description;

  return obj;
};

export const Collect: React.FC = () => {
  const { collects, fetchCollects, fetchCollectById } = useCollects();
  const [products, setProducts] = useState([]);
  const [collectIdSelected, setCollectIdSelected] = useState();
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // drawer hook instance
  const { drawerRender, onOpen, setContentHandler, onClose } = useDrawer({
    headerTitle: "Collect form",
  });
  // notification
  const notificate = useNotification();

  // modal
  const modal = useModal();

  // use drop to update data for collect have been choose
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "element",
    drop: async (item) => await updateProducts(item?.id),
    collect: (monitor) => ({
      isOver: monitor.isOver() ? 0.2 : 1,
    }),
  }));

  const onFocus = (id) => {
    // push collect id to url params
    setCollectIdSelected(id);
  };

  const updateProducts = async (productId) => {
    // find product and add it to products state
    const res = await queryProduct(productId);
    if (res?.data) {
      setProducts((prev) => [...prev, removeAttrs(res?.data)]);
      setShowUpdateButton(true);
    } else notificate.error({ message: res?.message });
  };

  // update products data to the collect selected
  const updateCollectProducts = async (collect: CollectType) => {
    setLoading(true);

    // auto update when product state change
    if (collectIdSelected) {
      const res = await updateCollect(collect);
      if (res?.status !== 200)
        notificate.error({
          message: `Can't update products list of collect with id: ${collectIdSelected}`,
        });
      else {
        setProducts(res?.data?.products);
        notificate.success({
          message: `Collect with id: ${collectIdSelected} updated.`,
        });

        // refesh collect data
        await fetchCollects();
        setLoading(false);
        setShowUpdateButton(false);
      }
    }
  };

  // remove a product in collect
  const filterProducts = (productId) => {
    const newProductList = products?.filter((item) => item?.id !== productId);
    setProducts(newProductList);
    setShowUpdateButton(true);
  };

  const actions = {
    // add new collect
    create: () => {
      // set drawer modal content
      setContentHandler(
        <Create
          onClose={onClose}
          onLoading={setLoading}
          callback={fetchCollects}
        />
      );
      onOpen();
    },
    // update collect with collect id
    update: (id: string | number) => {
      setContentHandler(
        <Update id={id} onClose={onClose} callback={fetchCollects} />
      );
      onOpen();
    },
    // delete collect with collect id
    delete: (id: string | number) => {
      modal.confirm({
        title: "Are you sure you want to delete this collect?",
        onOk: async () => {
          const res = await deleteCollect(id);
          if (res.status === 200) {
            notificate.success({
              message: "Collect have been removed!",
            });
            await fetchCollects();
          } else {
            notificate.error({
              message: `Failed to remove collect with id: ${id}!`,
            });
          }
        },
      });
    },
    refresh: async () => await fetchCollects(),
  };

  // initial collect data when component mounted in first time
  useEffect(() => {
    if (collects && !collectIdSelected) {
      setCollectIdSelected(collects?.data?.collects[0]?.id);
      setProducts(collects?.data?.collects[0]?.products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collects]);

  // update product data when collect id change
  useEffect(() => {
    setShowUpdateButton(false);
    if (collectIdSelected) {
      const collect = collects.data.collects.find(
        (item) => item?.id === collectIdSelected
      );
      setProducts(collect?.products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectIdSelected]);

  if (collects.length === 0) return <Empty />;

  return (
    <>
      {drawerRender()}
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Button title="Add new" showBorder onClick={actions?.create} />
          <CollectList
            data={collects?.data?.collects}
            onFocus={onFocus}
            actions={actions}
          />
        </Col>
        <Col span={16}>
          <div ref={drop} style={{ opacity: isOver, height: "100%" }}>
            <ProductListByCollect data={products} filter={filterProducts} />

            {/* update button */}
            {showUpdateButton && (
              <Button
                type="blue"
                loading={loading}
                onClick={() =>
                  updateCollectProducts({ id: collectIdSelected, products })
                }
                title="Click to update!"
              />
            )}
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <FilterList />
        </Col>
      </Row>
    </>
  );
};
