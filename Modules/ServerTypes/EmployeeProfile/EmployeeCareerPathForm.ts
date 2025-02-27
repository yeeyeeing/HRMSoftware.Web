import { IntegerEditor, LookupEditor, DecimalEditor, DateEditor, TextAreaEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeCareerPathForm {
    Id: IntegerEditor;
    CareerPathId: LookupEditor;
    EmployeeRowId: LookupEditor;
    NewValue: DecimalEditor;
    newDivision: LookupEditor;
    newDepartment: LookupEditor;
    newSection: LookupEditor;
    newOccupation: LookupEditor;
    newJobGrade: LookupEditor;
    newCostCentre: LookupEditor;
    CategoryId: IntegerEditor;
    careerPaathType: IntegerEditor;
    EffectiveDate: DateEditor;
    Description: TextAreaEditor;
    ManDesc: TextAreaEditor;
    oldValue: DecimalEditor;
    oldDivision: IntegerEditor;
    oldDepartment: IntegerEditor;
    oldSection: IntegerEditor;
    oldOccupation: IntegerEditor;
    oldJobGrade: IntegerEditor;
    oldCostCentre: IntegerEditor;
}

export class EmployeeCareerPathForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeeCareerPath';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeCareerPathForm.init)  {
            EmployeeCareerPathForm.init = true;

            var w0 = IntegerEditor;
            var w1 = LookupEditor;
            var w2 = DecimalEditor;
            var w3 = DateEditor;
            var w4 = TextAreaEditor;

            initFormType(EmployeeCareerPathForm, [
                'Id', w0,
                'CareerPathId', w1,
                'EmployeeRowId', w1,
                'NewValue', w2,
                'newDivision', w1,
                'newDepartment', w1,
                'newSection', w1,
                'newOccupation', w1,
                'newJobGrade', w1,
                'newCostCentre', w1,
                'CategoryId', w0,
                'careerPaathType', w0,
                'EffectiveDate', w3,
                'Description', w4,
                'ManDesc', w4,
                'oldValue', w2,
                'oldDivision', w0,
                'oldDepartment', w0,
                'oldSection', w0,
                'oldOccupation', w0,
                'oldJobGrade', w0,
                'oldCostCentre', w0
            ]);
        }
    }
}