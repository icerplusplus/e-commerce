import { useState, useEffect, useCallback } from "react";
import {
  addUser,
  deleteUserById,
  findUserById,
  queryUsers,
  updateUserById,
} from "../api";
import { PaginateType, UserType } from "../types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useNotification } from ".";

export const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paginate, setPaginate] = useState<PaginateType>({
    page: 1,
    size: 10,
  });
  const [countAll, setCountAll] = useState<number>(0);

  // NAVIGATION
  const navigate = useNavigate();

  // GET PARAMS
  const { id } = useParams();

  //LOCATION
  const location = useLocation();

  // NOTIFICATION
  const notification = useNotification();

  const fetchUsers = useCallback(async () => {
    const data = await queryUsers(paginate);
    if (data) {
      setUsers(data);
      setCountAll(data.data.max_total);
    }
  }, []);

  const fetchUserById = async (id: string | number) => {
    const response = await findUserById(id);
    return response?.data;
  };

  const createUser = async (user: UserType) => {
    setIsLoading(true);
    const response = await addUser(user);

    if (response?.status === 200) {
      window.scrollTo(0, 0);
      notification.success({
        message: "Create user successfully!",
      });
      navigate("/users");
    } else
      notification.error({
        message: response?.message || "Create failed!",
      });

    setIsLoading(false);
  };

  const updateUser = async (user: UserType) => {
    const response = await updateUserById(user);
    if (response.status === 200) {
      notification.success({
        message: "Update have been completed!",
      });
    } else
      notification.error({
        message: response?.message || "Update failed!",
      });
  };

  const deleteUser = async (id: string | number) => {
    setIsLoading(true);
    const response = await deleteUserById(id);

    if (response.status === 200) {
      notification.success({
        message: "Item have been deteled!",
      });
    } else {
      notification.error({
        message: response?.message || "Detele failed!",
      });
    }
    setIsLoading(false);
  };

  const pageChangeHandler = useCallback((paginate: PaginateProps): void => {
    setPaginate(paginate);
  }, []);

  const onLoading = useCallback(
    (state: boolean) => setIsLoading(state),
    [isLoading]
  );

  useEffect(() => {
    fetchUsers();
  }, [paginate, isLoading, location]);

  return {
    isLoading,
    users,
    selectedUser,
    countAll,
    pageChangeHandler,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    onLoading,
  } as const;
};
