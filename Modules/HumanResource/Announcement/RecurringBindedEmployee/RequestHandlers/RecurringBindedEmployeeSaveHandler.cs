using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Announcement.RecurringBindedEmployeeRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Announcement.RecurringBindedEmployeeRow;

namespace HRMSoftware.Announcement;

public interface IRecurringBindedEmployeeSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class RecurringBindedEmployeeSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IRecurringBindedEmployeeSaveHandler
{
    public RecurringBindedEmployeeSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}