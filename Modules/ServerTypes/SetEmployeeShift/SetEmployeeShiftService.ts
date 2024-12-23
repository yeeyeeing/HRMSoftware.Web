import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { SetEmployeeShiftRow } from "./SetEmployeeShiftRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace SetEmployeeShiftService {
    export const baseUrl = 'SetEmployeeShift/SetEmployeeShift';

    export declare function Create(request: SaveRequest<SetEmployeeShiftRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<SetEmployeeShiftRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<SetEmployeeShiftRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<SetEmployeeShiftRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "SetEmployeeShift/SetEmployeeShift/Create",
        Update: "SetEmployeeShift/SetEmployeeShift/Update",
        Delete: "SetEmployeeShift/SetEmployeeShift/Delete",
        Retrieve: "SetEmployeeShift/SetEmployeeShift/Retrieve",
        List: "SetEmployeeShift/SetEmployeeShift/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>SetEmployeeShiftService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}