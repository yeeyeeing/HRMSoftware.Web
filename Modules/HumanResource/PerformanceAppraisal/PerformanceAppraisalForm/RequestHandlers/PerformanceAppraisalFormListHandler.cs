using Serenity.Data;
using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFormRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFormRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalFormListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalFormListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalFormListHandler
{
    public PerformanceAppraisalFormListHandler(IRequestContext context)
            : base(context)
    {
    }
    
}