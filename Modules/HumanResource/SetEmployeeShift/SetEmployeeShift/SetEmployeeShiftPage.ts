import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { SetEmployeeShiftGrid } from './SetEmployeeShiftGrid';

export default function pageInit() {
    initFullHeightGridPage(new SetEmployeeShiftGrid($('#GridDiv')).element);
}