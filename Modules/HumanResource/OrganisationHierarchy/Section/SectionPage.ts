import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { SectionGrid } from './SectionGrid';

export default function pageInit() {
    initFullHeightGridPage(new SectionGrid($('#GridDiv')).element);
}