using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.SocsoSubjectionRow>;
using MyRow = HRMSoftware.PayrollSettings.SocsoSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface ISocsoSubjectionListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class SocsoSubjectionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ISocsoSubjectionListHandler
{
    public SocsoSubjectionListHandler(IRequestContext context)
            : base(context)
    {
    }
}