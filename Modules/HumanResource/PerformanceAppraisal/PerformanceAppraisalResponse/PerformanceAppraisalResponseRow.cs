using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.PerformanceAppraisal;

[ConnectionKey("Default"), Module("PerformanceAppraisal"), TableName("PerformanceAppraisalResponse")]
[DisplayName("Performance Appraisal Response"), InstanceName("Performance Appraisal Response")]
[ReadPermission("*")]
[ModifyPermission(PermissionKeys.Employee)]
public sealed class PerformanceAppraisalResponseRow : LoggingRow<PerformanceAppraisalResponseRow.RowFields>, IIdRow
{
    public int EmployeeRowID;

    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Form Id"), Column("FormID")]
    public int? FormId
    {
        get => fields.FormId[this];
        set => fields.FormId[this] = value;
    }
    public int? QuestionId
    {
        get => fields.QuestionId[this];
        set => fields.QuestionId[this] = value;
    }

    [DisplayName("Question"), Column("Question")]
    public string Question
    {
        get => fields.Question[this];
        set => fields.Question[this] = value;
    }

    [DisplayName("Answer Type"), Size(30), QuickSearch]
    public string AnswerType
    {
        get => fields.AnswerType[this];
        set => fields.AnswerType[this] = value;
    }

    [DisplayName("Answer")]
    public string Answer
    {
        get => fields.Answer[this];
        set => fields.Answer[this] = value;
    }

    
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field QuestionId;

        
        public Int32Field FormId;
        public StringField Question;
        public StringField AnswerType;
        public StringField Answer;
    }
}