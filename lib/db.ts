import {Pool} from "pg"

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT)
})

export const query = async (text:string,params:string[]) => {
  const client = await pool.connect()
  try {
    const res = await client.query(text,params);
    return res
  } catch (error) {
    console.log("database query error : " + error);
    throw error
  }finally{
    client.release()
  }
}