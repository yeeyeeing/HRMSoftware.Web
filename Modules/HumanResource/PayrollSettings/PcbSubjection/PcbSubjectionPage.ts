import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PcbSubjectionGrid } from './PcbSubjectionGrid';

export default function pageInit() {
    initFullHeightGridPage(new PcbSubjectionGrid($('#GridDiv')).element);
}