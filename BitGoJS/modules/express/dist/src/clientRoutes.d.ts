import { BitGo } from 'bitgo';
import * as express from 'express';
import { Config } from './config';
declare module 'express-serve-static-core' {
    interface Request {
        bitgo: BitGo;
    }
}
export declare function setupRoutes(app: express.Application, config: Config): void;
//# sourceMappingURL=clientRoutes.d.ts.map