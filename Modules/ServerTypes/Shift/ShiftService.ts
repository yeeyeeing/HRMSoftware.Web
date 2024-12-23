import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { ShiftRow } from "./ShiftRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace ShiftService {
    export const baseUrl = 'Shift/Shift';

    export declare function Create(request: SaveRequest<ShiftRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<ShiftRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ShiftRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ShiftRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function CountNumberOfEmployeeInShifts(request: ServiceRequest, onSuccess?: (response: number) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function ListShift(request: ServiceRequest, onSuccess?: (response: ListResponse<ShiftRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Shift/Shift/Create",
        Update: "Shift/Shift/Update",
        Delete: "Shift/Shift/Delete",
        Retrieve: "Shift/Shift/Retrieve",
        List: "Shift/Shift/List",
        CountNumberOfEmployeeInShifts: "Shift/Shift/CountNumberOfEmployeeInShifts",
        ListShift: "Shift/Shift/ListShift"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'CountNumberOfEmployeeInShifts', 
        'ListShift'
    ].forEach(x => {
        (<any>ShiftService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}