using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Race.RaceRow>;
using MyRow = HRMSoftware.Race.RaceRow;

namespace HRMSoftware.Race;

public interface IRaceRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class RaceRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IRaceRetrieveHandler
{
    public RaceRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}