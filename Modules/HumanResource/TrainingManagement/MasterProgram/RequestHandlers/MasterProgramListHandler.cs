using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.TrainingManagement.MasterProgramRow>;
using MyRow = HRMSoftware.TrainingManagement.MasterProgramRow;

namespace HRMSoftware.TrainingManagement;

public interface IMasterProgramListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class MasterProgramListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IMasterProgramListHandler
{
    public MasterProgramListHandler(IRequestContext context)
            : base(context)
    {
    }
}