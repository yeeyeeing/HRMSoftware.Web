import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { ProgramSessionGrid } from './ProgramSessionGrid';

export default function pageInit() {
    initFullHeightGridPage(new ProgramSessionGrid($('#GridDiv')).element);
}