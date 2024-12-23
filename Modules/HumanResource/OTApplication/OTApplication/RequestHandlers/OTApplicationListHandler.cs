using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OTApplication.OTApplicationRow>;
using MyRow = HRMSoftware.OTApplication.OTApplicationRow;

namespace HRMSoftware.OTApplication;

public interface IOTApplicationListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class OTApplicationListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IOTApplicationListHandler
{
    public OTApplicationListHandler(IRequestContext context)
            : base(context)
    {
    }
}