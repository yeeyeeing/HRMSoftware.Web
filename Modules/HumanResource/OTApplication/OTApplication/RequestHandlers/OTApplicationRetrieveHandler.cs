using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OTApplication.OTApplicationRow>;
using MyRow = HRMSoftware.OTApplication.OTApplicationRow;

namespace HRMSoftware.OTApplication;

public interface IOTApplicationRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class OTApplicationRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IOTApplicationRetrieveHandler
{
    public OTApplicationRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}