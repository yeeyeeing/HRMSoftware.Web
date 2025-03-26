using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Common;
using HRMSoftware.Administration;
using HRMSoftware.EmployeeProfile.Columns;
using System.Collections.Generic;
using HRMSoftware.Master;

namespace HRMSoftware.EmployeeProfile
{

    [ConnectionKey("Default"), Module("EmployeeProfile"), TableName("HumanResourcesEmployee")]
    [DisplayName("Employee Profile"), InstanceName("Employee Profile")]
    [ReadPermission("*")]
    [InsertPermission("*")]
    [ModifyPermission("*")]
    [DeletePermission("*")]
    [UpdatePermission("*")]

    [LookupScript("EmployeeProfile.EmployeeProfile", Permission = "*")]
    [DataAuditLog]
    public sealed class EmployeeProfileRow : LoggingRow<EmployeeProfileRow.RowFields>, IIdRow, INameRow
    {
        const string jRace = nameof(jRace);
        const string jDepartment = nameof(jDepartment);
        const string jDivision = nameof(jDivision);
        const string jSection = nameof(jSection);
        const string jJobGrade = nameof(jJobGrade);
        const string jOccupation = nameof(jOccupation);
        const string jBank = nameof(jBank);
        const string jShift = nameof(jShift);
        const string jCity = nameof(jCity);
        const string jState = nameof(jState);
        const string jNationality = nameof(jNationality);
        const string jCostCentre = nameof(jCostCentre);
        const string jCp8d = nameof(jCp8d);
        const string jPostalCode = nameof(jPostalCode);


        [DisplayName("Id"), Column("ID"), Identity, IdProperty]
        public int? Id
        {
            get => fields.Id[this];
            set => fields.Id[this] = value;
        }

        [DisplayName("Employee Name"), Size(1000), QuickSearch, NotNull]
        public string EmployeeName
        {
            get => fields.EmployeeName[this];
            set => fields.EmployeeName[this] = value;
        }

        [DisplayName("Employee Id"), Column("EmployeeID"), QuickSearch, Size(1000), NotNull, NameProperty]
        public string EmployeeID
        {
            get => fields.EmployeeID[this];
            set => fields.EmployeeID[this] = value;
        }

        [DisplayName("Identity Card Number"), Column("NRIC"), Size(1000)]
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

        [DisplayName("Calculation Date"), NotMapped]
        public DateTime? CalculationDate
        {
            get => fields.CalculationDate[this];
            set => fields.CalculationDate[this] = value;
        }

        [DisplayName("Recruitment Date"), NotNull]
        public DateTime? RecruitmentDate
        {
            get => fields.RecruitmentDate[this];
            set => fields.RecruitmentDate[this] = value;
        }

        [DisplayName("Resignation Date")]
        public DateTime? ResignationDate
        {
            get => fields.ResignationDate[this];
            set => fields.ResignationDate[this] = value;
        }


        [DisplayName("Join Date"),NotNull]
        public DateTime? JoinDate
        {
            get => fields.JoinDate[this];
            set => fields.JoinDate[this] = value;
        }


        [DisplayName("Birthday"), NotNull]
        public DateTime? Birthday
        {
            get => fields.Birthday[this];
            set => fields.Birthday[this] = value;
        }

        [DisplayName("SSFW Effective Date")]
        public DateTime? SsfwEffectiveDate
        {
            get => fields.SsfwEffectiveDate[this];
            set => fields.SsfwEffectiveDate[this] = value;
        }


        [DisplayName("Employee Email"), Size(1000), NotNull]
        public string EmployeeEmail
        {
            get => fields.EmployeeEmail[this];
            set => fields.EmployeeEmail[this] = value;
        }

        [DisplayName("SSFW Number"), Size(1000)]
        public string SsfwNumber
        {
            get => fields.SsfwNumber[this];
            set => fields.SsfwNumber[this] = value;
        }

