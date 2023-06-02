import {Cart, Category, Detail, Home} from '../pages';
import {IRoute} from '../types';

export const publicRoutes: IRoute[] = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/product/detail/:id',
    element: Detail,
  },
  {
    path: '/cart/',
    element: Cart,
  },
  {
    path: '/category/:id',
    element: Category,
  },
];

export const privateRoutes: IRoute[] = [];
