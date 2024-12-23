import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployeeEarlyLeavingRow } from "./EmployeeEarlyLeavingRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EmployeeEarlyLeavingService {
    export const baseUrl = 'EmployeeEarlyLeaving/EmployeeEarlyLeaving';

    export declare function Create(request: SaveRequest<EmployeeEarlyLeavingRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployeeEarlyLeavingRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeEarlyLeavingRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeEarlyLeavingRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeEarlyLeaving/EmployeeEarlyLeaving/Create",
        Update: "EmployeeEarlyLeaving/EmployeeEarlyLeaving/Update",
        Delete: "EmployeeEarlyLeaving/EmployeeEarlyLeaving/Delete",
        Retrieve: "EmployeeEarlyLeaving/EmployeeEarlyLeaving/Retrieve",
        List: "EmployeeEarlyLeaving/EmployeeEarlyLeaving/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>EmployeeEarlyLeavingService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}