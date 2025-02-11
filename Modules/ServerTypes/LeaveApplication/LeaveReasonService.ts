import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { LeaveReasonRow } from "./LeaveReasonRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace LeaveReasonService {
    export const baseUrl = 'LeaveApplication/LeaveReason';

    export declare function Create(request: SaveRequest<LeaveReasonRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<LeaveReasonRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<LeaveReasonRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<LeaveReasonRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function LeaveReasonList(request: ServiceRequest, onSuccess?: (response: ListResponse<LeaveReasonRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "LeaveApplication/LeaveReason/Create",
        Update: "LeaveApplication/LeaveReason/Update",
        Delete: "LeaveApplication/LeaveReason/Delete",
        Retrieve: "LeaveApplication/LeaveReason/Retrieve",
        List: "LeaveApplication/LeaveReason/List",
        LeaveReasonList: "LeaveApplication/LeaveReason/LeaveReasonList"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'LeaveReasonList'
    ].forEach(x => {
        (<any>LeaveReasonService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}