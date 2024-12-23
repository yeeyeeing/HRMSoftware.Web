import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PayslipPaidOneTimeAllowanceGrid } from './PayslipPaidOneTimeAllowanceGrid';

export default function pageInit() {
    initFullHeightGridPage(new PayslipPaidOneTimeAllowanceGrid($('#GridDiv')).element);
}