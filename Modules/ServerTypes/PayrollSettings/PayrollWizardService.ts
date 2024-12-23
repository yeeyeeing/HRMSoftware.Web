import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PayrollWizardRow } from "./PayrollWizardRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PayrollWizardService {
    export const baseUrl = 'PayrollSettings/PayrollWizard';

    export declare function Create(request: SaveRequest<PayrollWizardRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PayrollWizardRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PayrollWizardRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PayrollWizardRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/PayrollWizard/Create",
        Update: "PayrollSettings/PayrollWizard/Update",
        Delete: "PayrollSettings/PayrollWizard/Delete",
        Retrieve: "PayrollSettings/PayrollWizard/Retrieve",
        List: "PayrollSettings/PayrollWizard/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PayrollWizardService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}