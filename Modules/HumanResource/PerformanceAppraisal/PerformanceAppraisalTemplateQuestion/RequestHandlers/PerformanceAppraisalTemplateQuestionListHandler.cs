using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateQuestionRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateQuestionRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTemplateQuestionListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTemplateQuestionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTemplateQuestionListHandler
{
    public PerformanceAppraisalTemplateQuestionListHandler(IRequestContext context)
            : base(context)
    {
    }
}