const express = require('express')
const app  = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let Block = require('./block')
let Blockchain = require('./blockchain')
let Transaction = require('./transaction')

let transactions = []

let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

app.get('/', function(req,res) {
  res.send('hello world')
})

app.get('/mine', function(req,res) {
  let block = blockchain.getNextBlock(transactions)
  blockchain.addBlock(block)
  res.json(block)
})

app.post('/transactions', function(req,res) {

  let to = req.body.to
  let from = req.body.from
  let amount = req.body.amount

  let transaction = new Transaction(from, to, amount)

  transactions.push(transaction)

  res.json(transactions)
})

app.get('/blockchain', function(req,res) {

  res.json(blockchain)
 /** let transaction = new Transaction('Mary', 'jerry', 100)

  let genesisBlock = new Block()
  let blockchain = new Blockchain(genesisBlock)

  let block = blockchain.getNextBlock([transaction])
  blockchain.addBlock(block)

  let anotherTransaction = new Transaction('Azam', 'Jerry', 10)
  let block1 = blockchain.getNextBlock([anotherTransaction,transaction])
  blockchain.addBlock(block1)

  res.json(blockchain)
  */
})

app.listen(3000, function() {
  console.log('server has started')
})



// console.log(blockchain)
