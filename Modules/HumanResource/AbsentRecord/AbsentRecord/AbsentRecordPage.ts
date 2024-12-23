import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { AbsentRecordGrid } from './AbsentRecordGrid';

export default function pageInit() {
    initFullHeightGridPage(new AbsentRecordGrid($('#GridDiv')).element);
}