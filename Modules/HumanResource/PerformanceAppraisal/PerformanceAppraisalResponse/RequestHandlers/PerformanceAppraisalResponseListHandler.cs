using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalResponseRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalResponseRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalResponseListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalResponseListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalResponseListHandler
{
    public PerformanceAppraisalResponseListHandler(IRequestContext context)
            : base(context)
    {
    }
}