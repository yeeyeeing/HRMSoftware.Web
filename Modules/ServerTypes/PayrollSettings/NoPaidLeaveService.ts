import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { NoPaidLeaveRow } from "./NoPaidLeaveRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace NoPaidLeaveService {
    export const baseUrl = 'PayrollSettings/NoPaidLeave';

    export declare function Create(request: SaveRequest<NoPaidLeaveRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<NoPaidLeaveRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<NoPaidLeaveRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<NoPaidLeaveRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function CalculateNoPaidLeaveRate(request: number, onSuccess?: (response: number) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/NoPaidLeave/Create",
        Update: "PayrollSettings/NoPaidLeave/Update",
        Delete: "PayrollSettings/NoPaidLeave/Delete",
        Retrieve: "PayrollSettings/NoPaidLeave/Retrieve",
        List: "PayrollSettings/NoPaidLeave/List",
        CalculateNoPaidLeaveRate: "PayrollSettings/NoPaidLeave/CalculateNoPaidLeaveRate"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'CalculateNoPaidLeaveRate'
    ].forEach(x => {
        (<any>NoPaidLeaveService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}