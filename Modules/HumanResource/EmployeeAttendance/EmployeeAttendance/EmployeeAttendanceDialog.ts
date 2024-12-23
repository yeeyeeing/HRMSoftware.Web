import { Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { EmployeeAttendanceForm, EmployeeAttendanceRow, EmployeeAttendanceService } from '../../../ServerTypes/EmployeeAttendance';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';

@Decorators.registerClass('HRMSoftware.EmployeeAttendance.EmployeeAttendanceDialog')
export class EmployeeAttendanceDialog extends EntityDialog<EmployeeAttendanceRow, any> {
    protected getFormKey() { return EmployeeAttendanceForm.formKey; }
    protected getRowDefinition() { return EmployeeAttendanceRow; }
    protected getService() { return EmployeeAttendanceService.baseUrl; }

    protected form = new EmployeeAttendanceForm(this.idPrefix);
    constructor() {
      
        super();
    }



    public dialogOpen(asPanel?: boolean): void {
        var StartClocklet = document.getElementById(this.idPrefix + 'AuthenticationTime')
        StartClocklet.setAttribute('data-clocklet', '');
        StartClocklet.addEventListener("clocklet.opening", function (event) {
            var myClocklet = document.getElementById(this.id) as HTMLElement;
            if (myClocklet)
                myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
        });
        $(document.getElementById(this.idPrefix.substring(0, this.idPrefix.lastIndexOf('_')))).click(function () {});

        var AuthenticationSecondValue = this.form.AuthenticationSecond.value
        
        var AuthenticationSecondElement = document.getElementById(this.idPrefix + 'AuthenticationSecond')
        let AuthenticationSecondEditor = new Select2Editor($(AuthenticationSecondElement))

        for (let i = 0; i <= 60; i++) 
            AuthenticationSecondEditor.addItem({ id: (i).toString(), text: (i).toString(), }); // 8am - 6pm , will consider lates
        

        if (AuthenticationSecondValue != null)
            $(AuthenticationSecondElement).val(AuthenticationSecondValue.toString()).trigger('change');

        
        super.dialogOpen(asPanel);
        EditorUtils.setReadonly(this.form.PersonName.element, true);

        var EmployeeRowIdValue = this.form.EmployeeRowID.value


        EmployeeProfileService.List({
        }, response => {

            var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowID')
            let EmployeeRowIdEditor = new Select2Editor($(EmployeeRowIdElement))

            var PersonNameElement = document.getElementById(this.idPrefix + 'PersonName')
            //let PersonNameEditor = new Select2Editor($(PersonNameElement))
            interface Item {
                id: number;
                name: string;
            }
            let listOfDicts: Item[] = [];

            for (var index in response.Entities) {
                EmployeeRowIdEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].EmployeeID).toString(), }); // 8am - 6pm , will consider lates
                listOfDicts.push({ id: response.Entities[index].Id, name: response.Entities[index].EmployeeName });
            }

            $(EmployeeRowIdElement).on('change', async function () {
                for (var index in listOfDicts) {
                    if (listOfDicts[index].id == $(EmployeeRowIdElement).val())
                        $(PersonNameElement).val(listOfDicts[index].name)
                }
            })
            if (EmployeeRowIdValue != null)
                $(EmployeeRowIdElement).val(EmployeeRowIdValue.toString()).trigger('change');

        });
        if (this.form.AuthenticationTime.value != null)
            this.form.AuthenticationTime.value = this.form.AuthenticationTime.value.substring(0,4)
     
    }
}