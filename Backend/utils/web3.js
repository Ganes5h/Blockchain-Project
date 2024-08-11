require("dotenv").config();
const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");

// Initialize Web3 with the local Ganache provider
const web3 = new Web3(process.env.WEB3_PROVIDER);

// Load ABI from the JSON file
const abiPath = path.resolve(__dirname, "abi.json");
let abi;

try {
  const abiData = fs.readFileSync(abiPath, "utf8");
  abi = JSON.parse(abiData);
} catch (error) {
  console.error("Error reading or parsing ABI file:", error);
  process.exit(1); // Exit if ABI is invalid
}

// Initialize the smart contract instance
const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

module.exports = { web3, contract };
