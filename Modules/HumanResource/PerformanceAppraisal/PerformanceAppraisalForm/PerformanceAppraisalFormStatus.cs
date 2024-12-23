using System.ComponentModel;
using Serenity.ComponentModel;

namespace HRMSoftware.Web.Modules.PerformanceAppraisal.PerformanceAppraisalForm;

[EnumKey("PerformanceAppraisal.PerformanceAppraisalFormStatus")]
public enum PerformanceAppraisalFormStatus
{
    [Description("Incomplete")]
    Incomplete = 1,
    [Description("Completed")]
    Completed = 2,
    [Description("Draft")]
    Draft = 3,
    [Description("Awaiting Review")]
    AwaitingReview = 4,
    [Description("Pending Employee Discussion")]
    PendingEmpDiscussion = 5,
    [Description("Pending General Manager Approval")]
    PendingGmApproval = 6,
    [Description("Review Completed")]
    ReviewCompleted = 7
}
