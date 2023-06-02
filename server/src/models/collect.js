import { Model } from "sequelize";

export const collect = (sequelize, DataTypes) => {
  class Collect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Collect.init(
    {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      products: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Collect",
    }
  );
  return Collect;
};
