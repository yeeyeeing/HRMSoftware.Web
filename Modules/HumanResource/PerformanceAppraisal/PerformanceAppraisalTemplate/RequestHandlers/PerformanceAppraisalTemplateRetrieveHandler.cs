using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateRow>;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTemplateRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTemplateRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTemplateRetrieveHandler
{
    public PerformanceAppraisalTemplateRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}