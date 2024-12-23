import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { OTApplicationRow } from "./OTApplicationRow";
import { ServiceOptions, serviceRequest } from "@serenity-is/corelib/q";

export namespace OTApplicationService {
    export const baseUrl = 'OTApplication/OTApplication';

    export declare function Create(request: SaveRequest<OTApplicationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<OTApplicationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<OTApplicationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<OTApplicationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function CalculateOtFlatRate(request: number, onSuccess?: (response: ListResponse<OTApplicationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function CalculateOtPay(request: number, onSuccess?: (response: ListResponse<OTApplicationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function EmployeeOTBasedOnID(request: number, onSuccess?: (response: ListResponse<OTApplicationRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "OTApplication/OTApplication/Create",
        Update: "OTApplication/OTApplication/Update",
        Delete: "OTApplication/OTApplication/Delete",
        Retrieve: "OTApplication/OTApplication/Retrieve",
        List: "OTApplication/OTApplication/List",
        CalculateOtFlatRate: "OTApplication/OTApplication/CalculateOtFlatRate",
        CalculateOtPay: "OTApplication/OTApplication/CalculateOtPay",
        EmployeeOTBasedOnID: "OTApplication/OTApplication/EmployeeOTBasedOnID"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'CalculateOtFlatRate', 
        'CalculateOtPay', 
        'EmployeeOTBasedOnID'
    ].forEach(x => {
        (<any>OTApplicationService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}