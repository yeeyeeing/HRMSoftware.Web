import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EpfSubjectionGrid } from './EpfSubjectionGrid';

export default function pageInit() {
    initFullHeightGridPage(new EpfSubjectionGrid($('#GridDiv')).element);
}