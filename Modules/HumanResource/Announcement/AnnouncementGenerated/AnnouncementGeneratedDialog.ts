import { Decorators, EntityDialog, EditorUtils } from '@serenity-is/corelib';
import { AnnouncementGeneratedForm, AnnouncementGeneratedRow, AnnouncementGeneratedService } from '../../../ServerTypes/Announcement';
import { Authorization } from '@serenity-is/corelib/q';
import { alertDialog } from '@serenity-is/corelib/q';
import { isEmptyOrNull } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.Announcement.AnnouncementGeneratedDialog')
export class AnnouncementGeneratedDialog extends EntityDialog<AnnouncementGeneratedRow, any> {
    protected getFormKey() { return AnnouncementGeneratedForm.formKey; }
    protected getRowDefinition() { return AnnouncementGeneratedRow; }
    protected getService() { return AnnouncementGeneratedService.baseUrl; }

    protected form = new AnnouncementGeneratedForm(this.idPrefix);

    public onDialogOpen(): void {
        super.onDialogOpen();
        var self = this
        EditorUtils.setReadonly(this.form.Remarks.element, true);
        var time = $('#announcement-clocklet')
        var today = new Date()

        if (!this.isNew()) {
            $('.AnnouncementDateTime').hide()
            $('.AnnouncementTime').hide()
            $('.Immediate').hide()
            $('.Delayed').hide()
            $('.Remarks').parent().hide()

            AnnouncementGeneratedService.Retrieve({
                EntityId: self.entityId
            }, response => {
                console.log(response.Entity)
                if (!isEmptyOrNull(response.Entity.GeneratedRecurringId) || !isEmptyOrNull(response.Entity.GeneratedWizardId)) {
                    EditorUtils.setReadonly(this.form.Remarks.element, true);
                        

                }
                                
                    
            })
        }
        else {
            $('.AnnouncementDateTime').hide()
            $('.AnnouncementTime').hide()
            time.val('12:00')
            self.form.AnnouncementDateTime.value = today.toISOString()
        }

        var ImmediateElement = document.getElementById(this.idPrefix + 'Immediate');
        var DelayedElement = document.getElementById(this.idPrefix + 'Delayed');

        $(ImmediateElement).on('change', async function () {
            if (self.form.Immediate.value == true && self.form.Delayed.value == true)
                self.form.Delayed.value = false
            if (self.form.Delayed.value == true &&
                self.form.Immediate.value == false) {
                $('.AnnouncementTime').show()
                $('.AnnouncementDateTime').show()
                self.GenerateRemarks()
            }
            else if (self.form.Delayed.value == false &&
                self.form.Immediate.value == true) {
                $('.AnnouncementTime').hide()
                $('.AnnouncementDateTime').hide()
                self.GenerateRemarks()
            }
            else {
                $('.AnnouncementTime').hide()
                $('.AnnouncementDateTime').hide()

                self.GenerateRemarks()
            }
        })
        $(DelayedElement).on('change', async function () {
            if (self.form.Immediate.value == true && self.form.Delayed.value == true)
                self.form.Immediate.value = false
            if (self.form.Delayed.value == true &&
                self.form.Immediate.value == false) {
                $('.AnnouncementTime').show()
                $('.AnnouncementDateTime').show()
                self.GenerateRemarks()
            }
            else if (self.form.Delayed.value == false &&
                self.form.Immediate.value == true) {
                $('.AnnouncementTime').hide()
                $('.AnnouncementDateTime').hide()
                self.GenerateRemarks()
            }
            else {
                $('.AnnouncementTime').hide()
                $('.AnnouncementDateTime').hide()

                self.GenerateRemarks()
            }
        })
    }

    constructor() {
        super();
        var self = this

        var linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = "https://cdn.jsdelivr.net/npm/clocklet@0.3.0/css/clocklet.min.css";
        var scriptElement = document.createElement('script');
        scriptElement.src = "https://cdn.jsdelivr.net/npm/clocklet@0.3.0";
        // Append link and script elements to the head of the document
        document.head.appendChild(linkElement);
        document.head.appendChild(scriptElement);
        var tabId = $(".fieldset").children().attr('id');
        const searchString = "PropertyGrid";
        const AnnouncementTimeString = "AnnouncementTime";
        const lastIndex = tabId.lastIndexOf(searchString);
        if (lastIndex !== -1)
            var RecurringTimeElementId = tabId.substring(0, lastIndex) + AnnouncementTimeString;
        var RecurringClocklet = document.getElementById(RecurringTimeElementId)
        RecurringClocklet.setAttribute('data-clocklet', '');
        RecurringClocklet.setAttribute("id", "announcement-clocklet");
        RecurringClocklet.addEventListener("clocklet.opening", function (event) {
            var myClocklet = document.getElementById("announcement-clocklet") as HTMLElement;
            if (myClocklet)
                myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
        });
        RecurringClocklet.addEventListener("clocklet.closed", function (event) {
            self.GenerateRemarks()
        });
    }


    public GenerateRemarks(): void {
        var self = this
        var StartingString = 'The announcement will be sent at '
        var time = document.getElementById('announcement-clocklet') as HTMLInputElement
        var FinalString = ''
        if (self.form.Immediate.value == true) {
            FinalString = 'The announcement will be made to the employee immediately'
        }
        else if (self.form.Delayed.value == true) {
            FinalString = StartingString + self.form.AnnouncementDateTime.value + ' ' + time.value + ':00'
        }
        else
            FinalString = ''

        self.form.Remarks.value = FinalString
    }
    protected save_submitHandler(response): void {

        if (this.form.Remarks.value == '') {
            alertDialog('Invalid settings, please check again')
            return
        }
        if (this.form.EmployeeRowId.value == '') {
            alertDialog('No employee chosen')
            return
        }
        super.save_submitHandler(response)
    }


}