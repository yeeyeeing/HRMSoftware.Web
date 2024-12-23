using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupRow;
using System.Linq;

namespace HRMSoftware.EmployeeGroup.Endpoints;

[Route("Services/EmployeeGroup/EmployeeGroup/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class EmployeeGroupEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IEmployeeGroupSaveHandler handler)
    {

        if (request.Entity.Shifts.Count > 0)
        {
            DateTime Start = request.Entity.Shifts[0].ShiftStartDate.Value;
            DateTime End = request.Entity.Shifts[0].ShiftEndDate.Value;

            for (int i = 1; i < request.Entity.Shifts.Count; i++)
            {

                if (request.Entity.Shifts[i].ShiftStartDate.Value < Start)
                    Start = request.Entity.Shifts[i].ShiftStartDate.Value;

                if (request.Entity.Shifts[i].ShiftEndDate.Value > End)
                    End = request.Entity.Shifts[i].ShiftEndDate.Value;


            }
            request.Entity.StartDate = Start;
            request.Entity.EndDate = End;

        }

        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IEmployeeGroupSaveHandler handler)
    {
        if (request.Entity.Shifts.Count > 0)
        {
            DateTime Start = request.Entity.Shifts[0].ShiftStartDate.Value;
            DateTime End = request.Entity.Shifts[0].ShiftEndDate.Value;

            for (int i = 1; i < request.Entity.Shifts.Count; i++)
            {

                if (request.Entity.Shifts[i].ShiftStartDate.Value < Start)
                    Start = request.Entity.Shifts[i].ShiftStartDate.Value;

                if (request.Entity.Shifts[i].ShiftEndDate.Value > End)
                    End = request.Entity.Shifts[i].ShiftEndDate.Value;


            }

            request.Entity.StartDate = Start;
            request.Entity.EndDate = End;

        }
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IEmployeeGroupDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IEmployeeGroupRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IEmployeeGroupListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IEmployeeGroupListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.EmployeeGroupColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "EmployeeGroupList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }


    [HttpGet]
    public ListResponse<MyRow> ListGroup(IDbConnection connection)
    {
        ListResponse<MyRow> latest = new ListResponse<MyRow>();
        latest.Entities = (List<MyRow>)connection.Query<MyRow>("dbo.ListGroup",
            param: new
            {
            },
                commandType: System.Data.CommandType.StoredProcedure);

        return latest;

    }


}