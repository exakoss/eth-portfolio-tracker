require('dotenv').config()
const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.SEQ_USER,
  password: process.env.SEQ_PW,
  host: process.env.DATABASE_URL,
  port: 5432,
  database: process.env.SEQ_DB
})

module.exports = pool
