using HRMSoftware.Administration;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Serenity;
using Serenity.Data;
using Serenity.Extensions;
using Serenity.Services;
using Serenity.Web;
using System;
using System.IO;

namespace HRMSoftware.Membership.Pages
{
    public partial class AccountPage : Controller
    {
        [HttpGet]
        public ActionResult ResetPassword(string t,
            [FromServices] ISqlConnections sqlConnections)
        {
            if (sqlConnections is null)
                throw new ArgumentNullException(nameof(sqlConnections));

            int userId;
            int nonce;
            try
            {
                var bytes = HttpContext.RequestServices
                    .GetDataProtector("ResetPassword").Unprotect(Convert.FromBase64String(t));

                using var ms = new MemoryStream(bytes);
                using var br = new BinaryReader(ms);
                var dt = DateTime.FromBinary(br.ReadInt64());
                if (dt < DateTime.UtcNow)
                    return Error(Texts.Validation.InvalidResetToken.ToString(Localizer));

                userId = br.ReadInt32();
                nonce = br.ReadInt32();
            }
            catch (Exception)
            {
                return Error(Texts.Validation.InvalidResetToken.ToString(Localizer));
            }

            using (var connection = sqlConnections.NewFor<UserRow>())
            {
                var user = connection.TryById<UserRow>(userId);
                if (user == null || nonce != NonceForResetPassword(user))
                    return Error(Texts.Validation.InvalidResetToken.ToString(Localizer));
            }

            return this.PanelPage(new()
            {
                Module = ESM.Modules.Membership.Account.ResetPassword.ResetPasswordPage,
                PageTitle = Texts.Forms.Membership.ResetPassword.FormTitle,
                Layout = MVC.Views.Shared._LayoutNoNavigation,
                Options = new
                {
                    token = t
                }
            });
        }

        [HttpPost, JsonRequest]
        public Result<ServiceResponse> ResetPassword(ResetPasswordRequest request,
            [FromServices] ISqlConnections sqlConnections,
            [FromServices] IOptions<EnvironmentSettings> environmentOptions)
        {
            return this.InTransaction("Default", uow =>
            {
                if (request is null)
                    throw new ArgumentNullException(nameof(request));

                if (string.IsNullOrEmpty(request.Token))
                    throw new ArgumentNullException("token");

                var bytes = HttpContext.RequestServices
                    .GetDataProtector("ResetPassword").Unprotect(Convert.FromBase64String(request.Token));

                int userId;
                int nonce;
                using (var ms = new MemoryStream(bytes))
                using (var br = new BinaryReader(ms))
                {
                    var dt = DateTime.FromBinary(br.ReadInt64());
                    if (dt < DateTime.UtcNow)
                        throw new ValidationError(Texts.Validation.InvalidResetToken.ToString(Localizer));

                    userId = br.ReadInt32();
                    nonce = br.ReadInt32();
                }

                if (sqlConnections is null)
                    throw new ArgumentNullException(nameof(sqlConnections));

                UserRow user;
                using (var connection = sqlConnections.NewFor<UserRow>())
                {
                    user = connection.TryById<UserRow>(userId);
                    if (user == null || nonce != NonceForResetPassword(user))
                        throw new ValidationError(Texts.Validation.InvalidResetToken.ToString(Localizer));
                }

                if (request.ConfirmPassword != request.NewPassword)
                    throw new ValidationError("PasswordConfirmMismatch", Localizer.Get("Validation.PasswordConfirm"));

                request.NewPassword = UserHelper.ValidatePassword(request.NewPassword, Localizer);

                string salt = null;
                var hash = UserHelper.GenerateHash(request.NewPassword, ref salt);

                uow.Connection.UpdateById(new UserRow
                {
                    UserId = user.UserId.Value,
                    PasswordSalt = salt,
                    PasswordHash = hash,
                    UpdateDate = DateTime.Now
                });

                Cache.InvalidateOnCommit(uow, UserRow.Fields);

                return new ServiceResponse();
            });
        }
    }
}