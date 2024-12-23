using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.TrainingManagement.ReportRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.TrainingManagement.ReportRow;

namespace HRMSoftware.TrainingManagement;

public interface IReportSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class ReportSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IReportSaveHandler
{
    public ReportSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}