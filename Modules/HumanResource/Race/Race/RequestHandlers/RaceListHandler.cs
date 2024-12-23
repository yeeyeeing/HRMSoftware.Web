using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Race.RaceRow>;
using MyRow = HRMSoftware.Race.RaceRow;

namespace HRMSoftware.Race;

public interface IRaceListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class RaceListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IRaceListHandler
{
    public RaceListHandler(IRequestContext context)
            : base(context)
    {
    }
}