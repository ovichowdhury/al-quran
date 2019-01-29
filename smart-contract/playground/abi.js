var abi = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "ayatNumber",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "ayatHash",
          "type": "string"
        }
      ],
      "name": "ayatAdded",
      "type": "event",
      "signature": "0xc5c52b24cbd8dcf66edb1dac3884eeaed8124d380a15adc657785eac5e988d55"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "ayatNumber",
          "type": "uint256"
        }
      ],
      "name": "ayatDeleted",
      "type": "event",
      "signature": "0x0ad7f0fee580be480a30b64d7e897ccd626c627d73b5fc5cfcf94b9c8aa553b9"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "ayatNumber",
          "type": "uint256"
        },
        {
          "name": "ayatHash",
          "type": "string"
        }
      ],
      "name": "addAyat",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xa8227d15"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "ayatNumber",
          "type": "uint256"
        }
      ],
      "name": "getAyat",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x05872665"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "ayatNumber",
          "type": "uint256"
        }
      ],
      "name": "deleteAyat",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x2cac3721"
    }
  ];

  module.exports = abi;