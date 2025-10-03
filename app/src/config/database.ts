import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.POSTGRES_DB as string,
    process.env.POSTGRES_USER as string,
    process.env.POSTGRES_PASSWORD as string,
    {
        host: process.env.POSTGRES_HOST || "db", // In docker-compose, the DB service is called "db"
        port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
        dialect: "postgres",
        logging: false, 
    }
);

export default sequelize;