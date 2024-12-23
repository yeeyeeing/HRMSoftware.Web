import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeLateGrid } from './EmployeeLateGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeLateGrid($('#GridDiv')).element);
}