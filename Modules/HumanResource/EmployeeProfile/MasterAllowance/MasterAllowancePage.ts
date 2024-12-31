import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MasterAllowanceGrid } from './MasterAllowanceGrid';

export default function pageInit() {
    initFullHeightGridPage(new MasterAllowanceGrid($('#GridDiv')).element);
}