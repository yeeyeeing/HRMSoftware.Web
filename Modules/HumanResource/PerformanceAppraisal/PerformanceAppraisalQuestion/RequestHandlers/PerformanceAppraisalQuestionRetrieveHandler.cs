using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalQuestionRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalQuestionRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalQuestionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalQuestionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalQuestionRetrieveHandler
{
    public PerformanceAppraisalQuestionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}