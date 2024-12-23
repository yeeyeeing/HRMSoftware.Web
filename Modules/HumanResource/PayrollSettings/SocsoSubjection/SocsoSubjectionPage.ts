import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { SocsoSubjectionGrid } from './SocsoSubjectionGrid';

export default function pageInit() {
    initFullHeightGridPage(new SocsoSubjectionGrid($('#GridDiv')).element);
}