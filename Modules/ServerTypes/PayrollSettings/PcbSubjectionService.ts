import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PcbSubjectionRow } from "./PcbSubjectionRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PcbSubjectionService {
    export const baseUrl = 'PayrollSettings/PcbSubjection';

    export declare function Create(request: SaveRequest<PcbSubjectionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PcbSubjectionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PcbSubjectionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PcbSubjectionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/PcbSubjection/Create",
        Update: "PayrollSettings/PcbSubjection/Update",
        Delete: "PayrollSettings/PcbSubjection/Delete",
        Retrieve: "PayrollSettings/PcbSubjection/Retrieve",
        List: "PayrollSettings/PcbSubjection/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PcbSubjectionService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}