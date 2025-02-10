import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployeeIncentiveRow } from "./EmployeeIncentiveRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EmployeeIncentiveService {
    export const baseUrl = 'EmployeeProfile/EmployeeIncentive';

    export declare function Create(request: SaveRequest<EmployeeIncentiveRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployeeIncentiveRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeIncentiveRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeIncentiveRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/EmployeeIncentive/Create",
        Update: "EmployeeProfile/EmployeeIncentive/Update",
        Delete: "EmployeeProfile/EmployeeIncentive/Delete",
        Retrieve: "EmployeeProfile/EmployeeIncentive/Retrieve",
        List: "EmployeeProfile/EmployeeIncentive/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>EmployeeIncentiveService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}