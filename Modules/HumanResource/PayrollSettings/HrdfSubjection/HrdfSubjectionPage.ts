import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { HrdfSubjectionGrid } from './HrdfSubjectionGrid';

export default function pageInit() {
    initFullHeightGridPage(new HrdfSubjectionGrid($('#GridDiv')).element);
}