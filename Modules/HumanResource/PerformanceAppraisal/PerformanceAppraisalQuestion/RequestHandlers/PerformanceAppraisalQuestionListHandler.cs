using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalQuestionRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalQuestionRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalQuestionListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalQuestionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalQuestionListHandler
{
    public PerformanceAppraisalQuestionListHandler(IRequestContext context)
            : base(context)
    {
    }
}