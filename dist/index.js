"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("./blockchain");
const dificuldade = Number(process.argv[2]) || 4;
const blockchain = new blockchain_1.BlockChain(dificuldade);
const numBlocos = Number(process.argv[3]) || 10;
let chain = blockchain.chain;
for (let i = 1; i <= numBlocos; i++) {
    const bloco = blockchain.criarBloco(`Block ${i}`);
    const mineInfo = blockchain.minerarBloco(bloco);
    chain = blockchain.enviarBloco(mineInfo.blocoMinerado);
}
console.log('--- BLOCKCHAIN ---\n');
console.log(chain);
//# sourceMappingURL=index.js.map