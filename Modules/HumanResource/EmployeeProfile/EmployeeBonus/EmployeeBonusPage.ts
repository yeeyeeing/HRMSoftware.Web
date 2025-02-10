import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployeeBonusGrid } from './EmployeeBonusGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployeeBonusGrid($('#GridDiv')).element);
}