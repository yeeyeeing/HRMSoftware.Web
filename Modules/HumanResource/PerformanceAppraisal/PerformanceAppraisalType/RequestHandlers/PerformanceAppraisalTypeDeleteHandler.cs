using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTypeRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalTypeDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalTypeDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalTypeDeleteHandler
{
    public PerformanceAppraisalTypeDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}