        [DisplayName("Epf Account Number"), Column("EPFAccountNumber"), Size(1000)]
        public string EpfAccountNumber
        {
            get => fields.EpfAccountNumber[this];
            set => fields.EpfAccountNumber[this] = value;
        }

        [DisplayName("Probation Period")]
        public double? ProbationPeriod
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




        [DisplayName("Tel Number1"), Size(1000), NotNull]
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

        [DisplayName("Basic Salary"), NotNull]
        public double? BasicSalary
        {
            get => fields.BasicSalary[this];
            set => fields.BasicSalary[this] = value;
        }
        [DisplayName("Night Shift Allowance Per Day"), NotNull]
        public double? NightShiftAllowancePerDay
        {
            get => fields.NightShiftAllowancePerDay[this];
            set => fields.NightShiftAllowancePerDay[this] = value;
        }


        [DisplayName("Grant HR Privilege"), Column("GrantHRPrivilege")]
        [BooleanEditor]
        public bool? GrantHRPrivilege
        {
            get => fields.GrantHRPrivilege[this];
            set => fields.GrantHRPrivilege[this] = value;
        }

        [DisplayName("Fixed Ot Rate"), Column("FixedOtRateOption")]
        [BooleanEditor]
        public bool? FixedOtRateOption
        {
            get => fields.FixedOtRateOption[this];
            set => fields.FixedOtRateOption[this] = value;
        }





        [DisplayName("Create User"), Column("CreateUser")]
        [BooleanEditor]
        public bool? CreateUser
        {
            get => fields.CreateUser[this];
            set => fields.CreateUser[this] = value;
        }
        [DisplayName("Working Spouse"), Column("WorkingSpouse")]
        [BooleanEditor]
        public bool? WorkingSpouse
        {
            get => fields.WorkingSpouse[this];
            set => fields.WorkingSpouse[this] = value;
        }

        [DisplayName("Studying Children"), DefaultValue(0)]
        public int? ChildrenUnderEighteen
        {
            get => fields.ChildrenUnderEighteen[this];
            set => fields.ChildrenUnderEighteen[this] = value;
        }
        [DisplayName("Children In Diploma or Above"), DefaultValue(0)]
        public int? ChildrenInUniversity
        {
            get => fields.ChildrenInUniversity[this];
            set => fields.ChildrenInUniversity[this] = value;
        }
        [DisplayName("Studying Disabled Child"), DefaultValue(0)]
        public int? DisabledChild
        {
            get => fields.DisabledChild[this];
            set => fields.DisabledChild[this] = value;
        }
        [DisplayName("Disabled Child In Diploma or Above"), DefaultValue(0)]
        public int? DisabledChildInUniversity
        {
            get => fields.DisabledChildInUniversity[this];
            set => fields.DisabledChildInUniversity[this] = value;
        }
        [DisplayName("OT Pay Entitlement"), Column("OtPayEntitlement")]
        [BooleanEditor]
        public bool? OtPayEntitlement
        {
            get => fields.OtPayEntitlement[this];
            set => fields.OtPayEntitlement[this] = value;
        }


        [DisplayName("Pay By Hour"), Column("PayByHour")]
        [BooleanEditor]
        public bool? PayByHour
        {
            get => fields.PayByHour[this];
            set => fields.PayByHour[this] = value;
        }


        [DisplayName("Pay By Month"), Column("PayByMonth")]
        [BooleanEditor]
        public bool? PayByMonth
        {
            get => fields.PayByMonth[this];
            set => fields.PayByMonth[this] = value;
        }

        [DisplayName("Pay By Day"), Column("PayByDay")]
        [BooleanEditor]
        public bool? PayByDay
        {
            get => fields.PayByDay[this];
            set => fields.PayByDay[this] = value;
        }




