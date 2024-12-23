using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementOccupationBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementOccupationBindedDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementOccupationBindedDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementOccupationBindedDeleteHandler
{
    public AnnouncementOccupationBindedDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}