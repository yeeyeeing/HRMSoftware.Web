using Serenity.Data;
using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.TrainingManagement.AttendanceListRow>;
using MyRow = HRMSoftware.TrainingManagement.AttendanceListRow;

namespace HRMSoftware.TrainingManagement;

public interface IAttendanceListListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class AttendanceListListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IAttendanceListListHandler
{
    public AttendanceListListHandler(IRequestContext context)
            : base(context)
    {
    }
    
    protected override void ApplyFilters(SqlQuery query)
    {
        base.ApplyFilters(query);
    
        query.Where(MyRow.Fields.ProgramId > 0);
        query.Where(MyRow.Fields.FlowType == 1);
    }
}