import {IPaginate} from "@/types";
import {Pagination} from "antd";
import {useState} from "react";

export const usePagination = () => {
  const [pagination, setPagination] = useState<IPaginate>({
    page: 1,
    size: 40,
    total: 1,
  });
  // Change to page: ...
  const onPaginationChange = (paginate: IPaginate) => setPagination(paginate);

  // Next page
  const nextPage = () =>
    setPagination({...pagination, page: pagination.page + 1});

  // Previous page
  const previousPage = () => {
    pagination.page > 1 &&
      setPagination({
        ...pagination,
        page: pagination.page - 1,
      });
  };

  const renderPagination = () => {
    return (
      <Pagination
        total={pagination.total}
        hideOnSinglePage
        showSizeChanger={false}
        defaultPageSize={pagination.size}
        onChange={(page, size) => {
          window.scrollTo(0, 0);
          setPagination({...pagination, page, size});
        }}
      />
    );
  };

  return {
    pagination,
    onPaginationChange,
    nextPage,
    previousPage,
    renderPagination,
  } as const;
};
