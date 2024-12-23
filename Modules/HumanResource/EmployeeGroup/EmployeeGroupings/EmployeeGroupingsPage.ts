import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeGroupingsGrid } from './EmployeeGroupingsGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeGroupingsGrid($('#GridDiv')).element);
}