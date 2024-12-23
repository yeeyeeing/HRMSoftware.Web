using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OTApplication.OTApplicationRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OTApplication.OTApplicationRow;

namespace HRMSoftware.OTApplication;

public interface IOTApplicationSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class OTApplicationSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IOTApplicationSaveHandler
{
    public OTApplicationSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}