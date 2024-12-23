using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Announcement.AnnouncementJobGradeBindedRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementJobGradeBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementJobGradeBindedListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementJobGradeBindedListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementJobGradeBindedListHandler
{
    public AnnouncementJobGradeBindedListHandler(IRequestContext context)
            : base(context)
    {
    }
}