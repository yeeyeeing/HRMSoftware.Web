using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Announcement.RecurringAnnouncementRow>;
using MyRow = HRMSoftware.Announcement.RecurringAnnouncementRow;

namespace HRMSoftware.Announcement;

public interface IRecurringAnnouncementListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class RecurringAnnouncementListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IRecurringAnnouncementListHandler
{
    public RecurringAnnouncementListHandler(IRequestContext context)
            : base(context)
    {
    }
}