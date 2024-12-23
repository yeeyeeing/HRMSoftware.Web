using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFileAttachRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFileAttachRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalFileAttachSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalFileAttachSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalFileAttachSaveHandler
{
    public PerformanceAppraisalFileAttachSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}