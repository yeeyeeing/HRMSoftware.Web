import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AnnualLeavePolicyEditor } from './AnnualLeavePolicyEditor';

export default function pageInit() {
    initFullHeightGridPage(new AnnualLeavePolicyEditor($('#GridDiv')).element);
}