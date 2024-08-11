// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
//   networks: {
//     localhost: {
//       url: "http://127.0.0.1:8545", // Ganache default port
//     },
//   },
// };

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache's default RPC URL
      accounts: [`0x${process.env.GANACHE_PRIVATE_KEY}`], // Your Ganache private key from .env file
    },
  },
};
