using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.PcbSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IPcbSubjectionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PcbSubjectionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPcbSubjectionDeleteHandler
{
    public PcbSubjectionDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}