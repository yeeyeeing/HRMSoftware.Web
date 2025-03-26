import {  Decorators, EditorUtils, EntityDialog, ListResponse } from '@serenity-is/corelib';
import { LeaveApplicationForm, LeaveApplicationRejectForm, LeaveApplicationRow, LeaveApplicationService, LeaveStatus, LeaveTypes } from '../../../ServerTypes/LeaveApplication';
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

@Decorators.registerClass('HRMSoftware.LeaveApplication.LeaveApplicationRejectDialog')
export class LeaveApplicationRejectDialog extends EntityDialog<LeaveApplicationRow, any> {
    protected getFormKey() { return LeaveApplicationRejectForm.formKey; }
    protected getRowDefinition() { return LeaveApplicationRow; }
    protected getService() { return LeaveApplicationService.baseUrl; }
    protected form = new LeaveApplicationRejectForm(this.idPrefix);
    constructor() {
        super();
        //this.deleteButton.remove();
        this.cloneButton.remove();
       var self = this
       // EditorUtils.setReadonly(this.form.LeaveTaken.element, true);
        /*
        EmployeeProfileService.List({
        }, response => {
            var TodayDate = new Date()
            for (var index in response.Entities) {
                if (response.Entities[index].Id == Authorization.userDefinition.EmployeeRowID) {
                    if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources] === undefined) // if not hr guy
                    {
                        self.EmployeeRowId = response.Entities[index].Id.toString()
                        self.EmployeeName = response.Entities[index].EmployeeName.toString()
                    }
                    var RecruitmentDate = new Date(response.Entities[index].RecruitmentDate)
                    this.RecruitmentDate = response.Entities[index].RecruitmentDate
                    var ProbationEndDate =
                        new Date(response.Entities[index].RecruitmentDate);
                    ProbationEndDate.setMonth(RecruitmentDate.getMonth() + response.Entities[index].ProbationPeriod)
                    var YearOfService = TodayDate.getFullYear() - RecruitmentDate.getFullYear()
                    this.YearOfService = YearOfService
                    this.PolicyUpdateDate = new Date(response.Entities[index].RecruitmentDate)
                    this.PolicyUpdateDate.setFullYear(RecruitmentDate.getFullYear() + YearOfService);
                    this.NextPolicyUpdateDate = new Date(response.Entities[index].RecruitmentDate);
                    this.NextPolicyUpdateDate.setFullYear(RecruitmentDate.getFullYear() + YearOfService + 1);
                    break
                }
            }
        });
        
        PublicHolidayService.List({
        }, response => {

            for (var index in response.Entities) {
                var date = new Date(response.Entities[index].Date.substring(0,10))
                this.PublicHolidayDateList.push(date)
                this.PublicHolidayEventList.push(response.Entities[index].Name)
            }

        });
        */
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