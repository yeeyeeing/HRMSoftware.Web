import { Decorators, EditorUtils, EntityDialog, RetrieveResponse, Select2Editor } from '@serenity-is/corelib';
import { MoneyClaimApplicationForm, MoneyClaimApplicationRow, MoneyClaimApplicationService, MoneyClaimingStatus } from '../../../ServerTypes/MoneyClaimApplication';
import { Authorization, isEmptyOrNull, getLookup, confirm } from '@serenity-is/corelib/q';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { serviceCall, ListResponse } from '@serenity-is/corelib/q';
import { EisSubjectionService, EmployerContributionsRow, EpfSubjectionService, HrdfSubjectionService, NoPaidLeaveRow, NoPaidLeaveService, PayrollDeductionsRow, PayrollEarningsRow, PayrollForm, PayrollRow, PayrollService, PcbSubjectionService, SocsoSubjectionService } from '../../../ServerTypes/PayrollSettings';

import { EmployeeBasicDataDialog } from '../../EmployeeBasicData/EmployeeBasicData/EmployeeBasicDataDialog';
import { OrganisationChartService } from '../../../ServerTypes/OrganisationChart';
export interface Subjection {
    id: number;
    name: string;
    subjection: number;
}
@Decorators.registerClass('HRMSoftware.MoneyClaimApplication.MoneyClaimApplicationDialog')
export class MoneyClaimApplicationDialog extends EntityDialog<MoneyClaimApplicationRow, any> {
    protected getFormKey() { return MoneyClaimApplicationForm.formKey; }
    protected getRowDefinition() { return MoneyClaimApplicationRow; }
    protected getService() { return MoneyClaimApplicationService.baseUrl; }
    public ListOfEpfSubjection: Subjection[] = [];
    public ListOfCriteria: string[] = [];          
    public EmployeeApproval: number;
    public HrApproval: number;

    public SuperiorPermission: boolean;

