import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { OTReasonGrid } from './OTReasonGrid';

export default function pageInit() {
    initFullHeightGridPage(new OTReasonGrid($('#GridDiv')).element);
}