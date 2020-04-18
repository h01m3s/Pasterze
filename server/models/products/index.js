const { Pool } = require('pg');
require('dotenv').config();

const Queries = require('./queries');

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB_NAME,
  user: process.env.PG_USER_NAME,
  password: process.env.PG_PASSWORD,
  idleTimeoutMillis: 0,
  max: 30
});

pool.on('connect', () => console.log(`Pool connected...`));
pool.on('err', (err) => console.log(`An error has occured: ${err}`));
pool.on('remove', () => console.log(`A client has been removed...`));

module.exports = {
  getProductList: async (page, count) => {
    const offset = (page - 1) * parseInt(count);
    try {
      const { rows } = await pool.query(Queries.list, [
        parseInt(count),
        offset
      ]);
      return rows !== undefined ? rows : [];
    } catch (err) {
      console.log(`An error has occurd: ${err}`);
      return [];
    }
  },
  getProductInfo: async (id) => {
    try {
      const { rows } = await pool.query(Queries.info, [id]);
      return rows[0] !== undefined ? rows[0].result : {};
    } catch (err) {
      console.log(`An error has occurd: ${err}`);
      return {};
    }
  },
  getProductStyles: async (id) => {
    try {
      const { rows } = await pool.query(Queries.styles, [id]);
      const result = {
        product_id: id,
        result: rows.map((item) => item.result)
      };
      return rows !== undefined ? result : {};
    } catch (err) {
      console.log(`An error has occurd: ${err}`);
      return {};
    }
  },
  getRelatedProducts: async (id) => {
    try {
      const { rows } = await pool.query(Queries.related, [id]);
      return rows !== undefined ? rows.map((item) => item.result) : [];
    } catch (err) {
      console.log(`An error has occurd: ${err}`);
      return [];
    }
  }
};
