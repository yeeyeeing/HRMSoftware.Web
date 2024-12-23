using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Master.MasterStateRow;

namespace HRMSoftware.Master;

public interface IMasterStateDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MasterStateDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMasterStateDeleteHandler
{
    public MasterStateDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}