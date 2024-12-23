import { StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterCostCentreForm {
    Name: StringEditor;
    Description: StringEditor;
}

export class MasterCostCentreForm extends PrefixedContext {
    static formKey = 'Master.MasterCostCentre';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterCostCentreForm.init)  {
            MasterCostCentreForm.init = true;

            var w0 = StringEditor;

            initFormType(MasterCostCentreForm, [
                'Name', w0,
                'Description', w0
            ]);
        }
    }
}