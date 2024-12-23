import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { PublicHolidayRow } from "./PublicHolidayRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace PublicHolidayService {
    export const baseUrl = 'PublicHoliday/PublicHoliday';

    export declare function Create(request: SaveRequest<PublicHolidayRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<PublicHolidayRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PublicHolidayRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PublicHolidayRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function ListPublicHoliday(request: ServiceRequest, onSuccess?: (response: ListResponse<PublicHolidayRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "PublicHoliday/PublicHoliday/Create",
        Update: "PublicHoliday/PublicHoliday/Update",
        Delete: "PublicHoliday/PublicHoliday/Delete",
        Retrieve: "PublicHoliday/PublicHoliday/Retrieve",
        List: "PublicHoliday/PublicHoliday/List",
        ListPublicHoliday: "PublicHoliday/PublicHoliday/ListPublicHoliday"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'ListPublicHoliday'
    ].forEach(x => {
        (<any>PublicHolidayService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}