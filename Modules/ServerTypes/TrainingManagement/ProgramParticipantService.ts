import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { ProgramParticipantRow } from "./ProgramParticipantRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace ProgramParticipantService {
    export const baseUrl = 'TrainingManagement/ProgramParticipant';

    export declare function Create(request: SaveRequest<ProgramParticipantRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<ProgramParticipantRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ProgramParticipantRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ProgramParticipantRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "TrainingManagement/ProgramParticipant/Create",
        Update: "TrainingManagement/ProgramParticipant/Update",
        Delete: "TrainingManagement/ProgramParticipant/Delete",
        Retrieve: "TrainingManagement/ProgramParticipant/Retrieve",
        List: "TrainingManagement/ProgramParticipant/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>ProgramParticipantService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}