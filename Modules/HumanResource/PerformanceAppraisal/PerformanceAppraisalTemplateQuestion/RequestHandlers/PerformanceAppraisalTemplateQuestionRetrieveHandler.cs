using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateQuestionRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateQuestionRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTemplateQuestionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTemplateQuestionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTemplateQuestionRetrieveHandler
{
    public PerformanceAppraisalTemplateQuestionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}