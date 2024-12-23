import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PerformanceAppraisalResponseRow } from "./PerformanceAppraisalResponseRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PerformanceAppraisalResponseService {
    export const baseUrl = 'PerformanceAppraisal/PerformanceAppraisalResponse';

    export declare function Create(request: SaveRequest<PerformanceAppraisalResponseRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PerformanceAppraisalResponseRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PerformanceAppraisalResponseRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PerformanceAppraisalResponseRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PerformanceAppraisal/PerformanceAppraisalResponse/Create",
        Update: "PerformanceAppraisal/PerformanceAppraisalResponse/Update",
        Delete: "PerformanceAppraisal/PerformanceAppraisalResponse/Delete",
        Retrieve: "PerformanceAppraisal/PerformanceAppraisalResponse/Retrieve",
        List: "PerformanceAppraisal/PerformanceAppraisalResponse/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PerformanceAppraisalResponseService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}