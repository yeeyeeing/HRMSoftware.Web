using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalReviewerRow>;
using MyResponse = Serenity.Services.SaveResponse;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalResponderSaveHandler : ISaveHandler<PerformanceAppraisalReviewerRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalResponderSaveHandler : SaveRequestHandler<PerformanceAppraisalReviewerRow, MyRequest, MyResponse>, IPerformanceAppraisalResponderSaveHandler
{
    public PerformanceAppraisalResponderSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}