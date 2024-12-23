import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployeeAllowanceRow } from "./EmployeeAllowanceRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EmployeeAllowanceService {
    export const baseUrl = 'EmployeeProfile/EmployeeAllowance';

    export declare function Create(request: SaveRequest<EmployeeAllowanceRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployeeAllowanceRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeAllowanceRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeAllowanceRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/EmployeeAllowance/Create",
        Update: "EmployeeProfile/EmployeeAllowance/Update",
        Delete: "EmployeeProfile/EmployeeAllowance/Delete",
        Retrieve: "EmployeeProfile/EmployeeAllowance/Retrieve",
        List: "EmployeeProfile/EmployeeAllowance/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>EmployeeAllowanceService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}