import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { MasterProgramRow } from "./MasterProgramRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace MasterProgramService {
    export const baseUrl = 'TrainingManagement/MasterProgram';

    export declare function Create(request: SaveRequest<MasterProgramRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<MasterProgramRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<MasterProgramRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<MasterProgramRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "TrainingManagement/MasterProgram/Create",
        Update: "TrainingManagement/MasterProgram/Update",
        Delete: "TrainingManagement/MasterProgram/Delete",
        Retrieve: "TrainingManagement/MasterProgram/Retrieve",
        List: "TrainingManagement/MasterProgram/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>MasterProgramService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}