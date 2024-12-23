using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.SocsoSubjectionRow>;
using MyRow = HRMSoftware.PayrollSettings.SocsoSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface ISocsoSubjectionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class SocsoSubjectionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ISocsoSubjectionRetrieveHandler
{
    public SocsoSubjectionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}