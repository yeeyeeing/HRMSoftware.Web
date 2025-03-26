import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { WeeklyPayrollSettingsGrid } from './WeeklyPayrollSettingsGrid';

export default function pageInit() {
    initFullHeightGridPage(new WeeklyPayrollSettingsGrid($('#GridDiv')).element);
}