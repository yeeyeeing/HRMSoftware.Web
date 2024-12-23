import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PerformanceAppraisalEvaluationRow } from "./PerformanceAppraisalEvaluationRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PerformanceAppraisalEvaluationService {
    export const baseUrl = 'PerformanceAppraisal/PerformanceAppraisalEvaluation';

    export declare function Create(request: SaveRequest<PerformanceAppraisalEvaluationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PerformanceAppraisalEvaluationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PerformanceAppraisalEvaluationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PerformanceAppraisalEvaluationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PerformanceAppraisal/PerformanceAppraisalEvaluation/Create",
        Update: "PerformanceAppraisal/PerformanceAppraisalEvaluation/Update",
        Delete: "PerformanceAppraisal/PerformanceAppraisalEvaluation/Delete",
        Retrieve: "PerformanceAppraisal/PerformanceAppraisalEvaluation/Retrieve",
        List: "PerformanceAppraisal/PerformanceAppraisalEvaluation/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PerformanceAppraisalEvaluationService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}