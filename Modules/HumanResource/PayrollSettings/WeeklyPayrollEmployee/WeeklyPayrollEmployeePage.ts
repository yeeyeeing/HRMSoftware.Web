import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { WeeklyPayrollEmployeeGrid } from './WeeklyPayrollEmployeeGrid';

export default function pageInit() {
    initFullHeightGridPage(new WeeklyPayrollEmployeeGrid($('#GridDiv')).element);
}