import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { WeeklyPayrollSettingsRow } from "./WeeklyPayrollSettingsRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace WeeklyPayrollSettingsService {
    export const baseUrl = 'PayrollSettings/WeeklyPayrollSettings';

    export declare function Create(request: SaveRequest<WeeklyPayrollSettingsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<WeeklyPayrollSettingsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<WeeklyPayrollSettingsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<WeeklyPayrollSettingsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/WeeklyPayrollSettings/Create",
        Update: "PayrollSettings/WeeklyPayrollSettings/Update",
        Delete: "PayrollSettings/WeeklyPayrollSettings/Delete",
        Retrieve: "PayrollSettings/WeeklyPayrollSettings/Retrieve",
        List: "PayrollSettings/WeeklyPayrollSettings/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>WeeklyPayrollSettingsService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}