import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PerformanceAppraisalReviewerRow } from "./PerformanceAppraisalReviewerRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PerformanceAppraisalReviewerService {
    export const baseUrl = 'PerformanceAppraisal/PerformanceAppraisalReviewer';

    export declare function Create(request: SaveRequest<PerformanceAppraisalReviewerRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PerformanceAppraisalReviewerRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PerformanceAppraisalReviewerRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PerformanceAppraisalReviewerRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PerformanceAppraisal/PerformanceAppraisalReviewer/Create",
        Update: "PerformanceAppraisal/PerformanceAppraisalReviewer/Update",
        Delete: "PerformanceAppraisal/PerformanceAppraisalReviewer/Delete",
        Retrieve: "PerformanceAppraisal/PerformanceAppraisalReviewer/Retrieve",
        List: "PerformanceAppraisal/PerformanceAppraisalReviewer/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PerformanceAppraisalReviewerService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}