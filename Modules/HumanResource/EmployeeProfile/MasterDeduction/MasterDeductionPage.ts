import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MasterDeductionGrid } from './MasterDeductionGrid';

export default function pageInit() {
    initFullHeightGridPage(new MasterDeductionGrid($('#GridDiv')).element);
}