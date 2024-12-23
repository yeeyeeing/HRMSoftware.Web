using FluentMigrator;

namespace HRMSoftware.Migrations.DefaultDB
{
    [Migration(20210824_1546)]
    public class DefaultDB_20210824_1546_WorkLog : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Table("wlog_Currency")
                .WithColumn("CurrencyCode").AsString(3).NotNullable().PrimaryKey(); //ISO 4217 currency codes

            Insert.IntoTable("wlog_Currency").Row(new
            {
                CurrencyCode = "USD",
            }).Row(new
            {
                CurrencyCode = "EUR"
            });

            Create.Table("wlog_Customer")
                .WithColumn("CustomerId").AsInt32().Identity().PrimaryKey().NotNullable()
                .WithColumn("UserId").AsInt32().Nullable()
                    .ForeignKey("FK_dbo_wlog_Customer_UserId", "Users", "UserId")
                .WithColumn("Name").AsString(200).NotNullable().Unique()
                .WithColumn("HourlyRate").AsDecimal(18, 2).NotNullable().WithDefaultValue(0)
                .WithColumn("CurrencyCode").AsString(3).Nullable()
                    .ForeignKey("FK_dbo_wlog_Customer_CurrencyCode", "wlog_Currency", "CurrencyCode");

            Create.Table("wlog_Employee")
                .WithColumn("EmployeeId").AsInt32().Identity().PrimaryKey().NotNullable()
                .WithColumn("UserId").AsInt32().Nullable()
                    .ForeignKey("FK_dbo_wlog_Employee_UserId", "Users", "UserId")
                .WithColumn("Name").AsString(200).NotNullable();

            Create.Table("wlog_Project")
                 .WithColumn("ProjectId").AsInt32().Identity().PrimaryKey().NotNullable()
                 .WithColumn("CustomerId").AsInt32().NotNullable()
                    .ForeignKey("FK_dbo_wlog_Project_CustomerId", "wlog_Customer", "CustomerId")
                .WithColumn("Name").AsString(200).NotNullable()
                .WithColumn("EndCustomer").AsString(200).Nullable()
                .WithColumn("HourlyRate").AsDecimal(18, 2).Nullable()
                .WithColumn("CurrencyCode").AsString(3).Nullable()
                    .ForeignKey("FK_dbo_wlog_Project_CurrencyCode", "wlog_Currency", "CurrencyCode");

            Create.Table("wlog_EmployeePricing")
                .WithColumn("EmployeePricingId").AsInt32().Identity().PrimaryKey().NotNullable()
                .WithColumn("EmployeeId").AsInt32().NotNullable()
                    .ForeignKey("FK_dbo_wlog_EmployeePricing_EmployeeId", "wlog_Employee", "EmployeeId")
                .WithColumn("CustomerId").AsInt32().NotNullable()
                    .ForeignKey("FK_dbo_wlog_EmployeePricing_CustomerId", "wlog_Customer", "CustomerId")
                .WithColumn("ProjectId").AsInt32().Nullable()
                    .ForeignKey("FK_dbo_wlog_EmployeePricing_ProjectId", "wlog_Project", "ProjectId")
                .WithColumn("HourlyRate").AsDecimal(18, 2).NotNullable()
                .WithColumn("CurrencyCode").AsString(3).NotNullable()
                    .ForeignKey("FK_dbo_wlog_EmployeePricing_CurrencyCode", "wlog_Currency", "CurrencyCode");

            Create.Table("wlog_Invoice")
                .WithColumn("InvoiceId").AsInt32().Identity().PrimaryKey().NotNullable()
                .WithColumn("CustomerId").AsInt32().NotNullable()
                    .ForeignKey("FK_dbo_wlog_Invoice_CustomerId", "wlog_Customer", "CustomerId")
                .WithColumn("InvoiceNo").AsString(500).NotNullable().Unique()
                .WithColumn("Date").AsDateTime().Nullable()
                .WithColumn("Amount").AsDecimal(18, 2).Nullable()
                .WithColumn("CurrencyCode").AsString(3).Nullable()
                    .ForeignKey("FK_dbo_wlog_Invoice_CurrencyCode", "wlog_Currency", "CurrencyCode")
                .WithColumn("Notes").AsString().Nullable();

            Create.Table("wlog_WorkLog")
                .WithColumn("WorkLogId").AsInt32().Identity().PrimaryKey().NotNullable()
                .WithColumn("ProjectId").AsInt32().NotNullable()
                    .ForeignKey("FK_dbo_wlog_WorkLog_ProjectId", "wlog_Project", "ProjectId")
                .WithColumn("EmployeeId").AsInt32().NotNullable()
                    .ForeignKey("FK_dbo_wlog_WorkLog_EmployeeId", "wlog_Employee", "EmployeeId")
                .WithColumn("Tasks").AsString().Nullable()
                .WithColumn("Description").AsString(500).Nullable()
                .WithColumn("StartDate").AsDateTime().NotNullable()
                .WithColumn("EndDate").AsDateTime().NotNullable()
                .WithColumn("Price").AsDecimal(18, 2).NotNullable().WithDefaultValue(0)
                .WithColumn("CurrencyCode").AsString(3).Nullable()
                    .ForeignKey("FK_dbo_wlog_WorkLog_CurrencyCode", "wlog_Currency", "CurrencyCode")
                .WithColumn("InvoiceId").AsInt32().Nullable()
                    .ForeignKey("FK_dbo_wlog_Invoice_InvoiceId", "wlog_Invoice", "InvoiceId");
        }
    }
}