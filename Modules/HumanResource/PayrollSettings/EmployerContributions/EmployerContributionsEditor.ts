import { Decorators } from '@serenity-is/corelib';
import { GridEditorBase } from "@serenity-is/extensions";
import { EmployerContributionsColumns, EmployerContributionsRow } from '../../../ServerTypes/PayrollSettings';
import { EmployerContributionsEditDialog } from './EmployerContributionsEditDialog';
@Decorators.registerEditor('HRMSoftware.PayrollSettings.EmployerContributionsEditor')
export class EmployerContributionsEditor extends GridEditorBase<EmployerContributionsRow> {
    protected getColumnsKey() { return EmployerContributionsColumns.columnsKey; }
    protected getDialogType() { return EmployerContributionsEditDialog; }
    protected getLocalTextPrefix() { return EmployerContributionsRow.localTextPrefix; }
    protected getAddButtonCaption() {
        
        return "Add";
    }
    validateEntity(row, id) {
        return true;
    }
}