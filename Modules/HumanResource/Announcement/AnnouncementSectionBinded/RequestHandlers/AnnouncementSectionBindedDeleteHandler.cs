using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementSectionBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementSectionBindedDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementSectionBindedDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementSectionBindedDeleteHandler
{
    public AnnouncementSectionBindedDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}