using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFormRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFormRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalFormSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalFormSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalFormSaveHandler
{
    public PerformanceAppraisalFormSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}