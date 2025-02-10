import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployeeBonusRow } from "./EmployeeBonusRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EmployeeBonusService {
    export const baseUrl = 'EmployeeProfile/EmployeeBonus';

    export declare function Create(request: SaveRequest<EmployeeBonusRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployeeBonusRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeBonusRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeBonusRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/EmployeeBonus/Create",
        Update: "EmployeeProfile/EmployeeBonus/Update",
        Delete: "EmployeeProfile/EmployeeBonus/Delete",
        Retrieve: "EmployeeProfile/EmployeeBonus/Retrieve",
        List: "EmployeeProfile/EmployeeBonus/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>EmployeeBonusService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}