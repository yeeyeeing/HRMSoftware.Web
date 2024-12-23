import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PayrollGeneratingWizardRow } from "./PayrollGeneratingWizardRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PayrollGeneratingWizardService {
    export const baseUrl = 'PayrollSettings/PayrollGeneratingWizard';

    export declare function Create(request: SaveRequest<PayrollGeneratingWizardRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PayrollGeneratingWizardRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PayrollGeneratingWizardRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PayrollGeneratingWizardRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/PayrollGeneratingWizard/Create",
        Update: "PayrollSettings/PayrollGeneratingWizard/Update",
        Delete: "PayrollSettings/PayrollGeneratingWizard/Delete",
        Retrieve: "PayrollSettings/PayrollGeneratingWizard/Retrieve",
        List: "PayrollSettings/PayrollGeneratingWizard/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PayrollGeneratingWizardService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}