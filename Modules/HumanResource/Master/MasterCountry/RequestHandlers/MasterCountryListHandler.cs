using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Master.MasterCountryRow>;
using MyRow = HRMSoftware.Master.MasterCountryRow;

namespace HRMSoftware.Master;

public interface IMasterCountryListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCountryListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCountryListHandler
{
    public MasterCountryListHandler(IRequestContext context)
            : base(context)
    {
    }
}