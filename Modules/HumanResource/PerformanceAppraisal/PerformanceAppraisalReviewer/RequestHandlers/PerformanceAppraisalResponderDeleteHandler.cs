using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalResponderDeleteHandler : IDeleteHandler<PerformanceAppraisalReviewerRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalResponderDeleteHandler : DeleteRequestHandler<PerformanceAppraisalReviewerRow, MyRequest, MyResponse>, IPerformanceAppraisalResponderDeleteHandler
{
    public PerformanceAppraisalResponderDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}