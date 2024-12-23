using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalReviewerRow>;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalResponderListHandler : IListHandler<PerformanceAppraisalReviewerRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalResponderListHandler : ListRequestHandler<PerformanceAppraisalReviewerRow, MyRequest, MyResponse>, IPerformanceAppraisalResponderListHandler
{
    public PerformanceAppraisalResponderListHandler(IRequestContext context)
            : base(context)
    {
    }
}