import { Decorators, EntityDialog, SaveResponse } from '@serenity-is/corelib';
import { RaceForm, RaceRow, RaceService } from '../../../ServerTypes/Race';
import { alertDialog, RetrieveResponse, serviceCall, notifyError } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.Race.RaceDialog')
export class RaceDialog extends EntityDialog<RaceRow, any> {
    protected getFormKey() { return RaceForm.formKey; }
    protected getRowDefinition() { return RaceRow; }
    protected getService() { return RaceService.baseUrl; }

    protected form = new RaceForm(this.idPrefix);
    public list_of_race: string[] = [];
    constructor() {
        super();

        RaceService.List({
        }, response => {

            for (var key in response.Entities) {

                this.list_of_race.push(response.Entities[key].Race.toLowerCase())

            }

        });



    }
    protected save_submitHandler(response): void {
        var list_of_errors: string[] = [];

        var InsertedRace = this.form.Race.value.toLowerCase()
        for (var item in this.list_of_race) {
            if (this.list_of_race[item] === InsertedRace)
                list_of_errors.push("This Race is inserted.")
        }

        if (list_of_errors.length > 0) {
            const concatenatedString: string = list_of_errors.map(item => `- ${item}`).join('\n');
            notifyError(concatenatedString)
        }

        else
            super.save_submitHandler(response)


    }

}