        [DisplayName("Race"), Column("RaceID"), ForeignKey("HumanResourcesRace", "ID"), LeftJoin(jRace), TextualField(nameof(Race)), NotNull]
        [LookupEditor(typeof(Race.RaceRow))]
        public int? RaceID
        {
            get => fields.RaceID[this];
            set => fields.RaceID[this] = value;
        }
        [DisplayName("Race"), Expression($"{jRace}.[Race]"), AsyncLookupEditor("Race.Race", AutoComplete = true)]
        public string Race
        {
            get => fields.Race[this];
            set => fields.Race[this] = value;
        }
        [DisplayName("Employee Type"), NotNull]
        public EmployeeType? EmployeeType
        {
            get => fields.EmployeeType[this];
            set => fields.EmployeeType[this] = value;
        }

        [DisplayName("Sex"), NotNull]
        public SexType? Sex
        {
            get => fields.Sex[this];
            set => fields.Sex[this] = value;
        }

        [DisplayName("Department"), Column("DepartmentID"), ForeignKey("HumanResourcesDepartment", "ID"), LeftJoin(jDepartment), TextualField(nameof(DepartmentDept))]
        [LookupEditor(typeof(OrganisationHierarchy.DepartmentRow))]
        public int? DepartmentID
        {
            get => fields.DepartmentID[this];
            set => fields.DepartmentID[this] = value;
        }


        [DisplayName("Division"), Column("DivisionID"), ForeignKey("HumanResourcesDivision", "ID"), LeftJoin(jDivision), TextualField(nameof(Division))]
        [LookupEditor(typeof(OrganisationHierarchy.DivisionRow))]
        public int? DivisionID
        {
            get => fields.DivisionID[this];
            set => fields.DivisionID[this] = value;
        }

        [DisplayName("Section"), Column("SectionID"), ForeignKey("HumanResourcesSection", "ID"), LeftJoin(jSection), TextualField(nameof(Section))]
        [LookupEditor(typeof(OrganisationHierarchy.SectionRow))]
        public int? SectionID
        {
            get => fields.SectionID[this];
            set => fields.SectionID[this] = value;
        }

        [DisplayName("Job Grade"), Column("JobGradeID"), ForeignKey("HumanResourcesJobGrade", "ID"), LeftJoin(jJobGrade), TextualField(nameof(JobGrade))]
        [LookupEditor(typeof(OrganisationHierarchy.JobGradeRow))]
        public int? JobGradeID
        {
            get => fields.JobGradeID[this];
            set => fields.JobGradeID[this] = value;
        }

        [DisplayName("Occupation"), Column("OccupationID"), ForeignKey("HumanResourcesOccupation", "ID"), LeftJoin(jOccupation), TextualField(nameof(Occupation))]
        [LookupEditor(typeof(OrganisationHierarchy.OccupationRow))]
        public int? OccupationID
        {
            get => fields.OccupationID[this];
            set => fields.OccupationID[this] = value;
        }

        [DisplayName("Bank"), Column("BankID"), ForeignKey("MasterBanks", "ID"), LeftJoin(jBank), TextualField(nameof(BankName))]
        [LookupEditor(typeof(Master.MasterBankRow))]
        public int? BankID
        {
            get => fields.BankID[this];
            set => fields.BankID[this] = value;
        }

        [DisplayName("UserRowID"), Column("UserRowID")]
        public int? UserRowID
        {
            get => fields.UserRowID[this];
            set => fields.UserRowID[this] = value;
        }
        [DisplayName("UserRowID"), Column("Terminated")]
        public int? Terminated
        {
            get => fields.Terminated[this];
            set => fields.Terminated[this] = value;
        }
        [DisplayName("Resigned"), Column("Resigned")]
        public int? Resigned
        {
            get => fields.Resigned[this];
            set => fields.Resigned[this] = value;
        }


