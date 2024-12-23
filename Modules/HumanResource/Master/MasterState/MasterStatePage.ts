import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MasterStateGrid } from './MasterStateGrid';

export default function pageInit() {
    initFullHeightGridPage(new MasterStateGrid($('#GridDiv')).element);
}