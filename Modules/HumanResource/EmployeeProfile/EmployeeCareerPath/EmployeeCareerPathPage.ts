import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeCareerPathGrid } from './EmployeeCareerPathGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeCareerPathGrid($('#GridDiv')).element);
}