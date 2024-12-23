using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.TrainingManagement;

[ConnectionKey("Default"), Module("TrainingManagement"), TableName("TrainingManagementProgram")]
[DisplayName("Program Session"), InstanceName("Program Session")]
[ReadPermission("*")]
[ModifyPermission("*")]
[LookupScript]
public sealed class ProgramSessionRow : LoggingRow<ProgramSessionRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Master Program Id")]
    public int? MasterProgramId
    {
        get => fields.MasterProgramId[this];
        set => fields.MasterProgramId[this] = value;
    }

    [DisplayName("Program Name"), Size(200), QuickSearch, NameProperty]
    public string ProgramName
    {
        get => fields.ProgramName[this];
        set => fields.ProgramName[this] = value;
    }

    [DisplayName("Department"), LookupEditor(typeof(OrganisationHierarchy.DepartmentRow), Multiple = true), NotMapped]
    [LinkingSetRelation(typeof(ProgramDepartmentRow),
        nameof(ProgramDepartmentRow.ProgramId),
        nameof(ProgramDepartmentRow.DepartmentId))]
    public List<int> DepartmentList
    {
        get => fields.DepartmentList[this];
        set => fields.DepartmentList[this] = value;
    }
    
    [DisplayName("Detail"), Size(2147483647)]
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

    [DisplayName("Date TBA"), DefaultValue(false)]
    public bool? DateTba
    {
        get => fields.DateTba[this];
        set => fields.DateTba[this] = value;
    }
    
    [DisplayName("Start Date")]
    public DateTime? StartDate
    {
        get => fields.StartDate[this];
        set => fields.StartDate[this] = value;
    }

    [DisplayName("One Day"), DefaultValue(false)]
    public bool? OneDay
    {
        get => fields.OneDay[this];
        set => fields.OneDay[this] = value;
    }
    
    [DisplayName("End Date")]
    public DateTime? EndDate
    {
        get => fields.EndDate[this];
        set => fields.EndDate[this] = value;
    }

    [DisplayName("Status"), DefaultValue(ProgramSessionStatusType.WaitingApprovalManagement)]
    public ProgramSessionStatusType? Status
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

    [MasterDetailRelation(foreignKey: "ProgramId", IncludeColumns = "ParticipantList")]
    [DisplayName("Flow List"), NotMapped]
    public List<ProgramFlowRow> FlowList
    {
        get => fields.FlowList[this];
        set => fields.FlowList[this] = value;
    }
    
    [MasterDetailRelation(foreignKey: "ProgramId", IncludeColumns = "EmployeeName,EmployeeId,Trainee,Staff")]
    [DisplayName("Participant List"), LookupEditor(typeof(ProgramParticipantRow), Multiple = true), NotMapped]
    public List<ProgramParticipantRow> ParticipantList
    {
        get => fields.ParticipantList[this];
        set => fields.ParticipantList[this] = value;
    }
    
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field MasterProgramId;
        public StringField ProgramName;
        public ListField<int> DepartmentList;
        public StringField Detail;
        public StringField ExtraDocument;
        public BooleanField DateTba;
        public DateTimeField StartDate;
        public BooleanField OneDay;
        public DateTimeField EndDate;
        public EnumField<ProgramSessionStatusType> Status;
        public StringField Comment;
        public RowListField<ProgramFlowRow> FlowList;
        public RowListField<ProgramParticipantRow> ParticipantList;
    }
}