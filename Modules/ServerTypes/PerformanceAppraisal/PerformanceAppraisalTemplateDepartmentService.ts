import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PerformanceAppraisalTemplateDepartmentRow } from "./PerformanceAppraisalTemplateDepartmentRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace PerformanceAppraisalTemplateDepartmentService {
    export const baseUrl = 'PerformanceAppraisal/PerformanceAppraisalTemplateDepartment';

    export declare function Create(request: SaveRequest<PerformanceAppraisalTemplateDepartmentRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PerformanceAppraisalTemplateDepartmentRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PerformanceAppraisalTemplateDepartmentRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PerformanceAppraisalTemplateDepartmentRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PerformanceAppraisal/PerformanceAppraisalTemplateDepartment/Create",
        Update: "PerformanceAppraisal/PerformanceAppraisalTemplateDepartment/Update",
        Delete: "PerformanceAppraisal/PerformanceAppraisalTemplateDepartment/Delete",
        Retrieve: "PerformanceAppraisal/PerformanceAppraisalTemplateDepartment/Retrieve",
        List: "PerformanceAppraisal/PerformanceAppraisalTemplateDepartment/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>PerformanceAppraisalTemplateDepartmentService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}