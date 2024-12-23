import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { ShiftAttendanceRecordGrid } from './ShiftAttendanceRecordGrid';

export default function pageInit() {
    initFullHeightGridPage(new ShiftAttendanceRecordGrid($('#GridDiv')).element);
}