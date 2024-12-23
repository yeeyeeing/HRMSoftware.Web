import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PayslipPaidMoneyClaimingGrid } from './PayslipPaidMoneyClaimingGrid';

export default function pageInit() {
    initFullHeightGridPage(new PayslipPaidMoneyClaimingGrid($('#GridDiv')).element);
}