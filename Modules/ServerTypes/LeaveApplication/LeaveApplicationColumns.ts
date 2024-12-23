import { LeaveTypes } from "./LeaveTypes";
import { ApplicationStatusFormatter } from "@/HumanResource/OTApplication/OTApplication/ApplicationStatusFormatter";
import { LeaveStatus } from "./LeaveStatus";

export class LeaveApplicationColumns {
    static columnsKey = 'LeaveApplication.LeaveApplication';
}

[LeaveTypes, ApplicationStatusFormatter, LeaveStatus]; // referenced types