import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EntitledLeaveGrid } from './EntitledLeaveGrid';

export default function pageInit() {
    initFullHeightGridPage(new EntitledLeaveGrid($('#GridDiv')).element);
}