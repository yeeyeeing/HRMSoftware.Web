using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.PerformanceAppraisal;

[ConnectionKey("Default"), Module("PerformanceAppraisal"), TableName("PerformanceAppraisalEvaluation")]
[DisplayName("Performance Appraisal Evaluation"), InstanceName("Performance Appraisal Evaluation")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class PerformanceAppraisalEvaluationRow : LoggingRow<PerformanceAppraisalEvaluationRow.RowFields>, IIdRow, INameRow
{
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

    [DisplayName("Evaluation"), QuickSearch, NameProperty]
    public string Evaluation
    {
        get => fields.Evaluation[this];
        set => fields.Evaluation[this] = value;
    }

    [DisplayName("Goals")]
    public string Goals
    {
        get => fields.Goals[this];
        set => fields.Goals[this] = value;
    }

    [DisplayName("Summary")]
    public string Summary
    {
        get => fields.Summary[this];
        set => fields.Summary[this] = value;
    }

    [DisplayName("Bonus Rate"), Size(5), Scale(2)]
    public decimal? BonusRate
    {
        get => fields.BonusRate[this];
        set => fields.BonusRate[this] = value;
    }

    [DisplayName("Overall Rate")]
    public decimal? OverallRate
    {
        get => fields.OverallRate[this];
        set => fields.OverallRate[this] = value;
    }

    [DisplayName("Employee Signature"), ImageUploadEditor]
    public string EmployeeSignature
    {
        get => fields.EmployeeSignature[this];
        set => fields.EmployeeSignature[this] = value;
    }

    [DisplayName("Head of Depart. Signature"), Column("HODSignature"), ImageUploadEditor]
    public string HodSignature
    {
        get => fields.HodSignature[this];
        set => fields.HodSignature[this] = value;
    }

    [DisplayName("General Manager Signature"), ImageUploadEditor]
    public string GeneralManagerSignature
    {
        get => fields.GeneralManagerSignature[this];
        set => fields.GeneralManagerSignature[this] = value;
    }
    
    [DisplayName("Employee Signature Date")]
    public DateTime? EmployeeSignDate
    {
        get => fields.EmployeeSignDate[this];
        set => fields.EmployeeSignDate[this] = value;
    }

    [DisplayName("Head Of Dept. Signature Date")]
    public DateTime? HodSignDate
    {
        get => fields.HodSignDate[this];
        set => fields.HodSignDate[this] = value;
    }

    [DisplayName("General Manager Signature Date")]
    public DateTime? GeneralManagerSignDate
    {
        get => fields.GeneralManagerSignDate[this];
        set => fields.GeneralManagerSignDate[this] = value;
    }
    
    [DisplayName("Employee Signature ID")]
    public int? EmployeeSignID
    {
        get => fields.EmployeeSignID[this];
        set => fields.EmployeeSignID[this] = value;
    }

    [DisplayName("Head Of Dept. Signature ID")]
    public int? HodSignID
    {
        get => fields.HodSignID[this];
        set => fields.HodSignID[this] = value;
    }

    [DisplayName("General Manager Signature ID")]
    public int? GeneralManagerSignID
    {
        get => fields.GeneralManagerSignID[this];
        set => fields.GeneralManagerSignID[this] = value;
    }
    
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field FormId;
        public StringField Evaluation;
        public StringField Goals;
        public StringField Summary;
        public DecimalField BonusRate;
        public DecimalField OverallRate;
        public StringField EmployeeSignature;
        public StringField HodSignature;
        public StringField GeneralManagerSignature;
        public DateTimeField EmployeeSignDate;
        public DateTimeField HodSignDate;
        public DateTimeField GeneralManagerSignDate;
        public Int32Field EmployeeSignID;
        public Int32Field HodSignID;
        public Int32Field GeneralManagerSignID;
        
    }
}