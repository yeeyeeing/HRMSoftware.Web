using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Race.RaceRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Race.RaceRow;

namespace HRMSoftware.Race;

public interface IRaceSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class RaceSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IRaceSaveHandler
{
    public RaceSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}