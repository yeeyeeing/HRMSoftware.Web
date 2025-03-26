import { OtMinuteOtHourFormatter } from "@/HumanResource/OTApplication/OTApplication/OtMinuteOtHourFormatter";
import { OTApplicationStatus } from "./OTApplicationStatus";
import { ApplicationStatusFormatter } from "@/HumanResource/OTApplication/OTApplication/ApplicationStatusFormatter";

export class OTApplicationColumns {
    static columnsKey = 'OTApplication.OTApplication';
}

[OtMinuteOtHourFormatter, OTApplicationStatus, ApplicationStatusFormatter]; // referenced types