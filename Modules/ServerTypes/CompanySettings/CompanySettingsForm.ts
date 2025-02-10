import { ImageUploadEditor, StringEditor, LookupEditor, BooleanEditor, IntegerEditor, DecimalEditor, PrefixedContext } from "@serenity-is/corelib";
import { OTJobGradeTimeEditor } from "@/HumanResource/OTJobGradeTime/OTJobGradeTime/OTJobGradeTimeEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface CompanySettingsForm {
    CompanyLogo: ImageUploadEditor;
    CompanyRegistrationNumber: StringEditor;
    CompanyPhone: StringEditor;
    CompanyName: StringEditor;
    BasedCountry: StringEditor;
    CompanyAddress: StringEditor;
    EPFAccountNumber: StringEditor;
    BankAccountNumber: StringEditor;
    SocsoAccountNumber: StringEditor;
    IncomeTaxAccountNumber: StringEditor;
    ZakatAccountNumber: StringEditor;
    BankId: LookupEditor;
    FixedTime: BooleanEditor;
    FixedHour: BooleanEditor;
    FixedHourFlexiTime: BooleanEditor;
    RefreshLeaveOnYearOfService: BooleanEditor;
    RefreshLeaveOnSpecificDate: BooleanEditor;
    LeaveRefreshMonth: IntegerEditor;
    LeaveRefreshDay: IntegerEditor;
    EntitleAnnualBasedOnJobGrade: BooleanEditor;
    EntitleAnnualBasedOnYearOfService: BooleanEditor;
    OneOffEntitlementAnnualLeave: BooleanEditor;
    MonthlyEntitlementAnnualLeave: BooleanEditor;
    EntitleAnualLeaveBeforeProbationPeriodEnd: BooleanEditor;
    DeductSalaryIfLate: BooleanEditor;
    DeductSalaryIfEarlyLeaving: BooleanEditor;
    RetireAge: IntegerEditor;
    PayDay: IntegerEditor;
    LateArrivalEqualHalfDayLeave: IntegerEditor;
    LateArrivalEqualFullDayLeave: IntegerEditor;
    ClockInGracePeriod: IntegerEditor;
    ClockOutGracePeriod: IntegerEditor;
    FixedOtRateCalculation: BooleanEditor;
    VariableOtRateCalculation: BooleanEditor;
    OTMonthDays: BooleanEditor;
    FixedOtRateDenominator: DecimalEditor;
    OtCalculationDescription: StringEditor;
    WeekdayTwo: BooleanEditor;
    WeekdayOnePointFive: BooleanEditor;
    WeekendTwo: BooleanEditor;
    WeekendOnePointFive: BooleanEditor;
    PublicHolidayTwo: BooleanEditor;
    PublicHolidayOnePointFive: BooleanEditor;
    OTMinimumMinute: IntegerEditor;
    MaximumOtMinute: IntegerEditor;
    MaximumBasicSalaryToEntitleForOTPay: BooleanEditor;
    MaximumBasicSalary: IntegerEditor;
    MaximumJobGradeToEntitleForOTPay: BooleanEditor;
    OTJobGradeTime: OTJobGradeTimeEditor;
    DailyNplBasedOnWorkingHour: BooleanEditor;
    DailyNplBasedOnFixedDenominator: BooleanEditor;
    FixedNPLDenominator: DecimalEditor;
    DailyNplMonthDays: BooleanEditor;
    NoPaidLeaveDes: StringEditor;
    HourlyNoPaidLeaveNPL: BooleanEditor;
    HourlyNoPaidLeaveAbsent: BooleanEditor;
    HourlyNoPaidLeaveDes: StringEditor;
    AbsentBasedOnWorkingHour: BooleanEditor;
    AbsentBasedOnFixedDenominator: BooleanEditor;
    FixedAbsentDenominator: DecimalEditor;
    AbsentMonthDays: BooleanEditor;
    AbsentDes: StringEditor;
    EarlyLeavingBasedOnWorkingHour: BooleanEditor;
    EarlyLeavingBasedOnFixedDenominator: BooleanEditor;
    FixedEarlyLeavingDenominator: DecimalEditor;
    EarlyLeavingMonthDays: BooleanEditor;
    EarlyLeavingDes: StringEditor;
    LateArrivalBasedOnWorkingHour: BooleanEditor;
    LateArrivalBasedOnFixedDenominator: BooleanEditor;
    FixedLateArrivalDenominator: DecimalEditor;
    LateArrivalMonthDays: BooleanEditor;
    LateArrivalDes: StringEditor;
    ProbationPeriod: DecimalEditor;
    MonthlyDays: DecimalEditor;
    SundayWeekday: BooleanEditor;
    MondayWeekday: BooleanEditor;
    TuesdayWeekday: BooleanEditor;
    WednesdayWeekday: BooleanEditor;
    ThursdayWeekday: BooleanEditor;
    FridayWeekday: BooleanEditor;
    SaturdayWeekday: BooleanEditor;
    OTApplicationEmployeeApproval: BooleanEditor;
    OTApplicationHrApproval: BooleanEditor;
    OTEitherOne: BooleanEditor;
    LeaveApplicationEmployeeApproval: BooleanEditor;
    LeaveApplicationHrApproval: BooleanEditor;
    LeaveApplicationEitherOne: BooleanEditor;
    MoneyClaimingEmployeeApproval: BooleanEditor;
    MoneyClaimingHrApproval: BooleanEditor;
    MoneyClaimingEitherOne: BooleanEditor;
}

