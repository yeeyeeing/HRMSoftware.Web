import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { AbsentRecordRow } from "./AbsentRecordRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace AbsentRecordService {
    export const baseUrl = 'AbsentRecord/AbsentRecord';

    export declare function Create(request: SaveRequest<AbsentRecordRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<AbsentRecordRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<AbsentRecordRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<AbsentRecordRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "AbsentRecord/AbsentRecord/Create",
        Update: "AbsentRecord/AbsentRecord/Update",
        Delete: "AbsentRecord/AbsentRecord/Delete",
        Retrieve: "AbsentRecord/AbsentRecord/Retrieve",
        List: "AbsentRecord/AbsentRecord/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>AbsentRecordService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}