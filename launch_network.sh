#!/bin/bash

geth --datadir ~/.ethereum/net42 init network.json
geth --datadir ~/.ethereum/net42 --networkid 57 --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,net,web3" --gcmode archive console