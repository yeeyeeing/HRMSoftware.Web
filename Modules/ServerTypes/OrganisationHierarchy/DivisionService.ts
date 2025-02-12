import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { DivisionRow } from "./DivisionRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace DivisionService {
    export const baseUrl = 'OrganisationHierarchy/Division';

    export declare function Create(request: SaveRequest<DivisionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<DivisionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<DivisionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<DivisionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function DivisionList(request: ServiceRequest, onSuccess?: (response: ListResponse<DivisionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "OrganisationHierarchy/Division/Create",
        Update: "OrganisationHierarchy/Division/Update",
        Delete: "OrganisationHierarchy/Division/Delete",
        Retrieve: "OrganisationHierarchy/Division/Retrieve",
        List: "OrganisationHierarchy/Division/List",
        DivisionList: "OrganisationHierarchy/Division/DivisionList"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'DivisionList'
    ].forEach(x => {
        (<any>DivisionService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}