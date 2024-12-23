import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployeeGroupRow } from "./EmployeeGroupRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace EmployeeGroupService {
    export const baseUrl = 'EmployeeGroup/EmployeeGroup';

    export declare function Create(request: SaveRequest<EmployeeGroupRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployeeGroupRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeGroupRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeGroupRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function ListGroup(request: ServiceRequest, onSuccess?: (response: ListResponse<EmployeeGroupRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeGroup/EmployeeGroup/Create",
        Update: "EmployeeGroup/EmployeeGroup/Update",
        Delete: "EmployeeGroup/EmployeeGroup/Delete",
        Retrieve: "EmployeeGroup/EmployeeGroup/Retrieve",
        List: "EmployeeGroup/EmployeeGroup/List",
        ListGroup: "EmployeeGroup/EmployeeGroup/ListGroup"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'ListGroup'
    ].forEach(x => {
        (<any>EmployeeGroupService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}