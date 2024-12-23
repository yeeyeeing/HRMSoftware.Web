import { StringEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PublicHolidayForm {
    Name: StringEditor;
    CountryCode: StringEditor;
    Date: DateEditor;
}

export class PublicHolidayForm extends PrefixedContext {
    static formKey = 'PublicHoliday.PublicHoliday';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PublicHolidayForm.init)  {
            PublicHolidayForm.init = true;

            var w0 = StringEditor;
            var w1 = DateEditor;

            initFormType(PublicHolidayForm, [
                'Name', w0,
                'CountryCode', w0,
                'Date', w1
            ]);
        }
    }
}