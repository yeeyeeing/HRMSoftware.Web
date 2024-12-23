using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.TrainingManagement.ProgramDepartmentRow>;
using MyRow = HRMSoftware.TrainingManagement.ProgramDepartmentRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramDepartmentRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramDepartmentRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IProgramDepartmentRetrieveHandler
{
    public ProgramDepartmentRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}