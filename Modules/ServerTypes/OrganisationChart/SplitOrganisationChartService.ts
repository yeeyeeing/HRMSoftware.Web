import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { SplitOrganisationChartRow } from "./SplitOrganisationChartRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace SplitOrganisationChartService {
    export const baseUrl = 'OrganisationChart/SplitOrganisationChart';

    export declare function Create(request: SaveRequest<SplitOrganisationChartRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<SplitOrganisationChartRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<SplitOrganisationChartRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<SplitOrganisationChartRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function DeleteAll(request: ServiceRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "OrganisationChart/SplitOrganisationChart/Create",
        Update: "OrganisationChart/SplitOrganisationChart/Update",
        Delete: "OrganisationChart/SplitOrganisationChart/Delete",
        Retrieve: "OrganisationChart/SplitOrganisationChart/Retrieve",
        List: "OrganisationChart/SplitOrganisationChart/List",
        DeleteAll: "OrganisationChart/SplitOrganisationChart/DeleteAll"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'DeleteAll'
    ].forEach(x => {
        (<any>SplitOrganisationChartService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}