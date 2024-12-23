using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFormRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFormRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalFormRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalFormRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalFormRetrieveHandler
{
    public PerformanceAppraisalFormRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}