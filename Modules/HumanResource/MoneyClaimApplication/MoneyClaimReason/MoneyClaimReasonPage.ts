import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MoneyClaimReasonGrid } from './MoneyClaimReasonGrid';

export default function pageInit() {
    initFullHeightGridPage(new MoneyClaimReasonGrid($('#GridDiv')).element);
}