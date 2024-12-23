import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { AnnouncementOccupationBindedRow } from "./AnnouncementOccupationBindedRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace AnnouncementOccupationBindedService {
    export const baseUrl = 'Announcement/AnnouncementOccupationBinded';

    export declare function Create(request: SaveRequest<AnnouncementOccupationBindedRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<AnnouncementOccupationBindedRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<AnnouncementOccupationBindedRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<AnnouncementOccupationBindedRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Announcement/AnnouncementOccupationBinded/Create",
        Update: "Announcement/AnnouncementOccupationBinded/Update",
        Delete: "Announcement/AnnouncementOccupationBinded/Delete",
        Retrieve: "Announcement/AnnouncementOccupationBinded/Retrieve",
        List: "Announcement/AnnouncementOccupationBinded/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>AnnouncementOccupationBindedService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}