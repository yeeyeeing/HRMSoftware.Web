import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { OTJobGradeTimeRow } from "./OTJobGradeTimeRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace OTJobGradeTimeService {
    export const baseUrl = 'OTJobGradeTime/OTJobGradeTime';

    export declare function Create(request: SaveRequest<OTJobGradeTimeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<OTJobGradeTimeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<OTJobGradeTimeRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<OTJobGradeTimeRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "OTJobGradeTime/OTJobGradeTime/Create",
        Update: "OTJobGradeTime/OTJobGradeTime/Update",
        Delete: "OTJobGradeTime/OTJobGradeTime/Delete",
        Retrieve: "OTJobGradeTime/OTJobGradeTime/Retrieve",
        List: "OTJobGradeTime/OTJobGradeTime/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>OTJobGradeTimeService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}