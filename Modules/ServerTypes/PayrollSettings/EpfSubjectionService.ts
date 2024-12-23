import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EpfSubjectionRow } from "./EpfSubjectionRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EpfSubjectionService {
    export const baseUrl = 'PayrollSettings/EpfSubjection';

    export declare function Create(request: SaveRequest<EpfSubjectionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EpfSubjectionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EpfSubjectionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EpfSubjectionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/EpfSubjection/Create",
        Update: "PayrollSettings/EpfSubjection/Update",
        Delete: "PayrollSettings/EpfSubjection/Delete",
        Retrieve: "PayrollSettings/EpfSubjection/Retrieve",
        List: "PayrollSettings/EpfSubjection/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>EpfSubjectionService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}