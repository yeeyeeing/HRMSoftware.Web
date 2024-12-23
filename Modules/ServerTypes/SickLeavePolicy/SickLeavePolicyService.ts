import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { SickLeavePolicyRow } from "./SickLeavePolicyRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace SickLeavePolicyService {
    export const baseUrl = 'SickLeavePolicy/SickLeavePolicy';

    export declare function Create(request: SaveRequest<SickLeavePolicyRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<SickLeavePolicyRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<SickLeavePolicyRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<SickLeavePolicyRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function ListSickLeavePolicy(request: ServiceRequest, onSuccess?: (response: ListResponse<SickLeavePolicyRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "SickLeavePolicy/SickLeavePolicy/Create",
        Update: "SickLeavePolicy/SickLeavePolicy/Update",
        Delete: "SickLeavePolicy/SickLeavePolicy/Delete",
        Retrieve: "SickLeavePolicy/SickLeavePolicy/Retrieve",
        List: "SickLeavePolicy/SickLeavePolicy/List",
        ListSickLeavePolicy: "SickLeavePolicy/SickLeavePolicy/ListSickLeavePolicy"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'ListSickLeavePolicy'
    ].forEach(x => {
        (<any>SickLeavePolicyService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}