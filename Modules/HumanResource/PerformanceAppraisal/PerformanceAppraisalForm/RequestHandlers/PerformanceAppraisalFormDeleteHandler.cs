using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFormRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalFormDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalFormDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalFormDeleteHandler
{
    public PerformanceAppraisalFormDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}