import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { JobGradeGrid } from './JobGradeGrid';

export default function pageInit() {
    initFullHeightGridPage(new JobGradeGrid($('#GridDiv')).element);
}