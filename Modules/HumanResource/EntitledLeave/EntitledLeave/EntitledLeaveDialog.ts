import { Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import { BringForwardService } from '../../../ServerTypes/BringForward';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { EntitledLeaveForm, EntitledLeaveRow, EntitledLeaveService } from '../../../ServerTypes/EntitledLeave';
import { isEmptyOrNull } from '@serenity-is/corelib/q';
@Decorators.registerClass('HRMSoftware.EntitledLeave.EntitledLeaveDialog')
export class EntitledLeaveDialog extends EntityDialog<EntitledLeaveRow, any> {
    protected getFormKey() { return EntitledLeaveForm.formKey; }
    protected getRowDefinition() { return EntitledLeaveRow; }
    protected getService() { return EntitledLeaveService.baseUrl; }
    public EmployeeRowID: number;
    public CarryForwardId: number;
    protected form = new EntitledLeaveForm(this.idPrefix);
    constructor(EmployeeRowID: number) {
        super()
        this.EmployeeRowID = EmployeeRowID
    }
    protected onDialogOpen() {
        super.onDialogOpen()
        //var EmployeeRowID 
        //if (isEmptyOrNull(this.EmployeeRowID))
            this.EmployeeRowID = parseInt(this.form.EmployeeRowId.value)
       // else
       //     EmployeeRowID = this.EmployeeRowID
        console.log(isEmptyOrNull(this.EmployeeRowID))
        console.log(this.form.EmployeeRowId.value)

        this.deleteButton.hide()
        this.dialogTitle = ""
        EmployeeProfileService.List({
        }, response => {

            for (var index in response.Entities)
            {
                if (response.Entities[index].Id == this.EmployeeRowID) {


                   // this.form.EmployeeRowId.value = this.EmployeeRowID.toString()
                    //EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);

                    EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);
                    EditorUtils.setReadonly(this.form.EmployeeName.element, true);


                    if (response.Entities[index].MaritalStatus == 1) {

                        if (response.Entities[index].Sex == 1)// if employee is male
                            $(".EntitledMaternityLeave").hide();

                        else if (response.Entities[index].Sex == 2)// if employee is male
                            $(".EntitledPaternityLeave").hide();
                    }
                    else
                    {
                        $(".EntitledMaternityLeave").hide();
                        $(".EntitledPaternityLeave").hide();
                    }

                        
                break
                }

            }

        });
    }
}