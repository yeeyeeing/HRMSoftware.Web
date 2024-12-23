using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.PerformanceAppraisal;

[ConnectionKey("Default"), Module("PerformanceAppraisal"), TableName("PerformanceAppraisalReviewer")]
[DisplayName("Performance Appraisal Reviewer"), InstanceName("Performance Appraisal Reviewer")]
[ReadPermission("*")]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class PerformanceAppraisalReviewerRow : LoggingRow<PerformanceAppraisalReviewerRow.RowFields>, IIdRow
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

    [DisplayName("Reviewer"), Column("EmployeeRowID")]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }
    
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field FormId;
        public Int32Field EmployeeRowId;
    }
}