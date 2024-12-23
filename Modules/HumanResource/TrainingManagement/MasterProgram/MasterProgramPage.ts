import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MasterProgramGrid } from './MasterProgramGrid';

export default function pageInit() {
    initFullHeightGridPage(new MasterProgramGrid($('#GridDiv')).element);
}