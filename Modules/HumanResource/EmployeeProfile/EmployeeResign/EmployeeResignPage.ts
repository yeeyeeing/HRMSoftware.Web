import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeResignGrid } from './EmployeeResignGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeResignGrid($('#GridDiv')).element);
}