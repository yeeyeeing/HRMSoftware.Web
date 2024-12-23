using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalResponseRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalResponseRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalResponseSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalResponseSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalResponseSaveHandler
{
    public PerformanceAppraisalResponseSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}