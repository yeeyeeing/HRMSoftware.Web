import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { LeaveApplicationRow } from "./LeaveApplicationRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";
import { IActionResult } from "../Microsoft/AspNetCore.Mvc.IActionResult";

export namespace LeaveApplicationService {
    export const baseUrl = 'LeaveApplication/LeaveApplication';

    export declare function Create(request: SaveRequest<LeaveApplicationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<LeaveApplicationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<LeaveApplicationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<LeaveApplicationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function RetrieveEmployeeLeave(request: number, onSuccess?: (response: ListResponse<LeaveApplicationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function ListTakenLeave(request: number, onSuccess?: (response: ListResponse<LeaveApplicationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function ListTakenLeaveFromID(request: number, onSuccess?: (response: ListResponse<LeaveApplicationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function UploadFile(request: ServiceRequest, onSuccess?: (response: IActionResult) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "LeaveApplication/LeaveApplication/Create",
        Update: "LeaveApplication/LeaveApplication/Update",
        Delete: "LeaveApplication/LeaveApplication/Delete",
        Retrieve: "LeaveApplication/LeaveApplication/Retrieve",
        List: "LeaveApplication/LeaveApplication/List",
        RetrieveEmployeeLeave: "LeaveApplication/LeaveApplication/RetrieveEmployeeLeave",
        ListTakenLeave: "LeaveApplication/LeaveApplication/ListTakenLeave",
        ListTakenLeaveFromID: "LeaveApplication/LeaveApplication/ListTakenLeaveFromID",
        UploadFile: "LeaveApplication/LeaveApplication/UploadFile"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'RetrieveEmployeeLeave', 
        'ListTakenLeave', 
        'ListTakenLeaveFromID', 
        'UploadFile'
    ].forEach(x => {
        (<any>LeaveApplicationService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}