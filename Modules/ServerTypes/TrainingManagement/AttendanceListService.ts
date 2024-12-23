import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { AttendanceListRow } from "./AttendanceListRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace AttendanceListService {
    export const baseUrl = 'TrainingManagement/AttendanceList';

    export declare function Create(request: SaveRequest<AttendanceListRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<AttendanceListRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<AttendanceListRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<AttendanceListRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "TrainingManagement/AttendanceList/Create",
        Update: "TrainingManagement/AttendanceList/Update",
        Delete: "TrainingManagement/AttendanceList/Delete",
        Retrieve: "TrainingManagement/AttendanceList/Retrieve",
        List: "TrainingManagement/AttendanceList/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>AttendanceListService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}