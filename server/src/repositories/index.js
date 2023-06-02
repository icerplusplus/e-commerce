import { db } from "../models";

import { makeUsersDb } from "./users.db";
import { makeProductsDb } from "./product.db";
import { makeCategoriesDb } from "./category.db";
import { makeCollectsDb } from "./collect.db";
import { makeProductInfosDb } from "./product_info.db";

export const usersDb = makeUsersDb(db);
export const productDb = makeProductsDb(db);
export const productInfosDb = makeProductInfosDb(db);
export const categoryDb = makeCategoriesDb(db);
export const collectDb = makeCollectsDb(db);
