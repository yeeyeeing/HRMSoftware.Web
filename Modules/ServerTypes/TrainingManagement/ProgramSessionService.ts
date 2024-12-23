import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { ProgramSessionRow } from "./ProgramSessionRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace ProgramSessionService {
    export const baseUrl = 'TrainingManagement/ProgramSession';

    export declare function Create(request: SaveRequest<ProgramSessionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<ProgramSessionRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<ProgramSessionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<ProgramSessionRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "TrainingManagement/ProgramSession/Create",
        Update: "TrainingManagement/ProgramSession/Update",
        Delete: "TrainingManagement/ProgramSession/Delete",
        Retrieve: "TrainingManagement/ProgramSession/Retrieve",
        List: "TrainingManagement/ProgramSession/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>ProgramSessionService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}