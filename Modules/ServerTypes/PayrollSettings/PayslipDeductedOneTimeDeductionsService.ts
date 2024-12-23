import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PayslipDeductedOneTimeDeductionsRow } from "./PayslipDeductedOneTimeDeductionsRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PayslipDeductedOneTimeDeductionsService {
    export const baseUrl = 'PayrollSettings/PayslipDeductedOneTimeDeductions';

    export declare function Create(request: SaveRequest<PayslipDeductedOneTimeDeductionsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PayslipDeductedOneTimeDeductionsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PayslipDeductedOneTimeDeductionsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PayslipDeductedOneTimeDeductionsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/PayslipDeductedOneTimeDeductions/Create",
        Update: "PayrollSettings/PayslipDeductedOneTimeDeductions/Update",
        Delete: "PayrollSettings/PayslipDeductedOneTimeDeductions/Delete",
        Retrieve: "PayrollSettings/PayslipDeductedOneTimeDeductions/Retrieve",
        List: "PayrollSettings/PayslipDeductedOneTimeDeductions/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PayslipDeductedOneTimeDeductionsService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}