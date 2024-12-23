import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { HrdfSubjectionRow } from "./HrdfSubjectionRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace HrdfSubjectionService {
    export const baseUrl = 'PayrollSettings/HrdfSubjection';

    export declare function Create(request: SaveRequest<HrdfSubjectionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<HrdfSubjectionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<HrdfSubjectionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<HrdfSubjectionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/HrdfSubjection/Create",
        Update: "PayrollSettings/HrdfSubjection/Update",
        Delete: "PayrollSettings/HrdfSubjection/Delete",
        Retrieve: "PayrollSettings/HrdfSubjection/Retrieve",
        List: "PayrollSettings/HrdfSubjection/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>HrdfSubjectionService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}