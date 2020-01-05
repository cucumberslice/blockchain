class Block {
  constructor() {
    this.index = 0
    this.previousHas = ''
    this.hash = ''
    this.nonce = 0
    this.transaction = []
  }
}

module.exports = Block
