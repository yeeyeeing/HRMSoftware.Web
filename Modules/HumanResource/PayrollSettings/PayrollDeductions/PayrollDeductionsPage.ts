import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PayrollDeductionsEditor } from './PayrollDeductionsEditor';

export default function pageInit() {
    initFullHeightGridPage(new PayrollDeductionsEditor($('#GridDiv')).element);
}