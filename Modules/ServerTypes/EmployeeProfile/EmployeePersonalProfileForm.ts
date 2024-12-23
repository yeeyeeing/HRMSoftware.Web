import { StringEditor, IntegerEditor, DateEditor, DecimalEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeePersonalProfileForm {
    EmployeeName: StringEditor;
    EmployeeId: StringEditor;
    Nric: StringEditor;
    Age: IntegerEditor;
    LastPaymentDate: DateEditor;
    RecruitmentDate: DateEditor;
    Birthday: DateEditor;
    EmployeeEmail: StringEditor;
    EpfAccountNumber: StringEditor;
    ProbationPeriodEnd: DateEditor;
    ProbationPeriod: IntegerEditor;
    NoticePeriod: IntegerEditor;
    Address: StringEditor;
    TelNumber1: StringEditor;
    TelNumber2: StringEditor;
    PassportNumber: StringEditor;
    PassportIssueDate: DateEditor;
    PassportValidPeriod: IntegerEditor;
    PassportExpiryDate: DateEditor;
    BonusFactor: DecimalEditor;
    BasicSalary: DecimalEditor;
    Allowance: DecimalEditor;
    InsertDate: DateEditor;
    UpdateDate: DateEditor;
    DeleteDate: DateEditor;
    RaceId: IntegerEditor;
    EmployeeType: IntegerEditor;
    Sex: IntegerEditor;
    DepartmentId: IntegerEditor;
    IsActive: IntegerEditor;
    InsertUserId: IntegerEditor;
    UpdateUserId: IntegerEditor;
    DeleteUserId: IntegerEditor;
    DivisionId: IntegerEditor;
    SectionId: IntegerEditor;
    JobGradeId: IntegerEditor;
    OccupationId: IntegerEditor;
    BankId: IntegerEditor;
    BankAccountNumber: StringEditor;
    CityId: IntegerEditor;
    StateId: IntegerEditor;
    EmployeeImg: StringEditor;
    NationalityId: IntegerEditor;
    MaritalStatus: IntegerEditor;
    GrantHrPrivilege: IntegerEditor;
    CreateUser: IntegerEditor;
    PayByHour: IntegerEditor;
    PayByMonth: IntegerEditor;
    PayByDay: IntegerEditor;
    OtPayEntitlement: IntegerEditor;
    DailyWorkingMinutes: IntegerEditor;
    UserPassword: StringEditor;
    UserRowId: IntegerEditor;
    UserName: StringEditor;
    ResignationDate: DateEditor;
    LeaveDate: DateEditor;
    Terminated: IntegerEditor;
    Resigned: IntegerEditor;
    EpfContribution: IntegerEditor;
}

export class EmployeePersonalProfileForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeePersonalProfile';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeePersonalProfileForm.init)  {
            EmployeePersonalProfileForm.init = true;

            var w0 = StringEditor;
            var w1 = IntegerEditor;
            var w2 = DateEditor;
            var w3 = DecimalEditor;

            initFormType(EmployeePersonalProfileForm, [
                'EmployeeName', w0,
                'EmployeeId', w0,
                'Nric', w0,
                'Age', w1,
                'LastPaymentDate', w2,
                'RecruitmentDate', w2,
                'Birthday', w2,
                'EmployeeEmail', w0,
                'EpfAccountNumber', w0,
                'ProbationPeriodEnd', w2,
                'ProbationPeriod', w1,
                'NoticePeriod', w1,
                'Address', w0,
                'TelNumber1', w0,
                'TelNumber2', w0,
                'PassportNumber', w0,
                'PassportIssueDate', w2,
                'PassportValidPeriod', w1,
                'PassportExpiryDate', w2,
                'BonusFactor', w3,
                'BasicSalary', w3,
                'Allowance', w3,
                'InsertDate', w2,
                'UpdateDate', w2,
                'DeleteDate', w2,
                'RaceId', w1,
                'EmployeeType', w1,
                'Sex', w1,
                'DepartmentId', w1,
                'IsActive', w1,
                'InsertUserId', w1,
                'UpdateUserId', w1,
                'DeleteUserId', w1,
                'DivisionId', w1,
                'SectionId', w1,
                'JobGradeId', w1,
                'OccupationId', w1,
                'BankId', w1,
                'BankAccountNumber', w0,
                'CityId', w1,
                'StateId', w1,
                'EmployeeImg', w0,
                'NationalityId', w1,
                'MaritalStatus', w1,
                'GrantHrPrivilege', w1,
                'CreateUser', w1,
                'PayByHour', w1,
                'PayByMonth', w1,
                'PayByDay', w1,
                'OtPayEntitlement', w1,
                'DailyWorkingMinutes', w1,
                'UserPassword', w0,
                'UserRowId', w1,
                'UserName', w0,
                'ResignationDate', w2,
                'LeaveDate', w2,
                'Terminated', w1,
                'Resigned', w1,
                'EpfContribution', w1
            ]);
        }
    }
}