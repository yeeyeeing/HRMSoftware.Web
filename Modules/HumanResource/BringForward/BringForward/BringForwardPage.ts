import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { BringForwardGrid } from './BringForwardGrid';

export default function pageInit() {
    initFullHeightGridPage(new BringForwardGrid($('#GridDiv')).element);
}