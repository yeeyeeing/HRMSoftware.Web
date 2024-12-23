using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.InitYear.InitYearRow>;
using MyRow = HRMSoftware.InitYear.InitYearRow;

namespace HRMSoftware.InitYear;

public interface IInitYearListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class InitYearListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IInitYearListHandler
{
    public InitYearListHandler(IRequestContext context)
            : base(context)
    {
    }
}