        [DisplayName("Marital Status"), Column("MaritalStatus"), NotNull]
        public MaritalStatus? MaritalStatus
        {
            get => fields.MaritalStatus[this];
            set => fields.MaritalStatus[this] = value;
        }
        [DisplayName("Bank Account Number"), NotNull]
        public string BankAccountNumber
        {
            get => fields.BankAccountNumber[this];
            set => fields.BankAccountNumber[this] = value;
        }

        [DisplayName("City"), Column("CityID"), ForeignKey("MasterCities", "ID"), LeftJoin(jCity), TextualField(nameof(CityName)), NotNull]
        [LookupEditor(typeof(Master.MasterCityRow))]
        public int? CityID
        {
            get => fields.CityID[this];
            set => fields.CityID[this] = value;
        }

        [DisplayName("Daily Working Minute"), NotNull]
        public int? DailyWorkingMinute
        {
            get => fields.DailyWorkingMinute[this];
            set => fields.DailyWorkingMinute[this] = value;
        }

        [DisplayName("State"), Column("StateID"), ForeignKey("MasterStates", "ID"), LeftJoin(jState), TextualField(nameof(StateName)), NotNull]
        [LookupEditor(typeof(Master.MasterStateRow))]
        public int? StateID
        {
            get => fields.StateID[this];
            set => fields.StateID[this] = value;
        }

        [DisplayName("Employee Image"), Size(1000), NotNull]
        [ImageUploadEditor(FilenameFormat = "EmployeeProfile/~")]
        public string EmployeeImg
        {
            get => fields.EmployeeImg[this];
            set => fields.EmployeeImg[this] = value;
        }

        [DisplayName("Password")]
        public string UserPassword
        {
            get => fields.UserPassword[this];
            set => fields.UserPassword[this] = value;
        }

        [DisplayName("Nationality"), Column("NationalityID"), ForeignKey("MasterNationality", "ID"), LeftJoin(jNationality), TextualField(nameof(NationalityName)), NotNull]
        [LookupEditor(typeof(NationalityRow))]
        public int? NationalityID
        {
            get => fields.NationalityID[this];
            set => fields.NationalityID[this] = value;
        }

        [DisplayName("Cost Centre"), Column("CostCentreID"), ForeignKey("MasterCostCentre", "ID"), LeftJoin(jCostCentre), TextualField(nameof(CostCentreName))]
        [LookupEditor(typeof(Master.MasterCostCentreRow))]
        public int? CostCentreID
        {
            get => fields.CostCentreID[this];
            set => fields.CostCentreID[this] = value;
        }
        [DisplayName("Cost Centre Name"), Expression($"{jCostCentre}.[Name]")]
        public string CostCentreName
        {
            get => fields.CostCentreName[this];
            set => fields.CostCentreName[this] = value;
        }

        [DisplayName("Cp8d"), Column("Cp8dID"), ForeignKey("MasterCp8d", "ID"), LeftJoin(jCp8d), TextualField(nameof(Cp8dName))]
        [LookupEditor(typeof(Master.MasterCp8dRow))]
        public int? Cp8dID
        {
            get => fields.Cp8dID[this];
            set => fields.Cp8dID[this] = value;
        }


        [DisplayName("Cp8d"), Expression($"{jCp8d}.[Name]")]
        public string Cp8dName
        {
            get => fields.Cp8dName[this];
            set => fields.Cp8dName[this] = value;
        }





        public int? Retired
        {
            get => fields.Retired[this];
            set => fields.Retired[this] = value;
        }


        /*
        const string jEmployeeGroup = nameof(jEmployeeGroup);



        [DisplayName("Employee Group"), Column("EmployeeGroupID"), ForeignKey("HumanResourcesEmployeeGroup", "ID"), LeftJoin(jEmployeeGroup), TextualField(nameof(EmployeeGroupName))]
        [LookupEditor(typeof(EmployeeGroup.EmployeeGroupRow), InplaceAdd = true)]
        public int? EmployeeGroupID
        {
            get => fields.EmployeeGroupID[this];
            set => fields.EmployeeGroupID[this] = value;
        }

        [DisplayName("Employee Group"), Expression($"{jEmployeeGroup}.[Name]")]
        public string EmployeeGroupName
        {
            get => fields.EmployeeGroupName[this];
            set => fields.EmployeeGroupName[this] = value;
        }
        */



