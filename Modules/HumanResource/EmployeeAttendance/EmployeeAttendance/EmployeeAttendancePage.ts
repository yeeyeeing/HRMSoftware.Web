import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeAttendanceGrid } from './EmployeeAttendanceGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeAttendanceGrid($('#GridDiv')).element);
}