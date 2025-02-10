import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeIncentiveGrid } from './EmployeeIncentiveGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeIncentiveGrid($('#GridDiv')).element);
}