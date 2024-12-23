using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.TrainingManagement;

[ConnectionKey("Default"), Module("TrainingManagement"), TableName("TrainingManagementProgramFlow")]
[DisplayName("Program Flow"), InstanceName("Program Flow")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class ProgramFlowRow : LoggingRow<ProgramFlowRow.RowFields>, IIdRow, INameRow
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
    
    [DisplayName("Program Id")]
    public int? ProgramId
    {
        get => fields.ProgramId[this];
        set => fields.ProgramId[this] = value;
    }

    [DisplayName("Flow Type"), NotNull, DefaultValue(ProgramFlowType.Attendance)]
    public ProgramFlowType? FlowType
    {
        get => fields.FlowType[this];
        set => fields.FlowType[this] = value;
    }

    [DisplayName("Grade Type"), NotNull, DefaultValue(ProgramGradeType.Na)]
    public ProgramGradeType? GradeType
    {
        get => fields.GradeType[this];
        set => fields.GradeType[this] = value;
    }

    [DisplayName("Date")]
    public DateTime? Date
    {
        get => fields.Date[this];
        set => fields.Date[this] = value;
    }

    [DisplayName("Remark"), Size(2000), QuickSearch, NameProperty]
    public string Remark
    {
        get => fields.Remark[this];
        set => fields.Remark[this] = value;
    }

    [MasterDetailRelation(foreignKey: "ProgramId", IncludeColumns = "EmployeeName,EmployeeId", MasterKeyField = "ProgramId")]
    [DisplayName("Participant List"), NotMapped]
    public List<ProgramParticipantRow> ParticipantList
    {
        get => fields.ParticipantList[this];
        set => fields.ParticipantList[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field MasterProgramId;
        public Int32Field ProgramId;
        public EnumField<ProgramFlowType> FlowType;
        public EnumField<ProgramGradeType> GradeType;
        public DateTimeField Date;
        public StringField Remark;
        public RowListField<ProgramParticipantRow> ParticipantList;
    }
}