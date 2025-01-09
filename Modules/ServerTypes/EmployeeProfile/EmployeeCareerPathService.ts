import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployeeCareerPathRow } from "./EmployeeCareerPathRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EmployeeCareerPathService {
    export const baseUrl = 'EmployeeProfile/EmployeeCareerPath';

    export declare function Create(request: SaveRequest<EmployeeCareerPathRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployeeCareerPathRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeCareerPathRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeCareerPathRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/EmployeeCareerPath/Create",
        Update: "EmployeeProfile/EmployeeCareerPath/Update",
        Delete: "EmployeeProfile/EmployeeCareerPath/Delete",
        Retrieve: "EmployeeProfile/EmployeeCareerPath/Retrieve",
        List: "EmployeeProfile/EmployeeCareerPath/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>EmployeeCareerPathService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}