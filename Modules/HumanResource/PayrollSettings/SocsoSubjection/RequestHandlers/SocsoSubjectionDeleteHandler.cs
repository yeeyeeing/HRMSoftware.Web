using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.SocsoSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface ISocsoSubjectionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class SocsoSubjectionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ISocsoSubjectionDeleteHandler
{
    public SocsoSubjectionDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}