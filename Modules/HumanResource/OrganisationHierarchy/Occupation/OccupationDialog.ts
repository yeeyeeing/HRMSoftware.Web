import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { OccupationForm, OccupationRow, OccupationService } from '../../../ServerTypes/OrganisationHierarchy';

@Decorators.registerClass('HRMSoftware.OrganisationHierarchy.OccupationDialog')
export class OccupationDialog extends EntityDialog<OccupationRow, any> {
    protected getFormKey() { return OccupationForm.formKey; }
    protected getRowDefinition() { return OccupationRow; }
    protected getService() { return OccupationService.baseUrl; }

    protected form = new OccupationForm(this.idPrefix);
     public list_of_occupation: string[] = [];
    constructor() {
        super();
        OccupationService.List({
        }, response => {
            for (var key in response.Entities) 
                this.list_of_occupation.push(response.Entities[key].Name.toLowerCase())
        });
    }
    protected save_submitHandler(response): void {
        var list_of_errors: string[] = [];

        var InsertedRace = this.form.Name.value.toLowerCase()
        for (var item in this.list_of_occupation) {
            if (this.list_of_occupation[item] === InsertedRace)
                list_of_errors.push("This Occupation is inserted.")
        }

        if (list_of_errors.length > 0) {
            const concatenatedString: string = list_of_errors.map(item => `- ${item}`).join('\n');
            alertDialog(concatenatedString)
        }

        else
            super.save_submitHandler(response)


    }
}