export class CompanySettingsForm extends PrefixedContext {
    static formKey = 'HumanResource.CompanySettings.CompanySettings';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!CompanySettingsForm.init)  {
            CompanySettingsForm.init = true;

            var w0 = ImageUploadEditor;
            var w1 = StringEditor;
            var w2 = LookupEditor;
            var w3 = BooleanEditor;
            var w4 = IntegerEditor;
            var w5 = DecimalEditor;
            var w6 = OTJobGradeTimeEditor;

            initFormType(CompanySettingsForm, [
                'CompanyLogo', w0,
                'CompanyRegistrationNumber', w1,
                'CompanyPhone', w1,
                'CompanyName', w1,
                'BasedCountry', w1,
                'CompanyAddress', w1,
                'EPFAccountNumber', w1,
                'BankAccountNumber', w1,
                'SocsoAccountNumber', w1,
                'IncomeTaxAccountNumber', w1,
                'ZakatAccountNumber', w1,
                'BankId', w2,
                'FixedTime', w3,
                'FixedHour', w3,
                'FixedHourFlexiTime', w3,
                'RefreshLeaveOnYearOfService', w3,
                'RefreshLeaveOnSpecificDate', w3,
                'LeaveRefreshMonth', w4,
                'LeaveRefreshDay', w4,
                'EntitleAnnualBasedOnJobGrade', w3,
                'EntitleAnnualBasedOnYearOfService', w3,
                'OneOffEntitlementAnnualLeave', w3,
                'MonthlyEntitlementAnnualLeave', w3,
                'EntitleAnualLeaveBeforeProbationPeriodEnd', w3,
                'DeductSalaryIfLate', w3,
                'DeductSalaryIfEarlyLeaving', w3,
                'RetireAge', w4,
                'PayDay', w4,
                'LateArrivalEqualHalfDayLeave', w4,
                'LateArrivalEqualFullDayLeave', w4,
                'ClockInGracePeriod', w4,
                'ClockOutGracePeriod', w4,
                'FixedOtRateCalculation', w3,
                'VariableOtRateCalculation', w3,
                'OTMonthDays', w3,
                'FixedOtRateDenominator', w5,
                'OtCalculationDescription', w1,
                'WeekdayTwo', w3,
                'WeekdayOnePointFive', w3,
                'WeekendTwo', w3,
                'WeekendOnePointFive', w3,
                'PublicHolidayTwo', w3,
                'PublicHolidayOnePointFive', w3,
                'OTMinimumMinute', w4,
                'MaximumOtMinute', w4,
                'MaximumBasicSalaryToEntitleForOTPay', w3,
                'MaximumBasicSalary', w4,
                'MaximumJobGradeToEntitleForOTPay', w3,
                'OTJobGradeTime', w6,
                'DailyNplBasedOnWorkingHour', w3,
                'DailyNplBasedOnFixedDenominator', w3,
                'FixedNPLDenominator', w5,
                'DailyNplMonthDays', w3,
                'NoPaidLeaveDes', w1,
                'HourlyNoPaidLeaveNPL', w3,
                'HourlyNoPaidLeaveAbsent', w3,
                'HourlyNoPaidLeaveDes', w1,
                'AbsentBasedOnWorkingHour', w3,
                'AbsentBasedOnFixedDenominator', w3,
                'FixedAbsentDenominator', w5,
                'AbsentMonthDays', w3,
                'AbsentDes', w1,
                'EarlyLeavingBasedOnWorkingHour', w3,
                'EarlyLeavingBasedOnFixedDenominator', w3,
                'FixedEarlyLeavingDenominator', w5,
                'EarlyLeavingMonthDays', w3,
                'EarlyLeavingDes', w1,
                'LateArrivalBasedOnWorkingHour', w3,
                'LateArrivalBasedOnFixedDenominator', w3,
                'FixedLateArrivalDenominator', w5,
                'LateArrivalMonthDays', w3,
                'LateArrivalDes', w1,
                'ProbationPeriod', w5,
                'MonthlyDays', w5,
                'SundayWeekday', w3,
                'MondayWeekday', w3,
                'TuesdayWeekday', w3,
                'WednesdayWeekday', w3,
                'ThursdayWeekday', w3,
                'FridayWeekday', w3,
                'SaturdayWeekday', w3,
                'OTApplicationEmployeeApproval', w3,
                'OTApplicationHrApproval', w3,
                'OTEitherOne', w3,
                'LeaveApplicationEmployeeApproval', w3,
                'LeaveApplicationHrApproval', w3,
                'LeaveApplicationEitherOne', w3,
                'MoneyClaimingEmployeeApproval', w3,
                'MoneyClaimingHrApproval', w3,
                'MoneyClaimingEitherOne', w3
            ]);
        }
    }
}