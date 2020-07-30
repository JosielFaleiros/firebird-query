import FirebirdConnector from './FirebirdConnector'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
// app.use(morgan('combined'))
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port ' + (process.env.PORT || 3000))
})

const firebirdConnector = new FirebirdConnector()

async function query (sql, params) {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await firebirdConnector.getConnection()
      if (!connection) throw new Error('Erro ao conectar ao banco do ERP.')
      connection.query(sql, params, (err, result) => {
        // console.log(result)
        connection.detach()

        if (err) reject(err)
        resolve(result)
      })
    } catch (e) {
      // todo throw new Error(e) after integrated log error
      reject(e)
    }
  })
}

app.get('/', async (req, res) => {
  try {
    await query()
    res.status(200).send('success')
  } catch (e) {
    console.log(e)
    res.status(500).send('i s e')
  }
})

app.post('/', async (req, res) => {
  try {
    const result = await query(req.body.sql, req.body.params)
    res.status(200).send(result)
  } catch (e) {
    console.log(e)
    res.status(500).send('i s e')
  }
})
