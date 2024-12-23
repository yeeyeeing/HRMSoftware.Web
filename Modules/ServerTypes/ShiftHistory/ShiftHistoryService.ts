import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { ShiftHistoryRow } from "./ShiftHistoryRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace ShiftHistoryService {
    export const baseUrl = 'ShiftHistory/ShiftHistory';

    export declare function Create(request: SaveRequest<ShiftHistoryRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<ShiftHistoryRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ShiftHistoryRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ShiftHistoryRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "ShiftHistory/ShiftHistory/Create",
        Update: "ShiftHistory/ShiftHistory/Update",
        Delete: "ShiftHistory/ShiftHistory/Delete",
        Retrieve: "ShiftHistory/ShiftHistory/Retrieve",
        List: "ShiftHistory/ShiftHistory/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>ShiftHistoryService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}