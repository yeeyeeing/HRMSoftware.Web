using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.EisSubjectionRow>;
using MyRow = HRMSoftware.PayrollSettings.EisSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IEisSubjectionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EisSubjectionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEisSubjectionRetrieveHandler
{
    public EisSubjectionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}