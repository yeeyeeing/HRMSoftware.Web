import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { MasterCp8dRow } from "./MasterCp8dRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace MasterCp8dService {
    export const baseUrl = 'Master/MasterCp8d';

    export declare function Create(request: SaveRequest<MasterCp8dRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<MasterCp8dRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<MasterCp8dRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<MasterCp8dRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Master/MasterCp8d/Create",
        Update: "Master/MasterCp8d/Update",
        Delete: "Master/MasterCp8d/Delete",
        Retrieve: "Master/MasterCp8d/Retrieve",
        List: "Master/MasterCp8d/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>MasterCp8dService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}