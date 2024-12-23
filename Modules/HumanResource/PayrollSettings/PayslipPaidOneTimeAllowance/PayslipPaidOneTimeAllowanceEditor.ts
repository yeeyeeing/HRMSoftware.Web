import { Decorators } from '@serenity-is/corelib';
import { GridEditorBase } from "@serenity-is/extensions";
import { PayslipPaidOneTimeAllowanceColumns, PayslipPaidOneTimeAllowanceRow, PayslipPaidOneTimeAllowanceService } from '../../../ServerTypes/PayrollSettings';

@Decorators.registerEditor('HRMSoftware.PayrollSettings.PayslipPaidOneTimeAllowance')
export class PayslipPaidOneTimeAllowance extends GridEditorBase<PayslipPaidOneTimeAllowanceRow, any> {
    protected getColumnsKey() { return PayslipPaidOneTimeAllowanceColumns.columnsKey; }
    protected getRowDefinition() { return PayslipPaidOneTimeAllowanceRow; }
    protected getService() { return PayslipPaidOneTimeAllowanceService.baseUrl; }

 }