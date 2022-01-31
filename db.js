const Blockchain = require("./models/Blockchain");

const db = {
  blockchain: new Blockchain(),
  utxos: [],
  averageTimeToMineBlock: 5000,
};

module.exports = db;
