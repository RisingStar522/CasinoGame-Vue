import { EnvironmentName, V1Network } from 'bitgo';
export interface Config {
    port: number;
    bind: string;
    env: EnvironmentName;
    debugNamespace: string[];
    keyPath?: string;
    crtPath?: string;
    logFile?: string;
    disableSSL: boolean;
    disableProxy: boolean;
    disableEnvCheck: boolean;
    timeout: number;
    customRootUri?: string;
    customBitcoinNetwork?: V1Network;
}
export declare const ArgConfig: (args: any) => Partial<Config>;
export declare const EnvConfig: () => Partial<Config>;
export declare const DefaultConfig: Config;
export declare const config: () => Config;
//# sourceMappingURL=config.d.ts.map