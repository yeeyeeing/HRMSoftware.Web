import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MasterCareerPathGrid } from './MasterCareerPathGrid';

export default function pageInit() {
    initFullHeightGridPage(new MasterCareerPathGrid($('#GridDiv')).element);
}