        [DisplayName("Department"), Expression($"{jDepartment}.[Name]"), AsyncLookupEditor("Department.Department", AutoComplete = true), LookupInclude]
        public string DepartmentDept
        {
            get => fields.DepartmentDept[this];
            set => fields.DepartmentDept[this] = value;
        }


        [DisplayName("Division"), Expression($"{jDivision}.[Name]"), AsyncLookupEditor("Division.Division", AutoComplete = true), LookupInclude]
        public string Division
        {
            get => fields.Division[this];
            set => fields.Division[this] = value;
        }

        [DisplayName("Section"), Expression($"{jSection}.[Name]"), AsyncLookupEditor("Section.Section", AutoComplete = true), LookupInclude]
        public string Section
        {
            get => fields.Section[this];
            set => fields.Section[this] = value;
        }

        [DisplayName("Job Grade"), Expression($"{jJobGrade}.[Name]"), LookupInclude]
        public string JobGrade
        {
            get => fields.JobGrade[this];
            set => fields.JobGrade[this] = value;
        }

        [DisplayName("Occupation"), Expression($"{jOccupation}.[Name]"), LookupInclude]
        public string Occupation
        {
            get => fields.Occupation[this];
            set => fields.Occupation[this] = value;
        }

        [DisplayName("Bank Name"), Expression($"{jBank}.[Name]")]
        public string BankName
        {
            get => fields.BankName[this];
            set => fields.BankName[this] = value;
        }

        [DisplayName("City"), Expression($"{jCity}.[Name]")]
        public string CityName
        {
            get => fields.CityName[this];
            set => fields.CityName[this] = value;
        }

        [DisplayName("State"), Expression($"{jState}.[Name]")]
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



        [DisplayName("User Name")]
        public string UserName
        {
            get => fields.UserName[this];
            set => fields.UserName[this] = value;
        }
        const string jCountry = nameof(jCountry);


        [DisplayName("Country"), Column("CountryID"), ForeignKey("MasterCountries", "ID"), LeftJoin(jCountry),NotNull]
        [LookupEditor(typeof(Master.MasterCountryRow))]
        public int? CountryID
        {
            get => fields.CountryID[this];
            set => fields.CountryID[this] = value;
        }

        [DisplayName("Country"), Expression($"{jCountry}.[Name]")]
        public string CountryName
        {
            get => fields.CountryName[this];
            set => fields.CountryName[this] = value;
        }

        [DisplayName("Postal Code"),  ForeignKey("MasterPostCode", "ID"), LeftJoin(jPostalCode),NotNull]
        [LookupEditor(typeof(MasterPostcodeRow))]
        public int? PostcodeId
        {
            get => fields.PostcodeId[this];
            set => fields.PostcodeId[this] = value;
        }

        [DisplayName("Postal Code"), Expression($"{jPostalCode}.[PostCode]")]
        public string PostalCode
        {
            get => fields.PostalCode[this];
            set => fields.PostalCode[this] = value;
        }


        [MasterDetailRelation(foreignKey: nameof(EmployeeCareerPathRow.EmployeeRowId), ColumnsType = typeof(EmployeeCareerPathColumns))]
        [DisplayName("Employee Career Path"), NotMapped]
        public List<EmployeeCareerPathRow> EmployeeCareerPath
        {
            get => fields.EmployeeCareerPath[this];
            set => fields.EmployeeCareerPath[this] = value;
        }
        [MasterDetailRelation(foreignKey: nameof(EmployeeCp38Row.EmployeeRowId), ColumnsType = typeof(EmployeeCp38Columns))]
        [DisplayName("Employee Cp38"), NotMapped]
        public List<EmployeeCp38Row> Cp38Lists
        {
            get => fields.Cp38Lists[this];
            set => fields.Cp38Lists[this] = value;
        }

