import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { MasterCareerPathRow } from "./MasterCareerPathRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace MasterCareerPathService {
    export const baseUrl = 'EmployeeProfile/MasterCareerPath';

    export declare function Create(request: SaveRequest<MasterCareerPathRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<MasterCareerPathRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<MasterCareerPathRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<MasterCareerPathRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/MasterCareerPath/Create",
        Update: "EmployeeProfile/MasterCareerPath/Update",
        Delete: "EmployeeProfile/MasterCareerPath/Delete",
        Retrieve: "EmployeeProfile/MasterCareerPath/Retrieve",
        List: "EmployeeProfile/MasterCareerPath/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>MasterCareerPathService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}