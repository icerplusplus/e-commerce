export interface PaginateType {
  page: number;
  size: number;
  amount?: number;
}
export interface CreateFormProps {
  onClose?: void;
  onLoading?: void;
  callback?: void | Promise<void>;
}

export interface UpdateFormProps {
  onClose?: void;
  onLoading?: void;
  callback?: void | Promise<void>;
  id?: string | number;
}

export interface ColorType {
  primary: string;
  secondary: string;
  milk: string;
  orange: string;
  blue: string;
  "dark-blue": string;
  green: string;
  dark: string;
  "dark-green": string;
}

export interface CategoryType {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface InformationType {
  id: string | number;
  product_id: string | number;
  code: string;
  name: string;
  value: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductType {
  id: string | number;
  title: string;
  brand_name: string;
  category_data: CategoryProps;
  description: string;
  discount: number;
  discount_rate: number;
  quantity_in_stock: number;
  quantity_sold: number;
  rating_average: number;
  review_count: number;
  root_price: number;
  sale_price: number;
  short_description: string;
  thumbnails: string[];
  information: InformationType[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserType {
  id: string | number;
  email: string;
  password?: string;
  is_admin: boolean;
  avatar: string | "";
  createdAt?: string;
  updatedAt?: string;
}

export interface CollectType {
  id: string | number;
  title?: string;
  thumbnail?: string | "";
  products?: ProductType[] | CollectItemType[] | [];
  createdAt?: string;
  updatedAt?: string;
}

export interface CollectItemType {
  id: string | number;
  title: string;
  brand_name: string;
  quantity_sold: number;
  rating_average: number;
  root_price: number;
  sale_price: number;
  thumbnails: string[];
  createdAt?: string;
  updatedAt?: string;
}
