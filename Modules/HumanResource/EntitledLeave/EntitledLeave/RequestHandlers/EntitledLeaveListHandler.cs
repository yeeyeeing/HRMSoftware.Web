using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EntitledLeave.EntitledLeaveRow>;
using MyRow = HRMSoftware.EntitledLeave.EntitledLeaveRow;

namespace HRMSoftware.EntitledLeave;

public interface IEntitledLeaveListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EntitledLeaveListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEntitledLeaveListHandler
{
    public EntitledLeaveListHandler(IRequestContext context)
            : base(context)
    {
    }
}