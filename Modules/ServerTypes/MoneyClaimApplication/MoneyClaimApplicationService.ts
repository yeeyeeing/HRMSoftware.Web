import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { MoneyClaimApplicationRow } from "./MoneyClaimApplicationRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace MoneyClaimApplicationService {
    export const baseUrl = 'MoneyClaimApplication/MoneyClaimApplication';

    export declare function Create(request: SaveRequest<MoneyClaimApplicationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<MoneyClaimApplicationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<MoneyClaimApplicationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<MoneyClaimApplicationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "MoneyClaimApplication/MoneyClaimApplication/Create",
        Update: "MoneyClaimApplication/MoneyClaimApplication/Update",
        Delete: "MoneyClaimApplication/MoneyClaimApplication/Delete",
        Retrieve: "MoneyClaimApplication/MoneyClaimApplication/Retrieve",
        List: "MoneyClaimApplication/MoneyClaimApplication/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>MoneyClaimApplicationService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}