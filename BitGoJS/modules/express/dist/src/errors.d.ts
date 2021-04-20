import { Errors } from 'bitgo';
export declare class TlsConfigurationError extends Errors.BitGoJsError {
    constructor(message?: any);
}
export declare class NodeEnvironmentError extends Errors.BitGoJsError {
    constructor(message?: any);
}
export declare class ApiResponseError extends Errors.BitGoJsError {
    readonly status: number;
    readonly result: any;
    constructor(message: string | undefined, status: number, result?: any);
}
//# sourceMappingURL=errors.d.ts.map