using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Announcement.AnnouncementDivisionBindedRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementDivisionBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementDivisionBindedListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementDivisionBindedListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementDivisionBindedListHandler
{
    public AnnouncementDivisionBindedListHandler(IRequestContext context)
            : base(context)
    {
    }
}