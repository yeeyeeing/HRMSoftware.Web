import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PerformanceAppraisalFormRow } from "./PerformanceAppraisalFormRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";
import { DeleteAllRequest } from "../Web/Modules.PerformanceAppraisal.DeleteAllRequest";

export namespace PerformanceAppraisalFormService {
    export const baseUrl = 'PerformanceAppraisal/PerformanceAppraisalForm';

    export declare function Create(request: SaveRequest<PerformanceAppraisalFormRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PerformanceAppraisalFormRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PerformanceAppraisalFormRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PerformanceAppraisalFormRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function DeleteAll(request: DeleteAllRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PerformanceAppraisal/PerformanceAppraisalForm/Create",
        Update: "PerformanceAppraisal/PerformanceAppraisalForm/Update",
        Delete: "PerformanceAppraisal/PerformanceAppraisalForm/Delete",
        Retrieve: "PerformanceAppraisal/PerformanceAppraisalForm/Retrieve",
        List: "PerformanceAppraisal/PerformanceAppraisalForm/List",
        DeleteAll: "PerformanceAppraisal/PerformanceAppraisalForm/DeleteAll"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'DeleteAll'
    ].forEach(x => {
        (<any>PerformanceAppraisalFormService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}