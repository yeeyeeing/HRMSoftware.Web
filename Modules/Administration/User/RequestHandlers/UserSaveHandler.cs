using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Collections.Generic;
using System.Data;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Administration.UserRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Administration.UserRow;

namespace HRMSoftware.Administration
{
    public interface IUserSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> { }
    public class UserSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IUserSaveHandler
    {
        private static MyRow.RowFields Fld { get { return MyRow.Fields; } }

        public UserSaveHandler(IRequestContext context)
             : base(context)
        {
        }

        private string password;

        protected override void GetEditableFields(HashSet<Field> editable)
        {
            base.GetEditableFields(editable);

            if (!Permissions.HasPermission(PermissionKeys.Security))
            {
                editable.Remove(Fld.Source);
                editable.Remove(Fld.IsActive);
            }
        }

        public static string ValidateUsername(IDbConnection connection, string username, int? existingUserId,
            ITextLocalizer localizer)
        {
            username = username.TrimToNull();

            if (username == null)
                throw DataValidation.RequiredError(Fld.Username, localizer);

            if (!UserHelper.IsValidUsername(username))
                throw new ValidationError("InvalidUsername", "Username",
                    "Usernames should start with letters, only contain letters and numbers!");

            var existing = UserHelper.GetUser(connection,
                new Criteria(Fld.Username) == username |
                new Criteria(Fld.Username) == username.Replace('I', 'İ'));

            if (existing != null && existingUserId != existing.UserId)
                throw new ValidationError("UniqueViolation", "Username",
                    "A user with same name exists. Please choose another!");

            return username;
        }

        protected override void ValidateRequest()
        {
            base.ValidateRequest();

            if (IsUpdate)
            {
                if (Row.Username != Old.Username)
                    Row.Username = ValidateUsername(Connection, Row.Username, Old.UserId.Value, Localizer);

                if (Row.DisplayName != Old.DisplayName)
                    Row.DisplayName = UserHelper.ValidateDisplayName(Row.DisplayName, Localizer);
            }

            if (IsCreate)
            {
                Row.Username = ValidateUsername(Connection, Row.Username, null, Localizer);
                Row.DisplayName = UserHelper.ValidateDisplayName(Row.DisplayName, Localizer);
            }

            if (IsCreate || (Row.IsAssigned(Fld.Password) && !Row.Password.IsEmptyOrNull()))
            {
                if (Row.IsAssigned(Fld.PasswordConfirm) && !Row.PasswordConfirm.IsEmptyOrNull() &&
                    Row.Password != Row.PasswordConfirm)
                    throw new ValidationError("PasswordConfirmMismatch", "PasswordConfirm", Texts.Validation.PasswordConfirmMismatch.ToString(Localizer));

                password = Row.Password = UserHelper.ValidatePassword(Row.Password, Localizer);
            }
        }

        protected override void SetInternalFields()
        {
            base.SetInternalFields();

            if (IsCreate)
            {
                Row.Source = "site";
                Row.IsActive = Row.IsActive ?? 1;
            }

            if (IsCreate || !Row.Password.IsEmptyOrNull())
            {
                string salt = null;
                Row.PasswordHash = UserHelper.GenerateHash(password, ref salt);
                Row.PasswordSalt = salt;
                Console.WriteLine("hello world");
                Console.WriteLine("hello world");
                Console.WriteLine("hello world");
                Console.WriteLine("hello world");
                Console.WriteLine("hello world");
                Console.WriteLine("hello world");

                Console.WriteLine(Row.PasswordHash);

                Console.WriteLine(Row.PasswordHash);

                Console.WriteLine(Row.PasswordHash);
            }
        }

        protected override void AfterSave()
        {
            base.AfterSave();

            Cache.InvalidateOnCommit(UnitOfWork, Fld);
        }
    }
}