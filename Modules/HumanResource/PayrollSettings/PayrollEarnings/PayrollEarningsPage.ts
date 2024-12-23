import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PayrollEarningsEditor } from './PayrollEarningsEditor';

export default function pageInit() {
    initFullHeightGridPage(new PayrollEarningsEditor($('#GridDiv')).element);
}