        [MasterDetailRelation(foreignKey: nameof(EmployeeAllowanceRow.EmployeeRowId), ColumnsType = typeof(EmployeeAllowanceColumns))]
        [DisplayName("Employee Allowance"), NotMapped]
        public List<EmployeeAllowanceRow> AllowanceLists
        {
            get => fields.AllowanceLists[this];
            set => fields.AllowanceLists[this] = value;
        }

        [MasterDetailRelation(foreignKey: nameof(FixedDeductionRow.EmployeeRowId), ColumnsType = typeof(FixedDeductionColumns))]
        [DisplayName("Employee Monthly Fixed Deduction"), NotMapped]
        public List<FixedDeductionRow> FixedDeductionList
        {
            get => fields.FixedDeductionList[this];
            set => fields.FixedDeductionList[this] = value;
        }








        [DisplayName("EPF Class")]
        public EPFClass? EpfClass
        {
            get => fields.EpfClass[this];
            set => fields.EpfClass[this] = value;
        }
        [DisplayName("Socso Class")]
        public SOCSOClass? SocsoClass
        {
            get => fields.SocsoClass[this];
            set => fields.SocsoClass[this] = value;
        }

        [DisplayName("Socso Account Number")]
        public string SocsoAccountNumber
        {
            get => fields.SocsoAccountNumber[this];
            set => fields.SocsoAccountNumber[this] = value;
        }


        [DisplayName("EIS Class")]
        public EISClass? EisClass
        {
            get => fields.EisClass[this];
            set => fields.EisClass[this] = value;
        }

        [DisplayName("Hrdf Class")]
        public HRDFClass? HRDFClass
        {
            get => fields.HRDFClass[this];
            set => fields.HRDFClass[this] = value;
        }

        [DisplayName("Permit ID"), Column("WorkingPermit")]
        public string WorkingPermit
        {
            get => fields.WorkingPermit[this];
            set => fields.WorkingPermit[this] = value;
        }
        [DisplayName("PCB number"), Column("PCBnumber")]
        public string PCBnumber
        {
            get => fields.PCBnumber[this];
            set => fields.PCBnumber[this] = value;
        }

        [DisplayName("Job Description"), Column("JobDescription")]
        [MultipleFileUploadEditor(FilenameFormat = "EmployeeProfile/~")]
        public string JobDescription
        {
            get => fields.JobDescription[this];
            set => fields.JobDescription[this] = value;
        }

        [DisplayName("Permit Issue Date")]
        public DateTime? WorkingPermitIssueDate
        {
            get => fields.WorkingPermitIssueDate[this];
            set => fields.WorkingPermitIssueDate[this] = value;
        }

        [DisplayName("Permit Expire Date")]
        public DateTime? WorkingPermitExpireDate
        {
            get => fields.WorkingPermitExpireDate[this];
            set => fields.WorkingPermitExpireDate[this] = value;
        }

        [DisplayName("Permit Valid From")]
        public DateTime? WorkingPermitValidFrom
        {
            get => fields.WorkingPermitValidFrom[this];
            set => fields.WorkingPermitValidFrom[this] = value;
        }
        [DisplayName("Permit Valid Until")]
        public DateTime? WorkingPermitValidUntil
        {
            get => fields.WorkingPermitValidUntil[this];
            set => fields.WorkingPermitValidUntil[this] = value;
        }
        [DisplayName("Arrival Date")]
        public DateTime? ArrivalDate
        {
            get => fields.ArrivalDate[this];
            set => fields.ArrivalDate[this] = value;
        }

        [DisplayName("Probation From")]
        public DateTime? ProbationPeriodFrom
        {
            get => fields.ProbationPeriodFrom[this];
            set => fields.ProbationPeriodFrom[this] = value;
        }

