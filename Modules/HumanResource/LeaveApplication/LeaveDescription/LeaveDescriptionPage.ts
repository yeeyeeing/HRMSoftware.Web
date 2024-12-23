import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { LeaveDescriptionGrid } from './LeaveDescriptionGrid';

export default function pageInit() {
    initFullHeightGridPage(new LeaveDescriptionGrid($('#GridDiv')).element);
}