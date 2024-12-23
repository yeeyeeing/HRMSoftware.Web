import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeAllowanceEditor } from './EmployeeAllowanceEditor';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeAllowanceEditor($('#GridDiv')).element);
}