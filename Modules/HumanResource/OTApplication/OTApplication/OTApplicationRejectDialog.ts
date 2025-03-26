import {  Decorators, EditorUtils, EntityDialog, ListResponse } from '@serenity-is/corelib';
import { LeaveApplicationForm, LeaveApplicationRejectForm, LeaveApplicationRow, LeaveApplicationService, LeaveStatus, LeaveTypes, MoneyClaimApplicationRejectForm, OTApplicationRejectForm } from '../../../ServerTypes/LeaveApplication';
import { InitYearService } from '../../../ServerTypes/InitYear';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { AnnualLeavePolicyService } from '../../../ServerTypes/AnnualLeavePolicy';
import { SickLeavePolicyService } from '../../../ServerTypes/SickLeavePolicy';
import { serviceCall, RetrieveResponse, alertDialog, isEmptyOrNull, Authorization, getLookup, confirm } from '@serenity-is/corelib/q';
import { EntitledLeaveService } from '../../../ServerTypes/EntitledLeave';
import { PublicHolidayService } from '../../../ServerTypes/PublicHoliday';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { EmployeeBasicDataDialog } from '../../EmployeeBasicData/EmployeeBasicData/EmployeeBasicDataDialog';
import { NoPaidLeaveService, PayrollService } from '../../../ServerTypes/PayrollSettings';
import { OrganisationChartService } from '../../../ServerTypes/OrganisationChart';
import { MoneyClaimApplicationRejectRow, MoneyClaimApplicationService } from '../../../ServerTypes/MoneyClaimApplication';
import { OTApplicationRejectRow, OTApplicationService } from '../../../ServerTypes/OTApplication';

@Decorators.registerClass('HRMSoftware.OTApplication.OTApplicationRejectDialog')
export class OTApplicationRejectDialog extends EntityDialog<OTApplicationRejectRow, any> {
    protected getFormKey() { return OTApplicationRejectForm.formKey; }
    protected getRowDefinition() { return OTApplicationRejectRow; }
    protected getService() { return OTApplicationService.baseUrl; }
    protected form = new OTApplicationRejectForm(this.idPrefix);
    constructor() {
        super();
        //this.deleteButton.remove();
        this.cloneButton.remove();
     
    }
    protected onDialogOpen() {
        super.onDialogOpen()
        this.undeleteButton.remove()
        this.applyChangesButton.remove()
        this.deleteButton.remove()
        this.localizationButton.remove()

    }
    protected save_submitHandler(response) {
        window["rejectReason"] = this.form.RejectReason.value
        this.dialogClose()
    }
}