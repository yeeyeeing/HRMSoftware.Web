using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Master.MasterCityRow>;
using MyRow = HRMSoftware.Master.MasterCityRow;

namespace HRMSoftware.Master;

public interface IMasterCityListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCityListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCityListHandler
{
    public MasterCityListHandler(IRequestContext context)
            : base(context)
    {
    }
}