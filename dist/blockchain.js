"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BlockChain_chain;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockChain = void 0;
const helpers_1 = require("./helpers");
class BlockChain {
    constructor(dificuldade = 4) {
        this.dificuldade = dificuldade;
        _BlockChain_chain.set(this, []);
        this.prefixoPow = '0';
        __classPrivateFieldGet(this, _BlockChain_chain, "f").push(this.criarBlocoGenesis());
    }
    criarBlocoGenesis() {
        const payload = {
            sequencia: 0,
            timestamp: +new Date(),
            dados: 'Bloco inicial',
            hashAnterior: ''
        };
        return {
            header: {
                nonce: 0,
                hashBloco: (0, helpers_1.hash)(JSON.stringify(payload))
            },
            payload
        };
    }
    get chain() {
        return __classPrivateFieldGet(this, _BlockChain_chain, "f");
    }
    get ultimoBloco() {
        return __classPrivateFieldGet(this, _BlockChain_chain, "f").at(-1);
    }
    hashUltimoBloco() {
        return this.ultimoBloco.header.hashBloco;
    }
    criarBloco(dados) {
        const novoBloco = {
            sequencia: this.ultimoBloco.payload.sequencia + 1,
            timestamp: +new Date(),
            dados,
            hashAnterior: this.hashUltimoBloco()
        };
        console.log(`Bloco #${novoBloco.sequencia} criado: ${JSON.stringify(novoBloco)}`);
        return novoBloco;
    }
    minerarBloco(bloco) {
        let nonce = 0;
        let inicio = +new Date();
        while (true) {
            const hashBloco = (0, helpers_1.hash)(JSON.stringify(bloco));
            const hashPow = (0, helpers_1.hash)(hashBloco + nonce);
            if ((0, helpers_1.hashValidado)({
                hash: hashPow,
                dificuldade: this.dificuldade,
                prefixo: this.prefixoPow
            })) {
                const final = +new Date();
                const hashReduzido = hashBloco.slice(0, 12);
                const tempoMineracao = (final - inicio) / 1000;
                console.log(`Bloco #${bloco.sequencia} minerado em ${tempoMineracao} segundos. Hash: ${hashReduzido} tentativas ${nonce} hash minerado ${hashPow}`);
                return {
                    blocoMinerado: { payload: Object.assign({}, bloco), header: { nonce, hashBloco } },
                    minedHash: hashPow,
                    hashReduzido,
                    tempoMineracao
                };
            }
            nonce++;
        }
    }
    verificarBloco(bloco) {
        if (bloco.payload.hashAnterior !== this.hashUltimoBloco()) {
            console.error(`Bloco #${bloco.payload.sequencia} inválido: O hash anterior é ${this.hashUltimoBloco().slice(0, 12)} e não ${bloco.payload.hashAnterior.slice(0, 12)}`);
            return false;
        }
        if (!(0, helpers_1.hashValidado)({
            hash: (0, helpers_1.hash)((0, helpers_1.hash)(JSON.stringify(bloco.payload)) + bloco.header.nonce),
            dificuldade: this.dificuldade,
            prefixo: this.prefixoPow
        })) {
            console.error(`Bloco #${bloco.payload.sequencia} inválido: Nonce ${bloco.header.nonce} é invalido e não pode ser verificado`);
            return false;
        }
        return true;
    }
    enviarBloco(bloco) {
        if (this.verificarBloco(bloco))
            __classPrivateFieldGet(this, _BlockChain_chain, "f").push(bloco);
        console.log(`Bloco #${bloco.payload.sequencia} foi adicionado a blockchain: ${JSON.stringify(bloco, null, 2)}`);
        return __classPrivateFieldGet(this, _BlockChain_chain, "f");
    }
}
exports.BlockChain = BlockChain;
_BlockChain_chain = new WeakMap();
//# sourceMappingURL=blockchain.js.map