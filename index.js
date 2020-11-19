const { response } = require('express');
const DataStore = require('nedb')
require('dotenv').config()

const express = require('express')
const app = express()

app.set('trust proxy', 1);

app.listen(process.env.PORT||5000)

app.use(express.static('publick'))
app.use(express.json({ limit: '1mb' }))

const database=new DataStore('database.db')
database.loadDatabase()

app.post('/colectemail', (req, res)=> {
    database.insert(req.body)
  })

app.post('/getemails',(req,res)=>{
  if(req.body.pass===process.env.PASSWORD){
    database.find({},(err,data)=>{
      res.send(JSON.stringify(data))
    })
    console.log("res send")
  }
})