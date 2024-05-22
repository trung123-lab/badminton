import { Sequelize } from "sequelize";

const sequelize = new Sequelize("SWP", "root", "Trunglolb1*", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
