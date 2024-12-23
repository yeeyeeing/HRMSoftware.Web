import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { FinalOrganisationChartRow } from "./FinalOrganisationChartRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace FinalOrganisationChartService {
    export const baseUrl = 'OrganisationChart/FinalOrganisationChart';

    export declare function Create(request: SaveRequest<FinalOrganisationChartRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<FinalOrganisationChartRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<FinalOrganisationChartRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<FinalOrganisationChartRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "OrganisationChart/FinalOrganisationChart/Create",
        Update: "OrganisationChart/FinalOrganisationChart/Update",
        Delete: "OrganisationChart/FinalOrganisationChart/Delete",
        Retrieve: "OrganisationChart/FinalOrganisationChart/Retrieve",
        List: "OrganisationChart/FinalOrganisationChart/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>FinalOrganisationChartService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}