import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { LeaveDescriptionRow } from "./LeaveDescriptionRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace LeaveDescriptionService {
    export const baseUrl = 'LeaveApplication/LeaveDescription';

    export declare function Create(request: SaveRequest<LeaveDescriptionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<LeaveDescriptionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<LeaveDescriptionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<LeaveDescriptionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "LeaveApplication/LeaveDescription/Create",
        Update: "LeaveApplication/LeaveDescription/Update",
        Delete: "LeaveApplication/LeaveDescription/Delete",
        Retrieve: "LeaveApplication/LeaveDescription/Retrieve",
        List: "LeaveApplication/LeaveDescription/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>LeaveDescriptionService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}