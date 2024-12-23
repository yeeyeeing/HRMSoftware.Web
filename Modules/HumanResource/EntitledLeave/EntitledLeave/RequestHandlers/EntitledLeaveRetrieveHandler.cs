using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EntitledLeave.EntitledLeaveRow>;
using MyRow = HRMSoftware.EntitledLeave.EntitledLeaveRow;

namespace HRMSoftware.EntitledLeave;

public interface IEntitledLeaveRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EntitledLeaveRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEntitledLeaveRetrieveHandler
{
    public EntitledLeaveRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}