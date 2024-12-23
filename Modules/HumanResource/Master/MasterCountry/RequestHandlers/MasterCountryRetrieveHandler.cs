using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Master.MasterCountryRow>;
using MyRow = HRMSoftware.Master.MasterCountryRow;

namespace HRMSoftware.Master;

public interface IMasterCountryRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCountryRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCountryRetrieveHandler
{
    public MasterCountryRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}