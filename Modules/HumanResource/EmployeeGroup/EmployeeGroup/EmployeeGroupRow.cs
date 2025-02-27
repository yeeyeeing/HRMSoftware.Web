using HRMSoftware.EmployeeProfile;
using HRMSoftware.EmployeeGroup;
using HRMSoftware.EmployeeGroup.Columns;

using HRMSoftware.Shift;
using HRMSoftware.Shift.Columns;
using HRMSoftware.ShiftHistory;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using HRMSoftware.OrganisationHierarchy;

namespace HRMSoftware.EmployeeGroup;

[ConnectionKey("Default"), Module("EmployeeGroup"), TableName("HumanResourcesEmployeeGroup")]
[DisplayName("Employee Group"), InstanceName("Employee Group")]
[ReadPermission("*")]
[ModifyPermission("Administration:HumanResources")]
[LookupScript("EmployeeGroup.EmployeeGroup")]
public sealed class EmployeeGroupRow : LoggingRow<EmployeeGroupRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }


    [DisplayName("Group Name"), Size(100), QuickSearch, NameProperty,NotNull]
    public string Name
    {
        get => fields.Name[this];
        set => fields.Name[this] = value;
    }

    [DisplayName("Description"), Size(100)]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }

    
    [DisplayName("Shift Start Date")]
    public DateTime? StartDate
    {
        get => fields.StartDate[this];
        set => fields.StartDate[this] = value;
    }
    [DisplayName("Shift End Date")]
    public DateTime? EndDate
    {
        get => fields.EndDate[this];
        set => fields.EndDate[this] = value;
    }
    

    [DisplayName("Group Employees"), LookupEditor(typeof(EmployeeProfileRow), Multiple = true, FilterField = "IsActive", FilterValue = 1),NotMapped,NotNull]
    [LinkingSetRelation(typeof(EmployeeGroupingsRow), nameof(EmployeeGroupingsRow.EmployeeGroupId), nameof(EmployeeGroupingsRow.EmployeeRowId))]
    public List<int> EmployeeList { get => fields.EmployeeList[this]; set => fields.EmployeeList[this] = value; }



    [DisplayName("New Employees"), LookupEditor(typeof(EmployeeProfileRow), Multiple = true, FilterField = "IsActive", FilterValue = 1), NotMapped, NotNull]
    public List<int> NewAddedEmployee { get => fields.NewAddedEmployee[this]; set => fields.NewAddedEmployee[this] = value; }



    [MasterDetailRelation(foreignKey: nameof(EmployeeGroupShiftRow.EmployeeGroupId), ColumnsType = typeof(EmployeeGroupShiftColumns))]
    [DisplayName("Shift List(Shift Time List)"), NotMapped, NotNull]
    public List<EmployeeGroupShiftRow> Shifts { get => fields.Shifts[this]; set => fields.Shifts[this] = value; }



    [MasterDetailRelation(foreignKey: nameof(EmployeeGroupShiftPatternRow.EmployeeGroupId), ColumnsType = typeof(EmployeeGroupShiftColumns)), NotMapped]
    public List<EmployeeGroupShiftPatternRow> ActualShifts { get => fields.ActualShifts[this]; set => fields.ActualShifts[this] = value; }


    [DisplayName("Group Color"), Size(30)]
    public string ShiftColor
    {
        get => fields.ShiftColor[this];
        set => fields.ShiftColor[this] = value;
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

    public class RowFields : LoggingRowFields
    {
        public StringField ShiftColor;

        public Int32Field Id;
        public ListField<int> EmployeeList;
        public ListField<int> NewAddedEmployee;

        public RowListField<EmployeeGroupShiftRow> Shifts;
        public RowListField<EmployeeGroupShiftPatternRow> ActualShifts;


        
        public StringField Name;
        public StringField Description;
        
        public DateTimeField StartDate;
        public DateTimeField EndDate;

        public ListField<int> OccupationList;
        public ListField<int> DepartmentList;
        public ListField<int> DivisionList;
        public ListField<int> JobGradeList;
        public ListField<int> SectionList;

    }
}