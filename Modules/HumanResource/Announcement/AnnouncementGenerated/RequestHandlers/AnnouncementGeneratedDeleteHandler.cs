using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementGeneratedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementGeneratedDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementGeneratedDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementGeneratedDeleteHandler
{
    public AnnouncementGeneratedDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}