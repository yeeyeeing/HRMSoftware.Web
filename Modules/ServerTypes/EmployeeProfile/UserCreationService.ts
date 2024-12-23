import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { UserCreationRow } from "./UserCreationRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace UserCreationService {
    export const baseUrl = 'EmployeeProfile/UserCreation';

    export declare function Create(request: SaveRequest<UserCreationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<UserCreationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<UserCreationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<UserCreationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/UserCreation/Create",
        Update: "EmployeeProfile/UserCreation/Update",
        Delete: "EmployeeProfile/UserCreation/Delete",
        Retrieve: "EmployeeProfile/UserCreation/Retrieve",
        List: "EmployeeProfile/UserCreation/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>UserCreationService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}