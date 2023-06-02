import React, { useEffect, useState, useCallback } from "react";
import {
  useCategories,
  useDrawer,
  useModal,
  useNotification,
} from "../../hooks";
import { useOutlet } from "react-router-dom";
import Tables from "../../components/Tables";
import Spiner from "../../components/Spiner";
import Create from "./components/Create";
import { deleteCategoryById } from "../../api";
import Update from "./components/Update";

export const Category: React.FC = () => {
  // hooks custom
  const {
    isLoading,
    categories,
    pageChangeHandler,
    onLoading,
    findCategoryById,
  } = useCategories();
  const notification = useNotification();
  const modal = useModal();

  // react router dom
  const outlet = useOutlet();

  // drawer instance
  const { drawerRender, onOpen, setContentHandler, onClose } = useDrawer({
    headerTitle: "Create new category",
  });

  // open drawer action
  const openCreateForm = () => {
    setContentHandler(<Create onClose={onClose} onLoading={onLoading} />);
    onOpen();
  };

  const openUpdateForm = async (id: string | number) => {
    const category = await findCategoryById(id);
    setContentHandler(
      <Update onClose={onClose} onLoading={onLoading} data={category} />
    );
    onOpen();
  };

  const onRowDelete = (id) => {
    modal.confirm({
      title: "Warning!",
      content: "This is item will be remove?",
      onOk: async () => {
        onLoading(true);
        const response = await deleteCategoryById(id);
        if (response.status === 200) {
          notification.success({
            message: "Category have been deteled!",
          });
          onLoading(false);
        } else {
          notification.error({
            message: response?.message || "Detele failed!",
          });
          onLoading(false);
        }
      },
      okText: <span>Detete</span>,
      okType: "danger",
    });
  };

  if (isLoading || categories.length === 0) return <Spiner />;

  return (
    <>
      {outlet ? (
        <Outlet />
      ) : (
        <>
          <Tables
            data={categories}
            tableName="categories"
            onPageChange={pageChangeHandler}
            onCreate={openCreateForm}
            onUpdate={openUpdateForm}
            onDelete={onRowDelete}
          />
          {drawerRender()}
        </>
      )}
    </>
  );
};