        [DisplayName("Probation Until")]
        public DateTime? ProbationPeriodUntil
        {
            get => fields.ProbationPeriodUntil[this];
            set => fields.ProbationPeriodUntil[this] = value;
        }

        [DisplayName("Retire Date")]
        public DateTime? RetireDate
        {
            get => fields.RetireDate[this];
            set => fields.RetireDate[this] = value;
        }

        [DisplayName("Passed Probation"), DefaultValue(ProbationClass.UnderProbation)]
        public ProbationClass? PassedProbation
        {
            get => fields.PassedProbation[this];
            set => fields.PassedProbation[this] = value;
        }


        [DisplayName("Terminate Date")]
        public DateTime? TerminateDate
        {
            get => fields.TerminateDate[this];
            set => fields.TerminateDate[this] = value;
        }
        [DisplayName("Terminate Leave Date")]
        public DateTime? TerminateLeaveDate
        {
            get => fields.TerminateLeaveDate[this];
            set => fields.TerminateLeaveDate[this] = value;
        }
        [DisplayName("Resignation Leave Date")]
        public DateTime? ResignLeaveDate
        {
            get => fields.ResignLeaveDate[this];
            set => fields.ResignLeaveDate[this] = value;
        }
        [DisplayName("Working Hour per month"), NotMapped]
        public double? WorkingHour
        {
            get => fields.WorkingHour[this];
            set => fields.WorkingHour[this] = value;
        }
        [DisplayName("Working Days per month"), NotMapped]
        public double? WorkingDays
        {
            get => fields.WorkingDays[this];
            set => fields.WorkingDays[this] = value;
        }
        [DisplayName("Daily Rate Base"), NotMapped]
        public double? DailyRateBase
        {
            get => fields.DailyRateBase[this];
            set => fields.DailyRateBase[this] = value;
        }
        [DisplayName("No paid leave Rate Base"), NotMapped]
        public double? NplRateBase
        {
            get => fields.NplRateBase[this];
            set => fields.NplRateBase[this] = value;
        }
        [DisplayName("Ot Rate Weekend")]
        public double? OtRateWeekend
        {
            get => fields.OtRateWeekend[this];
            set => fields.OtRateWeekend[this] = value;
        }
        [DisplayName("Ot Rate Weekday")]
        public double? OtRateWeekday
        {
            get => fields.OtRateWeekday[this];
            set => fields.OtRateWeekday[this] = value;
        }
        [NotMapped]
        public double? OtRate
        {
            get => fields.OtRate[this];
            set => fields.OtRate[this] = value;
        }
        [DisplayName("Ot Rate Public Holiday")]
        public double? OtRatePublicHoliday
        {
            get => fields.OtRatePublicHoliday[this];
            set => fields.OtRatePublicHoliday[this] = value;
        }
        [NotMapped]
        public int? NumberOfWorkingDays
        {
            get => fields.NumberOfWorkingDays[this];
            set => fields.NumberOfWorkingDays[this] = value;
        }
        [NotMapped]
        public int? TotalWorkingTimeInMinutes
        {
            get => fields.TotalWorkingTimeInMinutes[this];
            set => fields.TotalWorkingTimeInMinutes[this] = value;
        }

        [DisplayName("Old Identity Card Number"), Size(1000)]
        public string OldNRIC
        {
            get => fields.OldNRIC[this];
            set => fields.OldNRIC[this] = value;
        }
        public class RowFields : LoggingRowFields
        {
            public StringField OldNRIC;
            public StringField SsfwNumber;

            public DoubleField WorkingHour;
            public DoubleField WorkingDays;
            public DoubleField DailyRateBase;
            public DoubleField NplRateBase;
            public DoubleField OtRateWeekday;
            public DoubleField OtRateWeekend;
            public DoubleField OtRatePublicHoliday;
            public DoubleField OtRate;



