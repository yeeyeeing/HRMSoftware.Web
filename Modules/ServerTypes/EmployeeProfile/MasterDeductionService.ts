import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { MasterDeductionRow } from "./MasterDeductionRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace MasterDeductionService {
    export const baseUrl = 'EmployeeProfile/MasterDeduction';

    export declare function Create(request: SaveRequest<MasterDeductionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<MasterDeductionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<MasterDeductionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<MasterDeductionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/MasterDeduction/Create",
        Update: "EmployeeProfile/MasterDeduction/Update",
        Delete: "EmployeeProfile/MasterDeduction/Delete",
        Retrieve: "EmployeeProfile/MasterDeduction/Retrieve",
        List: "EmployeeProfile/MasterDeduction/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>MasterDeductionService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}