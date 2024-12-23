import { DateEditor, ImageUploadEditor, StringEditor, EnumEditor, LookupEditor, IntegerEditor, MultipleImageUploadEditor, BooleanEditor, DecimalEditor, PrefixedContext } from "@serenity-is/corelib";
import { SexType } from "./SexType";
import { EmployeeType } from "./EmployeeType";
import { MaritalStatus } from "./MaritalStatus";
import { ProbationClass } from "./ProbationClass";
import { EmployeeAllowanceEditor } from "@/HumanResource/EmployeeProfile/EmployeeAllowance/EmployeeAllowanceEditor";
import { FixedDeductionEditor } from "@/HumanResource/EmployeeProfile/FixedDeduction/FixedDeductionEditor";
import { EPFClass } from "./EPFClass";
import { EISClass } from "./EISClass";
import { SOCSOClass } from "./SOCSOClass";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeProfileForm {
    ResignationDate: DateEditor;
    ResignLeaveDate: DateEditor;
    TerminateDate: DateEditor;
    TerminateLeaveDate: DateEditor;
    EmployeeImg: ImageUploadEditor;
    EmployeeName: StringEditor;
    EmployeeID: StringEditor;
    Sex: EnumEditor;
    Birthday: DateEditor;
    EmployeeEmail: StringEditor;
    EmployeeType: EnumEditor;
    RecruitmentDate: DateEditor;
    TelNumber1: StringEditor;
    TelNumber2: StringEditor;
    MaritalStatus: EnumEditor;
    Nric: StringEditor;
    RetireDate: DateEditor;
    RaceID: LookupEditor;
    NationalityID: LookupEditor;
    StateID: LookupEditor;
    CityID: LookupEditor;
    PassedProbation: EnumEditor;
    ProbationPeriodFrom: DateEditor;
    ProbationPeriodUntil: DateEditor;
    WorkingPermit: StringEditor;
    ArrivalDate: DateEditor;
    WorkingPermitIssueDate: DateEditor;
    WorkingPermitExpireDate: DateEditor;
    WorkingPermitValidFrom: DateEditor;
    WorkingPermitValidUntil: DateEditor;
    PassportNumber: StringEditor;
    PassportIssueDate: DateEditor;
    PassportValidPeriod: IntegerEditor;
    PassportExpiryDate: DateEditor;
    Address: StringEditor;
    PostalCode: StringEditor;
    CountryID: LookupEditor;
    Cp8dID: LookupEditor;
    DepartmentID: LookupEditor;
    DivisionID: LookupEditor;
    SectionID: LookupEditor;
    JobGradeID: LookupEditor;
    OccupationID: LookupEditor;
    CostCentreID: LookupEditor;
    JobDescription: MultipleImageUploadEditor;
    CreateUser: BooleanEditor;
    GrantHRPrivilege: BooleanEditor;
    UserName: StringEditor;
    UserPassword: StringEditor;
    WorkingSpouse: BooleanEditor;
    ChildrenInUniversity: IntegerEditor;
    ChildrenUnderEighteen: IntegerEditor;
    DisabledChildInUniversity: IntegerEditor;
    DisabledChild: IntegerEditor;
    BasicSalary: DecimalEditor;
    DailyWorkingMinute: IntegerEditor;
    NightShiftAllowancePerDay: DecimalEditor;
    BankID: LookupEditor;
    BankAccountNumber: StringEditor;
    EpfContribution: BooleanEditor;
    OtPayEntitlement: BooleanEditor;
    FixedOtRateOption: BooleanEditor;
    PayByMonth: BooleanEditor;
    PayByHour: BooleanEditor;
    PayByDay: BooleanEditor;
    AllowanceLists: EmployeeAllowanceEditor;
    FixedDeductionList: FixedDeductionEditor;
    EpfClass: EnumEditor;
    EpfAccountNumber: StringEditor;
    EisClass: EnumEditor;
    SocsoClass: EnumEditor;
    SocsoAccountNumber: StringEditor;
    SsfwEffectiveDate: DateEditor;
    PCBnumber: StringEditor;
    CalculationDate: DateEditor;
    WorkingHour: DecimalEditor;
    WorkingDays: DecimalEditor;
    DailyRateBase: DecimalEditor;
    NplRateBase: DecimalEditor;
    OtRateWeekday: DecimalEditor;
    OtRateWeekend: DecimalEditor;
    OtRatePublicHoliday: DecimalEditor;
}

