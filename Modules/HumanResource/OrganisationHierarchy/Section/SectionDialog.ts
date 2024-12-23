import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { SectionForm, SectionRow, SectionService } from '../../../ServerTypes/OrganisationHierarchy';
import { alertDialog} from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.OrganisationHierarchy.SectionDialog')
export class SectionDialog extends EntityDialog<SectionRow, any> {
    protected getFormKey() { return SectionForm.formKey; }
    protected getRowDefinition() { return SectionRow; }
    protected getService() { return SectionService.baseUrl; }

    protected form = new SectionForm(this.idPrefix);
     public list_of_section: string[] = [];
    constructor() {
        super();

        SectionService.List({
        }, response => {

            for (var key in response.Entities) {

                this.list_of_section.push(response.Entities[key].Name.toLowerCase())

            }

        });



    }
    protected save_submitHandler(response): void {
        var list_of_errors: string[] = [];

        var InsertedRace = this.form.Name.value.toLowerCase()
        for (var item in this.list_of_section) {
            if (this.list_of_section[item] === InsertedRace)
                list_of_errors.push("This Section is inserted.")
        }

        if (list_of_errors.length > 0) {
            const concatenatedString: string = list_of_errors.map(item => `- ${item}`).join('\n');
            alertDialog(concatenatedString)
        }

        else
            super.save_submitHandler(response)


    }
}