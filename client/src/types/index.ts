// Reducer Data Interface
export interface ICategoryReducer {
  data?: ICategory[];
  isLoading: boolean;
  paginate?: IPaginate;
}

export interface IUserReducer {
  data?: IUser;
  isLoading: boolean;
  isError: boolean;
  message?: string;
  isAuthenticateSuccess: boolean;
}

export interface ICartReducer {
  products?: IProduct[];
  isLoading: boolean;
  paginate?: IPaginate;
  error?: {
    isError?: boolean | false;
    message?: string | "";
  };
  size?: number | 0;
  tmpTotal?: number | 0;
  discount?: number | 0;
  total?: number | 0;
  quantityBuy?: number | 0;
}

export interface IProductReducer {
  data: {
    productDetail?: IProduct;
    products?: IProduct[];
  };
  isLoading: boolean;
  paginate?: IPaginate;
  error?: {
    isError?: boolean | false;
    message?: string | "";
  };
}

export interface ICollectReducer {
  data?: ICollect[];
  isLoading?: boolean | false;
  paginate?: IPaginate;
}

// Action payload interface
export interface IActionPayload {
  payload: IResponseSuccess | IResponseFailed;
}

// Model Interface
export interface IUser {
  id: string;
  avatar: string;
  email: string;
  password: string;
  is_admin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICollect {
  id?: string;
  title?: string;
  thumbnail?: string;
  products?: IProduct;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICategory {
  id?: string;
  title?: string;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IInformation {
  id?: string;
  product_id?: string | number;
  code?: string;
  name?: string;
  value?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IState {
  state?: boolean;
}

interface IQuantity {
  quantity: number | 0;
}

export interface IProduct extends IQuantity, IState {
  id: string;
  title?: string;
  thumbnails?: string[] | [];
  category_id?: string | number;
  brand_name?: string;
  short_description?: string;
  description?: string;
  sale_price: number;
  discount: number;
  discount_rate?: number;
  root_price?: number;
  quantity_sold?: number;
  quantity_in_stock?: number;
  rating_average?: number;
  review_count?: number;
  category_data?: ICategory;
  information?: IInformation[];
  createdAt?: string;
  updatedAt?: string;
}

// Config
export interface IRoute {
  path: string;
  element: React.FC;
  layout?: React.FC;
}

export interface IAuthInfo {
  email: string;
  password: string;
}

// Paginate interface
export interface IPaginate {
  page: number | 1;
  size: number | 10;
  amount?: number;
  total: number;
}

export interface ProductsFilterType {
  _page: number;
  _size: number;
  _filterBy: string;
  _rating: number;
  _priceRangeStart: number;
  _priceRangeEnd: number;
  _brands: string[];
  _category_id?: number | string;
}

// Api error handler
export interface IResponseSuccess {
  status: number | string;
  message: string;
  data: any;
}

export interface IResponseFailed {
  response?: {
    data?: {
      status: number | string;
      message?: string;
    };
  };
}
