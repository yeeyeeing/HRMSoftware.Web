import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { AnnouncementSectionBindedRow } from "./AnnouncementSectionBindedRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace AnnouncementSectionBindedService {
    export const baseUrl = 'Announcement/AnnouncementSectionBinded';

    export declare function Create(request: SaveRequest<AnnouncementSectionBindedRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<AnnouncementSectionBindedRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<AnnouncementSectionBindedRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<AnnouncementSectionBindedRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Announcement/AnnouncementSectionBinded/Create",
        Update: "Announcement/AnnouncementSectionBinded/Update",
        Delete: "Announcement/AnnouncementSectionBinded/Delete",
        Retrieve: "Announcement/AnnouncementSectionBinded/Retrieve",
        List: "Announcement/AnnouncementSectionBinded/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>AnnouncementSectionBindedService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}