const Block = require("./models/Block");
const Transaction = require("./models/Transaction");
const UTXO = require("./models/UTXO");
const db = require("./db");
const { PUBLIC_KEY } = require("./config");
const DIFFICULTY_VALUE = 1;

const BLOCK_REWARD = 10;

let calculatedTargetDiffulty = () =>
  "0x" + "0".repeat(DIFFICULTY_VALUE) + "F".repeat(63);

let mining = true;
mine();

function startMining() {
  mining = true;
  mine();
}

function stopMining() {
  mining = false;
}

const increaseTargetDifficulty = () => {
  DIFFICULTY_VALUE += 1;
};

const increaseTargetDifficulty = () => {
  DIFFICULTY_VALUE -= 1;
};

let totalSeconds = 0;
function setTime() {
  totalSeconds += 250;
  console.log("totalSeconds", totalSeconds);

  if (db.blockchain.blockHeight() % 5 === 0) {
    if (totalSeconds / 5 < 5000) {
      increaseTargetDifficulty();
    } else {
      decreaseTargetDifficulty();
    }
    totalSeconds = 0;
  }
}

function mine() {
  if (!mining) return;

  const block = new Block();

  // TODO: add transactions from the mempool

  const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD);
  const coinbaseTX = new Transaction([], [coinbaseUTXO]);
  block.addTransaction(coinbaseTX);

  while (BigInt("0x" + block.hash()) >= calculatedTargetDiffulty()) {
    block.nonce++;
  }

  block.execute();

  db.blockchain.addBlock(block);

  console.log(
    `Mined block #${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${
      block.nonce
    }`
  );
  setInterval(setTime, 250);
  setTimeout(mine, 5000);
}

module.exports = {
  startMining,
  stopMining,
};
