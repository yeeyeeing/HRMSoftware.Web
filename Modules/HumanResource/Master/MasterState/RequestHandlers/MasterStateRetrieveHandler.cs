using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Master.MasterStateRow>;
using MyRow = HRMSoftware.Master.MasterStateRow;

namespace HRMSoftware.Master;

public interface IMasterStateRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterStateRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterStateRetrieveHandler
{
    public MasterStateRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}