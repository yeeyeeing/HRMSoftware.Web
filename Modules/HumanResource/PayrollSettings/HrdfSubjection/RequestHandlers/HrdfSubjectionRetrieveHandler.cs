using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.HrdfSubjectionRow>;
using MyRow = HRMSoftware.PayrollSettings.HrdfSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IHrdfSubjectionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class HrdfSubjectionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IHrdfSubjectionRetrieveHandler
{
    public HrdfSubjectionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}