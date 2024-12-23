using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.PerformanceAppraisal;

[ConnectionKey("Default"), Module("PerformanceAppraisal"), TableName("PerformanceAppraisalTemplateQuestion")]
[DisplayName("Performance Appraisal Template Question"), InstanceName("Performance Appraisal Template Question")]
[ReadPermission("*")]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript]
public sealed class PerformanceAppraisalTemplateQuestionRow : LoggingRow<PerformanceAppraisalTemplateQuestionRow.RowFields>, IIdRow
{
    const string JQuest = nameof(JQuest);
    
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }
   
    [DisplayName("Template Id"), Column("TemplateID")]
    public int? TemplateId
    {
        get => fields.TemplateId[this];
        set => fields.TemplateId[this] = value;
    }
   
    [DisplayName("Questions"), NotNull, ForeignKey(typeof(PerformanceAppraisalQuestionRow)), LeftJoin("JQuest"), TextualField("QuestionText")]
    [LookupEditor(typeof(PerformanceAppraisalQuestionRow))]
    public int? QuestionId
    {
        get => fields.QuestionId[this];
        set => fields.QuestionId[this] = value;
    }
    
    [DisplayName("Questions"), Origin(JQuest, nameof(PerformanceAppraisalQuestionRow.Questions))]
    public string QuestionText
    {
        get => fields.QuestionText[this];
        set => fields.QuestionText[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field TemplateId;
        public Int32Field QuestionId;
        public StringField QuestionText;
    }
}