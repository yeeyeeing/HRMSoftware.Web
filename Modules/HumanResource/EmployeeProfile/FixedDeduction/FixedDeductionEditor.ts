import { Decorators } from '@serenity-is/corelib';
import {FixedDeductionColumns, FixedDeductionRow } from '../../../ServerTypes/EmployeeProfile';

import { GridEditorBase } from "@serenity-is/extensions";
import { FixedDeductionEditDialog } from './FixedDeductionEditDialog';
@Decorators.registerEditor('HRMSoftware.EmployeeProfile.FixedDeductionEditor')
export class FixedDeductionEditor extends GridEditorBase<FixedDeductionRow> {
    protected getColumnsKey() { return FixedDeductionColumns.columnsKey; }
    protected getDialogType() { return FixedDeductionEditDialog; }
    protected getLocalTextPrefix() { return FixedDeductionRow.localTextPrefix; }
    protected getAddButtonCaption() {
        return "Add";
    }
    validateEntity(row, id) {
        return true;
    }
}