import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MasterPostcodeGrid } from './MasterPostcodeGrid';

export default function pageInit() {
    initFullHeightGridPage(new MasterPostcodeGrid($('#GridDiv')).element);
}