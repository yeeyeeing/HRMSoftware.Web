import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AnnualLeaveJobGradePolicyEditor } from './AnnualLeaveJobGradePolicyEditor';

export default function pageInit() {
    initFullHeightGridPage(new AnnualLeaveJobGradePolicyEditor($('#GridDiv')).element);
}