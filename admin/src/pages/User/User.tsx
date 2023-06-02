import React from "react";
import { useDrawer, useModal, useNotification, useUsers } from "../../hooks";
import Tables from "../../components/Tables";
import Spiner from "../../components/Spiner";
import Create from "./components/Create";
import Update from "./components/Update";

export const User: React.FC = () => {
  // hooks custom
  const {
    isLoading,
    users,
    pageChangeHandler,
    onLoading,
    deleteUser,
    fetchUserById,
  } = useUsers();

  const modal = useModal();

  // drawer instance
  const { drawerRender, onOpen, setContentHandler, onClose } = useDrawer({
    headerTitle: "Create new User",
  });

  // open drawer action
  const openCreateForm = () => {
    setContentHandler(<Create onClose={onClose} onLoading={onLoading} />);
    onOpen();
  };

  const openUpdateForm = async (id) => {

    const selectedUser = await fetchUserById(id);
    setContentHandler(
      <Update onClose={onClose} onLoading={onLoading} data={selectedUser} />
    );
    onOpen();
  };

  const onDelete = (id: string | number) => {
    modal.confirm({
      title: "Warning!",
      content: "This is item will be remove?",
      onOk: async () => await deleteUser(id),
      okText: <span>Detete</span>,
      okType: "danger",
    });
  };

  if (isLoading || users.length === 0) return <Spiner />;

  return (
    <>
      <Tables
        data={users}
        tableName="users"
        onPageChange={pageChangeHandler}
        onCreate={openCreateForm}
        onDelete={onDelete}
        onUpdate={openUpdateForm}
      />
      {drawerRender()}
    </>
  );
};
