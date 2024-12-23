using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFileAttachRow;

namespace HRMSoftware.PerformanceAppraisal;

public interface IPerformanceAppraisalFileAttachDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PerformanceAppraisalFileAttachDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPerformanceAppraisalFileAttachDeleteHandler
{
    public PerformanceAppraisalFileAttachDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}