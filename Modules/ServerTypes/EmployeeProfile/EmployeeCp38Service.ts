import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployeeCp38Row } from "./EmployeeCp38Row";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EmployeeCp38Service {
    export const baseUrl = 'EmployeeProfile/EmployeeCp38';

    export declare function Create(request: SaveRequest<EmployeeCp38Row>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployeeCp38Row>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeCp38Row>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeCp38Row>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/EmployeeCp38/Create",
        Update: "EmployeeProfile/EmployeeCp38/Update",
        Delete: "EmployeeProfile/EmployeeCp38/Delete",
        Retrieve: "EmployeeProfile/EmployeeCp38/Retrieve",
        List: "EmployeeProfile/EmployeeCp38/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>EmployeeCp38Service)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}