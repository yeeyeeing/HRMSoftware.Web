using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.TrainingManagement.MasterProgramRow>;
using MyRow = HRMSoftware.TrainingManagement.MasterProgramRow;

namespace HRMSoftware.TrainingManagement;

public interface IMasterProgramRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterProgramRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterProgramRetrieveHandler
{
    public MasterProgramRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}