using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Announcement.AnnouncementOccupationBindedRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementOccupationBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementOccupationBindedListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementOccupationBindedListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementOccupationBindedListHandler
{
    public AnnouncementOccupationBindedListHandler(IRequestContext context)
            : base(context)
    {
    }
}