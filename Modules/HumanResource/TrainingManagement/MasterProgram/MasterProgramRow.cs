using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.TrainingManagement;

[ConnectionKey("Default"), Module("TrainingManagement"), TableName("TrainingManagementMasterProgram")]
[DisplayName("Master Program"), InstanceName("Master Program")]
[ReadPermission("*")]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class MasterProgramRow : LoggingRow<MasterProgramRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Program Name"), Size(200), QuickSearch, NameProperty]
    public string ProgramName
    {
        get => fields.ProgramName[this];
        set => fields.ProgramName[this] = value;
    }

    [DisplayName("Routine"), DefaultValue(MasterProgramRoutineType.No)]
    public MasterProgramRoutineType? Routine
    {
        get => fields.Routine[this];
        set => fields.Routine[this] = value;
    }

    [DisplayName("Routine Interval")]
    public int? RoutineInterval
    {
        get => fields.RoutineInterval[this];
        set => fields.RoutineInterval[this] = value;
    }

    [DisplayName("Routine Start Date")]
    public DateTime? RoutineStartDate
    {
        get => fields.RoutineStartDate[this];
        set => fields.RoutineStartDate[this] = value;
    }

    [DisplayName("Routine End Date")]
    public DateTime? RoutineEndDate
    {
        get => fields.RoutineEndDate[this];
        set => fields.RoutineEndDate[this] = value;
    }

    [DisplayName("All Department"), DefaultValue(false)]
    public bool? AllDepartment
    {
        get => fields.AllDepartment[this];
        set => fields.AllDepartment[this] = value;
    }

    [DisplayName("Department"), LookupEditor(typeof(OrganisationHierarchy.DepartmentRow), Multiple = true), NotMapped]
    [LinkingSetRelation(typeof(ProgramDepartmentRow),
        nameof(ProgramDepartmentRow.MasterProgramId),
        nameof(ProgramDepartmentRow.DepartmentId))]
    public List<int> DepartmentList
    {
        get => fields.DepartmentList[this];
        set => fields.DepartmentList[this] = value;
    }
    
    [DisplayName("Status"), DefaultValue(MasterProgramStatusType.Approved)]
    public MasterProgramStatusType? Status
    {
        get => fields.Status[this];
        set => fields.Status[this] = value;
    }
    
    [DisplayName("Reject Reason / Comment")]
    public string Comment
    {
        get => fields.Comment[this];
        set => fields.Comment[this] = value;
    }
    
    [DisplayName("Detail")]
    public string Detail
    {
        get => fields.Detail[this];
        set => fields.Detail[this] = value;
    }

    [DisplayName("Extra Document")]
    [MultipleFileUploadEditor]
    public string ExtraDocument
    {
        get => fields.ExtraDocument[this];
        set => fields.ExtraDocument[this] = value;
    }

    [MasterDetailRelation(foreignKey: "MasterProgramId")]
    [DisplayName("Program Flow"), NotMapped]
    public List<ProgramFlowRow> FlowList
    {
        get => fields.FlowList[this];
        set => fields.FlowList[this] = value;
    }
    
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField ProgramName;
        public EnumField<MasterProgramRoutineType> Routine;
        public Int32Field RoutineInterval;
        public DateTimeField RoutineStartDate;
        public DateTimeField RoutineEndDate;
        public BooleanField AllDepartment;
        public ListField<int> DepartmentList;
        public EnumField<MasterProgramStatusType> Status;
        public StringField Comment;
        public StringField Detail;
        public StringField ExtraDocument;
        public RowListField<ProgramFlowRow> FlowList;
    }
}