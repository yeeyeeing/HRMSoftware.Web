using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTypeRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTypeRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTypeListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTypeListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTypeListHandler
{
    public PerformanceAppraisalTypeListHandler(IRequestContext context)
            : base(context)
    {
    }
}