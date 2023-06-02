import React, { useState } from "react";
import { useModal, useProducts } from "../../hooks";
import Tables from "../../components/Tables";
import Spiner from "../../components/Spiner";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";

export const Product: React.FC = () => {
  const { products, pageChangeHandler, isLoading, deleteProduct } =
    useProducts();

  const modal = useModal();

  // navigation
  const navigate = useNavigate();
  const outlet = useOutlet();

  // TODO: UPDATE/DELETE ROW
  const onRowUpdate = (id: string) => {
    navigate(`update/${id}`);
  };

  const onRowDelete = (id: string) => {
    modal.confirm({
      title: "Warning!",
      content: "This is item will be remove?",
      onOk: async () => await deleteProduct(id),
      okText: <span>Detete</span>,
      okType: "danger",
    });
  };

  if (isLoading || products.length === 0) return <Spiner />;

  return (
    <>
      {outlet ? (
        <Outlet />
      ) : (
        <Tables
          data={products}
          tableName="products"
          onPageChange={pageChangeHandler}
          onRowUpdate={onRowUpdate}
          onRowDelete={onRowDelete}
        />
      )}
    </>
  );
};
