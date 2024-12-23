using Serenity.Services;

namespace HRMSoftware.Web.Modules.PerformanceAppraisal;

public class DeleteAllRequest : ServiceRequest
{
    public int[] RecordIds { get; set; }
}