import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { CompanyProfileGrid } from './CompanyProfileGrid';

export default function pageInit() {
    initFullHeightGridPage(new CompanyProfileGrid($('#GridDiv')).element);
}