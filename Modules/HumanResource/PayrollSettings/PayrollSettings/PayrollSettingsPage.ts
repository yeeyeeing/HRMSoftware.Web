import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PayrollSettingsGrid } from './PayrollSettingsGrid';

export default function pageInit() {
    initFullHeightGridPage(new PayrollSettingsGrid($('#GridDiv')).element);
}