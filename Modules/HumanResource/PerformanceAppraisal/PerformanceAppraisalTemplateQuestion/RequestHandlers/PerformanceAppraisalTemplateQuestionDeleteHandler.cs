using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateQuestionRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTemplateQuestionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTemplateQuestionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTemplateQuestionDeleteHandler
{
    public PerformanceAppraisalTemplateQuestionDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}