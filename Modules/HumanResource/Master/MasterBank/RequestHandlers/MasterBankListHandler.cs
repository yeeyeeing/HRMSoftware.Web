using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Master.MasterBankRow>;
using MyRow = HRMSoftware.Master.MasterBankRow;

namespace HRMSoftware.Master;

public interface IMasterBankListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MasterBankListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMasterBankListHandler
{
    public MasterBankListHandler(IRequestContext context)
            : base(context)
    {
    }
}