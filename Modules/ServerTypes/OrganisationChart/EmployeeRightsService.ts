import { ServiceRequest, ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";
import { DeleteResponse, SaveRequest, SaveResponse, DeleteRequest, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployeeRightsRow } from "./EmployeeRightsRow";

export namespace EmployeeRightsService {
    export const baseUrl = 'OrganisationChart/EmployeeRights';

    export declare function ClearOldAdminRightRecord(request: ServiceRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Create(request: SaveRequest<EmployeeRightsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployeeRightsRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeRightsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeRightsRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        ClearOldAdminRightRecord: "OrganisationChart/EmployeeRights/ClearOldAdminRightRecord",
        Create: "OrganisationChart/EmployeeRights/Create",
        Update: "OrganisationChart/EmployeeRights/Update",
        Delete: "OrganisationChart/EmployeeRights/Delete",
        Retrieve: "OrganisationChart/EmployeeRights/Retrieve",
        List: "OrganisationChart/EmployeeRights/List"
    } as const;

    [
        'ClearOldAdminRightRecord', 
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>EmployeeRightsService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}