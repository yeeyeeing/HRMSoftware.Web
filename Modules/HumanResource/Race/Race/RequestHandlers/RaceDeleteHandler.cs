using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Race.RaceRow;

namespace HRMSoftware.Race;

public interface IRaceDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class RaceDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IRaceDeleteHandler
{
    public RaceDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}