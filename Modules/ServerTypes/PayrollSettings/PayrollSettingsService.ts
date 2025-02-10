import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PayrollSettingsRow } from "./PayrollSettingsRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PayrollSettingsService {
    export const baseUrl = 'PayrollSettings/PayrollSettings';

    export declare function Create(request: SaveRequest<PayrollSettingsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PayrollSettingsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PayrollSettingsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PayrollSettingsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/PayrollSettings/Create",
        Update: "PayrollSettings/PayrollSettings/Update",
        Delete: "PayrollSettings/PayrollSettings/Delete",
        Retrieve: "PayrollSettings/PayrollSettings/Retrieve",
        List: "PayrollSettings/PayrollSettings/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PayrollSettingsService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}