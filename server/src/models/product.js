import { Model } from "sequelize";

export const product = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        targetKey: "id",
        as: "category_data",
      });
      Product.hasMany(models.ProductInfo, {
        foreignKey: "product_id",
        as: "information",
      });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      category_id: DataTypes.STRING,
      thumbnails: DataTypes.TEXT,
      brand_name: DataTypes.STRING,
      short_description: DataTypes.STRING,
      description: DataTypes.TEXT,
      sale_price: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      discount_rate: DataTypes.DOUBLE,
      root_price: DataTypes.INTEGER,
      quantity_sold: DataTypes.INTEGER,
      quantity_in_stock: DataTypes.INTEGER,
      rating_average: DataTypes.FLOAT,
      review_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};
