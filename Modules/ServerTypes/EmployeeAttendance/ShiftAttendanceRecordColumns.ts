import { ShiftTimeToHours } from "@/HumanResource/EmployeeAttendance/ShiftAttendanceRecord/ShiftTimeToHours";
import { StatusFormatter } from "@/HumanResource/PayrollSettings/NoPaidLeave/StatusFormatter";

export class ShiftAttendanceRecordColumns {
    static columnsKey = 'EmployeeAttendance.ShiftAttendanceRecord';
}

[ShiftTimeToHours, StatusFormatter]; // referenced types