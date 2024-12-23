import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PerformanceAppraisalTypeRow } from "./PerformanceAppraisalTypeRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";
import { DeleteAllRequest } from "../Web/Modules.PerformanceAppraisal.DeleteAllRequest";

export namespace PerformanceAppraisalTypeService {
    export const baseUrl = 'PerformanceAppraisal/PerformanceAppraisalType';

    export declare function Create(request: SaveRequest<PerformanceAppraisalTypeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PerformanceAppraisalTypeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PerformanceAppraisalTypeRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PerformanceAppraisalTypeRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function DeleteAll(request: DeleteAllRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PerformanceAppraisal/PerformanceAppraisalType/Create",
        Update: "PerformanceAppraisal/PerformanceAppraisalType/Update",
        Delete: "PerformanceAppraisal/PerformanceAppraisalType/Delete",
        Retrieve: "PerformanceAppraisal/PerformanceAppraisalType/Retrieve",
        List: "PerformanceAppraisal/PerformanceAppraisalType/List",
        DeleteAll: "PerformanceAppraisal/PerformanceAppraisalType/DeleteAll"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'DeleteAll'
    ].forEach(x => {
        (<any>PerformanceAppraisalTypeService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}