export class EmployeeProfileForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeeProfile';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeProfileForm.init)  {
            EmployeeProfileForm.init = true;

            var w0 = DateEditor;
            var w1 = ImageUploadEditor;
            var w2 = StringEditor;
            var w3 = EnumEditor;
            var w4 = LookupEditor;
            var w5 = IntegerEditor;
            var w6 = MultipleImageUploadEditor;
            var w7 = BooleanEditor;
            var w8 = DecimalEditor;
            var w9 = EmployeeAllowanceEditor;
            var w10 = FixedDeductionEditor;

            initFormType(EmployeeProfileForm, [
                'ResignationDate', w0,
                'ResignLeaveDate', w0,
                'TerminateDate', w0,
                'TerminateLeaveDate', w0,
                'EmployeeImg', w1,
                'EmployeeName', w2,
                'EmployeeID', w2,
                'Sex', w3,
                'Birthday', w0,
                'EmployeeEmail', w2,
                'EmployeeType', w3,
                'RecruitmentDate', w0,
                'TelNumber1', w2,
                'TelNumber2', w2,
                'MaritalStatus', w3,
                'Nric', w2,
                'RetireDate', w0,
                'RaceID', w4,
                'NationalityID', w4,
                'StateID', w4,
                'CityID', w4,
                'PassedProbation', w3,
                'ProbationPeriodFrom', w0,
                'ProbationPeriodUntil', w0,
                'WorkingPermit', w2,
                'ArrivalDate', w0,
                'WorkingPermitIssueDate', w0,
                'WorkingPermitExpireDate', w0,
                'WorkingPermitValidFrom', w0,
                'WorkingPermitValidUntil', w0,
                'PassportNumber', w2,
                'PassportIssueDate', w0,
                'PassportValidPeriod', w5,
                'PassportExpiryDate', w0,
                'Address', w2,
                'PostalCode', w2,
                'CountryID', w4,
                'Cp8dID', w4,
                'DepartmentID', w4,
                'DivisionID', w4,
                'SectionID', w4,
                'JobGradeID', w4,
                'OccupationID', w4,
                'CostCentreID', w4,
                'JobDescription', w6,
                'CreateUser', w7,
                'GrantHRPrivilege', w7,
                'UserName', w2,
                'UserPassword', w2,
                'WorkingSpouse', w7,
                'ChildrenInUniversity', w5,
                'ChildrenUnderEighteen', w5,
                'DisabledChildInUniversity', w5,
                'DisabledChild', w5,
                'BasicSalary', w8,
                'DailyWorkingMinute', w5,
                'NightShiftAllowancePerDay', w8,
                'BankID', w4,
                'BankAccountNumber', w2,
                'EpfContribution', w7,
                'OtPayEntitlement', w7,
                'FixedOtRateOption', w7,
                'PayByMonth', w7,
                'PayByHour', w7,
                'PayByDay', w7,
                'AllowanceLists', w9,
                'FixedDeductionList', w10,
                'EpfClass', w3,
                'EpfAccountNumber', w2,
                'EisClass', w3,
                'SocsoClass', w3,
                'SocsoAccountNumber', w2,
                'SsfwEffectiveDate', w0,
                'PCBnumber', w2,
                'CalculationDate', w0,
                'WorkingHour', w8,
                'WorkingDays', w8,
                'DailyRateBase', w8,
                'NplRateBase', w8,
                'OtRateWeekday', w8,
                'OtRateWeekend', w8,
                'OtRatePublicHoliday', w8
            ]);
        }
    }
}

[SexType, EmployeeType, MaritalStatus, ProbationClass, EPFClass, EISClass, SOCSOClass]; // referenced types