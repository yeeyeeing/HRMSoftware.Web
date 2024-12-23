using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PublicHoliday.PublicHolidayRow;

namespace HRMSoftware.PublicHoliday;

public interface IPublicHolidayDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PublicHolidayDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPublicHolidayDeleteHandler
{
    public PublicHolidayDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}