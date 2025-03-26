using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using HRMSoftware.EmployeeProfile;
using HRMSoftware.OrganisationHierarchy;
using HRMSoftware.Administration;
using HRMSoftware.Master;
namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesWeeklyPayrollSettings")]
[DisplayName("Weekly Payroll Settings"), InstanceName("Weekly Payroll Settings")]
[ReadPermission(PermissionKeys.Employee)]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class WeeklyPayrollSettingsRow : LoggingRow<WeeklyPayrollSettingsRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Generate First Week")]
    [BooleanEditor]
    public bool? GenerateFirst
    {
        get => fields.GenerateFirst[this];
        set => fields.GenerateFirst[this] = value;
    }

    [DisplayName("Generate Second Week")]
    [BooleanEditor]
    public bool? GenerateSecond
    {
        get => fields.GenerateSecond[this];
        set => fields.GenerateSecond[this] = value;
    }

    [DisplayName("Generate Third Week")]
    [BooleanEditor]
    public bool? GenerateThird
    {
        get => fields.GenerateThird[this];
        set => fields.GenerateThird[this] = value;
    }

    [DisplayName("Generate Fourth Week")]
    [BooleanEditor]
    public bool? GenerateFourth
    {
        get => fields.GenerateFourth[this];
        set => fields.GenerateFourth[this] = value;
    }

    [DisplayName("Occupation List"), NotMapped,
        LookupEditor(typeof(OccupationRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> OccupationList
    {
        get => fields.OccupationList[this];
        set => fields.OccupationList[this] = value;
    }

    [DisplayName("Department List"), NotMapped,
        LookupEditor(typeof(DepartmentRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> DepartmentList
    {
        get => fields.DepartmentList[this];
        set => fields.DepartmentList[this] = value;
    }
    [DisplayName("Division List"), NotMapped,
        LookupEditor(typeof(DivisionRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> DivisionList
    {
        get => fields.DivisionList[this];
        set => fields.DivisionList[this] = value;
    }
    [DisplayName("Job Grade List"), NotMapped,
        LookupEditor(typeof(OrganisationHierarchy.JobGradeRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> JobGradeList
    {
        get => fields.JobGradeList[this];
        set => fields.JobGradeList[this] = value;
    }

    [DisplayName("Section List"), NotMapped,
    LookupEditor(typeof(SectionRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> SectionList
    {
        get => fields.SectionList[this];
        set => fields.SectionList[this] = value;
    }
    [DisplayName("Cost Centre List"), NotMapped,
     LookupEditor(typeof(MasterCostCentreRow), Multiple = true, FilterField = "IsActive", FilterValue = 1)]
    public List<int> CostCentreList
    {
        get => fields.CostCentreList[this];
        set => fields.CostCentreList[this] = value;
    }


    [DisplayName("Group Employees"), LookupEditor(typeof(EmployeeProfileRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped, NotNull]
    [LinkingSetRelation(typeof(WeeklyPayrollEmployeeRow), nameof(WeeklyPayrollEmployeeRow.WeeklyPayrollSettingId), nameof(WeeklyPayrollEmployeeRow.EmployeeRowId))]
    public List<int> EmployeeList { get => fields.EmployeeList[this]; set => fields.EmployeeList[this] = value; }



    [DisplayName("Newly Added Employees"), LookupEditor(typeof(EmployeeProfileRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped]
    public List<int> NewAddedEmployee { get => fields.NewAddedEmployee[this]; set => fields.NewAddedEmployee[this] = value; }
    
    [DisplayName("Description")]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }
    [DisplayName("Name"),NotNull]
    public string Name
    {
        get => fields.Name[this];
        set => fields.Name[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public StringField Name;
        public StringField Description;

        public ListField<int> EmployeeList;
        public ListField<int> NewAddedEmployee;

        public ListField<int> OccupationList;
        public ListField<int> DepartmentList;
        public ListField<int> DivisionList;
        public ListField<int> JobGradeList;
        public ListField<int> SectionList;
        public ListField<int> CostCentreList;

        public Int32Field Id;
        public BooleanField GenerateFirst;
        public BooleanField GenerateSecond;
        public BooleanField GenerateThird;
        public BooleanField GenerateFourth;

    }
}