            public Int32Field TotalWorkingTimeInMinutes;
            public Int32Field NumberOfWorkingDays;
            public Int32Field DisabledChildInUniversity;
            public Int32Field DisabledChild;


            public RowListField<EmployeeCareerPathRow> EmployeeCareerPath;
            public RowListField<EmployeeCp38Row> Cp38Lists;

            public RowListField<EmployeeAllowanceRow> AllowanceLists;
            public RowListField<FixedDeductionRow> FixedDeductionList;


            public Int32Field CountryID;
            public Int32Field PostcodeId;

            public StringField PostalCode;
            public StringField CountryName;


            public BooleanField FixedOtRateOption;

            public BooleanField GrantHRPrivilege;
            public BooleanField CreateUser;
            public BooleanField OtPayEntitlement;
            public BooleanField PayByMonth;
            public BooleanField PayByHour;
            public BooleanField PayByDay;


            public EnumField<MaritalStatus> MaritalStatus;


            public Int32Field Id;
            public Int32Field Retired;

            public StringField JobDescription;
            public StringField EmployeeName;
            public StringField UserPassword;
            public Int32Field UserRowID;
            public StringField UserName;


            public StringField EmployeeID;
            public StringField Nric;
            public Int32Field Age;

            public Int32Field Terminated;
            public Int32Field Resigned;
            public Int32Field ChildrenUnderEighteen;
            public Int32Field ChildrenInUniversity;
            public BooleanField WorkingSpouse;


            public DateTimeField CalculationDate;


            public DateTimeField LastPaymentDate;
            public DateTimeField RecruitmentDate;
            public DateTimeField ResignationDate;
            public DateTimeField TerminateDate;
            public DateTimeField TerminateLeaveDate;
            public DateTimeField ResignLeaveDate;
            public DateTimeField JoinDate;

            public DateTimeField Birthday;
            public StringField EmployeeEmail;
            public StringField EpfAccountNumber;
            public DoubleField ProbationPeriod;
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
            public DoubleField NightShiftAllowancePerDay;

            public Int32Field RaceID;
            public Int32Field DepartmentID;
            public Int32Field DivisionID;
            public Int32Field SectionID;
            public Int32Field JobGradeID;
            public Int32Field OccupationID;
            public Int32Field BankID;
            public StringField BankAccountNumber;
            public Int32Field CityID;
            public Int32Field DailyWorkingMinute;


            public Int32Field StateID;
            public StringField EmployeeImg;
            public Int32Field NationalityID;
            public StringField Race;
            public StringField DepartmentDept;
            public StringField Division;
            public StringField Section;
            public StringField JobGrade;
            public StringField Occupation;
            public StringField BankName;
            // public StringField ShiftName;
            public StringField CityName;
            public StringField StateName;
            public StringField NationalityName;

            public EnumField<EmployeeType> EmployeeType;
            public EnumField<SexType> Sex;
            public EnumField<SOCSOClass> SocsoClass;
            public StringField SocsoAccountNumber;
            public EnumField<EPFClass> EpfClass;
            public Int32Field CostCentreID;
            public StringField CostCentreName;
            public Int32Field Cp8dID;
            public StringField Cp8dName;




            public EnumField<EISClass> EisClass;
            public EnumField<HRDFClass> HRDFClass;

            public StringField WorkingPermit;

            public DateTimeField SsfwEffectiveDate;

            public DateTimeField WorkingPermitIssueDate;
            public DateTimeField WorkingPermitExpireDate;
            public DateTimeField WorkingPermitValidFrom;
            public DateTimeField WorkingPermitValidUntil;
            public DateTimeField ArrivalDate;

            public StringField PCBnumber;

            public DateTimeField ProbationPeriodFrom;
            public DateTimeField ProbationPeriodUntil;
            public EnumField<ProbationClass> PassedProbation;
            public DateTimeField RetireDate;

        }
    }
}