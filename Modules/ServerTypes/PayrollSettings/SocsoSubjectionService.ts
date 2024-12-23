import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { SocsoSubjectionRow } from "./SocsoSubjectionRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace SocsoSubjectionService {
    export const baseUrl = 'PayrollSettings/SocsoSubjection';

    export declare function Create(request: SaveRequest<SocsoSubjectionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<SocsoSubjectionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<SocsoSubjectionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<SocsoSubjectionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/SocsoSubjection/Create",
        Update: "PayrollSettings/SocsoSubjection/Update",
        Delete: "PayrollSettings/SocsoSubjection/Delete",
        Retrieve: "PayrollSettings/SocsoSubjection/Retrieve",
        List: "PayrollSettings/SocsoSubjection/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>SocsoSubjectionService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}