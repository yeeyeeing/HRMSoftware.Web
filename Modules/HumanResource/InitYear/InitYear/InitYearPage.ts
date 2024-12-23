import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { InitYearGrid } from './InitYearGrid';

export default function pageInit() {
    initFullHeightGridPage(new InitYearGrid($('#GridDiv')).element);
}