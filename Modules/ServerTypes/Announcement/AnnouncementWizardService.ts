import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { AnnouncementWizardRow } from "./AnnouncementWizardRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace AnnouncementWizardService {
    export const baseUrl = 'Announcement/AnnouncementWizard';

    export declare function Create(request: SaveRequest<AnnouncementWizardRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<AnnouncementWizardRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<AnnouncementWizardRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<AnnouncementWizardRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function GetTodayDateTime(request: ServiceRequest, onSuccess?: (response: string) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Announcement/AnnouncementWizard/Create",
        Update: "Announcement/AnnouncementWizard/Update",
        Delete: "Announcement/AnnouncementWizard/Delete",
        Retrieve: "Announcement/AnnouncementWizard/Retrieve",
        List: "Announcement/AnnouncementWizard/List",
        GetTodayDateTime: "Announcement/AnnouncementWizard/GetTodayDateTime"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'GetTodayDateTime'
    ].forEach(x => {
        (<any>AnnouncementWizardService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}