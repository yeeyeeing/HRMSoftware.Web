using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.TrainingManagement.MasterProgramRow;

namespace HRMSoftware.TrainingManagement;

public interface IMasterProgramDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MasterProgramDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMasterProgramDeleteHandler
{
    public MasterProgramDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}