using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.TrainingManagement.ReportRow>;
using MyRow = HRMSoftware.TrainingManagement.ReportRow;

namespace HRMSoftware.TrainingManagement;

public interface IReportRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class ReportRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IReportRetrieveHandler
{
    public ReportRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}