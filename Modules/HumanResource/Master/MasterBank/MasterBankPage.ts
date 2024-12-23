import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { MasterBankGrid } from './MasterBankGrid';

export default function pageInit() {
    initFullHeightGridPage(new MasterBankGrid($('#GridDiv')).element);
}