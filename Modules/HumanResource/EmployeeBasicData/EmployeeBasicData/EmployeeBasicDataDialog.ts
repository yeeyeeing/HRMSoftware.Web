import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { EmployeeBasicDataForm, EmployeeBasicDataRow, EmployeeBasicDataService } from '../../../ServerTypes/EmployeeBasicData';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';

@Decorators.registerClass('HRMSoftware.EmployeeBasicData.EmployeeBasicDataDialog')
export class EmployeeBasicDataDialog extends EntityDialog<EmployeeBasicDataRow, any> {
    protected getFormKey() { return EmployeeBasicDataForm.formKey; }
    protected getRowDefinition() { return EmployeeBasicDataRow; }
    protected getService() { return EmployeeBasicDataService.baseUrl; }

    protected form = new EmployeeBasicDataForm(this.idPrefix);
    public EmployeeRowID: number;
    constructor(EmployeeRowID: number) {
        super();
        this.EmployeeRowID = EmployeeRowID;
        this.deleteButton.hide();
        this.localizationButton.hide();
        this.undeleteButton.hide();
        this.cloneButton.hide();
        this.applyChangesButton.hide();
        this.saveAndCloseButton.hide();


    }

    protected onDialogOpen() {
        super.onDialogOpen()
        this.readOnly = true
        
        var UserRowId = this.EmployeeRowID


        $(this.idPrefix + 'EmployeeImg').hide();

        var fragment = document.createElement("img");
        fragment.setAttribute("id", "myImg");
        fragment.width = 63;
        fragment.height = 112.5;
        EmployeeProfileService.List({
        }, response => {
            for (var index in response.Entities) {
                if (response.Entities[index].Id == UserRowId) {
                    var form = document.getElementById(this.form.idPrefix +'PropertyGrid') 
                    fragment.src = '/upload/' + response.Entities[index].EmployeeImg
                    form.firstChild.firstChild.insertBefore(fragment, form.firstChild.firstChild.firstChild)
                    fragment.style.display = 'block';
                    fragment.style.margin = '0 auto';
                    $('.disabled').remove()

                    break
                }
            }
        });


    }

}