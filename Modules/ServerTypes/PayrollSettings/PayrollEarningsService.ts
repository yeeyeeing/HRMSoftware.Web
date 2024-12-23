import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PayrollEarningsRow } from "./PayrollEarningsRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PayrollEarningsService {
    export const baseUrl = 'PayrollSettings/PayrollEarnings';

    export declare function Create(request: SaveRequest<PayrollEarningsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PayrollEarningsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PayrollEarningsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PayrollEarningsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/PayrollEarnings/Create",
        Update: "PayrollSettings/PayrollEarnings/Update",
        Delete: "PayrollSettings/PayrollEarnings/Delete",
        Retrieve: "PayrollSettings/PayrollEarnings/Retrieve",
        List: "PayrollSettings/PayrollEarnings/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PayrollEarningsService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}