    public ListOfEisSubjection: Subjection[] = [];
    public ListOfHrdfSubjection: Subjection[] = [];
    public ListOfSocsoSubjection: Subjection[] = [];
    public ListOfPcbSubjection: Subjection[] = [];
    protected form = new MoneyClaimApplicationForm(this.idPrefix);
    constructor() {
        super();
        var self = this;
        PcbSubjectionService.List({
        }, response => {
            for (var index in response.Entities) {
                if (response.Entities[index].IsActive == 1) {
                    var dict = response.Entities[index]
                    var keys = Object.keys(dict);
                    for (var j = 0; j < keys.length; j++) {
                        var key = keys[j];
                        if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                            continue
                        if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                            continue
                        var NewKey = key.replace(/([A-Z])/g, ' $1').trim();
                        // Access each key here
                        this.ListOfPcbSubjection.push({
                            id: j,
                            name: NewKey,
                            subjection: dict[key],
                        })
                    }
                    break
                }
            }
            EpfSubjectionService.List({
            }, response => {
                for (var index in response.Entities) {
                    if (response.Entities[index].IsActive == 1) {
                        var dict = response.Entities[index]
                        var keys = Object.keys(dict);
                        for (var j = 0; j < keys.length; j++) {
                            var key = keys[j];
                            if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                                continue
                            if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                                continue
                            var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

                            // Access each key here
                            this.ListOfEpfSubjection.push({
                                id: j,
                                name: NewKey,
                                subjection: dict[key],
                            })
                        }
                        break
                    }
                }
                var BufferDict = this.ListOfEpfSubjection
                var keys = Object.keys(BufferDict);
                for (var j = 0; j < keys.length; j++) {
                    var key = keys[j];
                    this.ListOfCriteria.push(BufferDict[key].name)
                }
                EisSubjectionService.List({
                }, response => {
                    for (var index in response.Entities) {
                        if (response.Entities[index].IsActive == 1) {
                            var dict = response.Entities[index]
                            var keys = Object.keys(dict);

                            for (var j = 0; j < keys.length; j++) {
                                var key = keys[j];
                                if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                                    continue
                                if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                                    continue
                                // Access each key here
                                var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

                                this.ListOfEisSubjection.push({
                                    id: j,
                                    name: NewKey,
                                    subjection: dict[key],
                                })
                            }
                            break
                        }
                    }
                    HrdfSubjectionService.List({
                    }, response => {
                        for (var index in response.Entities) {
                            if (response.Entities[index].IsActive == 1) {
                                var dict = response.Entities[index]
                                var keys = Object.keys(dict);
                                for (var j = 0; j < keys.length; j++) {
                                    var key = keys[j];
                                    if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                                        continue
                                    if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                                        continue
                                    // Access each key here
                                    var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

                                    this.ListOfHrdfSubjection.push({
                                        id: j,
                                        name: NewKey,
                                        subjection: dict[key],
                                    })
                                }
                                break
                            }
                        }
                        SocsoSubjectionService.List({
                        }, response => {
                            for (var index in response.Entities) {
                                if (response.Entities[index].IsActive == 1) {
                                    var dict = response.Entities[index]
                                    var keys = Object.keys(dict);
                                    for (var j = 0; j < keys.length; j++) {
                                        var key = keys[j];
                                        if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                                            continue

                                        if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                                            continue

                                        // Access each key here
                                        var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

                                        this.ListOfSocsoSubjection.push({
                                            id: j,
                                            name: NewKey,
                                            subjection: dict[key],
                                        })
                                    }
                                    break
                                }
                            }

                        });
                        var ClaimCategory = self.form.ClaimingCategory.value
                        var BufferDict = this.ListOfEpfSubjection
                        var keys = Object.keys(BufferDict);
                        var ClaimingCategoryElement = document.getElementById(this.idPrefix + 'ClaimingCategory')
                        var ClaimingCategoryEditor = new Select2Editor($(ClaimingCategoryElement))
                        for (var j = 0; j < keys.length; j++) {
                            var key = keys[j];
                            var selection = BufferDict[key].name.replace(/([a-z])([A-Z])/g, '$1 $2');
                            ClaimingCategoryEditor.addItem({ id: BufferDict[key].name, text: selection }); // 8am - 6pm , will consider lates
                        }
                        ClaimingCategoryEditor.addItem({ id: 'Others', text: 'Others' }); // 8am - 6pm , will consider lates
                        $(ClaimingCategoryElement).on('change', async function (e) {
                            console.log('haha')
                            console.log(self.form.ClaimingCategory.value)
                            self.form.SubjectionEis.value = self.CheckSubjection(self.ListOfEisSubjection, self.form.ClaimingCategory.value);
                            self.form.SubjectionEpf.value = self.CheckSubjection(self.ListOfEpfSubjection, self.form.ClaimingCategory.value);
                            self.form.SubjectionPcb.value = self.CheckSubjection(self.ListOfPcbSubjection, self.form.ClaimingCategory.value);
                            self.form.SubjectionHrdf.value = self.CheckSubjection(self.ListOfHrdfSubjection, self.form.ClaimingCategory.value);
                            self.form.SubjectionSocso.value = self.CheckSubjection(self.ListOfSocsoSubjection, self.form.ClaimingCategory.value);
                        })
                        if (ClaimCategory != '')
                            $(ClaimingCategoryElement).val(ClaimCategory).trigger('change'); // Deselect any current selection
                        $('.field.SubjectionEis, .field.SubjectionEpf, .field.SubjectionHrdf, .field.SubjectionPcb, .field.SubjectionSocso').addClass('col-md-2');

                    });

                });

            });

        });

        this.cloneButton.remove()
    }
    protected getDialogOptions() {
        let opt = super.getDialogOptions()
        opt.width = opt.width + 100
        return opt
    }
    protected onDialogOpen() {
        super.onDialogOpen()
        this.getToolbarButtons()
        var self = this
        $(".EmployeeUpdated").hide()
        $(".HrUpdated").hide()

        if (isEmptyOrNull(this.form.EmployeeUpdatedName.value))
            $(".EmployeeUpdatedName").hide()
        else {
            var EmployeeUpdatedNameElement = document.getElementById(this.idPrefix + 'EmployeeUpdatedName')
            $(EmployeeUpdatedNameElement).on('click', async function () {
                console.log(self.form.EmployeeUpdatedName.value)
                console.log(self.form.EmployeeUpdated.value)
                var dlg = new EmployeeBasicDataDialog(parseInt(self.form.EmployeeUpdated.value))
                dlg.loadByIdAndOpenDialog(parseInt(self.form.EmployeeUpdated.value))
            })
        }
        if (isEmptyOrNull(this.form.HrUpdatedName.value))
            $(".HrUpdatedName").hide()
        else {
            var HrUpdatedNameNameElement = document.getElementById(this.idPrefix + 'HrUpdatedName')
            $(HrUpdatedNameNameElement).on('click', async function () {
                var dlg = new EmployeeBasicDataDialog(parseInt(self.form.HrUpdated.value))
                dlg.loadByIdAndOpenDialog(parseInt(self.form.HrUpdated.value))
            })
        }
        if (this.isNew()) {
            var ApproveButtons = document.querySelectorAll('.text-bg-success')
            ApproveButtons.forEach(function (element) {
                $(element).hide()
            });
            var RejectButtons = document.querySelectorAll('.text-bg-danger')
            RejectButtons.forEach(function (element) {
                $(element).hide()
            });
            if (!Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) {
                this.form.EmployeeRowId.value = Authorization.userDefinition.EmployeeRowID
                this.form.EmployeeName.value = Authorization.userDefinition.DisplayName
                EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);
                EditorUtils.setReadonly(this.form.EmployeeName.element, true);
            }
            else if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) //HR guy
            {
                var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
                $(EmployeeRowIdElement).on('change', async function () {
                    self.form.EmployeeName.value = ''
                    if (isEmptyOrNull($(this).val()))
                        return;
                    EmployeeProfileService.Retrieve({
                        EntityId: $(EmployeeRowIdElement).val()
                    }, response => {
                        self.form.EmployeeName.value = response.Entity.EmployeeName
                    });
                });
            }
        }
        else if (!this.isNew()) {
            if (!Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]
                && self.form.EmployeeRowId.value != Authorization.userDefinition.EmployeeRowID)//if no hr privilege
                this.readOnly = true
            console.log(self.form.EmployeeRowId.value == Authorization.userDefinition.EmployeeRowID)
            if (self.form.EmployeeRowId.value == Authorization.userDefinition.EmployeeRowID) {
                EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);
                EditorUtils.setReadonly(this.form.EmployeeName.element, true);
                return
            }
            console.log('haha')
            MoneyClaimApplicationService.Retrieve({
                EntityId: this.entityId
            }, response => {
                var applicant = response.Entity.EmployeeRowId
                var HrStatus = response.Entity.HrStatus
                var EmployeeStatus = response.Entity.EmployeeStatus
                self.EmployeeApproval = response.Entity.EmployeeStatus.valueOf()
                self.HrApproval = response.Entity.HrStatus
                var applicationStatus = response.Entity.Status
                if (applicationStatus == MoneyClaimingStatus.Pending) {
                    serviceCall<RetrieveResponse<any>>({
                        service: OrganisationChartService.baseUrl + '/PermissionToAcknowledge',
                        data: {
                            'UserEmployeeRowID': Authorization.userDefinition.EmployeeRowID,
                            'ApplicantEmployeeRowID': applicant
                        },
                        method: "GET",
                        async: false,
                        onSuccess: (response) => {
                            var PermissionToAck = self.SuperiorPermission= response
                            if (self.form.EmployeeRowId.value != Authorization.userDefinition.EmployeeRowID)
                                this.set_readOnly(true)
                            $('.delete-button').removeClass('disabled');
                            if (HrStatus == 0 || EmployeeStatus == 0)//if one of the condition still pending
                            {
                                if (PermissionToAck == true && !EmployeeStatus )
                                    $('.tool-button').removeClass('hidden');

                                if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources] && !HrStatus )
                                    $('.tool-button').removeClass('hidden');

                            }
                            else if ((HrStatus == MoneyClaimingStatus.Rejected || EmployeeStatus == MoneyClaimingStatus.Rejected)
                                || (HrStatus == MoneyClaimingStatus.Approved && EmployeeStatus == MoneyClaimingStatus.Approved)) {
                                if (self.form.EmployeeRowId.value == Authorization.userDefinition.EmployeeRowID) {
                                    var ApproveButtons = document.querySelectorAll('.text-bg-success')
                                    ApproveButtons.forEach(function (element) {
                                        $(element).hide()
                                    });
                                    var RejectButtons = document.querySelectorAll('.text-bg-danger')
                                    RejectButtons.forEach(function (element) {
                                        $(element).hide()
                                    });
                                }
                            }


                        },
                        onError: (error) => {
                            console.log(error.Error);
                        }
                    });

                }
                else {
                    this.set_readOnly(true)
                    $('.delete-button').removeClass('disabled');
                }
            });
        }
        var ClaimCategory = this.form.ClaimingCategory.value
        EditorUtils.setReadonly(this.form.EmployeeName.element, true);
  


        /*
        EpfSubjectionService.List({
        }, response => {
            for (var index in response.Entities) {
                if (response.Entities[index].IsActive == 1) {
                    var dict = response.Entities[index]
                    var keys = Object.keys(dict);
                    for (var j = 0; j < keys.length; j++) {
                        var key = keys[j];
                        if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                            continue
                        if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                            continue
                        var NewKey = key.replace(/([A-Z])/g, ' $1').trim();
                        // Access each key here
                        this.ListOfEpfSubjection.push({
                            id: j,
                            name: NewKey,
                            subjection: dict[key],
                        })
                    }
                    var BufferDict = this.ListOfEpfSubjection
                    var keys = Object.keys(BufferDict);
                    var ClaimingCategoryElement = document.getElementById(this.idPrefix + 'ClaimingCategory')
                    var ClaimingCategoryEditor = new Select2Editor($(ClaimingCategoryElement))
                    for (var j = 0; j < keys.length; j++) {
                        var key = keys[j];
                        var selection = BufferDict[key].name.replace(/([a-z])([A-Z])/g, '$1 $2');
                        ClaimingCategoryEditor.addItem({ id: BufferDict[key].name, text: selection }); // 8am - 6pm , will consider lates
                    }
                    ClaimingCategoryEditor.addItem({ id: 'Others', text: 'Others' }); // 8am - 6pm , will consider lates
                    break
                }
            }
            $(ClaimingCategoryElement).on('change', async function (e) {
                console.log('haha')
            })
            if (ClaimCategory != '') 
                $(ClaimingCategoryElement).val(ClaimCategory).trigger('change'); // Deselect any current selection
            

        });
        */
    }
    public CheckSubjection(arrayOfDict, input): boolean {
        var extractedText = input.match(/\((.*?)\)/);
        var trimmedString;
        // Check if text inside parentheses is found
        if (extractedText && extractedText.length > 1)
            trimmedString = extractedText[1]; // Extracted text is at index 1
        else
            trimmedString = input; // If no parentheses found, set trimmed string to original string

        if (trimmedString == 'Others')
            return false
        for (var i = 0; i < arrayOfDict.length; i++) {
            var dict = arrayOfDict[i];
            for (var key in dict) {
                if (dict[key] == trimmedString)
                    return dict['subjection']
            }
        }

        return false
    }

    protected getToolbarButtons() {
        var self = this
        var buttons = super.getToolbarButtons();
        var Linkx = document.createElement('style')
        Linkx.textContent =
            `
            .hidden {
            display: none;
            }
            `
        document.head.appendChild(Linkx)
        buttons.push(
            {
                title: "Approve Application",	// *** Get button text from translation
                cssClass: 'text-bg-success p-2 hidden',
                icon: 'fa-check text-green',
                onClick: () => {
                    confirm("Do you want to approve this leave application?", () => {
                        if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources])//is HR
                        {
                            if (self.SuperiorPermission == true) {
                                if (self.EmployeeApproval == MoneyClaimingStatus.NotNeeded || self.HrApproval == MoneyClaimingStatus.NotNeeded) {
                                    if (self.EmployeeApproval == MoneyClaimingStatus.NotNeeded) {
                                        MoneyClaimApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                HrStatus: MoneyClaimingStatus.Approved,
                                                HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                    else if (self.HrApproval == MoneyClaimingStatus.NotNeeded) {
                                        MoneyClaimApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                EmployeeStatus: MoneyClaimingStatus.Approved,
                                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                }
                                else {
                                    if (self.HrApproval == MoneyClaimingStatus.Approved) {
                                        MoneyClaimApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                EmployeeStatus: MoneyClaimingStatus.Approved,
                                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                    else if (self.EmployeeApproval == MoneyClaimingStatus.Approved) {
                                        MoneyClaimApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                HrStatus: MoneyClaimingStatus.Approved,
                                                HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                    else {
                                        MoneyClaimApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                EmployeeStatus: MoneyClaimingStatus.Approved,
                                                HrStatus: MoneyClaimingStatus.Approved,
                                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                HrUpdated: Authorization.userDefinition.EmployeeRowID
                                            }
                                        });
                                    }
                                }
                            }
                            else {
                                MoneyClaimApplicationService.Update({
                                    EntityId: this.entityId,
                                    Entity:
                                    {
                                        HrStatus: MoneyClaimingStatus.Approved,
                                        HrUpdated: Authorization.userDefinition.EmployeeRowID
                                    }
                                });
                            }
                        }
                        else {
                            MoneyClaimApplicationService.Update({
                                EntityId: this.entityId,
                                Entity:
                                {
                                    EmployeeStatus: MoneyClaimingStatus.Approved,
                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                }
                            });
                        }
                        location.reload()
                    });
                },
            }
        );
        buttons.push(
            {
                title: "Reject Application",	// *** Get button text from translation
                cssClass: 'text-bg-danger p-2 hidden',
                icon: 'fa-times text-red',
                onClick: () => {
                    confirm("Do you want to reject this Money Claiming application?", () => {
                        if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources])//is HR
                        {
                            if (self.SuperiorPermission == true) {
                                if (self.EmployeeApproval == MoneyClaimingStatus.NotNeeded || self.HrApproval == MoneyClaimingStatus.NotNeeded) {
                                    if (self.EmployeeApproval == MoneyClaimingStatus.NotNeeded) {
                                        MoneyClaimApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                HrStatus: MoneyClaimingStatus.Rejected,
                                                HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                    else if (self.HrApproval == MoneyClaimingStatus.NotNeeded) {
                                        MoneyClaimApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                }
                                else {
                                    if (self.HrApproval == MoneyClaimingStatus.Pending ) {
                                        MoneyClaimApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                HrStatus: MoneyClaimingStatus.Rejected,
                                                HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                    else if (self.EmployeeApproval == MoneyClaimingStatus.Pending) {
                                        MoneyClaimApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                    else  {
                                        MoneyClaimApplicationService.Update({
                                            EntityId: this.entityId,
                                            Entity:
                                            {
                                                EmployeeStatus: MoneyClaimingStatus.Rejected,
                                                EmployeeUpdated: Authorization.userDefinition.EmployeeRowID,
                                                HrStatus: MoneyClaimingStatus.Rejected,
                                                HrUpdated: Authorization.userDefinition.EmployeeRowID,
                                            }
                                        });
                                    }
                                }
                            }
                            else {
                                MoneyClaimApplicationService.Update({
                                    EntityId: this.entityId,
                                    Entity:
                                    {
                                        HrStatus: MoneyClaimingStatus.Rejected,
                                        HrUpdated: Authorization.userDefinition.EmployeeRowID
                                    }
                                });
                            }
                        }
                        else {
                            MoneyClaimApplicationService.Update({
                                EntityId: this.entityId,
                                Entity:
                                {
                                    EmployeeStatus: MoneyClaimingStatus.Rejected,
                                    EmployeeUpdated: Authorization.userDefinition.EmployeeRowID
                                }
                            });
                        }
                        location.reload()
                    });
                },
            }
        );
        return buttons;
    }
}