import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { ProgramFlowRow } from "./ProgramFlowRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace ProgramFlowService {
    export const baseUrl = 'TrainingManagement/ProgramFlow';

    export declare function Create(request: SaveRequest<ProgramFlowRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<ProgramFlowRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ProgramFlowRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ProgramFlowRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "TrainingManagement/ProgramFlow/Create",
        Update: "TrainingManagement/ProgramFlow/Update",
        Delete: "TrainingManagement/ProgramFlow/Delete",
        Retrieve: "TrainingManagement/ProgramFlow/Retrieve",
        List: "TrainingManagement/ProgramFlow/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>ProgramFlowService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}