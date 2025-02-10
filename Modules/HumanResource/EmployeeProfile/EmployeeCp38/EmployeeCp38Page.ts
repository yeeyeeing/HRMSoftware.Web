import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeCp38Editor } from './EmployeeCp38Editor';
import { EmployeeCp38Grid } from './EmployeeCp38Grid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeCp38Grid($('#GridDiv')).element);
}