import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MasterCountryGrid } from './MasterCountryGrid';

export default function pageInit() {
    initFullHeightGridPage(new MasterCountryGrid($('#GridDiv')).element);
}