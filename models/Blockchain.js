const fs = require("fs");

class Blockchain {
  constructor() {
    this.blocks = [];
  }
  async addBlock(block) {
    this.blocks.push(block);

    let data = JSON.stringify(this.blocks);
    await fs.writeFileSync("blockchain-state.json", data);
  }
  blockHeight() {
    return this.blocks.length;
  }
}

module.exports = Blockchain;
