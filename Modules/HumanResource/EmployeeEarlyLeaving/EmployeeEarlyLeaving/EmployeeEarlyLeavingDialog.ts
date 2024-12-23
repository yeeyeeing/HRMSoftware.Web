import { Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { EmployeeEarlyLeavingForm, EmployeeEarlyLeavingRow, EmployeeEarlyLeavingService } from '../../../ServerTypes/EmployeeEarlyLeaving';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';

@Decorators.registerClass('HRMSoftware.EmployeeEarlyLeaving.EmployeeEarlyLeavingDialog')
export class EmployeeEarlyLeavingDialog extends EntityDialog<EmployeeEarlyLeavingRow, any> {
    protected getFormKey() { return EmployeeEarlyLeavingForm.formKey; }
    protected getRowDefinition() { return EmployeeEarlyLeavingRow; }
    protected getService() { return EmployeeEarlyLeavingService.baseUrl; }

    protected form = new EmployeeEarlyLeavingForm(this.idPrefix);
    public dialogOpen(asPanel?: boolean): void {



        super.dialogOpen(asPanel);
        var EmployeeRowIdValue = this.form.EmployeeRowId.value
        EditorUtils.setReadonly(this.form.EmployeeName.element, true);

        EmployeeProfileService.List({
        }, response => {

            var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
            let EmployeeRowIdEditor = new Select2Editor($(EmployeeRowIdElement))

            var PersonNameElement = document.getElementById(this.idPrefix + 'EmployeeName')
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


    }

}