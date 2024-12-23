import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { ProgramFlowResponseGrid } from './ProgramFlowResponseGrid';

export default function pageInit() {
    initFullHeightGridPage(new ProgramFlowResponseGrid($('#GridDiv')).element);
}