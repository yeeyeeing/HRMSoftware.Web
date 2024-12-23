using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalQuestionRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalQuestionRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalQuestionSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalQuestionSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalQuestionSaveHandler
{
    public PerformanceAppraisalQuestionSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}