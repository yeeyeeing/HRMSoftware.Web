using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.EpfSubjectionRow>;
using MyRow = HRMSoftware.PayrollSettings.EpfSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IEpfSubjectionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EpfSubjectionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEpfSubjectionRetrieveHandler
{
    public EpfSubjectionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}