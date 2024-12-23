import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterCp8dForm {
    Name: StringEditor;
    Description: StringEditor;
}

export class MasterCp8dForm extends PrefixedContext {
    static formKey = 'Master.MasterCp8d';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterCp8dForm.init)  {
            MasterCp8dForm.init = true;

            var w0 = StringEditor;

            initFormType(MasterCp8dForm, [
                'Name', w0,
                'Description', w0
            ]);
        }
    }
}