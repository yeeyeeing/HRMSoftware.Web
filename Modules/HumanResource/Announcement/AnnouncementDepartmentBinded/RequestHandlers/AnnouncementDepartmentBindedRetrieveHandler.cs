using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Announcement.AnnouncementDepartmentBindedRow>;
using MyRow = HRMSoftware.Announcement.AnnouncementDepartmentBindedRow;

namespace HRMSoftware.Announcement;

public interface IAnnouncementDepartmentBindedRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnouncementDepartmentBindedRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnouncementDepartmentBindedRetrieveHandler
{
    public AnnouncementDepartmentBindedRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}