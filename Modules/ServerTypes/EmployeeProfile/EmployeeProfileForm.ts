import { DateEditor, ImageUploadEditor, StringEditor, EnumEditor, IntegerEditor, LookupEditor, DecimalEditor, MultipleImageUploadEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { SexType } from "./SexType";
import { EmployeeType } from "./EmployeeType";
import { MaritalStatus } from "./MaritalStatus";
import { ProbationClass } from "./ProbationClass";
import { EmployeeCareerPathEditor } from "@/HumanResource/EmployeeProfile/EmployeeCareerPath/EmployeeCareerPathEditor";
import { EmployeeCp38Editor } from "@/HumanResource/EmployeeProfile/EmployeeCp38/EmployeeCp38Editor";
import { EmployeeAllowanceEditor } from "@/HumanResource/EmployeeProfile/EmployeeAllowance/EmployeeAllowanceEditor";
import { FixedDeductionEditor } from "@/HumanResource/EmployeeProfile/FixedDeduction/FixedDeductionEditor";
import { EPFClass } from "./EPFClass";
import { EISClass } from "./EISClass";
import { SOCSOClass } from "./SOCSOClass";
import { HRDFClass } from "./HRDFClass";
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
    Age: IntegerEditor;
    RetireDate: DateEditor;
    Nric: StringEditor;
    OldNRIC: StringEditor;
    RaceID: LookupEditor;
    NationalityID: LookupEditor;
    JoinDate: DateEditor;
    ProbationPeriod: DecimalEditor;
    ProbationPeriodFrom: StringEditor;
    ProbationPeriodUntil: StringEditor;
    PassedProbation: EnumEditor;
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
    PostcodeId: LookupEditor;
    CountryID: LookupEditor;
    StateID: LookupEditor;
    CityID: LookupEditor;
    DivisionID: LookupEditor;
    DepartmentID: LookupEditor;
    SectionID: LookupEditor;
    JobGradeID: LookupEditor;
    Cp8dID: LookupEditor;
    OccupationID: LookupEditor;
    CostCentreID: LookupEditor;
    JobDescription: MultipleImageUploadEditor;
    EmployeeCareerPath: EmployeeCareerPathEditor;
    CreateUser: BooleanEditor;
    GrantHRPrivilege: BooleanEditor;
    UserName: StringEditor;
    UserPassword: StringEditor;
    UserRowID: IntegerEditor;
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
    Cp38Lists: EmployeeCp38Editor;
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
    SsfwNumber: StringEditor;
    HRDFClass: EnumEditor;
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
            var w4 = IntegerEditor;
            var w5 = LookupEditor;
            var w6 = DecimalEditor;
            var w7 = MultipleImageUploadEditor;
            var w8 = EmployeeCareerPathEditor;
            var w9 = BooleanEditor;
            var w10 = EmployeeCp38Editor;
            var w11 = EmployeeAllowanceEditor;
            var w12 = FixedDeductionEditor;

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
                'Age', w4,
                'RetireDate', w0,
                'Nric', w2,
                'OldNRIC', w2,
                'RaceID', w5,
                'NationalityID', w5,
                'JoinDate', w0,
                'ProbationPeriod', w6,
                'ProbationPeriodFrom', w2,
                'ProbationPeriodUntil', w2,
                'PassedProbation', w3,
                'WorkingPermit', w2,
                'ArrivalDate', w0,
                'WorkingPermitIssueDate', w0,
                'WorkingPermitExpireDate', w0,
                'WorkingPermitValidFrom', w0,
                'WorkingPermitValidUntil', w0,
                'PassportNumber', w2,
                'PassportIssueDate', w0,
                'PassportValidPeriod', w4,
                'PassportExpiryDate', w0,
                'Address', w2,
                'PostcodeId', w5,
                'CountryID', w5,
                'StateID', w5,
                'CityID', w5,
                'DivisionID', w5,
                'DepartmentID', w5,
                'SectionID', w5,
                'JobGradeID', w5,
                'Cp8dID', w5,
                'OccupationID', w5,
                'CostCentreID', w5,
                'JobDescription', w7,
                'EmployeeCareerPath', w8,
                'CreateUser', w9,
                'GrantHRPrivilege', w9,
                'UserName', w2,
                'UserPassword', w2,
                'UserRowID', w4,
                'WorkingSpouse', w9,
                'ChildrenInUniversity', w4,
                'ChildrenUnderEighteen', w4,
                'DisabledChildInUniversity', w4,
                'DisabledChild', w4,
                'BasicSalary', w6,
                'DailyWorkingMinute', w4,
                'NightShiftAllowancePerDay', w6,
                'BankID', w5,
                'BankAccountNumber', w2,
                'Cp38Lists', w10,
                'OtPayEntitlement', w9,
                'FixedOtRateOption', w9,
                'PayByMonth', w9,
                'PayByHour', w9,
                'PayByDay', w9,
                'AllowanceLists', w11,
                'FixedDeductionList', w12,
                'EpfClass', w3,
                'EpfAccountNumber', w2,
                'EisClass', w3,
                'SocsoClass', w3,
                'SocsoAccountNumber', w2,
                'SsfwEffectiveDate', w0,
                'SsfwNumber', w2,
                'HRDFClass', w3,
                'PCBnumber', w2,
                'CalculationDate', w0,
                'WorkingHour', w6,
                'WorkingDays', w6,
                'DailyRateBase', w6,
                'NplRateBase', w6,
                'OtRateWeekday', w6,
                'OtRateWeekend', w6,
                'OtRatePublicHoliday', w6
            ]);
        }
    }
}

[SexType, EmployeeType, MaritalStatus, ProbationClass, EPFClass, EISClass, SOCSOClass, HRDFClass]; // referenced types