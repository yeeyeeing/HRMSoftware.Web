using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HRMSoftware.TrainingManagement;

[ConnectionKey("Default"), Module("TrainingManagement"), TableName("TrainingManagementProgramFlow")]
[DisplayName("Attendance List"), InstanceName("Attendance List")]
[ReadPermission("Administration:General")]
[ModifyPermission("Administration:General")]
public sealed class AttendanceListRow : Row<AttendanceListRow.RowFields>, IIdRow, INameRow
{
    const string jProgramSession = nameof(jProgramSession);
    
    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Program Id"), ForeignKey(typeof(ProgramSessionRow)), LeftJoin(jProgramSession)]
    public int? ProgramId
    {
        get => fields.ProgramId[this];
        set => fields.ProgramId[this] = value;
    }
    
    [DisplayName("Program Name"), Expression($"{jProgramSession}.ProgramName")]
    public string ProgramName
    {
        get => fields.ProgramName[this];
        set => fields.ProgramName[this] = value;
    }

    [DisplayName("Flow Type"), NotNull]
    public int? FlowType
    {
        get => fields.FlowType[this];
        set => fields.FlowType[this] = value;
    }

    [DisplayName("Grade Type")]
    public int? GradeType
    {
        get => fields.GradeType[this];
        set => fields.GradeType[this] = value;
    }

    [DisplayName("Start Date")]
    public DateTime? StartDate
    {
        get => fields.StartDate[this];
        set => fields.StartDate[this] = value;
    }

    [DisplayName("End Date")]
    public DateTime? EndDate
    {
        get => fields.EndDate[this];
        set => fields.EndDate[this] = value;
    }

    [DisplayName("Remark"), Size(2000), QuickSearch, NameProperty]
    public string Remark
    {
        get => fields.Remark[this];
        set => fields.Remark[this] = value;
    }

    [MasterDetailRelation(foreignKey: "ProgramId", IncludeColumns = "EmployeeName", MasterKeyField = "ProgramId")]
    [DisplayName("Participant List"), NotMapped]
    public List<ProgramParticipantRow> ParticipantList
    {
        get => fields.ParticipantList[this];
        set => fields.ParticipantList[this] = value;
    }
    
    // [DisplayName("Insert User Id")]
    // public int? InsertUserId
    // {
    //     get => fields.InsertUserId[this];
    //     set => fields.InsertUserId[this] = value;
    // }
    //
    // [DisplayName("Insert Date")]
    // public DateTime? InsertDate
    // {
    //     get => fields.InsertDate[this];
    //     set => fields.InsertDate[this] = value;
    // }
    //
    // [DisplayName("Update User Id")]
    // public int? UpdateUserId
    // {
    //     get => fields.UpdateUserId[this];
    //     set => fields.UpdateUserId[this] = value;
    // }
    //
    // [DisplayName("Update Date")]
    // public DateTime? UpdateDate
    // {
    //     get => fields.UpdateDate[this];
    //     set => fields.UpdateDate[this] = value;
    // }
    //
    // [DisplayName("Delete User Id")]
    // public int? DeleteUserId
    // {
    //     get => fields.DeleteUserId[this];
    //     set => fields.DeleteUserId[this] = value;
    // }
    //
    // [DisplayName("Delete Date")]
    // public DateTime? DeleteDate
    // {
    //     get => fields.DeleteDate[this];
    //     set => fields.DeleteDate[this] = value;
    // }

    public class RowFields : RowFieldsBase
    {
        public Int32Field Id;
        public Int32Field ProgramId;
        public StringField ProgramName;
        public Int32Field FlowType;
        public Int32Field GradeType;
        public DateTimeField StartDate;
        public DateTimeField EndDate;
        public StringField Remark;
        public RowListField<ProgramParticipantRow> ParticipantList;
        // public Int32Field InsertUserId;
        // public DateTimeField InsertDate;
        // public Int32Field UpdateUserId;
        // public DateTimeField UpdateDate;
        // public Int32Field DeleteUserId;
        // public DateTimeField DeleteDate;

    }
}