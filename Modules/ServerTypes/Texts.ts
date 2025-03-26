import { proxyTexts } from "@serenity-is/corelib/q";

namespace HRMSoftware.Texts {

    export declare namespace Db {

        namespace AbsentRecord {

            namespace AbsentRecord {
                export const AbsentDate: string;
                export const DepartmentID: string;
                export const DepartmentName: string;
                export const DivisionID: string;
                export const DivisionName: string;
                export const EmployeeId: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const HalfDay: string;
                export const Id: string;
                export const JobGradeID: string;
                export const JobGradeName: string;
                export const OccupationID: string;
                export const OccupationName: string;
                export const Processed: string;
            }
        }

        namespace Administration {

            namespace Language {
                export const Id: string;
                export const LanguageId: string;
                export const LanguageName: string;
            }

            namespace Role {
                export const RoleId: string;
                export const RoleKey: string;
                export const RoleName: string;
            }

            namespace RolePermission {
                export const PermissionKey: string;
                export const RoleId: string;
                export const RoleName: string;
                export const RolePermissionId: string;
            }

            namespace User {
                export const DisplayName: string;
                export const Email: string;
                export const EmployeeName: string;
                export const EmployeeRowID: string;
                export const ImpersonationToken: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const LastDirectoryUpdate: string;
                export const MobilePhoneNumber: string;
                export const MobilePhoneVerified: string;
                export const Password: string;
                export const PasswordConfirm: string;
                export const PasswordHash: string;
                export const PasswordSalt: string;
                export const Roles: string;
                export const Source: string;
                export const TwoFactorAuth: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UserId: string;
                export const UserImage: string;
                export const Username: string;
            }

            namespace UserPermission {
                export const Granted: string;
                export const PermissionKey: string;
                export const User: string;
                export const UserId: string;
                export const UserPermissionId: string;
                export const Username: string;
            }

            namespace UserRole {
                export const RoleId: string;
                export const User: string;
                export const UserId: string;
                export const UserRoleId: string;
                export const Username: string;
            }
        }

        namespace Announcement {

            namespace Announcement {
                export const AnnouncementContent: string;
                export const AnnouncementDateTime: string;
                export const AnnouncerEmployeeRowId: string;
                export const AnnouncerID: string;
                export const AnnouncerName: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeRowId: string;
                export const Hide: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UploadDocument: string;
                export const ViewTime: string;
                export const Viewed: string;
            }

