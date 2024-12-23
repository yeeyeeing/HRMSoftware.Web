import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { AnnouncementGeneratedRow } from "./AnnouncementGeneratedRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace AnnouncementGeneratedService {
    export const baseUrl = 'Announcement/AnnouncementGenerated';

    export declare function Create(request: SaveRequest<AnnouncementGeneratedRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<AnnouncementGeneratedRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<AnnouncementGeneratedRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<AnnouncementGeneratedRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Announcement/AnnouncementGenerated/Create",
        Update: "Announcement/AnnouncementGenerated/Update",
        Delete: "Announcement/AnnouncementGenerated/Delete",
        Retrieve: "Announcement/AnnouncementGenerated/Retrieve",
        List: "Announcement/AnnouncementGenerated/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>AnnouncementGeneratedService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}