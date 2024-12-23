import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MoneyClaimApplicationGrid } from './MoneyClaimApplicationGrid';

export default function pageInit() {
    initFullHeightGridPage(new MoneyClaimApplicationGrid($('#GridDiv')).element);
}