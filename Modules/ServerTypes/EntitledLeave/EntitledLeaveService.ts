import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EntitledLeaveRow } from "./EntitledLeaveRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EntitledLeaveService {
    export const baseUrl = 'EntitledLeave/EntitledLeave';

    export declare function Create(request: SaveRequest<EntitledLeaveRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EntitledLeaveRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EntitledLeaveRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EntitledLeaveRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function CalculateCarryForward(request: number, onSuccess?: (response: ListResponse<EntitledLeaveRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EntitledLeave/EntitledLeave/Create",
        Update: "EntitledLeave/EntitledLeave/Update",
        Delete: "EntitledLeave/EntitledLeave/Delete",
        Retrieve: "EntitledLeave/EntitledLeave/Retrieve",
        List: "EntitledLeave/EntitledLeave/List",
        CalculateCarryForward: "EntitledLeave/EntitledLeave/CalculateCarryForward"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'CalculateCarryForward'
    ].forEach(x => {
        (<any>EntitledLeaveService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}