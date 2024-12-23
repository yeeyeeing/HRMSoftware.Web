using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalEvaluationRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalEvaluationRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalEvaluationRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalEvaluationRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalEvaluationRetrieveHandler
{
    public PerformanceAppraisalEvaluationRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}