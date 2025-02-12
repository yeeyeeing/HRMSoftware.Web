import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { MasterCityRow } from "./MasterCityRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace MasterCityService {
    export const baseUrl = 'Master/MasterCity';

    export declare function Create(request: SaveRequest<MasterCityRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<MasterCityRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<MasterCityRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<MasterCityRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function CityList(request: ServiceRequest, onSuccess?: (response: ListResponse<MasterCityRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Master/MasterCity/Create",
        Update: "Master/MasterCity/Update",
        Delete: "Master/MasterCity/Delete",
        Retrieve: "Master/MasterCity/Retrieve",
        List: "Master/MasterCity/List",
        CityList: "Master/MasterCity/CityList"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'CityList'
    ].forEach(x => {
        (<any>MasterCityService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}