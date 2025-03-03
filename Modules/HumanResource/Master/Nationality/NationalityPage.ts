import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { NationalityGrid } from './NationalityGrid';

export default function pageInit() {
    initFullHeightGridPage(new NationalityGrid($('#GridDiv')).element);
}