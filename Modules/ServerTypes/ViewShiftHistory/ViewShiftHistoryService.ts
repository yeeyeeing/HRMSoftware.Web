﻿import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { ViewShiftHistoryRow } from "./ViewShiftHistoryRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace ViewShiftHistoryService {
    export const baseUrl = 'ViewShiftHistory/ViewShiftHistory';

    export declare function Create(request: SaveRequest<ViewShiftHistoryRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<ViewShiftHistoryRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ViewShiftHistoryRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ViewShiftHistoryRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function RetriveShiftHistory(request: number, onSuccess?: (response: ListResponse<ViewShiftHistoryRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "ViewShiftHistory/ViewShiftHistory/Create",
        Update: "ViewShiftHistory/ViewShiftHistory/Update",
        Delete: "ViewShiftHistory/ViewShiftHistory/Delete",
        Retrieve: "ViewShiftHistory/ViewShiftHistory/Retrieve",
        List: "ViewShiftHistory/ViewShiftHistory/List",
        RetriveShiftHistory: "ViewShiftHistory/ViewShiftHistory/RetriveShiftHistory"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'RetriveShiftHistory'
    ].forEach(x => {
        (<any>ViewShiftHistoryService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}