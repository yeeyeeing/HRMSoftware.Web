using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Master.MasterCp8dRow>;
using MyRow = HRMSoftware.Master.MasterCp8dRow;

namespace HRMSoftware.Master;

public interface IMasterCp8dListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCp8dListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCp8dListHandler
{
    public MasterCp8dListHandler(IRequestContext context)
            : base(context)
    {
    }
}