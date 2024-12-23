using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.PcbSubjectionRow>;
using MyRow = HRMSoftware.PayrollSettings.PcbSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IPcbSubjectionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PcbSubjectionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPcbSubjectionRetrieveHandler
{
    public PcbSubjectionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}