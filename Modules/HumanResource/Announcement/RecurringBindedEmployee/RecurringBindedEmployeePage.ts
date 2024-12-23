import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { RecurringBindedEmployeeGrid } from './RecurringBindedEmployeeGrid';

export default function pageInit() {
    initFullHeightGridPage(new RecurringBindedEmployeeGrid($('#GridDiv')).element);
}