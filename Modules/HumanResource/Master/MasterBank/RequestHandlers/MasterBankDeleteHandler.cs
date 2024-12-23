using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Master.MasterBankRow;

namespace HRMSoftware.Master;

public interface IMasterBankDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MasterBankDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMasterBankDeleteHandler
{
    public MasterBankDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}