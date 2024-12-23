using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalEvaluationRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalEvaluationDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalEvaluationDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalEvaluationDeleteHandler
{
    public PerformanceAppraisalEvaluationDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}