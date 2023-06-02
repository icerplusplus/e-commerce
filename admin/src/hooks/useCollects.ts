import { useState, useEffect, useCallback } from "react";
import { queryCollect, queryCollects } from "../api";
import { CollectType, PaginateType } from "../types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useNotification } from ".";

export const useCollects = () => {
  const [collects, setCollects] = useState<CollectType[]>([]);
  // const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paginate, setPaginate] = useState<PaginateType>({
    page: 1,
    size: 20,
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

  const fetchCollects = useCallback(async () => {
    const data = await queryCollects(paginate);
    if (data) {
      setCollects(data);
      setCountAll(data.data.max_total);
    }
  }, []);

  const fetchCollectById = async (id: string | number) => {
    const response = await queryCollect(id);
    return response?.data;
  };

  // const createUser = async (user: UserType) => {
  //   setIsLoading(true);
  //   const response = await addUser(user);

  //   if (response?.status === 200) {
  //     window.scrollTo(0, 0);
  //     notification.success({
  //       message: "Create user successfully!",
  //     });
  //     navigate("/users");
  //   } else
  //     notification.error({
  //       message: response?.message || "Create failed!",
  //     });

  //   setIsLoading(false);
  // };

  // const updateUser = async (user: UserType) => {
  //   const response = await updateUserById(user);
  //   if (response.status === 200) {
  //     notification.success({
  //       message: "Update have been completed!",
  //     });
  //   } else
  //     notification.error({
  //       message: response?.message || "Update failed!",
  //     });
  // };

  // const deleteUser = async (id: string | number) => {
  //   setIsLoading(true);
  //   const response = await deleteUserById(id);

  //   if (response.status === 200) {
  //     notification.success({
  //       message: "Item have been deteled!",
  //     });
  //   } else {
  //     notification.error({
  //       message: response?.message || "Detele failed!",
  //     });
  //   }
  //   setIsLoading(false);
  // };

  const pageChangeHandler = useCallback((paginate: PaginateProps): void => {
    setPaginate(paginate);
  }, []);

  const onLoading = useCallback(
    (state: boolean) => setIsLoading(state),
    [isLoading]
  );

  useEffect(() => {
    fetchCollects();
  }, [paginate, isLoading, location]);

  return {
    isLoading,
    collects,
    countAll,
    pageChangeHandler,
    fetchCollects,
    fetchCollectById,
    // createUser,
    // updateUser,
    // deleteUser,
    onLoading,
  } as const;
};
