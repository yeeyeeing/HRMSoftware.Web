import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AttendanceListGrid } from './AttendanceListGrid';

export default function pageInit() {
    initFullHeightGridPage(new AttendanceListGrid($('#GridDiv')).element);
}