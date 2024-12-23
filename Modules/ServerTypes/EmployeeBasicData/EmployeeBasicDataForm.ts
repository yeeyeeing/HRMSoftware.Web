import { StringEditor, IntegerEditor, DateEditor, LookupEditor, EnumEditor, PrefixedContext } from "@serenity-is/corelib";
import { EmployeeType } from "../EmployeeProfile/EmployeeType";
import { SexType } from "../EmployeeProfile/SexType";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeBasicDataForm {
    EmployeeName: StringEditor;
    EmployeeId: StringEditor;
    Age: IntegerEditor;
    Birthday: DateEditor;
    Address: StringEditor;
    TelNumber1: StringEditor;
    RaceId: LookupEditor;
    EmployeeType: EnumEditor;
    Sex: EnumEditor;
    CityId: LookupEditor;
    StateId: LookupEditor;
    NationalityId: LookupEditor;
}

export class EmployeeBasicDataForm extends PrefixedContext {
    static formKey = 'EmployeeBasicData.EmployeeBasicData';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeBasicDataForm.init)  {
            EmployeeBasicDataForm.init = true;

            var w0 = StringEditor;
            var w1 = IntegerEditor;
            var w2 = DateEditor;
            var w3 = LookupEditor;
            var w4 = EnumEditor;

            initFormType(EmployeeBasicDataForm, [
                'EmployeeName', w0,
                'EmployeeId', w0,
                'Age', w1,
                'Birthday', w2,
                'Address', w0,
                'TelNumber1', w0,
                'RaceId', w3,
                'EmployeeType', w4,
                'Sex', w4,
                'CityId', w3,
                'StateId', w3,
                'NationalityId', w3
            ]);
        }
    }
}

[EmployeeType, SexType]; // referenced types