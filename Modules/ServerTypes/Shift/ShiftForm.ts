import { IntegerEditor, StringEditor, TextAreaEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface ShiftForm {
    TypeOfShift: IntegerEditor;
    ShiftColor: StringEditor;
    ShiftName: StringEditor;
    Description: TextAreaEditor;
    NightShiftBetweenStart: StringEditor;
    NightShiftBetweenEnd: StringEditor;
    SundayStartingFrom: StringEditor;
    SundayEndingAt: StringEditor;
    SundayWorkingTime: IntegerEditor;
    SundayLunchTimeStartingFrom: StringEditor;
    SundayLunchTimeEndingAt: StringEditor;
    MondayStartingFrom: StringEditor;
    MondayEndingAt: StringEditor;
    MondayWorkingTime: IntegerEditor;
    MondayLunchTimeStartingFrom: StringEditor;
    MondayLunchTimeEndingAt: StringEditor;
    TuesdayStartingFrom: StringEditor;
    TuesdayEndingAt: StringEditor;
    TuesdayWorkingTime: IntegerEditor;
    TuesdayLunchTimeStartingFrom: StringEditor;
    TuesdayLunchTimeEndingAt: StringEditor;
    WednesdayStartingFrom: StringEditor;
    WednesdayEndingAt: StringEditor;
    WednesdayWorkingTime: IntegerEditor;
    WednesdayLunchTimeStartingFrom: StringEditor;
    WednesdayLunchTimeEndingAt: StringEditor;
    ThursdayStartingFrom: StringEditor;
    ThursdayEndingAt: StringEditor;
    ThursdayWorkingTime: IntegerEditor;
    ThursdayLunchTimeStartingFrom: StringEditor;
    ThursdayLunchTimeEndingAt: StringEditor;
    FridayStartingFrom: StringEditor;
    FridayEndingAt: StringEditor;
    FridayWorkingTime: IntegerEditor;
    FridayLunchTimeStartingFrom: StringEditor;
    FridayLunchTimeEndingAt: StringEditor;
    SaturdayStartingFrom: StringEditor;
    SaturdayEndingAt: StringEditor;
    SaturdayWorkingTime: IntegerEditor;
    SaturdayLunchTimeStartingFrom: StringEditor;
    SaturdayLunchTimeEndingAt: StringEditor;
}

export class ShiftForm extends PrefixedContext {
    static formKey = 'Shift.Shift';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ShiftForm.init)  {
            ShiftForm.init = true;

            var w0 = IntegerEditor;
            var w1 = StringEditor;
            var w2 = TextAreaEditor;

            initFormType(ShiftForm, [
                'TypeOfShift', w0,
                'ShiftColor', w1,
                'ShiftName', w1,
                'Description', w2,
                'NightShiftBetweenStart', w1,
                'NightShiftBetweenEnd', w1,
                'SundayStartingFrom', w1,
                'SundayEndingAt', w1,
                'SundayWorkingTime', w0,
                'SundayLunchTimeStartingFrom', w1,
                'SundayLunchTimeEndingAt', w1,
                'MondayStartingFrom', w1,
                'MondayEndingAt', w1,
                'MondayWorkingTime', w0,
                'MondayLunchTimeStartingFrom', w1,
                'MondayLunchTimeEndingAt', w1,
                'TuesdayStartingFrom', w1,
                'TuesdayEndingAt', w1,
                'TuesdayWorkingTime', w0,
                'TuesdayLunchTimeStartingFrom', w1,
                'TuesdayLunchTimeEndingAt', w1,
                'WednesdayStartingFrom', w1,
                'WednesdayEndingAt', w1,
                'WednesdayWorkingTime', w0,
                'WednesdayLunchTimeStartingFrom', w1,
                'WednesdayLunchTimeEndingAt', w1,
                'ThursdayStartingFrom', w1,
                'ThursdayEndingAt', w1,
                'ThursdayWorkingTime', w0,
                'ThursdayLunchTimeStartingFrom', w1,
                'ThursdayLunchTimeEndingAt', w1,
                'FridayStartingFrom', w1,
                'FridayEndingAt', w1,
                'FridayWorkingTime', w0,
                'FridayLunchTimeStartingFrom', w1,
                'FridayLunchTimeEndingAt', w1,
                'SaturdayStartingFrom', w1,
                'SaturdayEndingAt', w1,
                'SaturdayWorkingTime', w0,
                'SaturdayLunchTimeStartingFrom', w1,
                'SaturdayLunchTimeEndingAt', w1
            ]);
        }
    }
}