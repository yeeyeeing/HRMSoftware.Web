import { Decorators } from '@serenity-is/corelib';
import { GridEditorBase } from "@serenity-is/extensions";
import { PayslipDeductedOneTimeDeductionsColumns, PayslipDeductedOneTimeDeductionsRow, PayslipDeductedOneTimeDeductionsService } from '../../../ServerTypes/PayrollSettings';

@Decorators.registerEditor('HRMSoftware.PayrollSettings.PayslipDeductedOneTimeDeductions')
export class PayslipDeductedOneTimeDeductions extends GridEditorBase<PayslipDeductedOneTimeDeductionsRow, any> {
    protected getColumnsKey() { return PayslipDeductedOneTimeDeductionsColumns.columnsKey; }
    protected getRowDefinition() { return PayslipDeductedOneTimeDeductionsRow; }
    protected getService() { return PayslipDeductedOneTimeDeductionsService.baseUrl; }

 }