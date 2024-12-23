import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PayslipPaidOneTimeAllowanceRow } from "./PayslipPaidOneTimeAllowanceRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PayslipPaidOneTimeAllowanceService {
    export const baseUrl = 'PayrollSettings/PayslipPaidOneTimeAllowance';

    export declare function Create(request: SaveRequest<PayslipPaidOneTimeAllowanceRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PayslipPaidOneTimeAllowanceRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PayslipPaidOneTimeAllowanceRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PayslipPaidOneTimeAllowanceRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/PayslipPaidOneTimeAllowance/Create",
        Update: "PayrollSettings/PayslipPaidOneTimeAllowance/Update",
        Delete: "PayrollSettings/PayslipPaidOneTimeAllowance/Delete",
        Retrieve: "PayrollSettings/PayslipPaidOneTimeAllowance/Retrieve",
        List: "PayrollSettings/PayslipPaidOneTimeAllowance/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PayslipPaidOneTimeAllowanceService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}