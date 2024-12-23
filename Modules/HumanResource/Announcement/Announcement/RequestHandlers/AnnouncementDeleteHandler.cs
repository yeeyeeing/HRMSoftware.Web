using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementDeleteHandler
{
    public AnnouncementDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}