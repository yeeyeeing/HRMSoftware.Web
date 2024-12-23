using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EntitledLeave.EntitledLeaveRow;

namespace HRMSoftware.EntitledLeave;

public interface IEntitledLeaveDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EntitledLeaveDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEntitledLeaveDeleteHandler
{
    public EntitledLeaveDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}