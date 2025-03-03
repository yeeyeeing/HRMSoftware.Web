using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Master.NationalityRow>;
using MyRow = HRMSoftware.Master.NationalityRow;

namespace HRMSoftware.Master;

public interface INationalityListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class NationalityListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, INationalityListHandler
{
    public NationalityListHandler(IRequestContext context)
            : base(context)
    {
    }
}