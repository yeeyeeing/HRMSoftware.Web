using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementJobGradeBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementJobGradeBindedDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementJobGradeBindedDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementJobGradeBindedDeleteHandler
{
    public AnnouncementJobGradeBindedDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}