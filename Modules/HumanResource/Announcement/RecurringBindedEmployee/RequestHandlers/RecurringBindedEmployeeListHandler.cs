using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Announcement.RecurringBindedEmployeeRow>;
using MyRow = HRMSoftware.Announcement.RecurringBindedEmployeeRow;

namespace HRMSoftware.Announcement;

public interface IRecurringBindedEmployeeListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class RecurringBindedEmployeeListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IRecurringBindedEmployeeListHandler
{
    public RecurringBindedEmployeeListHandler(IRequestContext context)
            : base(context)
    {
    }
}