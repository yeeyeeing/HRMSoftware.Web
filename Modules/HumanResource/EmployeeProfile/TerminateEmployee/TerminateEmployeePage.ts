import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { TerminateEmployeeGrid } from './TerminateEmployeeGrid';

export default function pageInit() {
    initFullHeightGridPage(new TerminateEmployeeGrid($('#GridDiv')).element);
}