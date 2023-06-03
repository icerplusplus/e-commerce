import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();


function attemptDatabaseConnection() {
  const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    pool: {
      max: 100,
      min: 0,
      acquire: 1000000,
      idle: 100000,
      evict: 2000,
    },
    logging: true,
    dialect: process.env.DIALECT,
  });
  return sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database!');
    // Start your application logic here
    return sequelize;
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
    setTimeout(attemptDatabaseConnection, 2000); // Retry after 2 seconds
  });
}

export const db = attemptDatabaseConnection()