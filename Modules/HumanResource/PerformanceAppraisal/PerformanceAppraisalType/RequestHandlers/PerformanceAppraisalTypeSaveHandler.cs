using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTypeRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTypeRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTypeSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTypeSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTypeSaveHandler
{
    public PerformanceAppraisalTypeSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}