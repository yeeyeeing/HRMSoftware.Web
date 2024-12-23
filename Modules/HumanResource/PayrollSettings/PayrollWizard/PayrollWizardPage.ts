import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PayrollWizardGrid } from './PayrollWizardGrid';

export default function pageInit() {
    initFullHeightGridPage(new PayrollWizardGrid($('#GridDiv')).element);
}