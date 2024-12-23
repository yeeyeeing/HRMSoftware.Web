using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OTApplication.OTReasonRow>;
using MyRow = HRMSoftware.OTApplication.OTReasonRow;

namespace HRMSoftware.OTApplication;

public interface IOTReasonListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class OTReasonListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IOTReasonListHandler
{
    public OTReasonListHandler(IRequestContext context)
            : base(context)
    {
    }
}