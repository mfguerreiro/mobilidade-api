import env from "dotenv";
env.config();

const dbase = process.env.SERVER_DB;
const user = process.env.SERVER_DBUSER;
const password = process.env.SERVER_DBPASSWORD;
const host = process.env.SERVER_DBHOST;

module.exports = {
  dialect: "mysql",
  host: host,
  username: user,
  password: password,
  database: dbase,
  port: 3306,
  logging: false,  
  define: {
    timestamps: true,
    underscored: false,
    paranoid: true,
    freezeTableName: true
  }
};