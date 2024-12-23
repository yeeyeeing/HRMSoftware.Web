using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.TrainingManagement.ReportRow>;
using MyRow = HRMSoftware.TrainingManagement.ReportRow;

namespace HRMSoftware.TrainingManagement;

public interface IReportListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class ReportListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IReportListHandler
{
    public ReportListHandler(IRequestContext context)
            : base(context)
    {
    }
}