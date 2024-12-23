import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { RecurringAnnouncementRow } from "./RecurringAnnouncementRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace RecurringAnnouncementService {
    export const baseUrl = 'Announcement/RecurringAnnouncement';

    export declare function Create(request: SaveRequest<RecurringAnnouncementRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<RecurringAnnouncementRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<RecurringAnnouncementRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<RecurringAnnouncementRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Announcement/RecurringAnnouncement/Create",
        Update: "Announcement/RecurringAnnouncement/Update",
        Delete: "Announcement/RecurringAnnouncement/Delete",
        Retrieve: "Announcement/RecurringAnnouncement/Retrieve",
        List: "Announcement/RecurringAnnouncement/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>RecurringAnnouncementService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}