            namespace AnnouncementDepartmentBinded {
                export const AnnouncementRecurringId: string;
                export const AnnouncementWizardId: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace AnnouncementDivisionBinded {
                export const AnnouncementRecurringId: string;
                export const AnnouncementWizardId: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DivisionId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace AnnouncementGenerated {
                export const AnnouncementContent: string;
                export const AnnouncementDateTime: string;
                export const AnnouncementTime: string;
                export const BindToDepartment: string;
                export const BindToDivision: string;
                export const BindToJobGrade: string;
                export const BindToOccupation: string;
                export const BindToSection: string;
                export const Delayed: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentDept: string;
                export const Division: string;
                export const EmployeeDepartment: string;
                export const EmployeeDivision: string;
                export const EmployeeID: string;
                export const EmployeeJobGrade: string;
                export const EmployeeName: string;
                export const EmployeeOccupation: string;
                export const EmployeeRowId: string;
                export const EmployeeSection: string;
                export const GeneratedRecurringId: string;
                export const GeneratedWizardId: string;
                export const Id: string;
                export const Immediate: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGrade: string;
                export const Occupation: string;
                export const Remarks: string;
                export const Section: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UploadDocument: string;
                export const ViewTime: string;
                export const Viewed: string;
            }

            namespace AnnouncementJobGradeBinded {
                export const AnnouncementRecurringId: string;
                export const AnnouncementWizardId: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace AnnouncementOccupationBinded {
                export const AnnouncementRecurringId: string;
                export const AnnouncementWizardId: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const OccupationId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace AnnouncementSectionBinded {
                export const AnnouncementRecurringId: string;
                export const AnnouncementWizardId: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const SectionId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace AnnouncementWizard {
                export const All: string;
                export const AnnouncementContent: string;
                export const AnnouncementDateTime: string;
                export const AnnouncementList: string;
                export const AnnouncementTime: string;
                export const BindToDepartment: string;
                export const BindToDivision: string;
                export const BindToJobGrade: string;
                export const BindToOccupation: string;
                export const BindToSection: string;
                export const Delayed: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentListActual: string;
                export const DivisionListActual: string;
                export const EmployeeRowList: string;
                export const Id: string;
                export const Immediate: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const IssuedBy: string;
                export const JobGradeListActual: string;
                export const OccupationListActual: string;
                export const Remarks: string;
                export const SectionListActual: string;
                export const Today: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UploadDocument: string;
            }

            namespace RecurringAnnouncement {
                export const All: string;
                export const AnnouncementContent: string;
                export const AnnouncementList: string;
                export const BindToDepartment: string;
                export const BindToDivision: string;
                export const BindToJobGrade: string;
                export const BindToOccupation: string;
                export const BindToSection: string;
                export const DaysOfWeekRecurring: string;
                export const DaysPerRecurring: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentListActual: string;
                export const DivisionListActual: string;
                export const EmployeeListActual: string;
                export const Friday: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IntervalInDays: string;
                export const IsActive: string;
                export const JobGradeListActual: string;
                export const Monday: string;
                export const Name: string;
                export const OccupationListActual: string;
                export const RecurringTime: string;
                export const Remarks: string;
                export const Saturday: string;
                export const SectionListActual: string;
                export const StartingDateTime: string;
                export const Sunday: string;
                export const Thursday: string;
                export const Tuesday: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UploadDocument: string;
                export const Wednesday: string;
            }

            namespace RecurringBindedEmployee {
                export const EmployeeRowId: string;
                export const Id: string;
                export const RecurringId: string;
            }
        }

        namespace AnnualLeaveJobGradePolicy {

            namespace AnnualLeaveJobGradePolicy {
                export const CompanySettingID: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EligibleDays: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeLevel: string;
                export const JobGradeName: string;
                export const MaximumAccumulated: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const Year: string;
            }
        }

        namespace AnnualLeavePolicy {

            namespace AnnualLeavePolicy {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EligibleDays: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const MaximumAccumulated: string;
                export const PolicyRow: string;
                export const ServiceFromYear: string;
                export const ServiceUntilYear: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const Year: string;
            }
        }

        namespace BringForward {

            namespace BringForward {
                export const BringForward: string;
                export const BringForwardToYear: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeRowId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace CompanySettings {

            namespace CompanySettings {
                export const AbsentBasedOnFixedDenominator: string;
                export const AbsentBasedOnWorkingHour: string;
                export const AbsentDes: string;
                export const AbsentMonthDays: string;
                export const BankAccountNumber: string;
                export const BankId: string;
                export const BankName: string;
                export const BasedCountry: string;
                export const ClockInGracePeriod: string;
                export const ClockOutGracePeriod: string;
                export const CompanyAddress: string;
                export const CompanyLogo: string;
                export const CompanyName: string;
                export const CompanyPhone: string;
                export const CompanyRegistrationNumber: string;
                export const DailyNplBasedOnFixedDenominator: string;
                export const DailyNplBasedOnWorkingHour: string;
                export const DailyNplMonthDays: string;
                export const DeductSalaryIfEarlyLeaving: string;
                export const DeductSalaryIfLate: string;
                export const EPFAccountNumber: string;
                export const EarlyLeavingBasedOnFixedDenominator: string;
                export const EarlyLeavingBasedOnWorkingHour: string;
                export const EarlyLeavingDes: string;
                export const EarlyLeavingMonthDays: string;
                export const EffectiveSince: string;
                export const EffectiveUntil: string;
                export const EntitleAnnualBasedOnJobGrade: string;
                export const EntitleAnnualBasedOnYearOfService: string;
                export const EntitleAnualLeaveBeforeProbationPeriodEnd: string;
                export const FixedAbsentDenominator: string;
                export const FixedEarlyLeavingDenominator: string;
                export const FixedHour: string;
                export const FixedHourFlexiTime: string;
                export const FixedLateArrivalDenominator: string;
                export const FixedNPLDenominator: string;
                export const FixedOtRateCalculation: string;
                export const FixedOtRateDenominator: string;
                export const FixedTime: string;
                export const FridayWeekday: string;
                export const HourlyNoPaidLeaveAbsent: string;
                export const HourlyNoPaidLeaveDes: string;
                export const HourlyNoPaidLeaveNPL: string;
                export const Id: string;
                export const IncomeTaxAccountNumber: string;
                export const InsertDate: string;
                export const IsActive: string;
                export const LateArrivalBasedOnFixedDenominator: string;
                export const LateArrivalBasedOnWorkingHour: string;
                export const LateArrivalDes: string;
                export const LateArrivalEqualFullDayLeave: string;
                export const LateArrivalEqualHalfDayLeave: string;
                export const LateArrivalMonthDays: string;
                export const LeaveApplicationEitherOne: string;
                export const LeaveApplicationEmployeeApproval: string;
                export const LeaveApplicationHrApproval: string;
                export const LeaveRefreshDate: string;
                export const LeaveRefreshDay: string;
                export const LeaveRefreshMonth: string;
                export const MaximumBasicSalary: string;
                export const MaximumBasicSalaryToEntitleForOTPay: string;
                export const MaximumJobGradeToEntitleForOTPay: string;
                export const MaximumOtMinute: string;
                export const MondayWeekday: string;
                export const MoneyClaimingEitherOne: string;
                export const MoneyClaimingEmployeeApproval: string;
                export const MoneyClaimingHrApproval: string;
                export const MonthlyDays: string;
                export const MonthlyEntitlementAnnualLeave: string;
                export const NoPaidLeaveDes: string;
                export const OTApplicationEmployeeApproval: string;
                export const OTApplicationHrApproval: string;
                export const OTEitherOne: string;
                export const OTJobGradeTime: string;
                export const OTMinimumMinute: string;
                export const OTMonthDays: string;
                export const OneOffEntitlementAnnualLeave: string;
                export const OtCalculationDescription: string;
                export const PayDay: string;
                export const Paydate: string;
                export const ProbationPeriod: string;
                export const PublicHolidayOnePointFive: string;
                export const PublicHolidayTwo: string;
                export const RefreshLeaveOnSpecificDate: string;
                export const RefreshLeaveOnYearOfService: string;
                export const RetireAge: string;
                export const SaturdayWeekday: string;
                export const SocsoAccountNumber: string;
                export const SundayWeekday: string;
                export const ThursdayWeekday: string;
                export const TuesdayWeekday: string;
                export const VariableOtRateCalculation: string;
                export const WednesdayWeekday: string;
                export const WeekdayOnePointFive: string;
                export const WeekdayTwo: string;
                export const WeekendOnePointFive: string;
                export const WeekendTwo: string;
                export const ZakatAccountNumber: string;
            }
        }

        namespace EmployeeAttendance {

            namespace EmployeeAttendance {
                export const AuthenticationDate: string;
                export const AuthenticationDateTime: string;
                export const AuthenticationSecond: string;
                export const AuthenticationTime: string;
                export const CardNo: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentID: string;
                export const DepartmentName: string;
                export const DeviceName: string;
                export const DeviceSerial: string;
                export const Direction: string;
                export const DivisionID: string;
                export const DivisionName: string;
                export const EarlyLeave: string;
                export const EmployeeId: string;
                export const EmployeeName: string;
                export const EmployeeRowID: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeID: string;
                export const JobGradeName: string;
                export const LateIn: string;
                export const OccupationID: string;
                export const OccupationName: string;
                export const Ot: string;
                export const PersonName: string;
                export const Processed: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace ShiftAttendanceRecord {
                export const CostCentreID: string;
                export const CostCentreName: string;
                export const DepartmentID: string;
                export const DepartmentList: string;
                export const DepartmentName: string;
                export const DivisionID: string;
                export const DivisionList: string;
                export const DivisionName: string;
                export const EarlyLeave: string;
                export const EmpRemark: string;
                export const EmployeeID: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const EmployeeRowList: string;
                export const EmployeeRowListBuffer: string;
                export const Id: string;
                export const JobGradeID: string;
                export const JobGradeList: string;
                export const JobGradeName: string;
                export const LateIn: string;
                export const LvPhRemark: string;
                export const OccupationID: string;
                export const OccupationList: string;
                export const OccupationName: string;
                export const Ot: string;
                export const SectionList: string;
                export const ShiftDate: string;
                export const ShiftEndTime: string;
                export const ShiftEndTimeHour: string;
                export const ShiftId: string;
                export const ShiftName: string;
                export const ShiftStartTime: string;
                export const ShiftStartTimeHour: string;
                export const SupRemark: string;
                export const TimeIn: string;
                export const TimeInHour: string;
                export const TimeInRowId: string;
                export const TimeOut: string;
                export const TimeOutHour: string;
                export const TimeOutRowId: string;
                export const endDate: string;
                export const startDate: string;
            }
        }

        namespace EmployeeBasicData {

            namespace EmployeeBasicData {
                export const Address: string;
                export const Age: string;
                export const Birthday: string;
                export const CityId: string;
                export const CityName: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeId: string;
                export const EmployeeImg: string;
                export const EmployeeName: string;
                export const EmployeeType: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const MaritalStatus: string;
                export const NationalityId: string;
                export const NationalityName: string;
                export const Nric: string;
                export const Race: string;
                export const RaceId: string;
                export const Sex: string;
                export const StateId: string;
                export const StateName: string;
                export const TelNumber1: string;
                export const TelNumber2: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace EmployeeEarlyLeaving {

            namespace EmployeeEarlyLeaving {
                export const Date: string;
                export const Deducted: string;
                export const Deductions: string;
                export const DepartmentID: string;
                export const DepartmentName: string;
                export const DivisionID: string;
                export const DivisionName: string;
                export const EarlyMins: string;
                export const EmployeeId: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const Id: string;
                export const JobGradeID: string;
                export const JobGradeName: string;
                export const OccupationID: string;
                export const OccupationName: string;
                export const Processed: string;
            }
        }

        namespace EmployeeEditHistory {

            namespace EmployeeEditHistory {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const EmployeeRowId: string;
                export const FieldName: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const NewValue: string;
                export const OldValue: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace EmployeeGroup {

            namespace EmployeeGroup {
                export const ActualShifts: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentList: string;
                export const Description: string;
                export const DivisionList: string;
                export const EmployeeList: string;
                export const EndDate: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeList: string;
                export const Name: string;
                export const NewAddedEmployee: string;
                export const OccupationList: string;
                export const SectionList: string;
                export const ShiftColor: string;
                export const Shifts: string;
                export const StartDate: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace EmployeeGroupShift {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeGroupId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Shift: string;
                export const ShiftEndDate: string;
                export const ShiftId: string;
                export const ShiftStartDate: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace EmployeeGroupShiftPattern {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeGroupId: string;
                export const EmployeeRowId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const ShiftEndDate: string;
                export const ShiftId: string;
                export const ShiftName: string;
                export const ShiftStartDate: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace EmployeeGroupings {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeGroupId: string;
                export const EmployeeRowId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace EmployeeLate {

            namespace EmployeeLate {
                export const Date: string;
                export const Deducted: string;
                export const Deductions: string;
                export const DepartmentID: string;
                export const DepartmentName: string;
                export const DivisionID: string;
                export const DivisionName: string;
                export const EmployeeId: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const Id: string;
                export const JobGradeID: string;
                export const JobGradeName: string;
                export const LateMins: string;
                export const OccupationID: string;
                export const OccupationName: string;
                export const Processed: string;
            }
        }

        namespace EmployeeProfile {

            namespace EmployeeAllowance {
                export const AllowanceCode: string;
                export const AllowanceSubjections: string;
                export const Amount: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const EffectiveFrom: string;
                export const EffectiveUntil: string;
                export const EmployeeRowId: string;
                export const ExemptAnnualLeave: string;
                export const ExemptCompassionateLeave: string;
                export const ExemptEmergencyLeave: string;
                export const ExemptGatepassLeave: string;
                export const ExemptHospitalisationLeave: string;
                export const ExemptMarriageLeave: string;
                export const ExemptMaternityLeave: string;
                export const ExemptPaternityLeave: string;
                export const ExemptSickLeave: string;
                export const ExemptUnpaidLeave: string;
                export const FullAttendance: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const MasterAllowanceId: string;
                export const NoAbsence: string;
                export const NoEarlyLeaving: string;
                export const NoLate: string;
                export const OneTime: string;
                export const PaidOneTime: string;
                export const Recurring: string;
                export const SubjectionEis: string;
                export const SubjectionEpf: string;
                export const SubjectionHrdf: string;
                export const SubjectionOt: string;
                export const SubjectionPcb: string;
                export const SubjectionSocso: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace EmployeeBonus {
                export const BonusAmount: string;
                export const BonusDescription: string;
                export const CostCentreID: string;
                export const CostCentreName: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentID: string;
                export const DepartmentName: string;
                export const DivisionID: string;
                export const DivisionName: string;
                export const EmployeeID: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeID: string;
                export const JobGradeName: string;
                export const OccupationID: string;
                export const OccupationName: string;
                export const PayMonth: string;
                export const PayYear: string;
                export const SectionID: string;
                export const SectionName: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace EmployeeCareerPath {
                export const CareerPathCode: string;
                export const CareerPathId: string;
                export const CategoryId: string;
                export const CostCentreName: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentDept: string;
                export const Description: string;
                export const Division: string;
                export const EffectiveDate: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const Executed: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGrade: string;
                export const ManDesc: string;
                export const NewValue: string;
                export const Occupation: string;
                export const Section: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const ValueString: string;
                export const careerPaathType: string;
                export const newCostCentre: string;
                export const newDepartment: string;
                export const newDivision: string;
                export const newJobGrade: string;
                export const newOccupation: string;
                export const newSection: string;
                export const oldCostCentre: string;
                export const oldDepartment: string;
                export const oldDivision: string;
                export const oldJobGrade: string;
                export const oldOccupation: string;
                export const oldSection: string;
                export const oldValue: string;
            }

            namespace EmployeeCp38 {
                export const Cp38Amount: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EffectiveFrom: string;
                export const EffectiveUntil: string;
                export const EmployeeID: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace EmployeeIncentive {
                export const CostCentreID: string;
                export const CostCentreName: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentID: string;
                export const DepartmentName: string;
                export const DivisionID: string;
                export const DivisionName: string;
                export const EmployeeID: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const Id: string;
                export const IncentiveAmount: string;
                export const IncentiveDescription: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeID: string;
                export const JobGradeName: string;
                export const OccupationID: string;
                export const OccupationName: string;
                export const PayMonth: string;
                export const PayYear: string;
                export const SectionID: string;
                export const SectionName: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace EmployeePersonalProfile {
                export const Address: string;
                export const Age: string;
                export const Allowance: string;
                export const BankAccountNumber: string;
                export const BankId: string;
                export const BankName: string;
                export const BasicSalary: string;
                export const Birthday: string;
                export const BonusFactor: string;
                export const CityId: string;
                export const CityName: string;
                export const CreateUser: string;
                export const DailyWorkingMinutes: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentId: string;
                export const DepartmentName: string;
                export const DivisionId: string;
                export const DivisionName: string;
                export const EmployeeEmail: string;
                export const EmployeeId: string;
                export const EmployeeImg: string;
                export const EmployeeName: string;
                export const EmployeeType: string;
                export const EpfAccountNumber: string;
                export const EpfContribution: string;
                export const GrantHrPrivilege: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeId: string;
                export const JobGradeName: string;
                export const LastPaymentDate: string;
                export const LeaveDate: string;
                export const MaritalStatus: string;
                export const NationalityId: string;
                export const NationalityName: string;
                export const NoticePeriod: string;
                export const Nric: string;
                export const OccupationId: string;
                export const OccupationName: string;
                export const OtPayEntitlement: string;
                export const PassportExpiryDate: string;
                export const PassportIssueDate: string;
                export const PassportNumber: string;
                export const PassportValidPeriod: string;
                export const PayByDay: string;
                export const PayByHour: string;
                export const PayByMonth: string;
                export const ProbationPeriod: string;
                export const ProbationPeriodEnd: string;
                export const Race: string;
                export const RaceId: string;
                export const RecruitmentDate: string;
                export const ResignationDate: string;
                export const Resigned: string;
                export const SectionId: string;
                export const SectionName: string;
                export const Sex: string;
                export const StateId: string;
                export const StateName: string;
                export const TelNumber1: string;
                export const TelNumber2: string;
                export const Terminated: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UserName: string;
                export const UserPassword: string;
                export const UserRowId: string;
            }

            namespace EmployeeProfile {
                export const Address: string;
                export const Age: string;
                export const AllowanceLists: string;
                export const ArrivalDate: string;
                export const BankAccountNumber: string;
                export const BankID: string;
                export const BankName: string;
                export const BasicSalary: string;
                export const Birthday: string;
                export const BonusFactor: string;
                export const CalculationDate: string;
                export const ChildrenInUniversity: string;
                export const ChildrenUnderEighteen: string;
                export const CityID: string;
                export const CityName: string;
                export const CostCentreID: string;
                export const CostCentreName: string;
                export const CountryID: string;
                export const CountryName: string;
                export const Cp38Lists: string;
                export const Cp8dID: string;
                export const Cp8dName: string;
                export const CreateUser: string;
                export const DailyRateBase: string;
                export const DailyWorkingMinute: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentDept: string;
                export const DepartmentID: string;
                export const DisabledChild: string;
                export const DisabledChildInUniversity: string;
                export const Division: string;
                export const DivisionID: string;
                export const EisClass: string;
                export const EmployeeCareerPath: string;
                export const EmployeeEmail: string;
                export const EmployeeID: string;
                export const EmployeeImg: string;
                export const EmployeeName: string;
                export const EmployeeType: string;
                export const EpfAccountNumber: string;
                export const EpfClass: string;
                export const FixedDeductionList: string;
                export const FixedOtRateOption: string;
                export const GrantHRPrivilege: string;
                export const HRDFClass: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobDescription: string;
                export const JobGrade: string;
                export const JobGradeID: string;
                export const JoinDate: string;
                export const LastPaymentDate: string;
                export const MaritalStatus: string;
                export const NationalityID: string;
                export const NationalityName: string;
                export const NightShiftAllowancePerDay: string;
                export const NoticePeriod: string;
                export const NplRateBase: string;
                export const Nric: string;
                export const NumberOfWorkingDays: string;
                export const Occupation: string;
                export const OccupationID: string;
                export const OldNRIC: string;
                export const OtPayEntitlement: string;
                export const OtRate: string;
                export const OtRatePublicHoliday: string;
                export const OtRateWeekday: string;
                export const OtRateWeekend: string;
                export const PCBnumber: string;
                export const PassedProbation: string;
                export const PassportExpiryDate: string;
                export const PassportIssueDate: string;
                export const PassportNumber: string;
                export const PassportValidPeriod: string;
                export const PayByDay: string;
                export const PayByHour: string;
                export const PayByMonth: string;
                export const PostalCode: string;
                export const PostcodeId: string;
                export const ProbationPeriod: string;
                export const ProbationPeriodFrom: string;
                export const ProbationPeriodUntil: string;
                export const Race: string;
                export const RaceID: string;
                export const RecruitmentDate: string;
                export const ResignLeaveDate: string;
                export const ResignationDate: string;
                export const Resigned: string;
                export const RetireDate: string;
                export const Retired: string;
                export const Section: string;
                export const SectionID: string;
                export const Sex: string;
                export const SocsoAccountNumber: string;
                export const SocsoClass: string;
                export const SsfwEffectiveDate: string;
                export const SsfwNumber: string;
                export const StateID: string;
                export const StateName: string;
                export const TelNumber1: string;
                export const TelNumber2: string;
                export const TerminateDate: string;
                export const TerminateLeaveDate: string;
                export const Terminated: string;
                export const TotalWorkingTimeInMinutes: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UserName: string;
                export const UserPassword: string;
                export const UserRowID: string;
                export const WorkingDays: string;
                export const WorkingHour: string;
                export const WorkingPermit: string;
                export const WorkingPermitExpireDate: string;
                export const WorkingPermitIssueDate: string;
                export const WorkingPermitValidFrom: string;
                export const WorkingPermitValidUntil: string;
                export const WorkingSpouse: string;
            }

            namespace EmployeeResign {
                export const Id: string;
                export const NoticePeriod: string;
                export const ResignLeaveDate: string;
                export const ResignationDate: string;
            }

            namespace FixedDeduction {
                export const Amount: string;
                export const DeductedOneTime: string;
                export const DeductionCode: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const EffectiveFrom: string;
                export const EffectiveUntil: string;
                export const EmployeeRowId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const MasterDeductionId: string;
                export const OneTime: string;
                export const Recurring: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace MasterAllowance {
                export const AllowanceCode: string;
                export const AllowanceSubjections: string;
                export const Amount: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const ExemptAnnualLeave: string;
                export const ExemptCompassionateLeave: string;
                export const ExemptEmergencyLeave: string;
                export const ExemptGatepassLeave: string;
                export const ExemptHospitalisationLeave: string;
                export const ExemptMarriageLeave: string;
                export const ExemptMaternityLeave: string;
                export const ExemptPaternityLeave: string;
                export const ExemptSickLeave: string;
                export const ExemptUnpaidLeave: string;
                export const FullAttendance: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const NoAbsence: string;
                export const NoEarlyLeaving: string;
                export const NoLate: string;
                export const OneTime: string;
                export const Recurring: string;
                export const SubjectionEis: string;
                export const SubjectionEpf: string;
                export const SubjectionHrdf: string;
                export const SubjectionOt: string;
                export const SubjectionPcb: string;
                export const SubjectionSocso: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace MasterCareerPath {
                export const CareerPathCode: string;
                export const CareerPathType: string;
                export const CategoryId: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace MasterDeduction {
                export const Amount: string;
                export const DeductionCode: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const OneTime: string;
                export const Recurring: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace TerminateEmployee {
                export const Id: string;
                export const NoticePeriod: string;
                export const TerminateDate: string;
                export const TerminateLeaveDate: string;
            }

            namespace UserCreation {
                export const Address: string;
                export const Age: string;
                export const AllEmployee: string;
                export const Allowance: string;
                export const BankAccountNumber: string;
                export const BankId: string;
                export const BankName: string;
                export const BasicSalary: string;
                export const Birthday: string;
                export const BonusFactor: string;
                export const ChildrenInUniversity: string;
                export const ChildrenUnderEighteen: string;
                export const CityId: string;
                export const CityName: string;
                export const CountryId: string;
                export const CreateUser: string;
                export const DailyWorkingMinutes: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentId: string;
                export const DepartmentList: string;
                export const DepartmentName: string;
                export const DivisionId: string;
                export const DivisionList: string;
                export const DivisionName: string;
                export const EmployeeEmail: string;
                export const EmployeeId: string;
                export const EmployeeImg: string;
                export const EmployeeName: string;
                export const EmployeeRowHrPriveledge: string;
                export const EmployeeRowList: string;
                export const EmployeeType: string;
                export const EpfAccountNumber: string;
                export const EpfContribution: string;
                export const GrantHrPrivilege: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeId: string;
                export const JobGradeList: string;
                export const JobGradeName: string;
                export const LastPaymentDate: string;
                export const LeaveDate: string;
                export const MaritalStatus: string;
                export const NationalityId: string;
                export const NationalityName: string;
                export const NoticePeriod: string;
                export const Nric: string;
                export const OccupationId: string;
                export const OccupationList: string;
                export const OccupationName: string;
                export const OtPayEntitlement: string;
                export const PassportExpiryDate: string;
                export const PassportIssueDate: string;
                export const PassportNumber: string;
                export const PassportValidPeriod: string;
                export const PayByDay: string;
                export const PayByHour: string;
                export const PayByMonth: string;
                export const PostalCode: string;
                export const ProbationPeriod: string;
                export const ProbationPeriodEnd: string;
                export const Race: string;
                export const RaceId: string;
                export const RecruitmentDate: string;
                export const ResignationDate: string;
                export const Resigned: string;
                export const SectionId: string;
                export const SectionList: string;
                export const SectionName: string;
                export const Sex: string;
                export const StateId: string;
                export const StateName: string;
                export const TelNumber1: string;
                export const TelNumber2: string;
                export const Terminated: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UserName: string;
                export const UserPassword: string;
                export const UserRowId: string;
                export const WorkingSpouse: string;
            }
        }

        namespace EntitledLeave {

            namespace EntitledLeave {
                export const BringForward: string;
                export const CurrentPolicyEndDate: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentID: string;
                export const DepartmentName: string;
                export const DivisionID: string;
                export const DivisionName: string;
                export const EmployeeID: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const EntitledAnnualLeave: string;
                export const EntitledCompassionateLeave: string;
                export const EntitledHospitalisationLeave: string;
                export const EntitledMarriageLeave: string;
                export const EntitledMaternityLeave: string;
                export const EntitledPaternityLeave: string;
                export const EntitledSickLeave: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeID: string;
                export const JobGradeName: string;
                export const NextEntitlementDate: string;
                export const OccupationID: string;
                export const OccupationName: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace InitYear {

            namespace InitYear {
                export const AnnulLeaveBasedOnJobGrade: string;
                export const BringForwardDays: string;
                export const BringForwardPercentage: string;
                export const CompassionateLeave: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const HospitalisationLeave: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const LeaveBringForwardMethod: string;
                export const LeaveRoundUp: string;
                export const MarriageLeave: string;
                export const MaternityLeave: string;
                export const MonthOfServiceToEligibleForMaternityLeave: string;
                export const MonthOfServiceToEligibleForPaternityLeave: string;
                export const PaternityLeave: string;
                export const PolicyList: string;
                export const SickLeavePolicyList: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const Year: string;
                export const YearString: string;
            }
        }

        namespace LeaveApplication {

            namespace LeaveApplication {
                export const AfternoonSession: string;
                export const ApproveEmployeeName: string;
                export const ApprovedBy: string;
                export const BalanceLeave: string;
                export const CostCentreID: string;
                export const CostCentreName: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentID: string;
                export const DepartmentName: string;
                export const DivisionID: string;
                export const DivisionName: string;
                export const EligibleDay: string;
                export const EmployeeID: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const EmployeeStatus: string;
                export const EmployeeUpdated: string;
                export const EmployeeUpdatedName: string;
                export const EndDate: string;
                export const HalfDay: string;
                export const HrRejectReason: string;
                export const HrStatus: string;
                export const HrUpdated: string;
                export const HrUpdatedName: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeID: string;
                export const JobGradeName: string;
                export const LeaveDesc: string;
                export const LeaveDescriptionID: string;
                export const LeaveDescriptions: string;
                export const LeaveReason: string;
                export const LeaveReasonId: string;
                export const LeaveTaken: string;
                export const LeaveToTake: string;
                export const MorningSession: string;
                export const OccupationID: string;
                export const OccupationName: string;
                export const RejectedBy: string;
                export const RejectedEmployeeName: string;
                export const StartDate: string;
                export const Status: string;
                export const SuperiorRejectReason: string;
                export const SupportingDocument: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const WeekdaysList: string;
            }

            namespace LeaveDescription {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace LeaveReason {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const LeaveReason: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace LeaveApplicationReject {

            namespace LeaveApplicationReject {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const RejectReason: string;
                export const StartDate: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace Master {

            namespace MasterBank {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace MasterCity {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace MasterCostCentre {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace MasterCountry {
                export const CountryCode: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace MasterCp8d {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace MasterPostcode {
                export const CityName: string;
                export const CountryName: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const MasterCity: string;
                export const MasterCountry: string;
                export const MasterState: string;
                export const PostCode: string;
                export const StateName: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace MasterState {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const StateCode: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace Nationality {
                export const CountryId: string;
                export const CountryName: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace MoneyClaimApplication {

            namespace MoneyClaimApplication {
                export const ApproveEmployeeName: string;
                export const ApprovedBy: string;
                export const ClaimAmount: string;
                export const ClaimReason: string;
                export const ClaimReasonId: string;
                export const ClaimingCategory: string;
                export const ClaimingDate: string;
                export const CostCentreID: string;
                export const CostCentreName: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentID: string;
                export const DepartmentName: string;
                export const Description: string;
                export const DivisionID: string;
                export const DivisionName: string;
                export const EmployeeID: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const EmployeeStatus: string;
                export const EmployeeUpdated: string;
                export const EmployeeUpdatedName: string;
                export const HrRejectReason: string;
                export const HrStatus: string;
                export const HrUpdated: string;
                export const HrUpdatedName: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeID: string;
                export const JobGradeName: string;
                export const OccupationID: string;
                export const OccupationName: string;
                export const Paid: string;
                export const PayrollID: string;
                export const RejectedBy: string;
                export const RejectedEmployeeName: string;
                export const Status: string;
                export const SubjectionEis: string;
                export const SubjectionEpf: string;
                export const SubjectionHrdf: string;
                export const SubjectionPcb: string;
                export const SubjectionSocso: string;
                export const SuperiorRejectReason: string;
                export const SupportingDocument: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace MoneyClaimReason {
                export const ClaimReason: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace MoneyClaimApplicationReject {

            namespace MoneyClaimApplicationReject {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const RejectReason: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace OTApplication {

            namespace OTApplication {
                export const ApproveEmployeeName: string;
                export const ApprovedBy: string;
                export const CostCentreID: string;
                export const CostCentreName: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentID: string;
                export const DepartmentName: string;
                export const DivisionID: string;
                export const DivisionName: string;
                export const EmployeeID: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const EmployeeStatus: string;
                export const EmployeeUpdated: string;
                export const EmployeeUpdatedName: string;
                export const EndingAt: string;
                export const EndingHour: string;
                export const EndingMinute: string;
                export const EndingTime: string;
                export const HrRejectReason: string;
                export const HrStatus: string;
                export const HrUpdated: string;
                export const HrUpdatedName: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeID: string;
                export const JobGradeName: string;
                export const OTDescription: string;
                export const OccupationID: string;
                export const OccupationName: string;
                export const OtDate: string;
                export const OtHourBuffer: string;
                export const OtMinute: string;
                export const OtPayBuffer: string;
                export const OtRate: string;
                export const OtRateWeekday: string;
                export const OtRateWeekend: string;
                export const OtReason: string;
                export const OtReasonId: string;
                export const Paid: string;
                export const PublicHolidayOt: string;
                export const RejectedBy: string;
                export const RejectedEmployeeName: string;
                export const StartingAt: string;
                export const StartingHour: string;
                export const StartingMinute: string;
                export const StartingTime: string;
                export const Status: string;
                export const SuperiorRejectReason: string;
                export const TotalOtPay: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const WeekdayOt: string;
                export const WeekendOt: string;
            }

            namespace OTReason {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const OtReason: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace OTApplicationReject {

            namespace OTApplicationReject {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const RejectReason: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace OTJobGradeTime {

            namespace OTJobGradeTime {
                export const CompanySettingId: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeId: string;
                export const JobGradeName: string;
                export const OTMaximumMinutes: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace OrganisationChart {

            namespace EmployeeRights {
                export const Appraisal: string;
                export const EmployeeRowId: string;
                export const Id: string;
                export const LeaveApproval: string;
                export const MoneyClaiming: string;
                export const NodeId: string;
                export const OtApproval: string;
                export const Training: string;
            }

            namespace FinalOrganisationChart {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const FinalOrgChart: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace FullProfile {
                export const Address: string;
                export const Age: string;
                export const ArrivalDate: string;
                export const BankAccountNumber: string;
                export const BankId: string;
                export const BankName: string;
                export const BasicSalary: string;
                export const Birthday: string;
                export const BonusFactor: string;
                export const ChildrenInUniversity: string;
                export const ChildrenUnderEighteen: string;
                export const CityId: string;
                export const CityName: string;
                export const CostCentreId: string;
                export const CountryId: string;
                export const Cp8dId: string;
                export const CreateUser: string;
                export const DailyWorkingMinute: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentId: string;
                export const DepartmentName: string;
                export const DisabledChild: string;
                export const DisabledChildInUniversity: string;
                export const DivisionId: string;
                export const DivisionName: string;
                export const EisClass: string;
                export const EmployeeEmail: string;
                export const EmployeeId: string;
                export const EmployeeImg: string;
                export const EmployeeName: string;
                export const EmployeeType: string;
                export const EpfAccountNumber: string;
                export const EpfClass: string;
                export const FixedOtRateOption: string;
                export const GrantHrPrivilege: string;
                export const HrdfClass: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobDescription: string;
                export const JobGradeId: string;
                export const JobGradeName: string;
                export const JoinDate: string;
                export const LastPaymentDate: string;
                export const MaritalStatus: string;
                export const NationalityId: string;
                export const NationalityName: string;
                export const NightShiftAllowancePerDay: string;
                export const NoticePeriod: string;
                export const Nric: string;
                export const OccupationId: string;
                export const OccupationName: string;
                export const OldNric: string;
                export const OtPayEntitlement: string;
                export const OtRatePublicHoliday: string;
                export const OtRateWeekday: string;
                export const OtRateWeekend: string;
                export const PassedProbation: string;
                export const PassportExpiryDate: string;
                export const PassportIssueDate: string;
                export const PassportNumber: string;
                export const PassportValidPeriod: string;
                export const PayByDay: string;
                export const PayByHour: string;
                export const PayByMonth: string;
                export const PcBnumber: string;
                export const ProbationPeriod: string;
                export const ProbationPeriodFrom: string;
                export const ProbationPeriodUntil: string;
                export const Race: string;
                export const RaceId: string;
                export const RecruitmentDate: string;
                export const ResignLeaveDate: string;
                export const ResignationDate: string;
                export const Resigned: string;
                export const RetireDate: string;
                export const Retired: string;
                export const SectionId: string;
                export const SectionName: string;
                export const Sex: string;
                export const SocsoAccountNumber: string;
                export const SocsoClass: string;
                export const SsfwEffectiveDate: string;
                export const SsfwNumber: string;
                export const StateId: string;
                export const StateName: string;
                export const TelNumber1: string;
                export const TelNumber2: string;
                export const TerminateDate: string;
                export const TerminateLeaveDate: string;
                export const Terminated: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UserName: string;
                export const UserPassword: string;
                export const UserRowId: string;
                export const WorkingPermit: string;
                export const WorkingPermitExpireDate: string;
                export const WorkingPermitIssueDate: string;
                export const WorkingPermitValidFrom: string;
                export const WorkingPermitValidUntil: string;
                export const WorkingSpouse: string;
            }

            namespace OrganisationChart {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const OrgChart: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace SplitOrganisationChart {
                export const ClassName: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const ElementRowId: string;
                export const EmployeeRowId: string;
                export const Extension: string;
                export const HierarchyLevel: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const NodeId: string;
                export const ParentId: string;
                export const Title: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const childrenIndex: string;
                export const hierarchyId: string;
            }
        }

        namespace OrganisationHierarchy {

            namespace Department {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace Division {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace JobGrade {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace Occupation {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace Section {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace OrganisationStructure {

            namespace SplitOrganisationStructure {
                export const ClassName: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const ElementRowId: string;
                export const EmployeeRowId: string;
                export const HierarchyLevel: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const NodeId: string;
                export const ParentId: string;
                export const Title: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const childrenIndex: string;
                export const hierarchyId: string;
            }
        }

        namespace PayrollSettings {

            namespace EisSubjection {
                export const Allowances: string;
                export const ArrearsOfWages: string;
                export const BasicSalary: string;
                export const Bonuses: string;
                export const Commisions: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DirectorFee: string;
                export const EffectiveSince: string;
                export const EffectiveUntil: string;
                export const Gifts: string;
                export const Gratuity: string;
                export const Id: string;
                export const Incentives: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const OvertimePayments: string;
                export const PaymentInLieuOfNoticeOfTerminationOfService: string;
                export const PaymentsForUnutilisedAnnualOrMedicalLeaves: string;
                export const RetirementBenefits: string;
                export const ServiceCharges: string;
                export const TerminationBenefits: string;
                export const TravelAllowances: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const WagesForMaternityLeave: string;
                export const WagesForPaternityLeave: string;
                export const WagesForStudyLeave: string;
            }

            namespace EmployerContributions {
                export const Amount: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const PayslipId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace EpfSubjection {
                export const Allowances: string;
                export const ArrearsOfWages: string;
                export const BasicSalary: string;
                export const Bonuses: string;
                export const Commisions: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DirectorFee: string;
                export const EffectiveSince: string;
                export const EffectiveUntil: string;
                export const Gifts: string;
                export const Gratuity: string;
                export const Id: string;
                export const Incentives: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const OvertimePayments: string;
                export const PaymentInLieuOfNoticeOfTerminationOfService: string;
                export const PaymentsForUnutilisedAnnualOrMedicalLeaves: string;
                export const RetirementBenefits: string;
                export const ServiceCharges: string;
                export const TerminationBenefits: string;
                export const TravelAllowances: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const WagesForMaternityLeave: string;
                export const WagesForPaternityLeave: string;
                export const WagesForStudyLeave: string;
            }

            namespace HrdfSubjection {
                export const Allowances: string;
                export const ArrearsOfWages: string;
                export const BasicSalary: string;
                export const Bonuses: string;
                export const Commisions: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DirectorFee: string;
                export const EffectiveSince: string;
                export const EffectiveUntil: string;
                export const Gifts: string;
                export const Gratuity: string;
                export const Id: string;
                export const Incentives: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const OvertimePayments: string;
                export const PaymentInLieuOfNoticeOfTerminationOfService: string;
                export const PaymentsForUnutilisedAnnualOrMedicalLeaves: string;
                export const RetirementBenefits: string;
                export const ServiceCharges: string;
                export const TerminationBenefits: string;
                export const TravelAllowances: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const WagesForMaternityLeave: string;
                export const WagesForPaternityLeave: string;
                export const WagesForStudyLeave: string;
            }

            namespace NoPaidLeave {
                export const AfternoonSession: string;
                export const Deducted: string;
                export const Deductions: string;
                export const DepartmentID: string;
                export const DepartmentName: string;
                export const DivisionID: string;
                export const DivisionName: string;
                export const EmployeeId: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const HalfDay: string;
                export const Id: string;
                export const JobGradeID: string;
                export const JobGradeName: string;
                export const LeaveDate: string;
                export const MorningSession: string;
                export const OccupationID: string;
                export const OccupationName: string;
            }

            namespace Payroll {
                export const AbsentDaily: string;
                export const AbsentDailyRate: string;
                export const Age: string;
                export const AllowanceList: string;
                export const AnnualizedBonus: string;
                export const AnnualizedIncentive: string;
                export const BankAccountNumber: string;
                export const BasicPay: string;
                export const BirthDay: string;
                export const Bonus: string;
                export const BonusSubjectEis: string;
                export const BonusSubjectEpf: string;
                export const BonusSubjectHrdf: string;
                export const BonusSubjectPcb: string;
                export const BonusSubjectSocso: string;
                export const ChildrenInUniversity: string;
                export const ChildrenUnderEighteen: string;
                export const CompanyBankAccountNumber: string;
                export const CompanyEPFAccountNumber: string;
                export const CompanyIncomeTaxAccountNumber: string;
                export const CompanyRegistrationNumber: string;
                export const CompanySocsoAccountNumber: string;
                export const CostCentreID: string;
                export const CostCentreName: string;
                export const CountryCode: string;
                export const CurrentDateTime: string;
                export const DailyRate: string;
                export const DaysWorked: string;
                export const Deduction: string;
                export const DeductionList: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentID: string;
                export const DepartmentName: string;
                export const DisabledChild: string;
                export const DisabledChildInUniversity: string;
                export const DivisionID: string;
                export const DivisionName: string;
                export const EPFAccountNumber: string;
                export const EarlyLeaving: string;
                export const EarlyLeavingRate: string;
                export const Earnings: string;
                export const EisAllowance: string;
                export const EisClass: string;
                export const EisWages: string;
                export const EmployeeCp38: string;
                export const EmployeeEIS: string;
                export const EmployeeEPF: string;
                export const EmployeeId: string;
                export const EmployeeName: string;
                export const EmployeePCB: string;
                export const EmployeeRowId: string;
                export const EmployeeSOCSO: string;
                export const EmployeeSsfw: string;
                export const EmployeeType: string;
                export const EmployerEIS: string;
                export const EmployerEPF: string;
                export const EmployerHRDF: string;
                export const EmployerSOCSO: string;
                export const EmployerTable: string;
                export const EpfAllowance: string;
                export const EpfClass: string;
                export const EpfWages: string;
                export const FlatOt: string;
                export const HourlyRate: string;
                export const HrdfAllowance: string;
                export const HrdfClass: string;
                export const HrdfWages: string;
                export const Id: string;
                export const Incentive: string;
                export const IncentiveSubjectEis: string;
                export const IncentiveSubjectEpf: string;
                export const IncentiveSubjectHrdf: string;
                export const IncentiveSubjectPcb: string;
                export const IncentiveSubjectSocso: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeID: string;
                export const JobGradeName: string;
                export const LateArrival: string;
                export const LateArrivalRate: string;
                export const MaritalStatus: string;
                export const NPLDaily: string;
                export const NPLDailyRate: string;
                export const NPLHourly: string;
                export const NPLHourlyRate: string;
                export const NRIC: string;
                export const Nett: string;
                export const NumberOfWorkingDays: string;
                export const OccupationID: string;
                export const OccupationName: string;
                export const OldNRIC: string;
                export const OtOne: string;
                export const OtOnePointFive: string;
                export const OtOnePointFiveRate: string;
                export const OtSubjectEis: string;
                export const OtSubjectEpf: string;
                export const OtSubjectHrdf: string;
                export const OtSubjectPcb: string;
                export const OtSubjectSocso: string;
                export const OtTwo: string;
                export const OtTwoRate: string;
                export const PCBnumber: string;
                export const PaidMoneyClaimingList: string;
                export const PassportNumber: string;
                export const PayDate: string;
                export const PayMonth: string;
                export const PayPeriodEnd: string;
                export const PayPeriodStart: string;
                export const PayYear: string;
                export const PayrollDeductions: string;
                export const PayrollEarnings: string;
                export const PayrollTable: string;
                export const PayslipPath: string;
                export const PcbAllowance: string;
                export const PcbWages: string;
                export const Remarks: string;
                export const SectionID: string;
                export const SectionName: string;
                export const SeperateBonus: string;
                export const SeperateIncentive: string;
                export const SocsoAccountNumber: string;
                export const SocsoAllowance: string;
                export const SocsoClass: string;
                export const SocsoWages: string;
                export const StateCode: string;
                export const TaxClass: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const WorkingSpouse: string;
            }

            namespace PayrollDeductions {
                export const Amount: string;
                export const DeductionCode: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const External: string;
                export const GovernmentPayments: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const PayslipId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PayrollEarnings {
                export const Amount: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const EarningCode: string;
                export const External: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const PayslipId: string;
                export const SubjectionToEis: string;
                export const SubjectionToEpf: string;
                export const SubjectionToHrdf: string;
                export const SubjectionToPcb: string;
                export const SubjectionToSocso: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PayrollGeneratingWizard {
                export const All: string;
                export const CompanyRegistrationNumber: string;
                export const ContactPerson: string;
                export const CreditingDate: string;
                export const Deduction: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentList: string;
                export const DivisionList: string;
                export const Download: string;
                export const Earnings: string;
                export const Email: string;
                export const EmployeeEis: string;
                export const EmployeeEpf: string;
                export const EmployeeId: string;
                export const EmployeeName: string;
                export const EmployeePcb: string;
                export const EmployeeRowId: string;
                export const EmployeeRowList: string;
                export const EmployeeRowListBuffer: string;
                export const EmployeeSocso: string;
                export const EmployerEis: string;
                export const EmployerEpf: string;
                export const EmployerHrdf: string;
                export const EmployerSocso: string;
                export const EmployerTable: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeList: string;
                export const MasterStateId: string;
                export const Nett: string;
                export const OccupationList: string;
                export const OrganisationCode: string;
                export const OrganisationName: string;
                export const PayDate: string;
                export const PayMonth: string;
                export const PayPeriodEnd: string;
                export const PayPeriodStart: string;
                export const PayYear: string;
                export const PayrollTable: string;
                export const PayslipList: string;
                export const PhoneNumber: string;
                export const Remarks: string;
                export const SectionList: string;
                export const TestingMode: string;
                export const TextFormatAutopayId: string;
                export const TextFormatEisSocsoId: string;
                export const TextFormatEpfId: string;
                export const TextFormatLhdnId: string;
                export const TextType: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PayrollSettings {
                export const AnnualizedBonus: string;
                export const AnnualizedIncentive: string;
                export const AutopayFormatId: string;
                export const BonusSubjectEis: string;
                export const BonusSubjectEpf: string;
                export const BonusSubjectHrdf: string;
                export const BonusSubjectPcb: string;
                export const BonusSubjectSocso: string;
                export const ContactPerson: string;
                export const CreditingDay: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EffectiveFrom: string;
                export const EffectiveUntil: string;
                export const EisFormatId: string;
                export const Email: string;
                export const EpfFormatId: string;
                export const Id: string;
                export const IncentiveSubjectEis: string;
                export const IncentiveSubjectEpf: string;
                export const IncentiveSubjectHrdf: string;
                export const IncentiveSubjectPcb: string;
                export const IncentiveSubjectSocso: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const LhdnFormatId: string;
                export const OrganisationCode: string;
                export const OrganisationName: string;
                export const PhoneNumber: string;
                export const SeperateBonus: string;
                export const SeperateIncentive: string;
                export const SocsoFormatId: string;
                export const StateCodeId: string;
                export const TextFormatId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PayrollWizard {
                export const Deduction: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentList: string;
                export const DivisionList: string;
                export const Earnings: string;
                export const EmployeeEis: string;
                export const EmployeeEpf: string;
                export const EmployeeId: string;
                export const EmployeeName: string;
                export const EmployeePcb: string;
                export const EmployeeRowId: string;
                export const EmployeeRowList: string;
                export const EmployeeRowListBuffer: string;
                export const EmployeeSocso: string;
                export const EmployerEis: string;
                export const EmployerEpf: string;
                export const EmployerHrdf: string;
                export const EmployerSocso: string;
                export const EmployerTable: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeList: string;
                export const Nett: string;
                export const OccupationList: string;
                export const PayDate: string;
                export const PayMonth: string;
                export const PayPeriodEnd: string;
                export const PayPeriodStart: string;
                export const PayrollTable: string;
                export const PayslipList: string;
                export const Remarks: string;
                export const SectionList: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PayslipDeductedOneTimeDeductions {
                export const DeductionAmount: string;
                export const DeductionId: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const PayslipId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const code: string;
            }

            namespace PayslipPaidMoneyClaiming {
                export const ClaimAmount: string;
                export const ClaimingCategory: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const MoneyClaimingId: string;
                export const PayslipId: string;
                export const SubjectionEis: string;
                export const SubjectionEpf: string;
                export const SubjectionHrdf: string;
                export const SubjectionPcb: string;
                export const SubjectionSocso: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PayslipPaidOneTimeAllowance {
                export const AllowanceAmount: string;
                export const AllowanceId: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const PayslipId: string;
                export const SubjectionEis: string;
                export const SubjectionEpf: string;
                export const SubjectionHrdf: string;
                export const SubjectionPcb: string;
                export const SubjectionSocso: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const code: string;
            }

            namespace PcbSubjection {
                export const Allowances: string;
                export const ArrearsOfWages: string;
                export const BasicSalary: string;
                export const Bonuses: string;
                export const Commisions: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DirectorFee: string;
                export const EffectiveSince: string;
                export const EffectiveUntil: string;
                export const Gifts: string;
                export const Gratuity: string;
                export const Id: string;
                export const Incentives: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const OvertimePayments: string;
                export const PaymentInLieuOfNoticeOfTerminationOfService: string;
                export const PaymentsForUnutilisedAnnualOrMedicalLeaves: string;
                export const RetirementBenefits: string;
                export const ServiceCharges: string;
                export const TerminationBenefits: string;
                export const TravelAllowances: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const WagesForMaternityLeave: string;
                export const WagesForPaternityLeave: string;
                export const WagesForStudyLeave: string;
            }

            namespace SocsoSubjection {
                export const Allowances: string;
                export const ArrearsOfWages: string;
                export const BasicSalary: string;
                export const Bonuses: string;
                export const Commisions: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DirectorFee: string;
                export const EffectiveSince: string;
                export const EffectiveUntil: string;
                export const Gifts: string;
                export const Gratuity: string;
                export const Id: string;
                export const Incentives: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const OvertimePayments: string;
                export const PaymentInLieuOfNoticeOfTerminationOfService: string;
                export const PaymentsForUnutilisedAnnualOrMedicalLeaves: string;
                export const RetirementBenefits: string;
                export const ServiceCharges: string;
                export const TerminationBenefits: string;
                export const TravelAllowances: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const WagesForMaternityLeave: string;
                export const WagesForPaternityLeave: string;
                export const WagesForStudyLeave: string;
            }

            namespace WeeklyPayroll {
                export const DailyRate: string;
                export const DaysWorked: string;
                export const Deduction: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Earnings: string;
                export const EmployeeEis: string;
                export const EmployeeEpf: string;
                export const EmployeeRowId: string;
                export const EmployeeSocso: string;
                export const FlatOt: string;
                export const HourlyRate: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Nett: string;
                export const OtOne: string;
                export const OtOnePointFive: string;
                export const OtOnePointFiveRate: string;
                export const OtTwo: string;
                export const OtTwoRate: string;
                export const PayDate: string;
                export const PayMonth: string;
                export const PayPeriodEnd: string;
                export const PayPeriodStart: string;
                export const PayYear: string;
                export const PayrollTable: string;
                export const Remarks: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const WeekIndex: string;
            }

            namespace WeeklyPayrollEmployee {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeRowId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const WeeklyPayrollSettingId: string;
            }

            namespace WeeklyPayrollSettings {
                export const CostCentreList: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentList: string;
                export const Description: string;
                export const DivisionList: string;
                export const EmployeeList: string;
                export const GenerateFirst: string;
                export const GenerateFourth: string;
                export const GenerateSecond: string;
                export const GenerateThird: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const JobGradeList: string;
                export const Name: string;
                export const NewAddedEmployee: string;
                export const OccupationList: string;
                export const SectionList: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace PerformanceAppraisal {

            namespace CompanyProfile {
                export const Address: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Picture: string;
                export const Tel: string;
                export const Title: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const Website: string;
            }

            namespace PerformanceAppraisalEvaluation {
                export const BonusRate: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeSignDate: string;
                export const EmployeeSignID: string;
                export const EmployeeSignature: string;
                export const Evaluation: string;
                export const FormId: string;
                export const GeneralManagerSignDate: string;
                export const GeneralManagerSignID: string;
                export const GeneralManagerSignature: string;
                export const Goals: string;
                export const HodSignDate: string;
                export const HodSignID: string;
                export const HodSignature: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const OverallRate: string;
                export const Summary: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PerformanceAppraisalFileAttach {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Files: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Remark: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PerformanceAppraisalForm {
                export const ApprovalEndDate: string;
                export const ApprovalStartDate: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeId: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const EndDate: string;
                export const EvaluateEndDate: string;
                export const EvaluateStartDate: string;
                export const HodId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const ReviewStatus: string;
                export const StartDate: string;
                export const SubmissionStatus: string;
                export const TemplateId: string;
                export const TemplateName: string;
                export const TypeId: string;
                export const TypeName: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PerformanceAppraisalQuestion {
                export const AnswerType: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Questions: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PerformanceAppraisalResponse {
                export const Answer: string;
                export const AnswerType: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const FormId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Question: string;
                export const QuestionId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PerformanceAppraisalReviewer {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeRowId: string;
                export const FormId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PerformanceAppraisalTemplate {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Duration: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const RatingScale: string;
                export const TemplateName: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PerformanceAppraisalTemplateDepartment {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const TemplateId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PerformanceAppraisalTemplateQuestion {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const QuestionId: string;
                export const QuestionText: string;
                export const TemplateId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace PerformanceAppraisalType {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Type: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace PublicHoliday {

            namespace PublicHoliday {
                export const CountryCode: string;
                export const Date: string;
                export const Id: string;
                export const IsActive: string;
                export const Name: string;
            }
        }

        namespace Race {

            namespace Race {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Race: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace SetEmployeeShift {

            namespace SetEmployeeShift {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeGroupId: string;
                export const EmployeeGroupName: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const ShiftEndDate: string;
                export const ShiftId: string;
                export const ShiftName: string;
                export const ShiftStartDate: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace Shift {

            namespace Shift {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Description: string;
                export const FridayEndingAt: string;
                export const FridayLunchTimeEndingAt: string;
                export const FridayLunchTimeStartingFrom: string;
                export const FridayStartingFrom: string;
                export const FridayWorkingTime: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const MondayEndingAt: string;
                export const MondayLunchTimeEndingAt: string;
                export const MondayLunchTimeStartingFrom: string;
                export const MondayStartingFrom: string;
                export const MondayWorkingTime: string;
                export const NightShiftBetweenEnd: string;
                export const NightShiftBetweenStart: string;
                export const SaturdayEndingAt: string;
                export const SaturdayLunchTimeEndingAt: string;
                export const SaturdayLunchTimeStartingFrom: string;
                export const SaturdayStartingFrom: string;
                export const SaturdayWorkingTime: string;
                export const ShiftColor: string;
                export const ShiftName: string;
                export const SundayEndingAt: string;
                export const SundayLunchTimeEndingAt: string;
                export const SundayLunchTimeStartingFrom: string;
                export const SundayStartingFrom: string;
                export const SundayWorkingTime: string;
                export const ThursdayEndingAt: string;
                export const ThursdayLunchTimeEndingAt: string;
                export const ThursdayLunchTimeStartingFrom: string;
                export const ThursdayStartingFrom: string;
                export const ThursdayWorkingTime: string;
                export const TuesdayEndingAt: string;
                export const TuesdayLunchTimeEndingAt: string;
                export const TuesdayLunchTimeStartingFrom: string;
                export const TuesdayStartingFrom: string;
                export const TuesdayWorkingTime: string;
                export const TypeOfShift: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const WednesdayEndingAt: string;
                export const WednesdayLunchTimeEndingAt: string;
                export const WednesdayLunchTimeStartingFrom: string;
                export const WednesdayStartingFrom: string;
                export const WednesdayWorkingTime: string;
            }
        }

        namespace ShiftHistory {

            namespace ShiftHistory {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Shift: string;
                export const ShiftEndDate: string;
                export const ShiftStartDate: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace SickLeavePolicy {

            namespace SickLeavePolicy {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EligibleDays: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const PolicyRow: string;
                export const ServiceFromYear: string;
                export const ServiceUntilYear: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const Year: string;
            }
        }

        namespace TrainingManagement {

            namespace AttendanceList {
                export const EndDate: string;
                export const FlowType: string;
                export const GradeType: string;
                export const Id: string;
                export const ParticipantList: string;
                export const ProgramId: string;
                export const ProgramName: string;
                export const Remark: string;
                export const StartDate: string;
            }

            namespace MasterProgram {
                export const AllDepartment: string;
                export const Comment: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentList: string;
                export const Detail: string;
                export const ExtraDocument: string;
                export const FlowList: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const ProgramName: string;
                export const Routine: string;
                export const RoutineEndDate: string;
                export const RoutineInterval: string;
                export const RoutineStartDate: string;
                export const Status: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace ProgramDepartment {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentId: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const MasterProgramId: string;
                export const ProgramId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace ProgramFlow {
                export const Date: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const FlowType: string;
                export const GradeType: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const MasterProgramId: string;
                export const ParticipantList: string;
                export const ProgramId: string;
                export const Remark: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace ProgramFlowResponse {
                export const Attendance: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeId: string;
                export const File: string;
                export const FlowId: string;
                export const GradeValue: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const ProgramName: string;
                export const Remark: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace ProgramParticipant {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeId: string;
                export const EmployeeName: string;
                export const EmployeeRowId: string;
                export const ExtraField1: string;
                export const ExtraField2: string;
                export const ExtraField3: string;
                export const ExtraField4: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const ProgramId: string;
                export const Staff: string;
                export const Trainee: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace ProgramSession {
                export const Comment: string;
                export const DateTba: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentList: string;
                export const Detail: string;
                export const EndDate: string;
                export const ExtraDocument: string;
                export const FlowList: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const MasterProgramId: string;
                export const OneDay: string;
                export const ParticipantList: string;
                export const ProgramName: string;
                export const StartDate: string;
                export const Status: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }

            namespace Report {
                export const Comment: string;
                export const DateTba: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentList: string;
                export const Detail: string;
                export const EndDate: string;
                export const ExtraDocument: string;
                export const FlowList: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const MasterProgramId: string;
                export const OneDay: string;
                export const ParticipantList: string;
                export const ProgramName: string;
                export const StartDate: string;
                export const Status: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }

        namespace ViewShiftHistory {

            namespace ViewShiftHistory {
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EmployeeGroupID: string;
                export const EmployeeId: string;
                export const EmployeeName: string;
                export const EmployeeRowID: string;
                export const Id: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const ShiftEndDate: string;
                export const ShiftId: string;
                export const ShiftName: string;
                export const ShiftStartDate: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
        }
    }

    export declare namespace Forms {

        namespace Membership {

            namespace ChangePassword {
                export const FormTitle: string;
                export const SubmitButton: string;
                export const Success: string;
            }

            namespace ForgotPassword {
                export const FormInfo: string;
                export const FormTitle: string;
                export const SubmitButton: string;
                export const SuccessMessage: string;
            }

            namespace Login {
                export const ForgotPassword: string;
                export const LoginToYourAccount: string;
                export const OR: string;
                export const RememberMe: string;
                export const SignInButton: string;
                export const SignUpButton: string;
            }

            namespace ResetPassword {
                export const EmailSubject: string;
                export const FormTitle: string;
                export const SubmitButton: string;
                export const Success: string;
            }

            namespace SignUp {
                export const ActivateEmailSubject: string;
                export const ActivationCompleteMessage: string;
                export const ConfirmEmail: string;
                export const ConfirmPassword: string;
                export const DisplayName: string;
                export const Email: string;
                export const FormInfo: string;
                export const FormTitle: string;
                export const Password: string;
                export const SubmitButton: string;
                export const Success: string;
            }
        }
        export const SiteTitle: string;
    }

    export declare namespace Navigation {
        export const LogoutLink: string;
        export const SiteTitle: string;
    }

    export declare namespace Site {

        namespace AccessDenied {
            export const ClickToChangeUser: string;
            export const ClickToLogin: string;
            export const LackPermissions: string;
            export const NotLoggedIn: string;
            export const PageTitle: string;
        }

        namespace Layout {
            export const Language: string;
            export const Theme: string;
        }

        namespace RolePermissionDialog {
            export const DialogTitle: string;
            export const EditButton: string;
            export const SaveSuccess: string;
        }

        namespace UserDialog {
            export const EditPermissionsButton: string;
            export const EditRolesButton: string;
        }

        namespace UserPermissionDialog {
            export const DialogTitle: string;
            export const Grant: string;
            export const Permission: string;
            export const Revoke: string;
            export const SaveSuccess: string;
        }

        namespace ValidationError {
            export const Title: string;
        }
    }

    export declare namespace Validation {
        export const AuthenticationError: string;
        export const CurrentPasswordMismatch: string;
        export const DeleteForeignKeyError: string;
        export const EmailConfirm: string;
        export const EmailInUse: string;
        export const InvalidActivateToken: string;
        export const InvalidResetToken: string;
        export const MinRequiredPasswordLength: string;
        export const PasswordConfirmMismatch: string;
        export const SavePrimaryKeyError: string;
    }

    HRMSoftware['Texts'] = proxyTexts(Texts, '', {Db:{AbsentRecord:{AbsentRecord:{AbsentDate:1,DepartmentID:1,DepartmentName:1,DivisionID:1,DivisionName:1,EmployeeId:1,EmployeeName:1,EmployeeRowId:1,HalfDay:1,Id:1,JobGradeID:1,JobGradeName:1,OccupationID:1,OccupationName:1,Processed:1}},Administration:{Language:{Id:1,LanguageId:1,LanguageName:1},Role:{RoleId:1,RoleKey:1,RoleName:1},RolePermission:{PermissionKey:1,RoleId:1,RoleName:1,RolePermissionId:1},User:{DisplayName:1,Email:1,EmployeeName:1,EmployeeRowID:1,ImpersonationToken:1,InsertDate:1,InsertUserId:1,IsActive:1,LastDirectoryUpdate:1,MobilePhoneNumber:1,MobilePhoneVerified:1,Password:1,PasswordConfirm:1,PasswordHash:1,PasswordSalt:1,Roles:1,Source:1,TwoFactorAuth:1,UpdateDate:1,UpdateUserId:1,UserId:1,UserImage:1,Username:1},UserPermission:{Granted:1,PermissionKey:1,User:1,UserId:1,UserPermissionId:1,Username:1},UserRole:{RoleId:1,User:1,UserId:1,UserRoleId:1,Username:1}},Announcement:{Announcement:{AnnouncementContent:1,AnnouncementDateTime:1,AnnouncerEmployeeRowId:1,AnnouncerID:1,AnnouncerName:1,DeleteDate:1,DeleteUserId:1,EmployeeRowId:1,Hide:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,UpdateDate:1,UpdateUserId:1,UploadDocument:1,ViewTime:1,Viewed:1},AnnouncementDepartmentBinded:{AnnouncementRecurringId:1,AnnouncementWizardId:1,DeleteDate:1,DeleteUserId:1,DepartmentId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,UpdateDate:1,UpdateUserId:1},AnnouncementDivisionBinded:{AnnouncementRecurringId:1,AnnouncementWizardId:1,DeleteDate:1,DeleteUserId:1,DivisionId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,UpdateDate:1,UpdateUserId:1},AnnouncementGenerated:{AnnouncementContent:1,AnnouncementDateTime:1,AnnouncementTime:1,BindToDepartment:1,BindToDivision:1,BindToJobGrade:1,BindToOccupation:1,BindToSection:1,Delayed:1,DeleteDate:1,DeleteUserId:1,DepartmentDept:1,Division:1,EmployeeDepartment:1,EmployeeDivision:1,EmployeeID:1,EmployeeJobGrade:1,EmployeeName:1,EmployeeOccupation:1,EmployeeRowId:1,EmployeeSection:1,GeneratedRecurringId:1,GeneratedWizardId:1,Id:1,Immediate:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGrade:1,Occupation:1,Remarks:1,Section:1,UpdateDate:1,UpdateUserId:1,UploadDocument:1,ViewTime:1,Viewed:1},AnnouncementJobGradeBinded:{AnnouncementRecurringId:1,AnnouncementWizardId:1,DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeId:1,UpdateDate:1,UpdateUserId:1},AnnouncementOccupationBinded:{AnnouncementRecurringId:1,AnnouncementWizardId:1,DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,OccupationId:1,UpdateDate:1,UpdateUserId:1},AnnouncementSectionBinded:{AnnouncementRecurringId:1,AnnouncementWizardId:1,DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,SectionId:1,UpdateDate:1,UpdateUserId:1},AnnouncementWizard:{All:1,AnnouncementContent:1,AnnouncementDateTime:1,AnnouncementList:1,AnnouncementTime:1,BindToDepartment:1,BindToDivision:1,BindToJobGrade:1,BindToOccupation:1,BindToSection:1,Delayed:1,DeleteDate:1,DeleteUserId:1,DepartmentListActual:1,DivisionListActual:1,EmployeeRowList:1,Id:1,Immediate:1,InsertDate:1,InsertUserId:1,IsActive:1,IssuedBy:1,JobGradeListActual:1,OccupationListActual:1,Remarks:1,SectionListActual:1,Today:1,UpdateDate:1,UpdateUserId:1,UploadDocument:1},RecurringAnnouncement:{All:1,AnnouncementContent:1,AnnouncementList:1,BindToDepartment:1,BindToDivision:1,BindToJobGrade:1,BindToOccupation:1,BindToSection:1,DaysOfWeekRecurring:1,DaysPerRecurring:1,DeleteDate:1,DeleteUserId:1,DepartmentListActual:1,DivisionListActual:1,EmployeeListActual:1,Friday:1,Id:1,InsertDate:1,InsertUserId:1,IntervalInDays:1,IsActive:1,JobGradeListActual:1,Monday:1,Name:1,OccupationListActual:1,RecurringTime:1,Remarks:1,Saturday:1,SectionListActual:1,StartingDateTime:1,Sunday:1,Thursday:1,Tuesday:1,UpdateDate:1,UpdateUserId:1,UploadDocument:1,Wednesday:1},RecurringBindedEmployee:{EmployeeRowId:1,Id:1,RecurringId:1}},AnnualLeaveJobGradePolicy:{AnnualLeaveJobGradePolicy:{CompanySettingID:1,DeleteDate:1,DeleteUserId:1,EligibleDays:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeLevel:1,JobGradeName:1,MaximumAccumulated:1,UpdateDate:1,UpdateUserId:1,Year:1}},AnnualLeavePolicy:{AnnualLeavePolicy:{DeleteDate:1,DeleteUserId:1,EligibleDays:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,MaximumAccumulated:1,PolicyRow:1,ServiceFromYear:1,ServiceUntilYear:1,UpdateDate:1,UpdateUserId:1,Year:1}},BringForward:{BringForward:{BringForward:1,BringForwardToYear:1,DeleteDate:1,DeleteUserId:1,EmployeeRowId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,UpdateDate:1,UpdateUserId:1}},CompanySettings:{CompanySettings:{AbsentBasedOnFixedDenominator:1,AbsentBasedOnWorkingHour:1,AbsentDes:1,AbsentMonthDays:1,BankAccountNumber:1,BankId:1,BankName:1,BasedCountry:1,ClockInGracePeriod:1,ClockOutGracePeriod:1,CompanyAddress:1,CompanyLogo:1,CompanyName:1,CompanyPhone:1,CompanyRegistrationNumber:1,DailyNplBasedOnFixedDenominator:1,DailyNplBasedOnWorkingHour:1,DailyNplMonthDays:1,DeductSalaryIfEarlyLeaving:1,DeductSalaryIfLate:1,EPFAccountNumber:1,EarlyLeavingBasedOnFixedDenominator:1,EarlyLeavingBasedOnWorkingHour:1,EarlyLeavingDes:1,EarlyLeavingMonthDays:1,EffectiveSince:1,EffectiveUntil:1,EntitleAnnualBasedOnJobGrade:1,EntitleAnnualBasedOnYearOfService:1,EntitleAnualLeaveBeforeProbationPeriodEnd:1,FixedAbsentDenominator:1,FixedEarlyLeavingDenominator:1,FixedHour:1,FixedHourFlexiTime:1,FixedLateArrivalDenominator:1,FixedNPLDenominator:1,FixedOtRateCalculation:1,FixedOtRateDenominator:1,FixedTime:1,FridayWeekday:1,HourlyNoPaidLeaveAbsent:1,HourlyNoPaidLeaveDes:1,HourlyNoPaidLeaveNPL:1,Id:1,IncomeTaxAccountNumber:1,InsertDate:1,IsActive:1,LateArrivalBasedOnFixedDenominator:1,LateArrivalBasedOnWorkingHour:1,LateArrivalDes:1,LateArrivalEqualFullDayLeave:1,LateArrivalEqualHalfDayLeave:1,LateArrivalMonthDays:1,LeaveApplicationEitherOne:1,LeaveApplicationEmployeeApproval:1,LeaveApplicationHrApproval:1,LeaveRefreshDate:1,LeaveRefreshDay:1,LeaveRefreshMonth:1,MaximumBasicSalary:1,MaximumBasicSalaryToEntitleForOTPay:1,MaximumJobGradeToEntitleForOTPay:1,MaximumOtMinute:1,MondayWeekday:1,MoneyClaimingEitherOne:1,MoneyClaimingEmployeeApproval:1,MoneyClaimingHrApproval:1,MonthlyDays:1,MonthlyEntitlementAnnualLeave:1,NoPaidLeaveDes:1,OTApplicationEmployeeApproval:1,OTApplicationHrApproval:1,OTEitherOne:1,OTJobGradeTime:1,OTMinimumMinute:1,OTMonthDays:1,OneOffEntitlementAnnualLeave:1,OtCalculationDescription:1,PayDay:1,Paydate:1,ProbationPeriod:1,PublicHolidayOnePointFive:1,PublicHolidayTwo:1,RefreshLeaveOnSpecificDate:1,RefreshLeaveOnYearOfService:1,RetireAge:1,SaturdayWeekday:1,SocsoAccountNumber:1,SundayWeekday:1,ThursdayWeekday:1,TuesdayWeekday:1,VariableOtRateCalculation:1,WednesdayWeekday:1,WeekdayOnePointFive:1,WeekdayTwo:1,WeekendOnePointFive:1,WeekendTwo:1,ZakatAccountNumber:1}},EmployeeAttendance:{EmployeeAttendance:{AuthenticationDate:1,AuthenticationDateTime:1,AuthenticationSecond:1,AuthenticationTime:1,CardNo:1,DeleteDate:1,DeleteUserId:1,DepartmentID:1,DepartmentName:1,DeviceName:1,DeviceSerial:1,Direction:1,DivisionID:1,DivisionName:1,EarlyLeave:1,EmployeeId:1,EmployeeName:1,EmployeeRowID:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeID:1,JobGradeName:1,LateIn:1,OccupationID:1,OccupationName:1,Ot:1,PersonName:1,Processed:1,UpdateDate:1,UpdateUserId:1},ShiftAttendanceRecord:{CostCentreID:1,CostCentreName:1,DepartmentID:1,DepartmentList:1,DepartmentName:1,DivisionID:1,DivisionList:1,DivisionName:1,EarlyLeave:1,EmpRemark:1,EmployeeID:1,EmployeeName:1,EmployeeRowId:1,EmployeeRowList:1,EmployeeRowListBuffer:1,Id:1,JobGradeID:1,JobGradeList:1,JobGradeName:1,LateIn:1,LvPhRemark:1,OccupationID:1,OccupationList:1,OccupationName:1,Ot:1,SectionList:1,ShiftDate:1,ShiftEndTime:1,ShiftEndTimeHour:1,ShiftId:1,ShiftName:1,ShiftStartTime:1,ShiftStartTimeHour:1,SupRemark:1,TimeIn:1,TimeInHour:1,TimeInRowId:1,TimeOut:1,TimeOutHour:1,TimeOutRowId:1,endDate:1,startDate:1}},EmployeeBasicData:{EmployeeBasicData:{Address:1,Age:1,Birthday:1,CityId:1,CityName:1,DeleteDate:1,DeleteUserId:1,EmployeeId:1,EmployeeImg:1,EmployeeName:1,EmployeeType:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,MaritalStatus:1,NationalityId:1,NationalityName:1,Nric:1,Race:1,RaceId:1,Sex:1,StateId:1,StateName:1,TelNumber1:1,TelNumber2:1,UpdateDate:1,UpdateUserId:1}},EmployeeEarlyLeaving:{EmployeeEarlyLeaving:{Date:1,Deducted:1,Deductions:1,DepartmentID:1,DepartmentName:1,DivisionID:1,DivisionName:1,EarlyMins:1,EmployeeId:1,EmployeeName:1,EmployeeRowId:1,Id:1,JobGradeID:1,JobGradeName:1,OccupationID:1,OccupationName:1,Processed:1}},EmployeeEditHistory:{EmployeeEditHistory:{DeleteDate:1,DeleteUserId:1,Description:1,EmployeeRowId:1,FieldName:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,NewValue:1,OldValue:1,UpdateDate:1,UpdateUserId:1}},EmployeeGroup:{EmployeeGroup:{ActualShifts:1,DeleteDate:1,DeleteUserId:1,DepartmentList:1,Description:1,DivisionList:1,EmployeeList:1,EndDate:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeList:1,Name:1,NewAddedEmployee:1,OccupationList:1,SectionList:1,ShiftColor:1,Shifts:1,StartDate:1,UpdateDate:1,UpdateUserId:1},EmployeeGroupShift:{DeleteDate:1,DeleteUserId:1,EmployeeGroupId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Shift:1,ShiftEndDate:1,ShiftId:1,ShiftStartDate:1,UpdateDate:1,UpdateUserId:1},EmployeeGroupShiftPattern:{DeleteDate:1,DeleteUserId:1,EmployeeGroupId:1,EmployeeRowId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,ShiftEndDate:1,ShiftId:1,ShiftName:1,ShiftStartDate:1,UpdateDate:1,UpdateUserId:1},EmployeeGroupings:{DeleteDate:1,DeleteUserId:1,EmployeeGroupId:1,EmployeeRowId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,UpdateDate:1,UpdateUserId:1}},EmployeeLate:{EmployeeLate:{Date:1,Deducted:1,Deductions:1,DepartmentID:1,DepartmentName:1,DivisionID:1,DivisionName:1,EmployeeId:1,EmployeeName:1,EmployeeRowId:1,Id:1,JobGradeID:1,JobGradeName:1,LateMins:1,OccupationID:1,OccupationName:1,Processed:1}},EmployeeProfile:{EmployeeAllowance:{AllowanceCode:1,AllowanceSubjections:1,Amount:1,DeleteDate:1,DeleteUserId:1,Description:1,EffectiveFrom:1,EffectiveUntil:1,EmployeeRowId:1,ExemptAnnualLeave:1,ExemptCompassionateLeave:1,ExemptEmergencyLeave:1,ExemptGatepassLeave:1,ExemptHospitalisationLeave:1,ExemptMarriageLeave:1,ExemptMaternityLeave:1,ExemptPaternityLeave:1,ExemptSickLeave:1,ExemptUnpaidLeave:1,FullAttendance:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,MasterAllowanceId:1,NoAbsence:1,NoEarlyLeaving:1,NoLate:1,OneTime:1,PaidOneTime:1,Recurring:1,SubjectionEis:1,SubjectionEpf:1,SubjectionHrdf:1,SubjectionOt:1,SubjectionPcb:1,SubjectionSocso:1,UpdateDate:1,UpdateUserId:1},EmployeeBonus:{BonusAmount:1,BonusDescription:1,CostCentreID:1,CostCentreName:1,DeleteDate:1,DeleteUserId:1,DepartmentID:1,DepartmentName:1,DivisionID:1,DivisionName:1,EmployeeID:1,EmployeeName:1,EmployeeRowId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeID:1,JobGradeName:1,OccupationID:1,OccupationName:1,PayMonth:1,PayYear:1,SectionID:1,SectionName:1,UpdateDate:1,UpdateUserId:1},EmployeeCareerPath:{CareerPathCode:1,CareerPathId:1,CategoryId:1,CostCentreName:1,DeleteDate:1,DeleteUserId:1,DepartmentDept:1,Description:1,Division:1,EffectiveDate:1,EmployeeName:1,EmployeeRowId:1,Executed:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGrade:1,ManDesc:1,NewValue:1,Occupation:1,Section:1,UpdateDate:1,UpdateUserId:1,ValueString:1,careerPaathType:1,newCostCentre:1,newDepartment:1,newDivision:1,newJobGrade:1,newOccupation:1,newSection:1,oldCostCentre:1,oldDepartment:1,oldDivision:1,oldJobGrade:1,oldOccupation:1,oldSection:1,oldValue:1},EmployeeCp38:{Cp38Amount:1,DeleteDate:1,DeleteUserId:1,EffectiveFrom:1,EffectiveUntil:1,EmployeeID:1,EmployeeName:1,EmployeeRowId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,UpdateDate:1,UpdateUserId:1},EmployeeIncentive:{CostCentreID:1,CostCentreName:1,DeleteDate:1,DeleteUserId:1,DepartmentID:1,DepartmentName:1,DivisionID:1,DivisionName:1,EmployeeID:1,EmployeeName:1,EmployeeRowId:1,Id:1,IncentiveAmount:1,IncentiveDescription:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeID:1,JobGradeName:1,OccupationID:1,OccupationName:1,PayMonth:1,PayYear:1,SectionID:1,SectionName:1,UpdateDate:1,UpdateUserId:1},EmployeePersonalProfile:{Address:1,Age:1,Allowance:1,BankAccountNumber:1,BankId:1,BankName:1,BasicSalary:1,Birthday:1,BonusFactor:1,CityId:1,CityName:1,CreateUser:1,DailyWorkingMinutes:1,DeleteDate:1,DeleteUserId:1,DepartmentId:1,DepartmentName:1,DivisionId:1,DivisionName:1,EmployeeEmail:1,EmployeeId:1,EmployeeImg:1,EmployeeName:1,EmployeeType:1,EpfAccountNumber:1,EpfContribution:1,GrantHrPrivilege:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeId:1,JobGradeName:1,LastPaymentDate:1,LeaveDate:1,MaritalStatus:1,NationalityId:1,NationalityName:1,NoticePeriod:1,Nric:1,OccupationId:1,OccupationName:1,OtPayEntitlement:1,PassportExpiryDate:1,PassportIssueDate:1,PassportNumber:1,PassportValidPeriod:1,PayByDay:1,PayByHour:1,PayByMonth:1,ProbationPeriod:1,ProbationPeriodEnd:1,Race:1,RaceId:1,RecruitmentDate:1,ResignationDate:1,Resigned:1,SectionId:1,SectionName:1,Sex:1,StateId:1,StateName:1,TelNumber1:1,TelNumber2:1,Terminated:1,UpdateDate:1,UpdateUserId:1,UserName:1,UserPassword:1,UserRowId:1},EmployeeProfile:{Address:1,Age:1,AllowanceLists:1,ArrivalDate:1,BankAccountNumber:1,BankID:1,BankName:1,BasicSalary:1,Birthday:1,BonusFactor:1,CalculationDate:1,ChildrenInUniversity:1,ChildrenUnderEighteen:1,CityID:1,CityName:1,CostCentreID:1,CostCentreName:1,CountryID:1,CountryName:1,Cp38Lists:1,Cp8dID:1,Cp8dName:1,CreateUser:1,DailyRateBase:1,DailyWorkingMinute:1,DeleteDate:1,DeleteUserId:1,DepartmentDept:1,DepartmentID:1,DisabledChild:1,DisabledChildInUniversity:1,Division:1,DivisionID:1,EisClass:1,EmployeeCareerPath:1,EmployeeEmail:1,EmployeeID:1,EmployeeImg:1,EmployeeName:1,EmployeeType:1,EpfAccountNumber:1,EpfClass:1,FixedDeductionList:1,FixedOtRateOption:1,GrantHRPrivilege:1,HRDFClass:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobDescription:1,JobGrade:1,JobGradeID:1,JoinDate:1,LastPaymentDate:1,MaritalStatus:1,NationalityID:1,NationalityName:1,NightShiftAllowancePerDay:1,NoticePeriod:1,NplRateBase:1,Nric:1,NumberOfWorkingDays:1,Occupation:1,OccupationID:1,OldNRIC:1,OtPayEntitlement:1,OtRate:1,OtRatePublicHoliday:1,OtRateWeekday:1,OtRateWeekend:1,PCBnumber:1,PassedProbation:1,PassportExpiryDate:1,PassportIssueDate:1,PassportNumber:1,PassportValidPeriod:1,PayByDay:1,PayByHour:1,PayByMonth:1,PostalCode:1,PostcodeId:1,ProbationPeriod:1,ProbationPeriodFrom:1,ProbationPeriodUntil:1,Race:1,RaceID:1,RecruitmentDate:1,ResignLeaveDate:1,ResignationDate:1,Resigned:1,RetireDate:1,Retired:1,Section:1,SectionID:1,Sex:1,SocsoAccountNumber:1,SocsoClass:1,SsfwEffectiveDate:1,SsfwNumber:1,StateID:1,StateName:1,TelNumber1:1,TelNumber2:1,TerminateDate:1,TerminateLeaveDate:1,Terminated:1,TotalWorkingTimeInMinutes:1,UpdateDate:1,UpdateUserId:1,UserName:1,UserPassword:1,UserRowID:1,WorkingDays:1,WorkingHour:1,WorkingPermit:1,WorkingPermitExpireDate:1,WorkingPermitIssueDate:1,WorkingPermitValidFrom:1,WorkingPermitValidUntil:1,WorkingSpouse:1},EmployeeResign:{Id:1,NoticePeriod:1,ResignLeaveDate:1,ResignationDate:1},FixedDeduction:{Amount:1,DeductedOneTime:1,DeductionCode:1,DeleteDate:1,DeleteUserId:1,Description:1,EffectiveFrom:1,EffectiveUntil:1,EmployeeRowId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,MasterDeductionId:1,OneTime:1,Recurring:1,UpdateDate:1,UpdateUserId:1},MasterAllowance:{AllowanceCode:1,AllowanceSubjections:1,Amount:1,DeleteDate:1,DeleteUserId:1,Description:1,ExemptAnnualLeave:1,ExemptCompassionateLeave:1,ExemptEmergencyLeave:1,ExemptGatepassLeave:1,ExemptHospitalisationLeave:1,ExemptMarriageLeave:1,ExemptMaternityLeave:1,ExemptPaternityLeave:1,ExemptSickLeave:1,ExemptUnpaidLeave:1,FullAttendance:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,NoAbsence:1,NoEarlyLeaving:1,NoLate:1,OneTime:1,Recurring:1,SubjectionEis:1,SubjectionEpf:1,SubjectionHrdf:1,SubjectionOt:1,SubjectionPcb:1,SubjectionSocso:1,UpdateDate:1,UpdateUserId:1},MasterCareerPath:{CareerPathCode:1,CareerPathType:1,CategoryId:1,DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,UpdateDate:1,UpdateUserId:1},MasterDeduction:{Amount:1,DeductionCode:1,DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,OneTime:1,Recurring:1,UpdateDate:1,UpdateUserId:1},TerminateEmployee:{Id:1,NoticePeriod:1,TerminateDate:1,TerminateLeaveDate:1},UserCreation:{Address:1,Age:1,AllEmployee:1,Allowance:1,BankAccountNumber:1,BankId:1,BankName:1,BasicSalary:1,Birthday:1,BonusFactor:1,ChildrenInUniversity:1,ChildrenUnderEighteen:1,CityId:1,CityName:1,CountryId:1,CreateUser:1,DailyWorkingMinutes:1,DeleteDate:1,DeleteUserId:1,DepartmentId:1,DepartmentList:1,DepartmentName:1,DivisionId:1,DivisionList:1,DivisionName:1,EmployeeEmail:1,EmployeeId:1,EmployeeImg:1,EmployeeName:1,EmployeeRowHrPriveledge:1,EmployeeRowList:1,EmployeeType:1,EpfAccountNumber:1,EpfContribution:1,GrantHrPrivilege:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeId:1,JobGradeList:1,JobGradeName:1,LastPaymentDate:1,LeaveDate:1,MaritalStatus:1,NationalityId:1,NationalityName:1,NoticePeriod:1,Nric:1,OccupationId:1,OccupationList:1,OccupationName:1,OtPayEntitlement:1,PassportExpiryDate:1,PassportIssueDate:1,PassportNumber:1,PassportValidPeriod:1,PayByDay:1,PayByHour:1,PayByMonth:1,PostalCode:1,ProbationPeriod:1,ProbationPeriodEnd:1,Race:1,RaceId:1,RecruitmentDate:1,ResignationDate:1,Resigned:1,SectionId:1,SectionList:1,SectionName:1,Sex:1,StateId:1,StateName:1,TelNumber1:1,TelNumber2:1,Terminated:1,UpdateDate:1,UpdateUserId:1,UserName:1,UserPassword:1,UserRowId:1,WorkingSpouse:1}},EntitledLeave:{EntitledLeave:{BringForward:1,CurrentPolicyEndDate:1,DeleteDate:1,DeleteUserId:1,DepartmentID:1,DepartmentName:1,DivisionID:1,DivisionName:1,EmployeeID:1,EmployeeName:1,EmployeeRowId:1,EntitledAnnualLeave:1,EntitledCompassionateLeave:1,EntitledHospitalisationLeave:1,EntitledMarriageLeave:1,EntitledMaternityLeave:1,EntitledPaternityLeave:1,EntitledSickLeave:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeID:1,JobGradeName:1,NextEntitlementDate:1,OccupationID:1,OccupationName:1,UpdateDate:1,UpdateUserId:1}},InitYear:{InitYear:{AnnulLeaveBasedOnJobGrade:1,BringForwardDays:1,BringForwardPercentage:1,CompassionateLeave:1,DeleteDate:1,DeleteUserId:1,HospitalisationLeave:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,LeaveBringForwardMethod:1,LeaveRoundUp:1,MarriageLeave:1,MaternityLeave:1,MonthOfServiceToEligibleForMaternityLeave:1,MonthOfServiceToEligibleForPaternityLeave:1,PaternityLeave:1,PolicyList:1,SickLeavePolicyList:1,UpdateDate:1,UpdateUserId:1,Year:1,YearString:1}},LeaveApplication:{LeaveApplication:{AfternoonSession:1,ApproveEmployeeName:1,ApprovedBy:1,BalanceLeave:1,CostCentreID:1,CostCentreName:1,DeleteDate:1,DeleteUserId:1,DepartmentID:1,DepartmentName:1,DivisionID:1,DivisionName:1,EligibleDay:1,EmployeeID:1,EmployeeName:1,EmployeeRowId:1,EmployeeStatus:1,EmployeeUpdated:1,EmployeeUpdatedName:1,EndDate:1,HalfDay:1,HrRejectReason:1,HrStatus:1,HrUpdated:1,HrUpdatedName:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeID:1,JobGradeName:1,LeaveDesc:1,LeaveDescriptionID:1,LeaveDescriptions:1,LeaveReason:1,LeaveReasonId:1,LeaveTaken:1,LeaveToTake:1,MorningSession:1,OccupationID:1,OccupationName:1,RejectedBy:1,RejectedEmployeeName:1,StartDate:1,Status:1,SuperiorRejectReason:1,SupportingDocument:1,UpdateDate:1,UpdateUserId:1,WeekdaysList:1},LeaveDescription:{DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,UpdateDate:1,UpdateUserId:1},LeaveReason:{DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,LeaveReason:1,UpdateDate:1,UpdateUserId:1}},LeaveApplicationReject:{LeaveApplicationReject:{DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,RejectReason:1,StartDate:1,UpdateDate:1,UpdateUserId:1}},Master:{MasterBank:{DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,UpdateDate:1,UpdateUserId:1},MasterCity:{DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,UpdateDate:1,UpdateUserId:1},MasterCostCentre:{DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,UpdateDate:1,UpdateUserId:1},MasterCountry:{CountryCode:1,DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,UpdateDate:1,UpdateUserId:1},MasterCp8d:{DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,UpdateDate:1,UpdateUserId:1},MasterPostcode:{CityName:1,CountryName:1,DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,MasterCity:1,MasterCountry:1,MasterState:1,PostCode:1,StateName:1,UpdateDate:1,UpdateUserId:1},MasterState:{DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,StateCode:1,UpdateDate:1,UpdateUserId:1},Nationality:{CountryId:1,CountryName:1,DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,UpdateDate:1,UpdateUserId:1}},MoneyClaimApplication:{MoneyClaimApplication:{ApproveEmployeeName:1,ApprovedBy:1,ClaimAmount:1,ClaimReason:1,ClaimReasonId:1,ClaimingCategory:1,ClaimingDate:1,CostCentreID:1,CostCentreName:1,DeleteDate:1,DeleteUserId:1,DepartmentID:1,DepartmentName:1,Description:1,DivisionID:1,DivisionName:1,EmployeeID:1,EmployeeName:1,EmployeeRowId:1,EmployeeStatus:1,EmployeeUpdated:1,EmployeeUpdatedName:1,HrRejectReason:1,HrStatus:1,HrUpdated:1,HrUpdatedName:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeID:1,JobGradeName:1,OccupationID:1,OccupationName:1,Paid:1,PayrollID:1,RejectedBy:1,RejectedEmployeeName:1,Status:1,SubjectionEis:1,SubjectionEpf:1,SubjectionHrdf:1,SubjectionPcb:1,SubjectionSocso:1,SuperiorRejectReason:1,SupportingDocument:1,UpdateDate:1,UpdateUserId:1},MoneyClaimReason:{ClaimReason:1,DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,UpdateDate:1,UpdateUserId:1}},MoneyClaimApplicationReject:{MoneyClaimApplicationReject:{DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,RejectReason:1,UpdateDate:1,UpdateUserId:1}},OTApplication:{OTApplication:{ApproveEmployeeName:1,ApprovedBy:1,CostCentreID:1,CostCentreName:1,DeleteDate:1,DeleteUserId:1,DepartmentID:1,DepartmentName:1,DivisionID:1,DivisionName:1,EmployeeID:1,EmployeeName:1,EmployeeRowId:1,EmployeeStatus:1,EmployeeUpdated:1,EmployeeUpdatedName:1,EndingAt:1,EndingHour:1,EndingMinute:1,EndingTime:1,HrRejectReason:1,HrStatus:1,HrUpdated:1,HrUpdatedName:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeID:1,JobGradeName:1,OTDescription:1,OccupationID:1,OccupationName:1,OtDate:1,OtHourBuffer:1,OtMinute:1,OtPayBuffer:1,OtRate:1,OtRateWeekday:1,OtRateWeekend:1,OtReason:1,OtReasonId:1,Paid:1,PublicHolidayOt:1,RejectedBy:1,RejectedEmployeeName:1,StartingAt:1,StartingHour:1,StartingMinute:1,StartingTime:1,Status:1,SuperiorRejectReason:1,TotalOtPay:1,UpdateDate:1,UpdateUserId:1,WeekdayOt:1,WeekendOt:1},OTReason:{DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,OtReason:1,UpdateDate:1,UpdateUserId:1}},OTApplicationReject:{OTApplicationReject:{DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,RejectReason:1,UpdateDate:1,UpdateUserId:1}},OTJobGradeTime:{OTJobGradeTime:{CompanySettingId:1,DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeId:1,JobGradeName:1,OTMaximumMinutes:1,UpdateDate:1,UpdateUserId:1}},OrganisationChart:{EmployeeRights:{Appraisal:1,EmployeeRowId:1,Id:1,LeaveApproval:1,MoneyClaiming:1,NodeId:1,OtApproval:1,Training:1},FinalOrganisationChart:{DeleteDate:1,DeleteUserId:1,FinalOrgChart:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,UpdateDate:1,UpdateUserId:1},FullProfile:{Address:1,Age:1,ArrivalDate:1,BankAccountNumber:1,BankId:1,BankName:1,BasicSalary:1,Birthday:1,BonusFactor:1,ChildrenInUniversity:1,ChildrenUnderEighteen:1,CityId:1,CityName:1,CostCentreId:1,CountryId:1,Cp8dId:1,CreateUser:1,DailyWorkingMinute:1,DeleteDate:1,DeleteUserId:1,DepartmentId:1,DepartmentName:1,DisabledChild:1,DisabledChildInUniversity:1,DivisionId:1,DivisionName:1,EisClass:1,EmployeeEmail:1,EmployeeId:1,EmployeeImg:1,EmployeeName:1,EmployeeType:1,EpfAccountNumber:1,EpfClass:1,FixedOtRateOption:1,GrantHrPrivilege:1,HrdfClass:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobDescription:1,JobGradeId:1,JobGradeName:1,JoinDate:1,LastPaymentDate:1,MaritalStatus:1,NationalityId:1,NationalityName:1,NightShiftAllowancePerDay:1,NoticePeriod:1,Nric:1,OccupationId:1,OccupationName:1,OldNric:1,OtPayEntitlement:1,OtRatePublicHoliday:1,OtRateWeekday:1,OtRateWeekend:1,PassedProbation:1,PassportExpiryDate:1,PassportIssueDate:1,PassportNumber:1,PassportValidPeriod:1,PayByDay:1,PayByHour:1,PayByMonth:1,PcBnumber:1,ProbationPeriod:1,ProbationPeriodFrom:1,ProbationPeriodUntil:1,Race:1,RaceId:1,RecruitmentDate:1,ResignLeaveDate:1,ResignationDate:1,Resigned:1,RetireDate:1,Retired:1,SectionId:1,SectionName:1,Sex:1,SocsoAccountNumber:1,SocsoClass:1,SsfwEffectiveDate:1,SsfwNumber:1,StateId:1,StateName:1,TelNumber1:1,TelNumber2:1,TerminateDate:1,TerminateLeaveDate:1,Terminated:1,UpdateDate:1,UpdateUserId:1,UserName:1,UserPassword:1,UserRowId:1,WorkingPermit:1,WorkingPermitExpireDate:1,WorkingPermitIssueDate:1,WorkingPermitValidFrom:1,WorkingPermitValidUntil:1,WorkingSpouse:1},OrganisationChart:{DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,OrgChart:1,UpdateDate:1,UpdateUserId:1},SplitOrganisationChart:{ClassName:1,DeleteDate:1,DeleteUserId:1,ElementRowId:1,EmployeeRowId:1,Extension:1,HierarchyLevel:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,NodeId:1,ParentId:1,Title:1,UpdateDate:1,UpdateUserId:1,childrenIndex:1,hierarchyId:1}},OrganisationHierarchy:{Department:{DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,UpdateDate:1,UpdateUserId:1},Division:{DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,UpdateDate:1,UpdateUserId:1},JobGrade:{DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,UpdateDate:1,UpdateUserId:1},Occupation:{DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,UpdateDate:1,UpdateUserId:1},Section:{DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,UpdateDate:1,UpdateUserId:1}},OrganisationStructure:{SplitOrganisationStructure:{ClassName:1,DeleteDate:1,DeleteUserId:1,ElementRowId:1,EmployeeRowId:1,HierarchyLevel:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Name:1,NodeId:1,ParentId:1,Title:1,UpdateDate:1,UpdateUserId:1,childrenIndex:1,hierarchyId:1}},PayrollSettings:{EisSubjection:{Allowances:1,ArrearsOfWages:1,BasicSalary:1,Bonuses:1,Commisions:1,DeleteDate:1,DeleteUserId:1,DirectorFee:1,EffectiveSince:1,EffectiveUntil:1,Gifts:1,Gratuity:1,Id:1,Incentives:1,InsertDate:1,InsertUserId:1,IsActive:1,OvertimePayments:1,PaymentInLieuOfNoticeOfTerminationOfService:1,PaymentsForUnutilisedAnnualOrMedicalLeaves:1,RetirementBenefits:1,ServiceCharges:1,TerminationBenefits:1,TravelAllowances:1,UpdateDate:1,UpdateUserId:1,WagesForMaternityLeave:1,WagesForPaternityLeave:1,WagesForStudyLeave:1},EmployerContributions:{Amount:1,DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,PayslipId:1,UpdateDate:1,UpdateUserId:1},EpfSubjection:{Allowances:1,ArrearsOfWages:1,BasicSalary:1,Bonuses:1,Commisions:1,DeleteDate:1,DeleteUserId:1,DirectorFee:1,EffectiveSince:1,EffectiveUntil:1,Gifts:1,Gratuity:1,Id:1,Incentives:1,InsertDate:1,InsertUserId:1,IsActive:1,OvertimePayments:1,PaymentInLieuOfNoticeOfTerminationOfService:1,PaymentsForUnutilisedAnnualOrMedicalLeaves:1,RetirementBenefits:1,ServiceCharges:1,TerminationBenefits:1,TravelAllowances:1,UpdateDate:1,UpdateUserId:1,WagesForMaternityLeave:1,WagesForPaternityLeave:1,WagesForStudyLeave:1},HrdfSubjection:{Allowances:1,ArrearsOfWages:1,BasicSalary:1,Bonuses:1,Commisions:1,DeleteDate:1,DeleteUserId:1,DirectorFee:1,EffectiveSince:1,EffectiveUntil:1,Gifts:1,Gratuity:1,Id:1,Incentives:1,InsertDate:1,InsertUserId:1,IsActive:1,OvertimePayments:1,PaymentInLieuOfNoticeOfTerminationOfService:1,PaymentsForUnutilisedAnnualOrMedicalLeaves:1,RetirementBenefits:1,ServiceCharges:1,TerminationBenefits:1,TravelAllowances:1,UpdateDate:1,UpdateUserId:1,WagesForMaternityLeave:1,WagesForPaternityLeave:1,WagesForStudyLeave:1},NoPaidLeave:{AfternoonSession:1,Deducted:1,Deductions:1,DepartmentID:1,DepartmentName:1,DivisionID:1,DivisionName:1,EmployeeId:1,EmployeeName:1,EmployeeRowId:1,HalfDay:1,Id:1,JobGradeID:1,JobGradeName:1,LeaveDate:1,MorningSession:1,OccupationID:1,OccupationName:1},Payroll:{AbsentDaily:1,AbsentDailyRate:1,Age:1,AllowanceList:1,AnnualizedBonus:1,AnnualizedIncentive:1,BankAccountNumber:1,BasicPay:1,BirthDay:1,Bonus:1,BonusSubjectEis:1,BonusSubjectEpf:1,BonusSubjectHrdf:1,BonusSubjectPcb:1,BonusSubjectSocso:1,ChildrenInUniversity:1,ChildrenUnderEighteen:1,CompanyBankAccountNumber:1,CompanyEPFAccountNumber:1,CompanyIncomeTaxAccountNumber:1,CompanyRegistrationNumber:1,CompanySocsoAccountNumber:1,CostCentreID:1,CostCentreName:1,CountryCode:1,CurrentDateTime:1,DailyRate:1,DaysWorked:1,Deduction:1,DeductionList:1,DeleteDate:1,DeleteUserId:1,DepartmentID:1,DepartmentName:1,DisabledChild:1,DisabledChildInUniversity:1,DivisionID:1,DivisionName:1,EPFAccountNumber:1,EarlyLeaving:1,EarlyLeavingRate:1,Earnings:1,EisAllowance:1,EisClass:1,EisWages:1,EmployeeCp38:1,EmployeeEIS:1,EmployeeEPF:1,EmployeeId:1,EmployeeName:1,EmployeePCB:1,EmployeeRowId:1,EmployeeSOCSO:1,EmployeeSsfw:1,EmployeeType:1,EmployerEIS:1,EmployerEPF:1,EmployerHRDF:1,EmployerSOCSO:1,EmployerTable:1,EpfAllowance:1,EpfClass:1,EpfWages:1,FlatOt:1,HourlyRate:1,HrdfAllowance:1,HrdfClass:1,HrdfWages:1,Id:1,Incentive:1,IncentiveSubjectEis:1,IncentiveSubjectEpf:1,IncentiveSubjectHrdf:1,IncentiveSubjectPcb:1,IncentiveSubjectSocso:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeID:1,JobGradeName:1,LateArrival:1,LateArrivalRate:1,MaritalStatus:1,NPLDaily:1,NPLDailyRate:1,NPLHourly:1,NPLHourlyRate:1,NRIC:1,Nett:1,NumberOfWorkingDays:1,OccupationID:1,OccupationName:1,OldNRIC:1,OtOne:1,OtOnePointFive:1,OtOnePointFiveRate:1,OtSubjectEis:1,OtSubjectEpf:1,OtSubjectHrdf:1,OtSubjectPcb:1,OtSubjectSocso:1,OtTwo:1,OtTwoRate:1,PCBnumber:1,PaidMoneyClaimingList:1,PassportNumber:1,PayDate:1,PayMonth:1,PayPeriodEnd:1,PayPeriodStart:1,PayYear:1,PayrollDeductions:1,PayrollEarnings:1,PayrollTable:1,PayslipPath:1,PcbAllowance:1,PcbWages:1,Remarks:1,SectionID:1,SectionName:1,SeperateBonus:1,SeperateIncentive:1,SocsoAccountNumber:1,SocsoAllowance:1,SocsoClass:1,SocsoWages:1,StateCode:1,TaxClass:1,UpdateDate:1,UpdateUserId:1,WorkingSpouse:1},PayrollDeductions:{Amount:1,DeductionCode:1,DeleteDate:1,DeleteUserId:1,Description:1,External:1,GovernmentPayments:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,PayslipId:1,UpdateDate:1,UpdateUserId:1},PayrollEarnings:{Amount:1,DeleteDate:1,DeleteUserId:1,Description:1,EarningCode:1,External:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,PayslipId:1,SubjectionToEis:1,SubjectionToEpf:1,SubjectionToHrdf:1,SubjectionToPcb:1,SubjectionToSocso:1,UpdateDate:1,UpdateUserId:1},PayrollGeneratingWizard:{All:1,CompanyRegistrationNumber:1,ContactPerson:1,CreditingDate:1,Deduction:1,DeleteDate:1,DeleteUserId:1,DepartmentList:1,DivisionList:1,Download:1,Earnings:1,Email:1,EmployeeEis:1,EmployeeEpf:1,EmployeeId:1,EmployeeName:1,EmployeePcb:1,EmployeeRowId:1,EmployeeRowList:1,EmployeeRowListBuffer:1,EmployeeSocso:1,EmployerEis:1,EmployerEpf:1,EmployerHrdf:1,EmployerSocso:1,EmployerTable:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeList:1,MasterStateId:1,Nett:1,OccupationList:1,OrganisationCode:1,OrganisationName:1,PayDate:1,PayMonth:1,PayPeriodEnd:1,PayPeriodStart:1,PayYear:1,PayrollTable:1,PayslipList:1,PhoneNumber:1,Remarks:1,SectionList:1,TestingMode:1,TextFormatAutopayId:1,TextFormatEisSocsoId:1,TextFormatEpfId:1,TextFormatLhdnId:1,TextType:1,UpdateDate:1,UpdateUserId:1},PayrollSettings:{AnnualizedBonus:1,AnnualizedIncentive:1,AutopayFormatId:1,BonusSubjectEis:1,BonusSubjectEpf:1,BonusSubjectHrdf:1,BonusSubjectPcb:1,BonusSubjectSocso:1,ContactPerson:1,CreditingDay:1,DeleteDate:1,DeleteUserId:1,EffectiveFrom:1,EffectiveUntil:1,EisFormatId:1,Email:1,EpfFormatId:1,Id:1,IncentiveSubjectEis:1,IncentiveSubjectEpf:1,IncentiveSubjectHrdf:1,IncentiveSubjectPcb:1,IncentiveSubjectSocso:1,InsertDate:1,InsertUserId:1,IsActive:1,LhdnFormatId:1,OrganisationCode:1,OrganisationName:1,PhoneNumber:1,SeperateBonus:1,SeperateIncentive:1,SocsoFormatId:1,StateCodeId:1,TextFormatId:1,UpdateDate:1,UpdateUserId:1},PayrollWizard:{Deduction:1,DeleteDate:1,DeleteUserId:1,DepartmentList:1,DivisionList:1,Earnings:1,EmployeeEis:1,EmployeeEpf:1,EmployeeId:1,EmployeeName:1,EmployeePcb:1,EmployeeRowId:1,EmployeeRowList:1,EmployeeRowListBuffer:1,EmployeeSocso:1,EmployerEis:1,EmployerEpf:1,EmployerHrdf:1,EmployerSocso:1,EmployerTable:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeList:1,Nett:1,OccupationList:1,PayDate:1,PayMonth:1,PayPeriodEnd:1,PayPeriodStart:1,PayrollTable:1,PayslipList:1,Remarks:1,SectionList:1,UpdateDate:1,UpdateUserId:1},PayslipDeductedOneTimeDeductions:{DeductionAmount:1,DeductionId:1,DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,PayslipId:1,UpdateDate:1,UpdateUserId:1,code:1},PayslipPaidMoneyClaiming:{ClaimAmount:1,ClaimingCategory:1,DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,MoneyClaimingId:1,PayslipId:1,SubjectionEis:1,SubjectionEpf:1,SubjectionHrdf:1,SubjectionPcb:1,SubjectionSocso:1,UpdateDate:1,UpdateUserId:1},PayslipPaidOneTimeAllowance:{AllowanceAmount:1,AllowanceId:1,DeleteDate:1,DeleteUserId:1,Description:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,PayslipId:1,SubjectionEis:1,SubjectionEpf:1,SubjectionHrdf:1,SubjectionPcb:1,SubjectionSocso:1,UpdateDate:1,UpdateUserId:1,code:1},PcbSubjection:{Allowances:1,ArrearsOfWages:1,BasicSalary:1,Bonuses:1,Commisions:1,DeleteDate:1,DeleteUserId:1,DirectorFee:1,EffectiveSince:1,EffectiveUntil:1,Gifts:1,Gratuity:1,Id:1,Incentives:1,InsertDate:1,InsertUserId:1,IsActive:1,OvertimePayments:1,PaymentInLieuOfNoticeOfTerminationOfService:1,PaymentsForUnutilisedAnnualOrMedicalLeaves:1,RetirementBenefits:1,ServiceCharges:1,TerminationBenefits:1,TravelAllowances:1,UpdateDate:1,UpdateUserId:1,WagesForMaternityLeave:1,WagesForPaternityLeave:1,WagesForStudyLeave:1},SocsoSubjection:{Allowances:1,ArrearsOfWages:1,BasicSalary:1,Bonuses:1,Commisions:1,DeleteDate:1,DeleteUserId:1,DirectorFee:1,EffectiveSince:1,EffectiveUntil:1,Gifts:1,Gratuity:1,Id:1,Incentives:1,InsertDate:1,InsertUserId:1,IsActive:1,OvertimePayments:1,PaymentInLieuOfNoticeOfTerminationOfService:1,PaymentsForUnutilisedAnnualOrMedicalLeaves:1,RetirementBenefits:1,ServiceCharges:1,TerminationBenefits:1,TravelAllowances:1,UpdateDate:1,UpdateUserId:1,WagesForMaternityLeave:1,WagesForPaternityLeave:1,WagesForStudyLeave:1},WeeklyPayroll:{DailyRate:1,DaysWorked:1,Deduction:1,DeleteDate:1,DeleteUserId:1,Earnings:1,EmployeeEis:1,EmployeeEpf:1,EmployeeRowId:1,EmployeeSocso:1,FlatOt:1,HourlyRate:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Nett:1,OtOne:1,OtOnePointFive:1,OtOnePointFiveRate:1,OtTwo:1,OtTwoRate:1,PayDate:1,PayMonth:1,PayPeriodEnd:1,PayPeriodStart:1,PayYear:1,PayrollTable:1,Remarks:1,UpdateDate:1,UpdateUserId:1,WeekIndex:1},WeeklyPayrollEmployee:{DeleteDate:1,DeleteUserId:1,EmployeeRowId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,UpdateDate:1,UpdateUserId:1,WeeklyPayrollSettingId:1},WeeklyPayrollSettings:{CostCentreList:1,DeleteDate:1,DeleteUserId:1,DepartmentList:1,Description:1,DivisionList:1,EmployeeList:1,GenerateFirst:1,GenerateFourth:1,GenerateSecond:1,GenerateThird:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,JobGradeList:1,Name:1,NewAddedEmployee:1,OccupationList:1,SectionList:1,UpdateDate:1,UpdateUserId:1}},PerformanceAppraisal:{CompanyProfile:{Address:1,DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Picture:1,Tel:1,Title:1,UpdateDate:1,UpdateUserId:1,Website:1},PerformanceAppraisalEvaluation:{BonusRate:1,DeleteDate:1,DeleteUserId:1,EmployeeSignDate:1,EmployeeSignID:1,EmployeeSignature:1,Evaluation:1,FormId:1,GeneralManagerSignDate:1,GeneralManagerSignID:1,GeneralManagerSignature:1,Goals:1,HodSignDate:1,HodSignID:1,HodSignature:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,OverallRate:1,Summary:1,UpdateDate:1,UpdateUserId:1},PerformanceAppraisalFileAttach:{DeleteDate:1,DeleteUserId:1,Files:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Remark:1,UpdateDate:1,UpdateUserId:1},PerformanceAppraisalForm:{ApprovalEndDate:1,ApprovalStartDate:1,DeleteDate:1,DeleteUserId:1,EmployeeId:1,EmployeeName:1,EmployeeRowId:1,EndDate:1,EvaluateEndDate:1,EvaluateStartDate:1,HodId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,ReviewStatus:1,StartDate:1,SubmissionStatus:1,TemplateId:1,TemplateName:1,TypeId:1,TypeName:1,UpdateDate:1,UpdateUserId:1},PerformanceAppraisalQuestion:{AnswerType:1,DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Questions:1,UpdateDate:1,UpdateUserId:1},PerformanceAppraisalResponse:{Answer:1,AnswerType:1,DeleteDate:1,DeleteUserId:1,FormId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Question:1,QuestionId:1,UpdateDate:1,UpdateUserId:1},PerformanceAppraisalReviewer:{DeleteDate:1,DeleteUserId:1,EmployeeRowId:1,FormId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,UpdateDate:1,UpdateUserId:1},PerformanceAppraisalTemplate:{DeleteDate:1,DeleteUserId:1,Duration:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,RatingScale:1,TemplateName:1,UpdateDate:1,UpdateUserId:1},PerformanceAppraisalTemplateDepartment:{DeleteDate:1,DeleteUserId:1,DepartmentId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,TemplateId:1,UpdateDate:1,UpdateUserId:1},PerformanceAppraisalTemplateQuestion:{DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,QuestionId:1,QuestionText:1,TemplateId:1,UpdateDate:1,UpdateUserId:1},PerformanceAppraisalType:{DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Type:1,UpdateDate:1,UpdateUserId:1}},PublicHoliday:{PublicHoliday:{CountryCode:1,Date:1,Id:1,IsActive:1,Name:1}},Race:{Race:{DeleteDate:1,DeleteUserId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Race:1,UpdateDate:1,UpdateUserId:1}},SetEmployeeShift:{SetEmployeeShift:{DeleteDate:1,DeleteUserId:1,EmployeeGroupId:1,EmployeeGroupName:1,EmployeeName:1,EmployeeRowId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,ShiftEndDate:1,ShiftId:1,ShiftName:1,ShiftStartDate:1,UpdateDate:1,UpdateUserId:1}},Shift:{Shift:{DeleteDate:1,DeleteUserId:1,Description:1,FridayEndingAt:1,FridayLunchTimeEndingAt:1,FridayLunchTimeStartingFrom:1,FridayStartingFrom:1,FridayWorkingTime:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,MondayEndingAt:1,MondayLunchTimeEndingAt:1,MondayLunchTimeStartingFrom:1,MondayStartingFrom:1,MondayWorkingTime:1,NightShiftBetweenEnd:1,NightShiftBetweenStart:1,SaturdayEndingAt:1,SaturdayLunchTimeEndingAt:1,SaturdayLunchTimeStartingFrom:1,SaturdayStartingFrom:1,SaturdayWorkingTime:1,ShiftColor:1,ShiftName:1,SundayEndingAt:1,SundayLunchTimeEndingAt:1,SundayLunchTimeStartingFrom:1,SundayStartingFrom:1,SundayWorkingTime:1,ThursdayEndingAt:1,ThursdayLunchTimeEndingAt:1,ThursdayLunchTimeStartingFrom:1,ThursdayStartingFrom:1,ThursdayWorkingTime:1,TuesdayEndingAt:1,TuesdayLunchTimeEndingAt:1,TuesdayLunchTimeStartingFrom:1,TuesdayStartingFrom:1,TuesdayWorkingTime:1,TypeOfShift:1,UpdateDate:1,UpdateUserId:1,WednesdayEndingAt:1,WednesdayLunchTimeEndingAt:1,WednesdayLunchTimeStartingFrom:1,WednesdayStartingFrom:1,WednesdayWorkingTime:1}},ShiftHistory:{ShiftHistory:{DeleteDate:1,DeleteUserId:1,EmployeeId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,Shift:1,ShiftEndDate:1,ShiftStartDate:1,UpdateDate:1,UpdateUserId:1}},SickLeavePolicy:{SickLeavePolicy:{DeleteDate:1,DeleteUserId:1,EligibleDays:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,PolicyRow:1,ServiceFromYear:1,ServiceUntilYear:1,UpdateDate:1,UpdateUserId:1,Year:1}},TrainingManagement:{AttendanceList:{EndDate:1,FlowType:1,GradeType:1,Id:1,ParticipantList:1,ProgramId:1,ProgramName:1,Remark:1,StartDate:1},MasterProgram:{AllDepartment:1,Comment:1,DeleteDate:1,DeleteUserId:1,DepartmentList:1,Detail:1,ExtraDocument:1,FlowList:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,ProgramName:1,Routine:1,RoutineEndDate:1,RoutineInterval:1,RoutineStartDate:1,Status:1,UpdateDate:1,UpdateUserId:1},ProgramDepartment:{DeleteDate:1,DeleteUserId:1,DepartmentId:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,MasterProgramId:1,ProgramId:1,UpdateDate:1,UpdateUserId:1},ProgramFlow:{Date:1,DeleteDate:1,DeleteUserId:1,FlowType:1,GradeType:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,MasterProgramId:1,ParticipantList:1,ProgramId:1,Remark:1,UpdateDate:1,UpdateUserId:1},ProgramFlowResponse:{Attendance:1,DeleteDate:1,DeleteUserId:1,EmployeeId:1,File:1,FlowId:1,GradeValue:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,ProgramName:1,Remark:1,UpdateDate:1,UpdateUserId:1},ProgramParticipant:{DeleteDate:1,DeleteUserId:1,EmployeeId:1,EmployeeName:1,EmployeeRowId:1,ExtraField1:1,ExtraField2:1,ExtraField3:1,ExtraField4:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,ProgramId:1,Staff:1,Trainee:1,UpdateDate:1,UpdateUserId:1},ProgramSession:{Comment:1,DateTba:1,DeleteDate:1,DeleteUserId:1,DepartmentList:1,Detail:1,EndDate:1,ExtraDocument:1,FlowList:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,MasterProgramId:1,OneDay:1,ParticipantList:1,ProgramName:1,StartDate:1,Status:1,UpdateDate:1,UpdateUserId:1},Report:{Comment:1,DateTba:1,DeleteDate:1,DeleteUserId:1,DepartmentList:1,Detail:1,EndDate:1,ExtraDocument:1,FlowList:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,MasterProgramId:1,OneDay:1,ParticipantList:1,ProgramName:1,StartDate:1,Status:1,UpdateDate:1,UpdateUserId:1}},ViewShiftHistory:{ViewShiftHistory:{DeleteDate:1,DeleteUserId:1,EmployeeGroupID:1,EmployeeId:1,EmployeeName:1,EmployeeRowID:1,Id:1,InsertDate:1,InsertUserId:1,IsActive:1,ShiftEndDate:1,ShiftId:1,ShiftName:1,ShiftStartDate:1,UpdateDate:1,UpdateUserId:1}}},Forms:{Membership:{ChangePassword:{FormTitle:1,SubmitButton:1,Success:1},ForgotPassword:{FormInfo:1,FormTitle:1,SubmitButton:1,SuccessMessage:1},Login:{ForgotPassword:1,LoginToYourAccount:1,OR:1,RememberMe:1,SignInButton:1,SignUpButton:1},ResetPassword:{EmailSubject:1,FormTitle:1,SubmitButton:1,Success:1},SignUp:{ActivateEmailSubject:1,ActivationCompleteMessage:1,ConfirmEmail:1,ConfirmPassword:1,DisplayName:1,Email:1,FormInfo:1,FormTitle:1,Password:1,SubmitButton:1,Success:1}},SiteTitle:1},Navigation:{LogoutLink:1,SiteTitle:1},Site:{AccessDenied:{ClickToChangeUser:1,ClickToLogin:1,LackPermissions:1,NotLoggedIn:1,PageTitle:1},Layout:{Language:1,Theme:1},RolePermissionDialog:{DialogTitle:1,EditButton:1,SaveSuccess:1},UserDialog:{EditPermissionsButton:1,EditRolesButton:1},UserPermissionDialog:{DialogTitle:1,Grant:1,Permission:1,Revoke:1,SaveSuccess:1},ValidationError:{Title:1}},Validation:{AuthenticationError:1,CurrentPasswordMismatch:1,DeleteForeignKeyError:1,EmailConfirm:1,EmailInUse:1,InvalidActivateToken:1,InvalidResetToken:1,MinRequiredPasswordLength:1,PasswordConfirmMismatch:1,SavePrimaryKeyError:1}}) as any;
}

export const Texts = HRMSoftware.Texts;