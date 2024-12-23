import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeBasicDataGrid } from './EmployeeBasicDataGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeBasicDataGrid($('#GridDiv')).element);
}