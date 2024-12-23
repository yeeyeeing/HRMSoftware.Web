using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PublicHoliday.PublicHolidayRow>;
using MyRow = HRMSoftware.PublicHoliday.PublicHolidayRow;

namespace HRMSoftware.PublicHoliday;

public interface IPublicHolidayListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PublicHolidayListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPublicHolidayListHandler
{
    public PublicHolidayListHandler(IRequestContext context)
            : base(context)
    {
    }
}