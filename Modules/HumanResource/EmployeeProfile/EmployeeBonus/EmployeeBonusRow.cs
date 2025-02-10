using HRMSoftware.Administration;
using HRMSoftware.OrganisationHierarchy;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile;

[ConnectionKey("Default"), Module("EmployeeProfile"), TableName("HumanResourcesEmployeeBonus")]
[DisplayName("Employee Bonus"), InstanceName("Employee Bonus")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class EmployeeBonusRow : LoggingRow<EmployeeBonusRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }


    [DisplayName("Employee ID"), ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("c")]
    [LookupEditor(typeof(EmployeeProfileRow)), NotNull]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Employee Name"), Expression($"c.EmployeeName"), NameProperty, QuickSearch]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }
    [DisplayName("Bonus Amount"), NotNull]
    public double? BonusAmount
    {
        get => fields.BonusAmount[this];
        set => fields.BonusAmount[this] = value;
    }

    [DisplayName("Bonus Description"), QuickSearch]
    public string BonusDescription
    {
        get => fields.BonusDescription[this];
        set => fields.BonusDescription[this] = value;
    }

    [DisplayName("Pay Month"), NotNull, MonthFormatter]
    public int? PayMonth
    {
        get => fields.PayMonth[this];
        set => fields.PayMonth[this] = value;
    }

    [DisplayName("Pay Year"), NotNull]
    public int? PayYear
    {
        get => fields.PayYear[this];
        set => fields.PayYear[this] = value;
    }
    [DisplayName("Employee ID"), Expression($"c.EmployeeID"), QuickSearch]
    public string EmployeeID
    {
        get => fields.EmployeeID[this];
        set => fields.EmployeeID[this] = value;
    }

    [Expression($"c.JobGradeID"), ForeignKey("HumanResourcesJobGrade", "ID"), LeftJoin("o")]
    public int? JobGradeID
    {
        get => fields.JobGradeID[this];
        set => fields.JobGradeID[this] = value;
    }
    [Expression($"o.Name")]
    public string JobGradeName
    {
        get => fields.JobGradeName[this];
        set => fields.JobGradeName[this] = value;
    }
    [Expression($"c.SectionID"), ForeignKey("HumanResourcesSection", "ID"), LeftJoin("section")]
    // [LookupEditor(typeof(JobGradeRow))]
    public int? SectionID
    {
        get => fields.SectionID[this];
        set => fields.SectionID[this] = value;
    }
    [Expression($"section.Name")]
    public string SectionName
    {
        get => fields.SectionName[this];
        set => fields.SectionName[this] = value;
    }

    [Expression($"c.DepartmentID"), ForeignKey("HumanResourcesDepartment", "ID"), LeftJoin("department")]
    // [LookupEditor(typeof(JobGradeRow))]
    public int? DepartmentID
    {
        get => fields.DepartmentID[this];
        set => fields.DepartmentID[this] = value;
    }
    [DisplayName("Department"), Expression($"department.Name")]
    public string DepartmentName
    {
        get => fields.DepartmentName[this];
        set => fields.DepartmentName[this] = value;
    }

    [Expression($"c.DivisionID"), ForeignKey("HumanResourcesDivision", "ID"), LeftJoin("division")]
    // [LookupEditor(typeof(JobGradeRow))]
    public int? DivisionID
    {
        get => fields.DivisionID[this];
        set => fields.DivisionID[this] = value;
    }
    [DisplayName("Division"), Expression($"division.Name")]
    public string DivisionName
    {
        get => fields.DivisionName[this];
        set => fields.DivisionName[this] = value;
    }

    [Expression($"c.OccupationID"), DisplayName("Occupation"), ForeignKey("HumanResourcesOccupation", "ID"), LeftJoin("os")]
   // [LookupEditor(typeof(OccupationRow))]
    public int? OccupationID
    {
        get => fields.OccupationID[this];
        set => fields.OccupationID[this] = value;
    }

    [DisplayName("Occupation"), Expression($"os.Name")]
    public string OccupationName
    {
        get => fields.OccupationName[this];
        set => fields.OccupationName[this] = value;
    }
    [Expression($"c.CostCentreID"), ForeignKey("MasterCostCentre", "ID"), LeftJoin("CostCentre")]
    // [LookupEditor(typeof(JobGradeRow))]
    public int? CostCentreID
    {
        get => fields.CostCentreID[this];
        set => fields.CostCentreID[this] = value;
    }
    [Expression($"CostCentre.Name")]
    public string CostCentreName
    {
        get => fields.CostCentreName[this];
        set => fields.CostCentreName[this] = value;
    }

    public class RowFields : LoggingRowFields
    {

        public Int32Field CostCentreID;
        public StringField CostCentreName;
        public Int32Field DepartmentID;
        public StringField DepartmentName;
        public Int32Field DivisionID;
        public StringField DivisionName;
        public Int32Field OccupationID;
        public StringField OccupationName;
        public Int32Field JobGradeID;
        public StringField JobGradeName;
        public Int32Field SectionID;
        public StringField SectionName;


        public Int32Field Id;
        public Int32Field EmployeeRowId;
        public DoubleField BonusAmount;
        public StringField BonusDescription;
        public Int32Field PayMonth;
        public Int32Field PayYear;
        public StringField EmployeeName;
        public StringField EmployeeID;

    }
}