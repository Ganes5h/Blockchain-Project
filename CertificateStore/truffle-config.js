module.exports = {
  networks: {
      ganache: {
          host: "127.0.0.1",
          port: 8545,
          network_id: "*",
          gas: 300000000000,    
          gasPrice: 20000000000,
      },
  },
  compilers: {
      solc: {
          version: "0.8.17", 
      },
  },
};
