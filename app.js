const express = require('express')
const app  = express()
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

let Block = require('./block')
let Blockchain = require('./blockchain')
let Transaction = require('./transaction')
let BlockchainNode = require('./BlockchainNode')

let transactions = []
let nodes = []
let genesisBlock = new Block()

let port = 3000
// access the arguments
process.argv.forEach(function(val, index, array) {
  port = array[2]
})


if(port == undefined) {
  port = 3000
}
app.use(bodyParser.json())

app.get('/resolve', function(req,res) {
  try{
    nodes.forEach( node => {
      fetch(node.url + '/blockchain')
      .then(function(response) {
        return response.json()
      })
      .then(function(othernodeBlockchain) {
        if(blockchain.blocks.length < othernodeBlockchain.blocks.length) {
          blockchain = othernodeBlockchain
        }

        res.send(blockchain)
      })
      // let res = await fetch(node.url + '/blockchain');
      // return res.json()
    })
  }
  catch (error) {
    console.log(error)
  }

})

app.post('/nodes/register', function(req,res) {
  let nodesLists = req.body.urls
  nodesLists.forEach(nodeDictionary => {
    let node = new BlockchainNode(nodeDictionary["url"])
    nodes.push(node)
  })
  res.json(nodes)
})

app.get('/nodes', function(req,res) {
  res.json(nodes)
})




let blockchain = new Blockchain(genesisBlock)

app.get('/', function(req,res) {
  res.send('hello world')
})

app.get('/mine', function(req,res) {
  let block = blockchain.getNextBlock(transactions)
  blockchain.addBlock(block)
  transactions = []
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



app.listen(port, function() {
  console.log('server has started')
})



// console.log(blockchain)
