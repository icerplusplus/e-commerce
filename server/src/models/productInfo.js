import { Model } from "sequelize";

export const productInfo = (sequelize, DataTypes) => {
  class ProductInfo extends Model {
    static associate(models) {
      // define association here
      ProductInfo.belongsTo(models.Product, {
        foreignKey: "product_id",
        targetKey: "id",
        as: "product_data",
      });
    }
  }
  ProductInfo.init(
    {
      product_id: DataTypes.STRING,
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      value: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ProductInfo",
    }
  );

  return ProductInfo;
};
