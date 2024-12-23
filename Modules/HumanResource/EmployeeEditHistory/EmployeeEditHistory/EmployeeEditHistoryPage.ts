import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeEditHistoryGrid } from './EmployeeEditHistoryGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeEditHistoryGrid($('#GridDiv')).element);
}