import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EisSubjectionRow } from "./EisSubjectionRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EisSubjectionService {
    export const baseUrl = 'PayrollSettings/EisSubjection';

    export declare function Create(request: SaveRequest<EisSubjectionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EisSubjectionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EisSubjectionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EisSubjectionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/EisSubjection/Create",
        Update: "PayrollSettings/EisSubjection/Update",
        Delete: "PayrollSettings/EisSubjection/Delete",
        Retrieve: "PayrollSettings/EisSubjection/Retrieve",
        List: "PayrollSettings/EisSubjection/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>EisSubjectionService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}