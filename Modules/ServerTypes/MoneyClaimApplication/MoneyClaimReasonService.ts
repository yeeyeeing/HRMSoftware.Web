import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { MoneyClaimReasonRow } from "./MoneyClaimReasonRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace MoneyClaimReasonService {
    export const baseUrl = 'MoneyClaimApplication/MoneyClaimReason';

    export declare function Create(request: SaveRequest<MoneyClaimReasonRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<MoneyClaimReasonRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<MoneyClaimReasonRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<MoneyClaimReasonRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "MoneyClaimApplication/MoneyClaimReason/Create",
        Update: "MoneyClaimApplication/MoneyClaimReason/Update",
        Delete: "MoneyClaimApplication/MoneyClaimReason/Delete",
        Retrieve: "MoneyClaimApplication/MoneyClaimReason/Retrieve",
        List: "MoneyClaimApplication/MoneyClaimReason/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>MoneyClaimReasonService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}