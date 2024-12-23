import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeGroupGrid } from './EmployeeGroupGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeGroupGrid($('#GridDiv')).element);
}