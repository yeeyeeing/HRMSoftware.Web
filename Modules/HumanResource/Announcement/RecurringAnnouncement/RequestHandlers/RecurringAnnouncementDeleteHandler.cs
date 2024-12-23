using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Announcement.RecurringAnnouncementRow;

namespace HRMSoftware.Announcement;

public interface IRecurringAnnouncementDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class RecurringAnnouncementDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IRecurringAnnouncementDeleteHandler
{
    public RecurringAnnouncementDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}