using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Master.MasterStateRow>;
using MyRow = HRMSoftware.Master.MasterStateRow;

namespace HRMSoftware.Master;

public interface IMasterStateListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MasterStateListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMasterStateListHandler
{
    public MasterStateListHandler(IRequestContext context)
            : base(context)
    {
    }
}