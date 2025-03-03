using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Master.MasterPostcodeRow;

namespace HRMSoftware.Master;

public interface IMasterPostcodeDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MasterPostcodeDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMasterPostcodeDeleteHandler
{
    public MasterPostcodeDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}