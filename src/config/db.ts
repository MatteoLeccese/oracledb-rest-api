import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config();

oracledb.initOracleClient();

export const pool = oracledb.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTIONSTRING,
  poolMin: 1,
  poolMax: 4,
  poolIncrement: 1
});
