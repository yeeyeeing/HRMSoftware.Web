import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { JobGradeRow } from "./JobGradeRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace JobGradeService {
    export const baseUrl = 'OrganisationHierarchy/JobGrade';

    export declare function Create(request: SaveRequest<JobGradeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<JobGradeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<JobGradeRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<JobGradeRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "OrganisationHierarchy/JobGrade/Create",
        Update: "OrganisationHierarchy/JobGrade/Update",
        Delete: "OrganisationHierarchy/JobGrade/Delete",
        Retrieve: "OrganisationHierarchy/JobGrade/Retrieve",
        List: "OrganisationHierarchy/JobGrade/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>JobGradeService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}