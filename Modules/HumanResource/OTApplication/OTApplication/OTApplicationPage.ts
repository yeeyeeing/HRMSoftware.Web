import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { OTApplicationGrid } from './OTApplicationGrid';

export default function pageInit() {
    initFullHeightGridPage(new OTApplicationGrid($('#GridDiv')).element);
}