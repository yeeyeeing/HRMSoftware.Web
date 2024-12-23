import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { DivisionForm, DivisionRow, DivisionService } from '../../../ServerTypes/OrganisationHierarchy';
import { alertDialog} from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.OrganisationHierarchy.DivisionDialog')
export class DivisionDialog extends EntityDialog<DivisionRow, any> {
    protected getFormKey() { return DivisionForm.formKey; }
    protected getRowDefinition() { return DivisionRow; }
    protected getService() { return DivisionService.baseUrl; }

    protected form = new DivisionForm(this.idPrefix);
    public list_of_division: string[] = [];
    constructor() {
        super();

        DivisionService.List({
        }, response => {

            for (var key in response.Entities) {

                this.list_of_division.push(response.Entities[key].Name.toLowerCase())

            }

        });



    }
    protected save_submitHandler(response): void {
        var list_of_errors: string[] = [];

        var InsertedRace = this.form.Name.value.toLowerCase()
        for (var item in this.list_of_division) {
            if (this.list_of_division[item] === InsertedRace)
                list_of_errors.push("This Division is inserted.")
        }

        if (list_of_errors.length > 0) {
            const concatenatedString: string = list_of_errors.map(item => `- ${item}`).join('\n');
            alertDialog(concatenatedString)
        }

        else
            super.save_submitHandler(response)


    }
}