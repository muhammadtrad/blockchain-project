const fs = require("fs");
const { utxos } = require("../db");

class Transaction {
  constructor(inputs, outputs) {
    this.inputs = inputs;
    this.outputs = outputs;
  }
  async execute() {
    this.inputs.forEach((input) => {
      input.spent = true;
    });

    this.outputs.forEach((output) => {
      utxos.push(output);
    });

    let data = JSON.stringify(utxos);
    fs.writeFileSync("utxos-state.json", data);
  }
}

module.exports = Transaction;
