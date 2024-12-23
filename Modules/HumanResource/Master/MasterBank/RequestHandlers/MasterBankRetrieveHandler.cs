using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Master.MasterBankRow>;
using MyRow = HRMSoftware.Master.MasterBankRow;

namespace HRMSoftware.Master;

public interface IMasterBankRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterBankRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterBankRetrieveHandler
{
    public MasterBankRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}