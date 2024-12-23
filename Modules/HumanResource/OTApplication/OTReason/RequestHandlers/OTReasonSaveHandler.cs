using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OTApplication.OTReasonRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OTApplication.OTReasonRow;

namespace HRMSoftware.OTApplication;

public interface IOTReasonSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class OTReasonSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IOTReasonSaveHandler
{
    public OTReasonSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}