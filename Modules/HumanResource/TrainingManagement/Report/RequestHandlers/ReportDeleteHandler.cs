using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.TrainingManagement.ReportRow;

namespace HRMSoftware.TrainingManagement;

public interface IReportDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class ReportDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IReportDeleteHandler
{
    public ReportDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}