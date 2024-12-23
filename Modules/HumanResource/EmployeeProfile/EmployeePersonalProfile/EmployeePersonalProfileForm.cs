using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeProfile.Forms;

[FormScript("EmployeeProfile.EmployeePersonalProfile")]
[BasedOnRow(typeof(EmployeePersonalProfileRow), CheckNames = true)]
public class EmployeePersonalProfileForm
{
    public string EmployeeName { get; set; }
    public string EmployeeId { get; set; }
    public string Nric { get; set; }
    public int Age { get; set; }
    public DateTime LastPaymentDate { get; set; }
    public DateTime RecruitmentDate { get; set; }
    public DateTime Birthday { get; set; }
    public string EmployeeEmail { get; set; }
    public string EpfAccountNumber { get; set; }
    public DateTime ProbationPeriodEnd { get; set; }
    public int ProbationPeriod { get; set; }
    public int NoticePeriod { get; set; }
    public string Address { get; set; }
    public string TelNumber1 { get; set; }
    public string TelNumber2 { get; set; }
    public string PassportNumber { get; set; }
    public DateTime PassportIssueDate { get; set; }
    public int PassportValidPeriod { get; set; }
    public DateTime PassportExpiryDate { get; set; }
    public double BonusFactor { get; set; }
    public double BasicSalary { get; set; }
    public double Allowance { get; set; }
    public DateTime InsertDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public DateTime DeleteDate { get; set; }
    public int RaceId { get; set; }
    public int EmployeeType { get; set; }
    public int Sex { get; set; }
    public int DepartmentId { get; set; }
    public short IsActive { get; set; }
    public int InsertUserId { get; set; }
    public int UpdateUserId { get; set; }
    public int DeleteUserId { get; set; }
    public int DivisionId { get; set; }
    public int SectionId { get; set; }
    public int JobGradeId { get; set; }
    public int OccupationId { get; set; }
    public int BankId { get; set; }
    public string BankAccountNumber { get; set; }
    public int CityId { get; set; }
    public int StateId { get; set; }
    public string EmployeeImg { get; set; }
    public int NationalityId { get; set; }
    public int MaritalStatus { get; set; }
    public int GrantHrPrivilege { get; set; }
    public int CreateUser { get; set; }
    public int PayByHour { get; set; }
    public int PayByMonth { get; set; }
    public int PayByDay { get; set; }
    public int OtPayEntitlement { get; set; }
    public int DailyWorkingMinutes { get; set; }
    public string UserPassword { get; set; }
    public int UserRowId { get; set; }
    public string UserName { get; set; }
    public DateTime ResignationDate { get; set; }
    public DateTime LeaveDate { get; set; }
    public int Terminated { get; set; }
    public int Resigned { get; set; }
    public int EpfContribution { get; set; }
}