import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MasterCostCentreGrid } from './MasterCostCentreGrid';

export default function pageInit() {
    initFullHeightGridPage(new MasterCostCentreGrid($('#GridDiv')).element);
}