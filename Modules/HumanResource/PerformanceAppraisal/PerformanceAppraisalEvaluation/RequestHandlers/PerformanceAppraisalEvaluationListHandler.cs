using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalEvaluationRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalEvaluationRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalEvaluationListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalEvaluationListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalEvaluationListHandler
{
    public PerformanceAppraisalEvaluationListHandler(IRequestContext context)
            : base(context)
    {
    }
}