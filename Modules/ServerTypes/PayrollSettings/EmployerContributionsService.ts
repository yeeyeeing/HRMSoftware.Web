import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployerContributionsRow } from "./EmployerContributionsRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EmployerContributionsService {
    export const baseUrl = 'PayrollSettings/EmployerContributions';

    export declare function Create(request: SaveRequest<EmployerContributionsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployerContributionsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployerContributionsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployerContributionsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PayrollSettings/EmployerContributions/Create",
        Update: "PayrollSettings/EmployerContributions/Update",
        Delete: "PayrollSettings/EmployerContributions/Delete",
        Retrieve: "PayrollSettings/EmployerContributions/Retrieve",
        List: "PayrollSettings/EmployerContributions/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>EmployerContributionsService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}