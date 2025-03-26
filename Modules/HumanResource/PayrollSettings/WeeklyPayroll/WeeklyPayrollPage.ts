import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { WeeklyPayrollGrid } from './WeeklyPayrollGrid';

export default function pageInit() {
    initFullHeightGridPage(new WeeklyPayrollGrid($('#GridDiv')).element);
}