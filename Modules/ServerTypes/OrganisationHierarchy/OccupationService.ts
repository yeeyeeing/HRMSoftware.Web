import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { OccupationRow } from "./OccupationRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace OccupationService {
    export const baseUrl = 'OrganisationHierarchy/Occupation';

    export declare function Create(request: SaveRequest<OccupationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<OccupationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<OccupationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<OccupationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function OccupationList(request: ServiceRequest, onSuccess?: (response: ListResponse<OccupationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "OrganisationHierarchy/Occupation/Create",
        Update: "OrganisationHierarchy/Occupation/Update",
        Delete: "OrganisationHierarchy/Occupation/Delete",
        Retrieve: "OrganisationHierarchy/Occupation/Retrieve",
        List: "OrganisationHierarchy/Occupation/List",
        OccupationList: "OrganisationHierarchy/Occupation/OccupationList"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'OccupationList'
    ].forEach(x => {
        (<any>OccupationService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}