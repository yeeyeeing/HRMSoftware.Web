import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeGroupShiftPatternGrid } from './EmployeeGroupShiftPatternGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeGroupShiftPatternGrid($('#GridDiv')).element);
}