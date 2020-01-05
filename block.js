class Block {
  constructor() {
    this.index = 0
    this.previousHash = ''
    this.hash = ''
    this.nonce = 0
    this.transactions = []
  }

  // key will generate the hash function and that hash function is going to return the sha-256 hash
  get key() {
    return JSON.stringify(this.transaction + this.index + this.previousHash + this.nonce)
  }

  //add transactions to the instance of the block
  addTransaction(transaction) {
    this.transactions.push(transaction)
  }
}

module.exports = Block
