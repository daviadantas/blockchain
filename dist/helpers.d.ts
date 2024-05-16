/// <reference types="node" />
import { BinaryLike } from 'crypto';
export declare function hash(dado: BinaryLike): string;
export declare function hashValidado({ hash, dificuldade, prefixo }: {
    hash: string;
    dificuldade?: number;
    prefixo?: string;
}): boolean;
//# sourceMappingURL=helpers.d.ts.map