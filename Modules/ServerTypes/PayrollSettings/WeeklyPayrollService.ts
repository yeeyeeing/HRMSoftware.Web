import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { WeeklyPayrollRow } from "./WeeklyPayrollRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace WeeklyPayrollService {
    export const baseUrl = 'PayrollSettings/WeeklyPayroll';

    export declare function Create(request: SaveRequest<WeeklyPayrollRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<WeeklyPayrollRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<WeeklyPayrollRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<WeeklyPayrollRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/WeeklyPayroll/Create",
        Update: "PayrollSettings/WeeklyPayroll/Update",
        Delete: "PayrollSettings/WeeklyPayroll/Delete",
        Retrieve: "PayrollSettings/WeeklyPayroll/Retrieve",
        List: "PayrollSettings/WeeklyPayroll/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>WeeklyPayrollService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}