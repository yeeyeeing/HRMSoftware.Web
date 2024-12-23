import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployeePersonalProfileRow } from "./EmployeePersonalProfileRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EmployeePersonalProfileService {
    export const baseUrl = 'EmployeeProfile/EmployeePersonalProfile';

    export declare function Create(request: SaveRequest<EmployeePersonalProfileRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployeePersonalProfileRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeePersonalProfileRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeePersonalProfileRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/EmployeePersonalProfile/Create",
        Update: "EmployeeProfile/EmployeePersonalProfile/Update",
        Delete: "EmployeeProfile/EmployeePersonalProfile/Delete",
        Retrieve: "EmployeeProfile/EmployeePersonalProfile/Retrieve",
        List: "EmployeeProfile/EmployeePersonalProfile/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>EmployeePersonalProfileService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}