import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { MasterAllowanceRow } from "./MasterAllowanceRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace MasterAllowanceService {
    export const baseUrl = 'EmployeeProfile/MasterAllowance';

    export declare function Create(request: SaveRequest<MasterAllowanceRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<MasterAllowanceRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<MasterAllowanceRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<MasterAllowanceRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/MasterAllowance/Create",
        Update: "EmployeeProfile/MasterAllowance/Update",
        Delete: "EmployeeProfile/MasterAllowance/Delete",
        Retrieve: "EmployeeProfile/MasterAllowance/Retrieve",
        List: "EmployeeProfile/MasterAllowance/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>MasterAllowanceService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}