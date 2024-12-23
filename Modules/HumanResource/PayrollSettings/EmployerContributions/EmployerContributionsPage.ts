import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { EmployerContributionsGrid } from './EmployerContributionsGrid';

export default function pageInit() {
    initFullHeightGridPage(new EmployerContributionsEditor($('#GridDiv')).element);
}