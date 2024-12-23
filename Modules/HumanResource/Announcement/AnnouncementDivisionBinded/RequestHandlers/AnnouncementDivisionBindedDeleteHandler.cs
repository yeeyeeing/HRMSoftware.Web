using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementDivisionBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementDivisionBindedDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementDivisionBindedDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementDivisionBindedDeleteHandler
{
    public AnnouncementDivisionBindedDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}