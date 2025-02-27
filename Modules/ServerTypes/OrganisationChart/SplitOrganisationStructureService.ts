import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { SplitOrganisationStructureRow } from "./SplitOrganisationStructureRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace SplitOrganisationStructureService {
    export const baseUrl = 'OrganisationChart/SplitOrganisationStructure';

    export declare function Create(request: SaveRequest<SplitOrganisationStructureRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<SplitOrganisationStructureRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<SplitOrganisationStructureRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<SplitOrganisationStructureRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function DeleteAll(request: ServiceRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "OrganisationChart/SplitOrganisationStructure/Create",
        Update: "OrganisationChart/SplitOrganisationStructure/Update",
        Delete: "OrganisationChart/SplitOrganisationStructure/Delete",
        Retrieve: "OrganisationChart/SplitOrganisationStructure/Retrieve",
        List: "OrganisationChart/SplitOrganisationStructure/List",
        DeleteAll: "OrganisationChart/SplitOrganisationStructure/DeleteAll"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'DeleteAll'
    ].forEach(x => {
        (<any>SplitOrganisationStructureService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}