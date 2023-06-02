export const objectHandler = {
  removeKeysInObject: (data, keys) => {
    keys.map((key) => {
      if (data[key]) delete data[key];
    });
    return data;
  },
  removeKeysInArray: (data, keys) => {
    data?.map((item, idx) => {
      keys.map((key) => {
        if (item.dataValues[key]) delete item.dataValues[key];
      });
    });
    return data;
  },
  filterKeysInObject: (data, keys) => {
    const newData = {};

    keys.map((key) => {
      if (data[key]) newData[key] = data[key];
    });

    return newData;
  },
  filterKeysInArray: (data, keys) => {
    const newData = [];

    data.map((item, idx) => {
      const newObject = {};
      keys.map((key) => {
        if (item.dataValues[key]) newObject[key] = item.dataValues[key];
      });
      newData.push(newObject);
    });

    console.log("newData: ", newData);

    return newData;
  },
};
