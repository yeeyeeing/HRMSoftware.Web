import { SaveRequest, SaveResponse, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse } from "@serenity-is/corelib";
import { MasterBankRow } from "./MasterBankRow";
import { ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib/q";

export namespace MasterBankService {
    export const baseUrl = 'Master/MasterBank';

    export declare function Create(request: SaveRequest<MasterBankRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<MasterBankRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<MasterBankRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<MasterBankRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function BankList(request: ServiceRequest, onSuccess?: (response: ListResponse<MasterBankRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "Master/MasterBank/Create",
        Update: "Master/MasterBank/Update",
        Delete: "Master/MasterBank/Delete",
        Retrieve: "Master/MasterBank/Retrieve",
        List: "Master/MasterBank/List",
        BankList: "Master/MasterBank/BankList"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List', 
        'BankList'
    ].forEach(x => {
        (<any>MasterBankService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}