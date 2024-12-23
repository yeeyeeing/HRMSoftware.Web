import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PayrollRow } from "./PayrollRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PayrollService {
    export const baseUrl = 'PayrollSettings/Payroll';

    export declare function Create(request: SaveRequest<PayrollRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PayrollRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PayrollRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PayrollRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function AskGenerationOfPayslip(request: ListRequest, onSuccess?: (response: number[]) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function CalculateAllowance(request: number, onSuccess?: (response: ListResponse<PayrollRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/Payroll/Create",
        Update: "PayrollSettings/Payroll/Update",
        Delete: "PayrollSettings/Payroll/Delete",
        Retrieve: "PayrollSettings/Payroll/Retrieve",
        List: "PayrollSettings/Payroll/List",
        AskGenerationOfPayslip: "PayrollSettings/Payroll/AskGenerationOfPayslip",
        CalculateAllowance: "PayrollSettings/Payroll/CalculateAllowance"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'AskGenerationOfPayslip', 
        'CalculateAllowance'
    ].forEach(x => {
        (<any>PayrollService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}