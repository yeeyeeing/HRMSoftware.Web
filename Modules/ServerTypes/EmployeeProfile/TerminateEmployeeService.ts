import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { TerminateEmployeeRow } from "./TerminateEmployeeRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace TerminateEmployeeService {
    export const baseUrl = 'EmployeeProfile/TerminateEmployee';

    export declare function Create(request: SaveRequest<TerminateEmployeeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<TerminateEmployeeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<TerminateEmployeeRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<TerminateEmployeeRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/TerminateEmployee/Create",
        Update: "EmployeeProfile/TerminateEmployee/Update",
        Delete: "EmployeeProfile/TerminateEmployee/Delete",
        Retrieve: "EmployeeProfile/TerminateEmployee/Retrieve",
        List: "EmployeeProfile/TerminateEmployee/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>TerminateEmployeeService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}