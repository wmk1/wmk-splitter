const path = require('path');
const fs = require('fs');
const solc = require('solc');

const bobAccount = "0xd5ee2fc6c83dbfa580c697f48d81d1647e38923c";  // Put barb account
const carolAccount = "0x3eaec546bc98faea13f2936e293f51204849511d"; // Put carol account

const splitterPath = path.resolve(__dirname, [bobAccount, carolAccount], 'Splitter.sol');
const source = fs.readFileSync(splitterPath, 'UTF-8');

console.log(solc.compile(source, 1));

