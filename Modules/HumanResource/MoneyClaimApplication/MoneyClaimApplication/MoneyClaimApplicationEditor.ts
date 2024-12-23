import { Decorators } from '@serenity-is/corelib';
import { EmployeeAllowanceColumns, EmployeeAllowanceRow } from '../../../ServerTypes/EmployeeProfile';
import { GridEditorBase } from "@serenity-is/extensions";
import { MoneyClaimApplicationColumns, MoneyClaimApplicationRow } from '../../../ServerTypes/MoneyClaimApplication';
import { MoneyClaimApplicationDialog } from './MoneyClaimApplicationDialog';
@Decorators.registerEditor('HRMSoftware.MoneyClaimApplication.MoneyClaimApplicationEditor')
export class MoneyClaimApplicationEditor extends GridEditorBase<MoneyClaimApplicationRow> {
    protected getColumnsKey() { return MoneyClaimApplicationColumns.columnsKey; }
    protected getDialogType() { return MoneyClaimApplicationDialog; }
    protected getLocalTextPrefix() { return MoneyClaimApplicationRow.localTextPrefix; }
    protected getAddButtonCaption() {
        return "Add";
    }

    
}