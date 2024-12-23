import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PayslipPaidMoneyClaimingRow } from "./PayslipPaidMoneyClaimingRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PayslipPaidMoneyClaimingService {
    export const baseUrl = 'PayrollSettings/PayslipPaidMoneyClaiming';

    export declare function Create(request: SaveRequest<PayslipPaidMoneyClaimingRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PayslipPaidMoneyClaimingRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PayslipPaidMoneyClaimingRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PayslipPaidMoneyClaimingRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/PayslipPaidMoneyClaiming/Create",
        Update: "PayrollSettings/PayslipPaidMoneyClaiming/Update",
        Delete: "PayrollSettings/PayslipPaidMoneyClaiming/Delete",
        Retrieve: "PayrollSettings/PayslipPaidMoneyClaiming/Retrieve",
        List: "PayrollSettings/PayslipPaidMoneyClaiming/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PayslipPaidMoneyClaimingService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}