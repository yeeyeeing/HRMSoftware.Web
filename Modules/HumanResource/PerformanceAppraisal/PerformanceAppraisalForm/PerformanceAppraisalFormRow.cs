using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using HRMSoftware.Administration;
using HRMSoftware.EmployeeProfile;
using HRMSoftware.Web.Modules.PerformanceAppraisal.PerformanceAppraisalForm;

namespace HRMSoftware.PerformanceAppraisal;

[ConnectionKey("Default"), Module("PerformanceAppraisal"), TableName("PerformanceAppraisalForm")]
[DisplayName("Performance Appraisal Form"), InstanceName("Performance Appraisal Form")]
[ReadPermission("*")]
[ModifyPermission("*")]
[DataAuditLog]
public sealed class PerformanceAppraisalFormRow : LoggingRow<PerformanceAppraisalFormRow.RowFields>, IIdRow
{
    const string JEmployee = nameof(JEmployee);
    const string JTemplate = nameof(JTemplate);
    const string JType = nameof(JType);
    
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Template"), NotNull, ForeignKey(typeof(PerformanceAppraisalTemplateRow)), LeftJoin("JTemplate"), TextualField("TemplateName")]
    [LookupEditor(typeof(PerformanceAppraisalTemplateRow))]
    public int? TemplateId
    {
        get => fields.TemplateId[this];
        set => fields.TemplateId[this] = value;
    }
    
    [DisplayName("Template Name"), Column("TemplateName"), NotNull]
    public string TemplateName
    {
        get => fields.TemplateName[this];
        set => fields.TemplateName[this] = value;
    }
    
    [DisplayName("HOD ID"), Column("HodID")]
    public int? HodId
    {
        get => fields.HodId[this];
        set => fields.HodId[this] = value;
    }

    [DisplayName("Target Row ID"),Column("EmployeeRowID"), NotNull, 
     ForeignKey(typeof(EmployeeProfileRow)), LeftJoin("JEmployee"), TextualField("EmployeeName")]
    [LookupEditor(typeof(EmployeeProfileRow))]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }
    
    [DisplayName("Target Name"), Origin(JEmployee, nameof(EmployeeProfileRow.EmployeeName)),QuickSearch(SearchType.Contains)]
    public string EmployeeName
    {
        get => fields.EmployeeName[this];
        set => fields.EmployeeName[this] = value;
    }
    
    [DisplayName("Target ID"), Origin(JEmployee, nameof(EmployeeProfileRow.EmployeeID))]
    public string EmployeeId
    {
        get => fields.EmployeeId[this];
        set => fields.EmployeeId[this] = value;
    }
    
    [DisplayName("Type ID"),Column("TypeID"), NotNull, DefaultValue(2),
     ForeignKey(typeof(PerformanceAppraisalTypeRow)), LeftJoin("JType"), TextualField("TypeName")]
    [LookupEditor(typeof(PerformanceAppraisalTypeRow))]
    public int? TypeId
    {
        get => fields.TypeId[this];
        set => fields.TypeId[this] = value;
    }
    
    [DisplayName("Type Name"), Origin(JType, nameof(PerformanceAppraisalTypeRow.Type))]
    public string TypeName
    {
        get => fields.TypeName[this];
        set => fields.TypeName[this] = value;
    }
    
    [DisplayName("Start Date"), NotNull]
    public DateTime? StartDate
    {
        get => fields.StartDate[this];
        set => fields.StartDate[this] = value;
    }
    
    [DisplayName("End Date"), NotNull]
    public DateTime? EndDate
    {
        get => fields.EndDate[this];
        set => fields.EndDate[this] = value;
    }
    
    [DisplayName("Review Start Date"), NotNull]
    public DateTime? EvaluateStartDate
    {
        get => fields.EvaluateStartDate[this];
        set => fields.EvaluateStartDate[this] = value;
    }
    
    [DisplayName("Review End Date"), NotNull]
    public DateTime? EvaluateEndDate
    {
        get => fields.EvaluateEndDate[this];
        set => fields.EvaluateEndDate[this] = value;
    }
    
    [DisplayName("Approval Start Date"), NotNull]
    public DateTime? ApprovalStartDate
    {
        get => fields.ApprovalStartDate[this];
        set => fields.ApprovalStartDate[this] = value;
    }
    
    [DisplayName("Approval End Date"), NotNull]
    public DateTime? ApprovalEndDate
    {
        get => fields.ApprovalEndDate[this];
        set => fields.ApprovalEndDate[this] = value;
    }
    
    [DisplayName("Submission Status"), Column("SubmissionStatus"), DefaultValue(PerformanceAppraisalFormStatus.Incomplete)]
    public PerformanceAppraisalFormStatus? SubmissionStatus
    {
        get => fields.SubmissionStatus[this];
        set => fields.SubmissionStatus[this] = value;
    }
    
    [DisplayName("Review Status"), Column("ReviewStatus"), DefaultValue(PerformanceAppraisalFormStatus.AwaitingReview)]
    public PerformanceAppraisalFormStatus? ReviewStatus
    {
        get => fields.ReviewStatus[this];
        set => fields.ReviewStatus[this] = value;
    }


    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field TemplateId;
        public StringField TemplateName;
        public Int32Field HodId;
        public Int32Field EmployeeRowId;
        public StringField EmployeeName;
        public StringField EmployeeId;
        public Int32Field TypeId;
        public StringField TypeName;
        public DateTimeField StartDate;
        public DateTimeField EndDate;
        public DateTimeField EvaluateStartDate;
        public DateTimeField EvaluateEndDate;
        public DateTimeField ApprovalStartDate;
        public DateTimeField ApprovalEndDate;
        public EnumField<PerformanceAppraisalFormStatus> SubmissionStatus;
        public EnumField<PerformanceAppraisalFormStatus> ReviewStatus;
    }
}