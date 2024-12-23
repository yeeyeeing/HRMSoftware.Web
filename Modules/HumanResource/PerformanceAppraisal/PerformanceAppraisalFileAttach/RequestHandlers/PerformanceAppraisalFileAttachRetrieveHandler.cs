using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFileAttachRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFileAttachRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalFileAttachRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalFileAttachRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalFileAttachRetrieveHandler
{
    public PerformanceAppraisalFileAttachRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}