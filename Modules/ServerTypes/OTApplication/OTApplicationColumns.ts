import { OTApplicationStatus } from "./OTApplicationStatus";
import { ApplicationStatusFormatter } from "@/HumanResource/OTApplication/OTApplication/ApplicationStatusFormatter";

export class OTApplicationColumns {
    static columnsKey = 'OTApplication.OTApplication';
}

[OTApplicationStatus, ApplicationStatusFormatter]; // referenced types