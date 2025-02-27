import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { MasterCostCentreRow } from "./MasterCostCentreRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace MasterCostCentreService {
    export const baseUrl = 'Master/MasterCostCentre';

    export declare function Create(request: SaveRequest<MasterCostCentreRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<MasterCostCentreRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<MasterCostCentreRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<MasterCostCentreRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function CostCentreList(request: ServiceRequest, onSuccess?: (response: ListResponse<MasterCostCentreRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Master/MasterCostCentre/Create",
        Update: "Master/MasterCostCentre/Update",
        Delete: "Master/MasterCostCentre/Delete",
        Retrieve: "Master/MasterCostCentre/Retrieve",
        List: "Master/MasterCostCentre/List",
        CostCentreList: "Master/MasterCostCentre/CostCentreList"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'CostCentreList'
    ].forEach(x => {
        (<any>MasterCostCentreService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}