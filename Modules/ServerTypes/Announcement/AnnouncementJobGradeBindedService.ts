import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { AnnouncementJobGradeBindedRow } from "./AnnouncementJobGradeBindedRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace AnnouncementJobGradeBindedService {
    export const baseUrl = 'Announcement/AnnouncementJobGradeBinded';

    export declare function Create(request: SaveRequest<AnnouncementJobGradeBindedRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<AnnouncementJobGradeBindedRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<AnnouncementJobGradeBindedRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<AnnouncementJobGradeBindedRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Announcement/AnnouncementJobGradeBinded/Create",
        Update: "Announcement/AnnouncementJobGradeBinded/Update",
        Delete: "Announcement/AnnouncementJobGradeBinded/Delete",
        Retrieve: "Announcement/AnnouncementJobGradeBinded/Retrieve",
        List: "Announcement/AnnouncementJobGradeBinded/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>AnnouncementJobGradeBindedService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}