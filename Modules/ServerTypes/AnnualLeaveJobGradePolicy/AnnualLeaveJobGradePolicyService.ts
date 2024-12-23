import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { AnnualLeaveJobGradePolicyRow } from "./AnnualLeaveJobGradePolicyRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace AnnualLeaveJobGradePolicyService {
    export const baseUrl = 'AnnualLeaveJobGradePolicy/AnnualLeaveJobGradePolicy';

    export declare function Create(request: SaveRequest<AnnualLeaveJobGradePolicyRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<AnnualLeaveJobGradePolicyRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<AnnualLeaveJobGradePolicyRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<AnnualLeaveJobGradePolicyRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "AnnualLeaveJobGradePolicy/AnnualLeaveJobGradePolicy/Create",
        Update: "AnnualLeaveJobGradePolicy/AnnualLeaveJobGradePolicy/Update",
        Delete: "AnnualLeaveJobGradePolicy/AnnualLeaveJobGradePolicy/Delete",
        Retrieve: "AnnualLeaveJobGradePolicy/AnnualLeaveJobGradePolicy/Retrieve",
        List: "AnnualLeaveJobGradePolicy/AnnualLeaveJobGradePolicy/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>AnnualLeaveJobGradePolicyService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}