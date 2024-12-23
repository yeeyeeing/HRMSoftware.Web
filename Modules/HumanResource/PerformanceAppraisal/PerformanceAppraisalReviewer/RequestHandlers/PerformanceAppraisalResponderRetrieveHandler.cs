using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalReviewerRow>;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalResponderRetrieveHandler : IRetrieveHandler<PerformanceAppraisalReviewerRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalResponderRetrieveHandler : RetrieveRequestHandler<PerformanceAppraisalReviewerRow, MyRequest, MyResponse>, IPerformanceAppraisalResponderRetrieveHandler
{
    public PerformanceAppraisalResponderRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}