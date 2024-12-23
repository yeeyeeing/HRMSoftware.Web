import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MasterCityGrid } from './MasterCityGrid';

export default function pageInit() {
    initFullHeightGridPage(new MasterCityGrid($('#GridDiv')).element);
}