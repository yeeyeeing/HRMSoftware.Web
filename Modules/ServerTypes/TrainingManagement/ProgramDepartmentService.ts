import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { ProgramDepartmentRow } from "./ProgramDepartmentRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace ProgramDepartmentService {
    export const baseUrl = 'TrainingManagement/ProgramDepartment';

    export declare function Create(request: SaveRequest<ProgramDepartmentRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<ProgramDepartmentRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ProgramDepartmentRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ProgramDepartmentRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "TrainingManagement/ProgramDepartment/Create",
        Update: "TrainingManagement/ProgramDepartment/Update",
        Delete: "TrainingManagement/ProgramDepartment/Delete",
        Retrieve: "TrainingManagement/ProgramDepartment/Retrieve",
        List: "TrainingManagement/ProgramDepartment/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>ProgramDepartmentService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}