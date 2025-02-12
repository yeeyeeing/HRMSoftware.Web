import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { MasterStateRow } from "./MasterStateRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace MasterStateService {
    export const baseUrl = 'Master/MasterState';

    export declare function Create(request: SaveRequest<MasterStateRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<MasterStateRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<MasterStateRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<MasterStateRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function StateList(request: ServiceRequest, onSuccess?: (response: ListResponse<MasterStateRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Master/MasterState/Create",
        Update: "Master/MasterState/Update",
        Delete: "Master/MasterState/Delete",
        Retrieve: "Master/MasterState/Retrieve",
        List: "Master/MasterState/List",
        StateList: "Master/MasterState/StateList"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'StateList'
    ].forEach(x => {
        (<any>MasterStateService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}