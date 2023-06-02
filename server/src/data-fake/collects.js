const { v4 } = require("uuid");

const collects = [
  {
    title: "D\u00e0nh cho b\u1ea1n",
    thumbnail:
      "https://salt.tikicdn.com/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png",
    products: "[]",
  },
  {
    title: "Deal si\u00eau hot",
    thumbnail:
      "https://salt.tikicdn.com/ts/personalish/41/99/9a/8898607d7fca4b79775a708c57a8152f.png",
    products: "[]",
  },
  {
    title: "R\u1ebb v\u00f4 \u0111\u1ed1i",
    thumbnail:
      "https://salt.tikicdn.com/ts/personalish/0f/59/9d/215fa18ef72e430eefcbfe5355cab8e2.png",
    products: "[]",
  },
  {
    title: "H\u00e0ng m\u1edbi",
    thumbnail:
      "https://salt.tikicdn.com/ts/personalish/7d/8a/6e/d8b76e2c43cbd06b7e1aa3ab8c54df64.png",
    products: "[]",
  },
];

const newData = collects.map((collect) => ({
  ...collect,
  id: v4(),
}));

const collectSeeder = newData;
module.exports = {
  collectSeeder
}