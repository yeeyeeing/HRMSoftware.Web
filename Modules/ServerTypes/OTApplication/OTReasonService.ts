import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { OTReasonRow } from "./OTReasonRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace OTReasonService {
    export const baseUrl = 'OTApplication/OTReason';

    export declare function Create(request: SaveRequest<OTReasonRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<OTReasonRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<OTReasonRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<OTReasonRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function OTReasonList(request: ServiceRequest, onSuccess?: (response: ListResponse<OTReasonRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "OTApplication/OTReason/Create",
        Update: "OTApplication/OTReason/Update",
        Delete: "OTApplication/OTReason/Delete",
        Retrieve: "OTApplication/OTReason/Retrieve",
        List: "OTApplication/OTReason/List",
        OTReasonList: "OTApplication/OTReason/OTReasonList"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'OTReasonList'
    ].forEach(x => {
        (<any>OTReasonService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}