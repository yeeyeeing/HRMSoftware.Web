import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { ProgramFlowResponseRow } from "./ProgramFlowResponseRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace ProgramFlowResponseService {
    export const baseUrl = 'TrainingManagement/ProgramFlowResponse';

    export declare function Create(request: SaveRequest<ProgramFlowResponseRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<ProgramFlowResponseRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ProgramFlowResponseRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ProgramFlowResponseRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "TrainingManagement/ProgramFlowResponse/Create",
        Update: "TrainingManagement/ProgramFlowResponse/Update",
        Delete: "TrainingManagement/ProgramFlowResponse/Delete",
        Retrieve: "TrainingManagement/ProgramFlowResponse/Retrieve",
        List: "TrainingManagement/ProgramFlowResponse/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>ProgramFlowResponseService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}