import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { SickLeavePolicyEditor } from './SickLeavePolicyEditor';

export default function pageInit() {
    initFullHeightGridPage(new SickLeavePolicyEditor($('#GridDiv')).element);
}