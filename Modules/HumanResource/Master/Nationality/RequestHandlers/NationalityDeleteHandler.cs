using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Master.NationalityRow;

namespace HRMSoftware.Master;

public interface INationalityDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class NationalityDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, INationalityDeleteHandler
{
    public NationalityDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}