import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { DivisionGrid } from './DivisionGrid';

export default function pageInit() {
    initFullHeightGridPage(new DivisionGrid($('#GridDiv')).element);
}