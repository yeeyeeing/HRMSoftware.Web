import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { AnnualLeavePolicyRow } from "./AnnualLeavePolicyRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace AnnualLeavePolicyService {
    export const baseUrl = 'AnnualLeavePolicy/AnnualLeavePolicy';

    export declare function Create(request: SaveRequest<AnnualLeavePolicyRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<AnnualLeavePolicyRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<AnnualLeavePolicyRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<AnnualLeavePolicyRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function ListAnnualLeavePolicy(request: ServiceRequest, onSuccess?: (response: ListResponse<AnnualLeavePolicyRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "AnnualLeavePolicy/AnnualLeavePolicy/Create",
        Update: "AnnualLeavePolicy/AnnualLeavePolicy/Update",
        Delete: "AnnualLeavePolicy/AnnualLeavePolicy/Delete",
        Retrieve: "AnnualLeavePolicy/AnnualLeavePolicy/Retrieve",
        List: "AnnualLeavePolicy/AnnualLeavePolicy/List",
        ListAnnualLeavePolicy: "AnnualLeavePolicy/AnnualLeavePolicy/ListAnnualLeavePolicy"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'ListAnnualLeavePolicy'
    ].forEach(x => {
        (<any>AnnualLeavePolicyService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}