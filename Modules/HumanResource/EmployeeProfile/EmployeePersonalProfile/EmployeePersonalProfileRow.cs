using HRMSoftware.Administration;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;

[ConnectionKey("Default"), Module("EmployeeProfile"), TableName("HumanResourcesEmployee")]
[DisplayName("Employee Personal Profile"), InstanceName("Employee Personal Profile")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class EmployeePersonalProfileRow : Row<EmployeePersonalProfileRow.RowFields>, IIdRow, INameRow
{
    const string jRace = nameof(jRace);
    const string jDepartment = nameof(jDepartment);
    const string jDivision = nameof(jDivision);
    const string jSection = nameof(jSection);
    const string jJobGrade = nameof(jJobGrade);
    const string jOccupation = nameof(jOccupation);
    const string jBank = nameof(jBank);
    const string jCity = nameof(jCity);
    const string jState = nameof(jState);
    const string jNationality = nameof(jNationality);

    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Employee Name"), Size(1000), QuickSearch, NameProperty]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }

    [DisplayName("Employee Id"), Column("EmployeeID"), Size(1000)]
    public string EmployeeId
    {
        get => fields.EmployeeId[this];
        set => fields.EmployeeId[this] = value;
    }

    [DisplayName("Nric"), Column("NRIC"), Size(1000)]
    public string Nric
    {
        get => fields.Nric[this];
        set => fields.Nric[this] = value;
    }

    [DisplayName("Age")]
    public int? Age
    {
        get => fields.Age[this];
        set => fields.Age[this] = value;
    }

    [DisplayName("Last Payment Date")]
    public DateTime? LastPaymentDate
    {
        get => fields.LastPaymentDate[this];
        set => fields.LastPaymentDate[this] = value;
    }

    [DisplayName("Recruitment Date")]
    public DateTime? RecruitmentDate
    {
        get => fields.RecruitmentDate[this];
        set => fields.RecruitmentDate[this] = value;
    }

    [DisplayName("Birthday")]
    public DateTime? Birthday
    {
        get => fields.Birthday[this];
        set => fields.Birthday[this] = value;
    }

    [DisplayName("Employee Email"), Size(1000)]
    public string EmployeeEmail
    {
        get => fields.EmployeeEmail[this];
        set => fields.EmployeeEmail[this] = value;
    }

    [DisplayName("Epf Account Number"), Column("EPFAccountNumber"), Size(1000)]
    public string EpfAccountNumber
    {
        get => fields.EpfAccountNumber[this];
        set => fields.EpfAccountNumber[this] = value;
    }

    [DisplayName("Probation Period End")]
    public DateTime? ProbationPeriodEnd
    {
        get => fields.ProbationPeriodEnd[this];
        set => fields.ProbationPeriodEnd[this] = value;
    }

    [DisplayName("Probation Period")]
    public int? ProbationPeriod
    {
        get => fields.ProbationPeriod[this];
        set => fields.ProbationPeriod[this] = value;
    }

    [DisplayName("Notice Period")]
    public int? NoticePeriod
    {
        get => fields.NoticePeriod[this];
        set => fields.NoticePeriod[this] = value;
    }

    [DisplayName("Address"), Size(1000)]
    public string Address
    {
        get => fields.Address[this];
        set => fields.Address[this] = value;
    }

    [DisplayName("Tel Number1"), Size(1000)]
    public string TelNumber1
    {
        get => fields.TelNumber1[this];
        set => fields.TelNumber1[this] = value;
    }

    [DisplayName("Tel Number2"), Size(1000)]
    public string TelNumber2
    {
        get => fields.TelNumber2[this];
        set => fields.TelNumber2[this] = value;
    }

    [DisplayName("Passport Number"), Size(1000)]
    public string PassportNumber
    {
        get => fields.PassportNumber[this];
        set => fields.PassportNumber[this] = value;
    }

    [DisplayName("Passport Issue Date")]
    public DateTime? PassportIssueDate
    {
        get => fields.PassportIssueDate[this];
        set => fields.PassportIssueDate[this] = value;
    }

    [DisplayName("Passport Valid Period")]
    public int? PassportValidPeriod
    {
        get => fields.PassportValidPeriod[this];
        set => fields.PassportValidPeriod[this] = value;
    }

    [DisplayName("Passport Expiry Date")]
    public DateTime? PassportExpiryDate
    {
        get => fields.PassportExpiryDate[this];
        set => fields.PassportExpiryDate[this] = value;
    }

    [DisplayName("Bonus Factor")]
    public double? BonusFactor
    {
        get => fields.BonusFactor[this];
        set => fields.BonusFactor[this] = value;
    }

    [DisplayName("Basic Salary")]
    public double? BasicSalary
    {
        get => fields.BasicSalary[this];
        set => fields.BasicSalary[this] = value;
    }

    [DisplayName("Allowance"), Column("allowance")]
    public double? Allowance
    {
        get => fields.Allowance[this];
        set => fields.Allowance[this] = value;
    }

    [DisplayName("Insert Date")]
    public DateTime? InsertDate
    {
        get => fields.InsertDate[this];
        set => fields.InsertDate[this] = value;
    }

    [DisplayName("Update Date")]
    public DateTime? UpdateDate
    {
        get => fields.UpdateDate[this];
        set => fields.UpdateDate[this] = value;
    }

    [DisplayName("Delete Date")]
    public DateTime? DeleteDate
    {
        get => fields.DeleteDate[this];
        set => fields.DeleteDate[this] = value;
    }

    [DisplayName("Race"), Column("RaceID"), ForeignKey("HumanResourcesRace", "ID"), LeftJoin(jRace), TextualField(nameof(Race))]
    public int? RaceId
    {
        get => fields.RaceId[this];
        set => fields.RaceId[this] = value;
    }

    [DisplayName("Employee Type")]
    public int? EmployeeType
    {
        get => fields.EmployeeType[this];
        set => fields.EmployeeType[this] = value;
    }

    [DisplayName("Sex")]
    public int? Sex
    {
        get => fields.Sex[this];
        set => fields.Sex[this] = value;
    }

    [DisplayName("Department"), Column("DepartmentID"), ForeignKey("HumanResourcesDepartment", "ID"), LeftJoin(jDepartment), TextualField(nameof(DepartmentName))]
    public int? DepartmentId
    {
        get => fields.DepartmentId[this];
        set => fields.DepartmentId[this] = value;
    }

    [DisplayName("Is Active")]
    public short? IsActive
    {
        get => fields.IsActive[this];
        set => fields.IsActive[this] = value;
    }

    [DisplayName("Insert User Id")]
    public int? InsertUserId
    {
        get => fields.InsertUserId[this];
        set => fields.InsertUserId[this] = value;
    }

    [DisplayName("Update User Id")]
    public int? UpdateUserId
    {
        get => fields.UpdateUserId[this];
        set => fields.UpdateUserId[this] = value;
    }

    [DisplayName("Delete User Id")]
    public int? DeleteUserId
    {
        get => fields.DeleteUserId[this];
        set => fields.DeleteUserId[this] = value;
    }

    [DisplayName("Division"), Column("DivisionID"), ForeignKey("HumanResourcesDivision", "ID"), LeftJoin(jDivision), TextualField(nameof(DivisionName))]
    public int? DivisionId
    {
        get => fields.DivisionId[this];
        set => fields.DivisionId[this] = value;
    }

    [DisplayName("Section"), Column("SectionID"), ForeignKey("HumanResourcesSection", "ID"), LeftJoin(jSection), TextualField(nameof(SectionName))]
    public int? SectionId
    {
        get => fields.SectionId[this];
        set => fields.SectionId[this] = value;
    }

    [DisplayName("Job Grade"), Column("JobGradeID"), ForeignKey("HumanResourcesJobGrade", "ID"), LeftJoin(jJobGrade), TextualField(nameof(JobGradeName))]
    public int? JobGradeId
    {
        get => fields.JobGradeId[this];
        set => fields.JobGradeId[this] = value;
    }

    [DisplayName("Occupation"), Column("OccupationID"), ForeignKey("HumanResourcesOccupation", "ID"), LeftJoin(jOccupation), TextualField(nameof(OccupationName))]
    public int? OccupationId
    {
        get => fields.OccupationId[this];
        set => fields.OccupationId[this] = value;
    }

    [DisplayName("Bank"), Column("BankID"), ForeignKey("MasterBanks", "ID"), LeftJoin(jBank), TextualField(nameof(BankName))]
    public int? BankId
    {
        get => fields.BankId[this];
        set => fields.BankId[this] = value;
    }

    [DisplayName("Bank Account Number"), Size(1000)]
    public string BankAccountNumber
    {
        get => fields.BankAccountNumber[this];
        set => fields.BankAccountNumber[this] = value;
    }

    [DisplayName("City"), Column("CityID"), ForeignKey("MasterCities", "ID"), LeftJoin(jCity), TextualField(nameof(CityName))]
    public int? CityId
    {
        get => fields.CityId[this];
        set => fields.CityId[this] = value;
    }

    [DisplayName("State"), Column("StateID"), ForeignKey("MasterStates", "ID"), LeftJoin(jState), TextualField(nameof(StateName))]
    public int? StateId
    {
        get => fields.StateId[this];
        set => fields.StateId[this] = value;
    }

    [DisplayName("Employee Img"), Size(1000)]
    public string EmployeeImg
    {
        get => fields.EmployeeImg[this];
        set => fields.EmployeeImg[this] = value;
    }

    [DisplayName("Nationality"), Column("NationalityID"), ForeignKey("MasterCountries", "ID"), LeftJoin(jNationality), TextualField(nameof(NationalityName))]
    public int? NationalityId
    {
        get => fields.NationalityId[this];
        set => fields.NationalityId[this] = value;
    }

    [DisplayName("Marital Status")]
    public int? MaritalStatus
    {
        get => fields.MaritalStatus[this];
        set => fields.MaritalStatus[this] = value;
    }

    [DisplayName("Grant Hr Privilege"), Column("GrantHRPrivilege")]
    public int? GrantHrPrivilege
    {
        get => fields.GrantHrPrivilege[this];
        set => fields.GrantHrPrivilege[this] = value;
    }

    [DisplayName("Create User")]
    public int? CreateUser
    {
        get => fields.CreateUser[this];
        set => fields.CreateUser[this] = value;
    }

    [DisplayName("Pay By Hour")]
    public int? PayByHour
    {
        get => fields.PayByHour[this];
        set => fields.PayByHour[this] = value;
    }

    [DisplayName("Pay By Month")]
    public int? PayByMonth
    {
        get => fields.PayByMonth[this];
        set => fields.PayByMonth[this] = value;
    }

    [DisplayName("Pay By Day")]
    public int? PayByDay
    {
        get => fields.PayByDay[this];
        set => fields.PayByDay[this] = value;
    }

    [DisplayName("Ot Pay Entitlement")]
    public int? OtPayEntitlement
    {
        get => fields.OtPayEntitlement[this];
        set => fields.OtPayEntitlement[this] = value;
    }

    [DisplayName("Daily Working Minutes")]
    public int? DailyWorkingMinutes
    {
        get => fields.DailyWorkingMinutes[this];
        set => fields.DailyWorkingMinutes[this] = value;
    }

    [DisplayName("User Password"), Size(50)]
    public string UserPassword
    {
        get => fields.UserPassword[this];
        set => fields.UserPassword[this] = value;
    }

    [DisplayName("User Row Id"), Column("UserRowID")]
    public int? UserRowId
    {
        get => fields.UserRowId[this];
        set => fields.UserRowId[this] = value;
    }

    [DisplayName("User Name"), Size(50)]
    public string UserName
    {
        get => fields.UserName[this];
        set => fields.UserName[this] = value;
    }

    [DisplayName("Resignation Date")]
    public DateTime? ResignationDate
    {
        get => fields.ResignationDate[this];
        set => fields.ResignationDate[this] = value;
    }

    [DisplayName("Leave Date")]
    public DateTime? LeaveDate
    {
        get => fields.LeaveDate[this];
        set => fields.LeaveDate[this] = value;
    }

    [DisplayName("Terminated")]
    public int? Terminated
    {
        get => fields.Terminated[this];
        set => fields.Terminated[this] = value;
    }

    [DisplayName("Resigned")]
    public int? Resigned
    {
        get => fields.Resigned[this];
        set => fields.Resigned[this] = value;
    }

    [DisplayName("Epf Contribution")]
    public int? EpfContribution
    {
        get => fields.EpfContribution[this];
        set => fields.EpfContribution[this] = value;
    }

    [DisplayName("Race"), Expression($"{jRace}.[Race]")]
    public string Race
    {
        get => fields.Race[this];
        set => fields.Race[this] = value;
    }

    [DisplayName("Department Name"), Expression($"{jDepartment}.[Name]")]
    public string DepartmentName
    {
        get => fields.DepartmentName[this];
        set => fields.DepartmentName[this] = value;
    }

    [DisplayName("Division Name"), Expression($"{jDivision}.[Name]")]
    public string DivisionName
    {
        get => fields.DivisionName[this];
        set => fields.DivisionName[this] = value;
    }

    [DisplayName("Section Name"), Expression($"{jSection}.[Name]")]
    public string SectionName
    {
        get => fields.SectionName[this];
        set => fields.SectionName[this] = value;
    }

    [DisplayName("Job Grade Name"), Expression($"{jJobGrade}.[Name]")]
    public string JobGradeName
    {
        get => fields.JobGradeName[this];
        set => fields.JobGradeName[this] = value;
    }

    [DisplayName("Occupation Name"), Expression($"{jOccupation}.[Name]")]
    public string OccupationName
    {
        get => fields.OccupationName[this];
        set => fields.OccupationName[this] = value;
    }

    [DisplayName("Bank Name"), Expression($"{jBank}.[Name]")]
    public string BankName
    {
        get => fields.BankName[this];
        set => fields.BankName[this] = value;
    }

    [DisplayName("City Name"), Expression($"{jCity}.[Name]")]
    public string CityName
    {
        get => fields.CityName[this];
        set => fields.CityName[this] = value;
    }

    [DisplayName("State Name"), Expression($"{jState}.[Name]")]
    public string StateName
    {
        get => fields.StateName[this];
        set => fields.StateName[this] = value;
    }

    [DisplayName("Nationality Name"), Expression($"{jNationality}.[Name]")]
    public string NationalityName
    {
        get => fields.NationalityName[this];
        set => fields.NationalityName[this] = value;
    }

    public class RowFields : RowFieldsBase
    {
        public Int32Field Id;
        public StringField EmployeeName;
        public StringField EmployeeId;
        public StringField Nric;
        public Int32Field Age;
        public DateTimeField LastPaymentDate;
        public DateTimeField RecruitmentDate;
        public DateTimeField Birthday;
        public StringField EmployeeEmail;
        public StringField EpfAccountNumber;
        public DateTimeField ProbationPeriodEnd;
        public Int32Field ProbationPeriod;
        public Int32Field NoticePeriod;
        public StringField Address;
        public StringField TelNumber1;
        public StringField TelNumber2;
        public StringField PassportNumber;
        public DateTimeField PassportIssueDate;
        public Int32Field PassportValidPeriod;
        public DateTimeField PassportExpiryDate;
        public DoubleField BonusFactor;
        public DoubleField BasicSalary;
        public DoubleField Allowance;
        public DateTimeField InsertDate;
        public DateTimeField UpdateDate;
        public DateTimeField DeleteDate;
        public Int32Field RaceId;
        public Int32Field EmployeeType;
        public Int32Field Sex;
        public Int32Field DepartmentId;
        public Int16Field IsActive;
        public Int32Field InsertUserId;
        public Int32Field UpdateUserId;
        public Int32Field DeleteUserId;
        public Int32Field DivisionId;
        public Int32Field SectionId;
        public Int32Field JobGradeId;
        public Int32Field OccupationId;
        public Int32Field BankId;
        public StringField BankAccountNumber;
        public Int32Field CityId;
        public Int32Field StateId;
        public StringField EmployeeImg;
        public Int32Field NationalityId;
        public Int32Field MaritalStatus;
        public Int32Field GrantHrPrivilege;
        public Int32Field CreateUser;
        public Int32Field PayByHour;
        public Int32Field PayByMonth;
        public Int32Field PayByDay;
        public Int32Field OtPayEntitlement;
        public Int32Field DailyWorkingMinutes;
        public StringField UserPassword;
        public Int32Field UserRowId;
        public StringField UserName;
        public DateTimeField ResignationDate;
        public DateTimeField LeaveDate;
        public Int32Field Terminated;
        public Int32Field Resigned;
        public Int32Field EpfContribution;

        public StringField Race;
        public StringField DepartmentName;
        public StringField DivisionName;
        public StringField SectionName;
        public StringField JobGradeName;
        public StringField OccupationName;
        public StringField BankName;
        public StringField CityName;
        public StringField StateName;
        public StringField NationalityName;
    }
}