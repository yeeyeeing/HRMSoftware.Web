using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Announcement.AnnouncementRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementListHandler
{
    public AnnouncementListHandler(IRequestContext context)
            : base(context)
    {
    }
}