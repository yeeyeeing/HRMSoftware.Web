import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { WeeklyPayrollEmployeeRow } from "./WeeklyPayrollEmployeeRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace WeeklyPayrollEmployeeService {
    export const baseUrl = 'PayrollSettings/WeeklyPayrollEmployee';

    export declare function Create(request: SaveRequest<WeeklyPayrollEmployeeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<WeeklyPayrollEmployeeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<WeeklyPayrollEmployeeRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<WeeklyPayrollEmployeeRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/WeeklyPayrollEmployee/Create",
        Update: "PayrollSettings/WeeklyPayrollEmployee/Update",
        Delete: "PayrollSettings/WeeklyPayrollEmployee/Delete",
        Retrieve: "PayrollSettings/WeeklyPayrollEmployee/Retrieve",
        List: "PayrollSettings/WeeklyPayrollEmployee/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>WeeklyPayrollEmployeeService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}