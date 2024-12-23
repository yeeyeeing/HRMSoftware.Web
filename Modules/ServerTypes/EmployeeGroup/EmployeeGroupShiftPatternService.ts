import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployeeGroupShiftPatternRow } from "./EmployeeGroupShiftPatternRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EmployeeGroupShiftPatternService {
    export const baseUrl = 'EmployeeGroup/EmployeeGroupShiftPattern';

    export declare function Create(request: SaveRequest<EmployeeGroupShiftPatternRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployeeGroupShiftPatternRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeGroupShiftPatternRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeGroupShiftPatternRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeGroup/EmployeeGroupShiftPattern/Create",
        Update: "EmployeeGroup/EmployeeGroupShiftPattern/Update",
        Delete: "EmployeeGroup/EmployeeGroupShiftPattern/Delete",
        Retrieve: "EmployeeGroup/EmployeeGroupShiftPattern/Retrieve",
        List: "EmployeeGroup/EmployeeGroupShiftPattern/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>EmployeeGroupShiftPatternService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}