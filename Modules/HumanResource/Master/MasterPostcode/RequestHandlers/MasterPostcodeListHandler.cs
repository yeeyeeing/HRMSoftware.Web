using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Master.MasterPostcodeRow>;
using MyRow = HRMSoftware.Master.MasterPostcodeRow;

namespace HRMSoftware.Master;

public interface IMasterPostcodeListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MasterPostcodeListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMasterPostcodeListHandler
{
    public MasterPostcodeListHandler(IRequestContext context)
            : base(context)
    {
    }
}