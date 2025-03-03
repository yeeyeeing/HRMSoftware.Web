using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Master.MasterPostcodeRow>;
using MyRow = HRMSoftware.Master.MasterPostcodeRow;

namespace HRMSoftware.Master;

public interface IMasterPostcodeRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterPostcodeRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterPostcodeRetrieveHandler
{
    public MasterPostcodeRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}