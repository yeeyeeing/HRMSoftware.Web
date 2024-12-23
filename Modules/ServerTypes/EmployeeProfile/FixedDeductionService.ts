import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { FixedDeductionRow } from "./FixedDeductionRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace FixedDeductionService {
    export const baseUrl = 'EmployeeProfile/FixedDeduction';

    export declare function Create(request: SaveRequest<FixedDeductionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<FixedDeductionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<FixedDeductionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<FixedDeductionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/FixedDeduction/Create",
        Update: "EmployeeProfile/FixedDeduction/Update",
        Delete: "EmployeeProfile/FixedDeduction/Delete",
        Retrieve: "EmployeeProfile/FixedDeduction/Retrieve",
        List: "EmployeeProfile/FixedDeduction/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>FixedDeductionService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}