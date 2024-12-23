using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.TrainingManagement;

[ConnectionKey("Default"), Module("TrainingManagement"), TableName("TrainingManagementProgramFlowResponse")]
[DisplayName("Program Flow Response"), InstanceName("Program Flow Response")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class ProgramFlowResponseRow : LoggingRow<ProgramFlowResponseRow.RowFields>, IIdRow
{
    const string jProgramSession = nameof(jProgramSession);

    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Flow Id"), NotNull]
    public int? FlowId
    {
        get => fields.FlowId[this];
        set => fields.FlowId[this] = value;
    }

    [DisplayName("Employee Id"), NotNull, ForeignKey(typeof(ProgramSessionRow)), LeftJoin(jProgramSession)]
    public int? EmployeeId
    {
        get => fields.EmployeeId[this];
        set => fields.EmployeeId[this] = value;
    }

    [DisplayName("Program Name"), Expression($"{jProgramSession}.ProgramName")]
    public string ProgramName
    {
        get => fields.ProgramName[this];
        set => fields.ProgramName[this] = value;
    }
    
    [DisplayName("Attendance")]
    public bool? Attendance
    {
        get => fields.Attendance[this];
        set => fields.Attendance[this] = value;
    }

    [DisplayName("Score Value")]
    public int? GradeValue
    {
        get => fields.GradeValue[this];
        set => fields.GradeValue[this] = value;
    }

    [DisplayName("File")]
    [FileUploadEditor]
    public string File
    {
        get => fields.File[this];
        set => fields.File[this] = value;
    }

    [DisplayName("Remark"), Size(2000)]
    public string Remark
    {
        get => fields.Remark[this];
        set => fields.Remark[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field FlowId;
        public Int32Field EmployeeId;
        public StringField ProgramName;
        public BooleanField Attendance;
        public Int32Field GradeValue;
        public StringField File;
        public StringField Remark;
    }
}