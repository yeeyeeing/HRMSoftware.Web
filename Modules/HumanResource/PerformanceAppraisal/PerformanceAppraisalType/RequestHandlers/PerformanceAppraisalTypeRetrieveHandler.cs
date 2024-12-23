using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTypeRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTypeRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTypeRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTypeRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTypeRetrieveHandler
{
    public PerformanceAppraisalTypeRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}