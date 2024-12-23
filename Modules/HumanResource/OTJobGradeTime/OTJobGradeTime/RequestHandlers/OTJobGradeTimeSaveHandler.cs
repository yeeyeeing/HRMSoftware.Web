using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OTJobGradeTime.OTJobGradeTimeRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OTJobGradeTime.OTJobGradeTimeRow;

namespace HRMSoftware.OTJobGradeTime;

public interface IOTJobGradeTimeSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class OTJobGradeTimeSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IOTJobGradeTimeSaveHandler
{
    public OTJobGradeTimeSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}