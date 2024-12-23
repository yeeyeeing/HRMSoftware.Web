import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { NoPaidLeaveGrid } from './NoPaidLeaveGrid';

export default function pageInit() {
    initFullHeightGridPage(new NoPaidLeaveGrid($('#GridDiv')).element);
}