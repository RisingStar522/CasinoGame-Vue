/// <reference types="node" />
/**
 * @prettier
 */
import * as express from 'express';
import * as Bluebird from 'bluebird';
import * as https from 'https';
import * as http from 'http';
import { Config } from './config';
/**
 * Create a startup function which will be run upon server initialization
 *
 * @param config
 * @param baseUri
 * @return {Function}
 */
export declare function startup(config: Config, baseUri: string): () => void;
/**
 * Create either a HTTP or HTTPS server
 * @param config
 * @param app
 * @return {Server}
 */
export declare function createServer(config: Config, app: express.Application): Promise<https.Server | http.Server>;
/**
 * Create the base URI where the BitGoExpress server will be available once started
 * @return {string}
 */
export declare function createBaseUri(config: Config): string;
export declare function app(cfg: Config): express.Application;
export declare function init(): Bluebird<void>;
//# sourceMappingURL=expressApp.d.ts.map