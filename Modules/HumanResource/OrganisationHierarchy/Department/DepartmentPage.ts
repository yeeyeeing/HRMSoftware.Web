import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { DepartmentGrid } from './DepartmentGrid';

export default function pageInit() {
    initFullHeightGridPage(new DepartmentGrid($('#GridDiv')).element);
}