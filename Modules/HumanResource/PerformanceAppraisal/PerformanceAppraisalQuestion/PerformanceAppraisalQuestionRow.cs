using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.PerformanceAppraisal;

[ConnectionKey("Default"), Module("PerformanceAppraisal"), TableName("PerformanceAppraisalQuestion")]
[DisplayName("Performance Appraisal Question"), InstanceName("Performance Appraisal Question")]
[ReadPermission("*")]
[ModifyPermission(PermissionKeys.HumanResources)]
[LookupScript]
public sealed class PerformanceAppraisalQuestionRow : LoggingRow<PerformanceAppraisalQuestionRow.RowFields>, IIdRow, INameRow
{
    const string JSection = nameof(JSection);
    
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Questions"), NotNull, QuickSearch, NameProperty]
    public string Questions
    {
        get => fields.Questions[this];
        set => fields.Questions[this] = value;
    }

    [DisplayName("Answer Types"), NotNull, DefaultValue(PerformanceAppraisalQuestionAnswerType.Type)]
    public PerformanceAppraisalQuestionAnswerType? AnswerType
    {
        get => fields.AnswerType[this]; 
        set => fields.AnswerType[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public StringField Questions;
        public EnumField<PerformanceAppraisalQuestionAnswerType> AnswerType;
        

    }
}