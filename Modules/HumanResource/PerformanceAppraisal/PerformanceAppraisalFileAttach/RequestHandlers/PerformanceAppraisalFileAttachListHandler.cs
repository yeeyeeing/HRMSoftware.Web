using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFileAttachRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFileAttachRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalFileAttachListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalFileAttachListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalFileAttachListHandler
{
    public PerformanceAppraisalFileAttachListHandler(IRequestContext context)
            : base(context)
    {
    }
}