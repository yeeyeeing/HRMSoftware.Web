import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { FixedDeductionEditor } from './FixedDeductionEditor';

export default function pageInit() {
    initFullHeightGridPage(new FixedDeductionEditor($('#GridDiv')).element);
}