import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PerformanceAppraisalTemplateQuestionRow } from "./PerformanceAppraisalTemplateQuestionRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PerformanceAppraisalTemplateQuestionService {
    export const baseUrl = 'PerformanceAppraisal/PerformanceAppraisalTemplateQuestion';

    export declare function Create(request: SaveRequest<PerformanceAppraisalTemplateQuestionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PerformanceAppraisalTemplateQuestionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PerformanceAppraisalTemplateQuestionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PerformanceAppraisalTemplateQuestionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PerformanceAppraisal/PerformanceAppraisalTemplateQuestion/Create",
        Update: "PerformanceAppraisal/PerformanceAppraisalTemplateQuestion/Update",
        Delete: "PerformanceAppraisal/PerformanceAppraisalTemplateQuestion/Delete",
        Retrieve: "PerformanceAppraisal/PerformanceAppraisalTemplateQuestion/Retrieve",
        List: "PerformanceAppraisal/PerformanceAppraisalTemplateQuestion/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PerformanceAppraisalTemplateQuestionService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}