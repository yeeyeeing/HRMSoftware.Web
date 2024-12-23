using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalResponseRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalResponseRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalResponseRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalResponseRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalResponseRetrieveHandler
{
    public PerformanceAppraisalResponseRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}