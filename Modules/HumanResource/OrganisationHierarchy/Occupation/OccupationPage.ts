import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { OccupationGrid } from './OccupationGrid';

export default function pageInit() {
    initFullHeightGridPage(new OccupationGrid($('#GridDiv')).element);
}