import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { OrganisationChartRow } from "./OrganisationChartRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace OrganisationChartService {
    export const baseUrl = 'OrganisationChart/OrganisationChart';

    export declare function Create(request: SaveRequest<OrganisationChartRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<OrganisationChartRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<OrganisationChartRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<OrganisationChartRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "OrganisationChart/OrganisationChart/Create",
        Update: "OrganisationChart/OrganisationChart/Update",
        Delete: "OrganisationChart/OrganisationChart/Delete",
        Retrieve: "OrganisationChart/OrganisationChart/Retrieve",
        List: "OrganisationChart/OrganisationChart/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>OrganisationChartService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}