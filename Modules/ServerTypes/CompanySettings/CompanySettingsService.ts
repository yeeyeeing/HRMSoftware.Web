import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { CompanySettingsRow } from "./CompanySettingsRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace CompanySettingsService {
    export const baseUrl = 'CompanySettings/CompanySettings';

    export declare function Create(request: SaveRequest<CompanySettingsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<CompanySettingsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<CompanySettingsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<CompanySettingsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "CompanySettings/CompanySettings/Create",
        Update: "CompanySettings/CompanySettings/Update",
        Delete: "CompanySettings/CompanySettings/Delete",
        Retrieve: "CompanySettings/CompanySettings/Retrieve",
        List: "CompanySettings/CompanySettings/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>CompanySettingsService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}