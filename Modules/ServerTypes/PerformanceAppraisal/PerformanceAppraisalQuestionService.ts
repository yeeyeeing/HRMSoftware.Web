import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PerformanceAppraisalQuestionRow } from "./PerformanceAppraisalQuestionRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";
import { DeleteAllRequest } from "../Web/Modules.PerformanceAppraisal.DeleteAllRequest";

export namespace PerformanceAppraisalQuestionService {
    export const baseUrl = 'PerformanceAppraisal/PerformanceAppraisalQuestion';

    export declare function Create(request: SaveRequest<PerformanceAppraisalQuestionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PerformanceAppraisalQuestionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PerformanceAppraisalQuestionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PerformanceAppraisalQuestionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function DeleteAll(request: DeleteAllRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PerformanceAppraisal/PerformanceAppraisalQuestion/Create",
        Update: "PerformanceAppraisal/PerformanceAppraisalQuestion/Update",
        Delete: "PerformanceAppraisal/PerformanceAppraisalQuestion/Delete",
        Retrieve: "PerformanceAppraisal/PerformanceAppraisalQuestion/Retrieve",
        List: "PerformanceAppraisal/PerformanceAppraisalQuestion/List",
        DeleteAll: "PerformanceAppraisal/PerformanceAppraisalQuestion/DeleteAll"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'DeleteAll'
    ].forEach(x => {
        (<any>PerformanceAppraisalQuestionService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}