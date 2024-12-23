import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { CompanyProfileRow } from "./CompanyProfileRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace CompanyProfileService {
    export const baseUrl = 'PerformanceAppraisal/CompanyProfile';

    export declare function Create(request: SaveRequest<CompanyProfileRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<CompanyProfileRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<CompanyProfileRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<CompanyProfileRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PerformanceAppraisal/CompanyProfile/Create",
        Update: "PerformanceAppraisal/CompanyProfile/Update",
        Delete: "PerformanceAppraisal/CompanyProfile/Delete",
        Retrieve: "PerformanceAppraisal/CompanyProfile/Retrieve",
        List: "PerformanceAppraisal/CompanyProfile/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>CompanyProfileService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}