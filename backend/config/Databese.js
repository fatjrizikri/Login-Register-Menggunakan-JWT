import { Sequelize } from "sequelize";
const db = new Sequelize ('auth_db_iot', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
export default db;
