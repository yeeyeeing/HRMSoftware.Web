import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PayrollGeneratingWizardGrid } from './PayrollGeneratingWizardGrid';

export default function pageInit() {
    initFullHeightGridPage(new PayrollGeneratingWizardGrid($('#GridDiv')).element);
}