import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { FullProfileRow } from "./FullProfileRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace FullProfileService {
    export const baseUrl = 'OrganisationChart/FullProfile';

    export declare function Create(request: SaveRequest<FullProfileRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<FullProfileRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<FullProfileRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<FullProfileRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "OrganisationChart/FullProfile/Create",
        Update: "OrganisationChart/FullProfile/Update",
        Delete: "OrganisationChart/FullProfile/Delete",
        Retrieve: "OrganisationChart/FullProfile/Retrieve",
        List: "OrganisationChart/FullProfile/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>FullProfileService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}