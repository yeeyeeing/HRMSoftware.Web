using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalResponseRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalResponseDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalResponseDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalResponseDeleteHandler
{
    public PerformanceAppraisalResponseDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}