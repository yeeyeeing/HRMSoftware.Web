import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { CompanySettingsGrid } from './CompanySettingsGrid';

export default function pageInit() {
    initFullHeightGridPage(new CompanySettingsGrid($('#GridDiv')).element);
}