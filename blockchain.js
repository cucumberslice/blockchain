let sha256 = require('js-sha256')

/**
 * genesisBlock: bascically contains some kind of configurational stuff. for example in bitcoin, the genesisBlock is the first block at index 0 and that wil contain different kind of rewards for the miners
 * genesisBlock is a required block and doesnt have any previous hash
 */

class Blockchain {
  constructor(genesisBlock) {
      this.blocks = []
      this.addBlock(genesisBlock)
  }

  addBlock(block) {
    if(this.blocks.length === 0) {
      block.previousHash = "00000000000"
      block.hash = this.generateHash(block)
    }

    this.blocks.push(block)
  }

  generateHash(block) {
    let hash = sha256(block.key)
    return hash
  }
}

module.exports = Blockchain
