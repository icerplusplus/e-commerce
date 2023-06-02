import { objectHandler } from "../libs";

export const arrtributesHandler = {
  filter: (data, arrtributes = { includes: [], excludes: [] }) => {
    if (!data) return data;
    if (arrtributes.includes && arrtributes.includes.length > 0) {
      return objectHandler.filterKeysInObject(data, arrtributes.includes);
    }

    if (arrtributes.excludes && arrtributes.excludes.length > 0) {
      return objectHandler.removeKeysInObject(data, arrtributes.excludes);
    }
    return data;
  },
  filters: (data, arrtributes = { includes: [], excludes: [] }) => {
    if (!data || data.length === 0) return data;

    if (arrtributes.includes && arrtributes.includes.length > 0) {
      return objectHandler.filterKeysInArray(data, arrtributes.includes);
    }

    if (arrtributes.excludes && arrtributes.excludes.length > 0) {
      return objectHandler.removeKeysInArray(data, arrtributes.excludes);
    }
    return data;
  },
};
