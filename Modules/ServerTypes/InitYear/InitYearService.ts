import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { InitYearRow } from "./InitYearRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace InitYearService {
    export const baseUrl = 'CompanySettings/InitYear/InitYear';

    export declare function Create(request: SaveRequest<InitYearRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<InitYearRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<InitYearRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<InitYearRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function ListYear(request: ServiceRequest, onSuccess?: (response: ListResponse<InitYearRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "CompanySettings/InitYear/InitYear/Create",
        Update: "CompanySettings/InitYear/InitYear/Update",
        Delete: "CompanySettings/InitYear/InitYear/Delete",
        Retrieve: "CompanySettings/InitYear/InitYear/Retrieve",
        List: "CompanySettings/InitYear/InitYear/List",
        ListYear: "CompanySettings/InitYear/InitYear/ListYear"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'ListYear'
    ].forEach(x => {
        (<any>InitYearService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}