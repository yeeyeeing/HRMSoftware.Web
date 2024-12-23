import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EisSubjectionGrid } from './EisSubjectionGrid';

export default function pageInit() {
    initFullHeightGridPage(new EisSubjectionGrid($('#GridDiv')).element);
}