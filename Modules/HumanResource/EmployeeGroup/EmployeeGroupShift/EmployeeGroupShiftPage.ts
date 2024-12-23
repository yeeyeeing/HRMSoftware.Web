import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeGroupShiftGrid } from './EmployeeGroupShiftGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeGroupShiftGrid($('#GridDiv')).element);
}