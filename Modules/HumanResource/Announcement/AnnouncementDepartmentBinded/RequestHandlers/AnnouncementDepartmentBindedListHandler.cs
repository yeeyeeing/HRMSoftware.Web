using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Announcement.AnnouncementDepartmentBindedRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementDepartmentBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementDepartmentBindedListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementDepartmentBindedListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementDepartmentBindedListHandler
{
    public AnnouncementDepartmentBindedListHandler(IRequestContext context)
            : base(context)
    {
    }
}