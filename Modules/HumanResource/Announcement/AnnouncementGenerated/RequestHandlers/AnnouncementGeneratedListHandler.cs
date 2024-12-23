using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Announcement.AnnouncementGeneratedRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementGeneratedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementGeneratedListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementGeneratedListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementGeneratedListHandler
{
    public AnnouncementGeneratedListHandler(IRequestContext context)
            : base(context)
    {
    }
}