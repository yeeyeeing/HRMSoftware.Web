import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { OTJobGradeTimeEditor } from './OTJobGradeTimeEditor';
import { OTJobGradeTimeGrid } from './OTJobGradeTimeGrid';

export default function pageInit() {
    initFullHeightGridPage(new OTJobGradeTimeEditor($('#GridDiv')).element);
}