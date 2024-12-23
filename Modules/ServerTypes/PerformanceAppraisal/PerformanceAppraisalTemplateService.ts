import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PerformanceAppraisalTemplateRow } from "./PerformanceAppraisalTemplateRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";
import { DeleteAllRequest } from "../Web/Modules.PerformanceAppraisal.DeleteAllRequest";

export namespace PerformanceAppraisalTemplateService {
    export const baseUrl = 'PerformanceAppraisal/PerformanceAppraisalTemplate';

    export declare function Create(request: SaveRequest<PerformanceAppraisalTemplateRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PerformanceAppraisalTemplateRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PerformanceAppraisalTemplateRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PerformanceAppraisalTemplateRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function DeleteAll(request: DeleteAllRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PerformanceAppraisal/PerformanceAppraisalTemplate/Create",
        Update: "PerformanceAppraisal/PerformanceAppraisalTemplate/Update",
        Delete: "PerformanceAppraisal/PerformanceAppraisalTemplate/Delete",
        Retrieve: "PerformanceAppraisal/PerformanceAppraisalTemplate/Retrieve",
        List: "PerformanceAppraisal/PerformanceAppraisalTemplate/List",
        DeleteAll: "PerformanceAppraisal/PerformanceAppraisalTemplate/DeleteAll"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'DeleteAll'
    ].forEach(x => {
        (<any>PerformanceAppraisalTemplateService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}