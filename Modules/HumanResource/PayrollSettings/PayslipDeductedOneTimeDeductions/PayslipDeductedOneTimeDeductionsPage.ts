import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PayslipDeductedOneTimeDeductionsGrid } from './PayslipDeductedOneTimeDeductionsGrid';

export default function pageInit() {
    initFullHeightGridPage(new PayslipDeductedOneTimeDeductionsGrid($('#GridDiv')).element);
}