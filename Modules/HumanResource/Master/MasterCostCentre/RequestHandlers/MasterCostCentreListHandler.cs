using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Master.MasterCostCentreRow>;
using MyRow = HRMSoftware.Master.MasterCostCentreRow;

namespace HRMSoftware.Master;

public interface IMasterCostCentreListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCostCentreListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCostCentreListHandler
{
    public MasterCostCentreListHandler(IRequestContext context)
            : base(context)
    {
    }
}