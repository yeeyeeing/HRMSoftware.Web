using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalEvaluationRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalEvaluationRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalEvaluationSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalEvaluationSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalEvaluationSaveHandler
{
    public PerformanceAppraisalEvaluationSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}