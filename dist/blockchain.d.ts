export interface Bloco {
    header: {
        nonce: number;
        hashBloco: string;
    };
    payload: {
        sequencia: number;
        timestamp: number;
        dados: any;
        hashAnterior: string;
    };
}
export declare class BlockChain {
    #private;
    private readonly dificuldade;
    private prefixoPow;
    constructor(dificuldade?: number);
    private criarBlocoGenesis;
    get chain(): Bloco[];
    private get ultimoBloco();
    private hashUltimoBloco;
    criarBloco(dados: any): Bloco['payload'];
    minerarBloco(bloco: Bloco['payload']): {
        blocoMinerado: {
            payload: {
                sequencia: number;
                timestamp: number;
                dados: any;
                hashAnterior: string;
            };
            header: {
                nonce: number;
                hashBloco: string;
            };
        };
        minedHash: string;
        hashReduzido: string;
        tempoMineracao: number;
    };
    verificarBloco(bloco: Bloco): boolean;
    enviarBloco(bloco: Bloco): Bloco[];
}
//# sourceMappingURL=blockchain.d.ts.map