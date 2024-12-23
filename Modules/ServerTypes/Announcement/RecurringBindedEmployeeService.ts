import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { RecurringBindedEmployeeRow } from "./RecurringBindedEmployeeRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace RecurringBindedEmployeeService {
    export const baseUrl = 'Announcement/RecurringBindedEmployee';

    export declare function Create(request: SaveRequest<RecurringBindedEmployeeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<RecurringBindedEmployeeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<RecurringBindedEmployeeRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<RecurringBindedEmployeeRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Announcement/RecurringBindedEmployee/Create",
        Update: "Announcement/RecurringBindedEmployee/Update",
        Delete: "Announcement/RecurringBindedEmployee/Delete",
        Retrieve: "Announcement/RecurringBindedEmployee/Retrieve",
        List: "Announcement/RecurringBindedEmployee/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>RecurringBindedEmployeeService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}