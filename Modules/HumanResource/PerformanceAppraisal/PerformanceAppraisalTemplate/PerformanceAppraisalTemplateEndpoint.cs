using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Data;
using System.Globalization;
using HRMSoftware.Web.Modules.PerformanceAppraisal;
using MyRow = HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateRow;

namespace HRMSoftware.PerformanceAppraisal.Endpoints;

[Route("Services/PerformanceAppraisal/PerformanceAppraisalTemplate/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class PerformanceAppraisalTemplateEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IPerformanceAppraisalTemplateSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IPerformanceAppraisalTemplateSaveHandler handler)
    {
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IPerformanceAppraisalTemplateDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IPerformanceAppraisalTemplateRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IPerformanceAppraisalTemplateListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IPerformanceAppraisalTemplateListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.PerformanceAppraisalTemplateColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "PerformanceAppraisalTemplateList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }
    
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse DeleteAll(IDbConnection connection, DeleteAllRequest request)
    {
        if (request.RecordIds == null || request.RecordIds.Length == 0)
            throw new ArgumentNullException(nameof(request.RecordIds));

        connection.Execute(@"
        UPDATE [PerformanceAppraisalTemplate]
        SET IsActive = -1, DeleteDate = @now
        WHERE Id IN @RecordIds", new { RecordIds = request.RecordIds, now = DateTime.Now });
      
        return new DeleteResponse();
    }
}