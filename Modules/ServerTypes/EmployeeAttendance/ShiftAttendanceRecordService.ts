import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { ShiftAttendanceRecordRow } from "./ShiftAttendanceRecordRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace ShiftAttendanceRecordService {
    export const baseUrl = 'EmployeeAttendance/ShiftAttendanceRecord';

    export declare function Create(request: SaveRequest<ShiftAttendanceRecordRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<ShiftAttendanceRecordRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ShiftAttendanceRecordRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ShiftAttendanceRecordRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function GetEmployeeRowIdFromUserRowId(request: number, onSuccess?: (response: number) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeAttendance/ShiftAttendanceRecord/Create",
        Update: "EmployeeAttendance/ShiftAttendanceRecord/Update",
        Delete: "EmployeeAttendance/ShiftAttendanceRecord/Delete",
        Retrieve: "EmployeeAttendance/ShiftAttendanceRecord/Retrieve",
        List: "EmployeeAttendance/ShiftAttendanceRecord/List",
        GetEmployeeRowIdFromUserRowId: "EmployeeAttendance/ShiftAttendanceRecord/GetEmployeeRowIdFromUserRowId"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'GetEmployeeRowIdFromUserRowId'
    ].forEach(x => {
        (<any>ShiftAttendanceRecordService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}