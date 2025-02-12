import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { DepartmentRow } from "./DepartmentRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace DepartmentService {
    export const baseUrl = 'OrganisationHierarchy/Department';

    export declare function Create(request: SaveRequest<DepartmentRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<DepartmentRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<DepartmentRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<DepartmentRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function DepartmentList(request: ServiceRequest, onSuccess?: (response: ListResponse<DepartmentRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "OrganisationHierarchy/Department/Create",
        Update: "OrganisationHierarchy/Department/Update",
        Delete: "OrganisationHierarchy/Department/Delete",
        Retrieve: "OrganisationHierarchy/Department/Retrieve",
        List: "OrganisationHierarchy/Department/List",
        DepartmentList: "OrganisationHierarchy/Department/DepartmentList"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'DepartmentList'
    ].forEach(x => {
        (<any>DepartmentService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}