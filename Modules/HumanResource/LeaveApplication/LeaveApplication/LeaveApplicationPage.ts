import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { LeaveApplicationGrid } from './LeaveApplicationGrid';

export default function pageInit() {
    initFullHeightGridPage(new LeaveApplicationGrid($('#GridDiv')).element);
}