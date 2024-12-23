import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { EmployeeProfileRow } from "./EmployeeProfileRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace EmployeeProfileService {
    export const baseUrl = 'EmployeeProfile/EmployeeProfile';

    export declare function Create(request: SaveRequest<EmployeeProfileRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<EmployeeProfileRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeProfileRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeProfileRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function EmployeeProfileBasedOnID(request: number, onSuccess?: (response: ListResponse<EmployeeProfileRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function CalculateWorkingHourAndDay(request: number, onSuccess?: (response: ListResponse<EmployeeProfileRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "EmployeeProfile/EmployeeProfile/Create",
        Update: "EmployeeProfile/EmployeeProfile/Update",
        Delete: "EmployeeProfile/EmployeeProfile/Delete",
        Retrieve: "EmployeeProfile/EmployeeProfile/Retrieve",
        List: "EmployeeProfile/EmployeeProfile/List",
        EmployeeProfileBasedOnID: "EmployeeProfile/EmployeeProfile/EmployeeProfileBasedOnID",
        CalculateWorkingHourAndDay: "EmployeeProfile/EmployeeProfile/CalculateWorkingHourAndDay"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'EmployeeProfileBasedOnID', 
        'CalculateWorkingHourAndDay'
    ].forEach(x => {
        (<any>EmployeeProfileService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}