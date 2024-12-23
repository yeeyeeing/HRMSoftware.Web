import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployeeAttendanceRow } from "./EmployeeAttendanceRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EmployeeAttendanceService {
    export const baseUrl = 'EmployeeAttendance/EmployeeAttendance';

    export declare function Create(request: SaveRequest<EmployeeAttendanceRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployeeAttendanceRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeAttendanceRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeAttendanceRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function EmployeeAttendanceRecord(request: number, onSuccess?: (response: ListResponse<EmployeeAttendanceRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeAttendance/EmployeeAttendance/Create",
        Update: "EmployeeAttendance/EmployeeAttendance/Update",
        Delete: "EmployeeAttendance/EmployeeAttendance/Delete",
        Retrieve: "EmployeeAttendance/EmployeeAttendance/Retrieve",
        List: "EmployeeAttendance/EmployeeAttendance/List",
        EmployeeAttendanceRecord: "EmployeeAttendance/EmployeeAttendance/EmployeeAttendanceRecord"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'EmployeeAttendanceRecord'
    ].forEach(x => {
        (<any>EmployeeAttendanceService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}