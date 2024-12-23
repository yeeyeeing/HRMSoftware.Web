using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Master.MasterCityRow>;
using MyRow = HRMSoftware.Master.MasterCityRow;

namespace HRMSoftware.Master;

public interface IMasterCityRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCityRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCityRetrieveHandler
{
    public MasterCityRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}