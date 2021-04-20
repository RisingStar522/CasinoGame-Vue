import { QueryBuilder } from "../QueryBuilder";
import { QueryHeader } from "../generated/QueryHeader_pb";
import { grpc } from "@improbable-eng/grpc-web";
import { Query } from "../generated/Query_pb";
import { Response } from "../generated/Response_pb";
import { FileIdLike } from "../file/FileId";
import { ResponseHeader } from "../generated/ResponseHeader_pb";
/**
 * Get the contents of a file. The content field is empty (no bytes) if the file is empty.
 */
export declare class FileContentsQuery extends QueryBuilder<Uint8Array> {
    private readonly _builder;
    constructor();
    /**
     * The file ID of the file whose contents are requested.
     */
    setFileId(fileId: FileIdLike): this;
    protected _doLocalValidate(errors: string[]): void;
    protected _getMethod(): grpc.UnaryMethodDefinition<Query, Response>;
    protected _getHeader(): QueryHeader;
    protected _mapResponseHeader(response: Response): ResponseHeader;
    protected _mapResponse(response: Response): Uint8Array;
}
