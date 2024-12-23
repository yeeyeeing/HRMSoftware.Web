using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementDepartmentBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementDepartmentBindedDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementDepartmentBindedDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementDepartmentBindedDeleteHandler
{
    public AnnouncementDepartmentBindedDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}