import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MasterCp8dGrid } from './MasterCp8dGrid';

export default function pageInit() {
    initFullHeightGridPage(new MasterCp8dGrid($('#GridDiv')).element);
}