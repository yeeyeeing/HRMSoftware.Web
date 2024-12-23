using FluentMigrator;

namespace HRMSoftware.Migrations.DefaultDB
{
    [Migration(20220629_1515)]
    public class DefaultDB_20220629_1515_OpenIddict : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Table("openid_Authorizations")
                .WithColumn("AuthorizationId").AsInt32().NotNullable().Identity().PrimaryKey()
                .WithColumn("ApplicationId").AsString(100).Nullable()
                .WithColumn("CreationDate").AsDateTime().Nullable()
                .WithColumn("Properties").AsString(1000).Nullable()
                .WithColumn("Scopes").AsString(500).Nullable()
                .WithColumn("Status").AsString(30).Nullable()
                .WithColumn("Subject").AsInt32().Nullable()
                    .ForeignKey("FK_openid_Authorizations_UserId", "Users", "UserId")
                .WithColumn("Type").AsString(30).Nullable();

            Create.Table("openid_Tokens")
                .WithColumn("TokenId").AsInt32().NotNullable().Identity().PrimaryKey()
                .WithColumn("ApplicationId").AsString(100).Nullable()
                .WithColumn("AuthorizationId").AsInt32().Nullable()
                    .ForeignKey("FK_openid_Tokens_AuthorizationId", "openid_Authorizations", "AuthorizationId")
                .WithColumn("CreationDate").AsDateTime().Nullable()
                .WithColumn("ExpirationDate").AsDateTime().Nullable()
                .WithColumn("Payload").AsString(int.MaxValue).Nullable()
                .WithColumn("Properties").AsString(1000).Nullable()
                .WithColumn("RedemptionDate").AsDateTime().Nullable()
                .WithColumn("ReferenceId").AsString(100).Nullable()
                .WithColumn("Status").AsString(30).Nullable()
                .WithColumn("Subject").AsInt32().Nullable()
                    .ForeignKey("FK_openid_Tokens_UserId", "Users", "UserId")
                .WithColumn("Type").AsString(30).Nullable();
        }
    }
}