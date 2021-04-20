import { QueryBuilder } from "../QueryBuilder";
import { grpc } from "@improbable-eng/grpc-web";
import { Query } from "../generated/Query_pb";
import { QueryHeader } from "../generated/QueryHeader_pb";
import { Response } from "../generated/Response_pb";
import { FileId, FileIdLike } from "../file/FileId";
import { ResponseHeader } from "../generated/ResponseHeader_pb";
import { BaseClient } from "../BaseClient";
import { Hbar } from "../Hbar";
import { PublicKey } from "../crypto/PublicKey";
/**
 * Response when the client sends the node FileGetInfoQuery.
 */
export interface FileInfo {
    /**
     * The file ID of the file for which information is requested.
     */
    fileId: FileId;
    /**
     * Number of bytes in contents.
     */
    size: number;
    /**
     * The current time at which this account is set to expire.
     */
    expirationTime: Date | null;
    /**
     * True if deleted but not yet expired.
     */
    isDeleted: boolean;
    /**
     * One of these keys must sign in order to modify or delete the file.
     */
    keys: PublicKey[];
}
/**
 * Get all of the information about a file, except for its contents. When a file expires, it no
 * longer exists, and there will be no info about it, and the fileInfo field will be blank.
 * If a transaction or smart contract deletes the file, but it has not yet expired, then the
 * fileInfo field will be non-empty, the deleted field will be true, its size will be 0, and
 * its contents will be empty. Note that each file has a FileID, but does not have a filename.
 */
export declare class FileInfoQuery extends QueryBuilder<FileInfo> {
    private readonly _builder;
    constructor();
    /**
     * The file ID of the file for which information is requested.
     */
    setFileId(fileId: FileIdLike): this;
    getCost(client: BaseClient): Promise<Hbar>;
    protected _doLocalValidate(errors: string[]): void;
    protected _getMethod(): grpc.UnaryMethodDefinition<Query, Response>;
    protected _getHeader(): QueryHeader;
    protected _mapResponseHeader(response: Response): ResponseHeader;
    protected _mapResponse(response: Response): FileInfo;
}
