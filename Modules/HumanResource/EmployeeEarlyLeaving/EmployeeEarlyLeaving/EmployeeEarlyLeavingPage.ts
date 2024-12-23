import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeEarlyLeavingGrid } from './EmployeeEarlyLeavingGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeEarlyLeavingGrid($('#GridDiv')).element);
}