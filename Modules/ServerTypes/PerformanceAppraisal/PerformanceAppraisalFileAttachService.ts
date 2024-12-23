import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PerformanceAppraisalFileAttachRow } from "./PerformanceAppraisalFileAttachRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";
import { DeleteAllRequest } from "../Web/Modules.PerformanceAppraisal.DeleteAllRequest";

export namespace PerformanceAppraisalFileAttachService {
    export const baseUrl = 'PerformanceAppraisal/PerformanceAppraisalFileAttach';

    export declare function Create(request: SaveRequest<PerformanceAppraisalFileAttachRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PerformanceAppraisalFileAttachRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PerformanceAppraisalFileAttachRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PerformanceAppraisalFileAttachRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function DeleteAll(request: DeleteAllRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PerformanceAppraisal/PerformanceAppraisalFileAttach/Create",
        Update: "PerformanceAppraisal/PerformanceAppraisalFileAttach/Update",
        Delete: "PerformanceAppraisal/PerformanceAppraisalFileAttach/Delete",
        Retrieve: "PerformanceAppraisal/PerformanceAppraisalFileAttach/Retrieve",
        List: "PerformanceAppraisal/PerformanceAppraisalFileAttach/List",
        DeleteAll: "PerformanceAppraisal/PerformanceAppraisalFileAttach/DeleteAll"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'DeleteAll'
    ].forEach(x => {
        (<any>PerformanceAppraisalFileAttachService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}