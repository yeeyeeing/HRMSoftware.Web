using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.TrainingManagement.ProgramFlowResponseRow>;
using MyRow = HRMSoftware.TrainingManagement.ProgramFlowResponseRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramFlowResponseRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramFlowResponseRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IProgramFlowResponseRetrieveHandler
{
    public ProgramFlowResponseRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}