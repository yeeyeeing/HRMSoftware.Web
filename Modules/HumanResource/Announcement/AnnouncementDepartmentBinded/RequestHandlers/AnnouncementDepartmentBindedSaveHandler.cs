using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Announcement.AnnouncementDepartmentBindedRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Announcement.AnnouncementDepartmentBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementDepartmentBindedSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementDepartmentBindedSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementDepartmentBindedSaveHandler
{
    public AnnouncementDepartmentBindedSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}