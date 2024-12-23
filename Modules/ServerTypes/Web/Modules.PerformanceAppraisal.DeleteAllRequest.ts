import { ServiceRequest } from "@serenity-is/corelib";

export interface DeleteAllRequest extends ServiceRequest {
    RecordIds?: number[];
}