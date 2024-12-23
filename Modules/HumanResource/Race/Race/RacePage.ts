import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { RaceGrid } from './RaceGrid';

export default function pageInit() {
    initFullHeightGridPage(new RaceGrid($('#GridDiv')).element);
}