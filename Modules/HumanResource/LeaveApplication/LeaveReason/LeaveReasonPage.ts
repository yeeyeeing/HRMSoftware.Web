import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { LeaveReasonGrid } from './LeaveReasonGrid';

export default function pageInit() {
    initFullHeightGridPage(new LeaveReasonGrid($('#GridDiv')).element);
}