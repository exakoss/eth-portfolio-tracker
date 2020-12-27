const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const pool = require('./db')

const ethUrl = 'https://api.ethplorer.io'
const apiKey = 'freekey'

//middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next)=> {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

//ROUTES//

//create a token
app.post("/tokens", async (req, res) => {
  try {
    const { address } = req.body
    const response = await axios.get(`${ethUrl}/getTokenInfo/${address}?apiKey=${apiKey}`)
    const newToken = await pool.query("INSERT INTO token (info) VALUES($1) RETURNING *", [response.data])
    res.json(newToken.rows[0])
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

//update all tokens from API
const updateTokens = async () => {
  const allTokens = await pool.query("SELECT * FROM token")
  for (token of allTokens.rows) {
    const response = await axios.get(`${ethUrl}/getTokenInfo/${token.info.address}?apiKey=${apiKey}`)
    const updateToken = await pool.query("UPDATE token SET info = $1 WHERE id = $2",[response.data,token.id])
  }
}

// //call updateTokens every minute
// const interval = setInterval( () => {
//   updateTokens()
//   console.log('API call has been made')
// }, 60000)

// get all tokens
app.get("/tokens",async (req,res) => {
  try {
    await updateTokens()
    const allTokens = await pool.query("SELECT * FROM token")
    console.log(allTokens.rows)
    res.json(allTokens.rows)
  } catch (err) {
    console.error(err.message)
  }
})

//delete a token
app.delete("/tokens/:id", async (req,res)=> {
  try {
    const {id} = req.params
    const deleteTodo = await pool.query("DELETE FROM token WHERE id = $1",[id])
    res.json("Token was deleted")
  } catch (err) {
      console.error(err.message)
  }
})


app.listen(5000, () => {console.log(`Server running on port 5000`)})
