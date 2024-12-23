import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { DepartmentForm, DepartmentRow, DepartmentService } from '../../../ServerTypes/OrganisationHierarchy';
import { alertDialog } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.OrganisationHierarchy.DepartmentDialog')
export class DepartmentDialog extends EntityDialog<DepartmentRow, any> {
    protected getFormKey() { return DepartmentForm.formKey; }
    protected getRowDefinition() { return DepartmentRow; }
    protected getService() { return DepartmentService.baseUrl; }

    protected form = new DepartmentForm(this.idPrefix);
    public list_of_department: string[] = [];

    constructor() {
        super();
        DepartmentService.List({
        }, response => {
            for (var key in response.Entities)
                this.list_of_department.push(response.Entities[key].Name.toLowerCase())
        });
    }

    protected save_submitHandler(response): void {
        var list_of_errors: string[] = [];

        var InsertedDepartment = this.form.Name.value.toLowerCase()
        for (var item in this.list_of_department) {
            if (this.list_of_department[item] === InsertedDepartment)
                list_of_errors.push("This department is inserted.")
        }







        if (list_of_errors.length > 0) {
            const concatenatedString: string = list_of_errors.map(item => `- ${item}`).join('\n');
            alertDialog(concatenatedString)
        }


        else
            super.save_submitHandler(response)




    }

}