const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelizeInstance = dbConfig.dbInstance;

module.exports = {
  Department: sequelizeInstance.define('department', {
    department_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(1000),
    },
  },
  {
    timestamps: false,
    tableName: 'department',
  }),
  Category: sequelizeInstance.define('category', {
    category_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    department_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(1000),
    },
  },
  {
    timestamps: false,
    tableName: 'category',
  }),
  Product: sequelizeInstance.define('product', {
    product_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(1000),
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    discounted_price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING(150),
    },
    image_2: {
      type: Sequelize.STRING(150),
    },
    thumbnail: {
      type: Sequelize.STRING(150),
    },
    display: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'product',
  }),
  Product_Category: sequelizeInstance.define('product_category', {
    product_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
    },
    category_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    tableName: 'product_category',
  }),
  Attribute: sequelizeInstance.define('attribute', {
    attribute_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'attribute',
  }),
  Attribute_Value: sequelizeInstance.define('attribute_value', {
    attribute_value_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    attribute_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    value: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'attribute_value',
  }),
  Product_Attribute: sequelizeInstance.define('product_attribute', {
    product_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
    },
    attribute_value_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    tableName: 'product_attribute',
  }),
  Review: sequelizeInstance.define('product_attribute', {
    review_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    product_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    review: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    rating: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'product_attribute',
  }),
};
