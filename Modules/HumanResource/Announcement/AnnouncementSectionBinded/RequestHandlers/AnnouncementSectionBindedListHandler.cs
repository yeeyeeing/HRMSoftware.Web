using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Announcement.AnnouncementSectionBindedRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementSectionBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementSectionBindedListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementSectionBindedListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementSectionBindedListHandler
{
    public AnnouncementSectionBindedListHandler(IRequestContext context)
            : base(context)
    {
    }
}