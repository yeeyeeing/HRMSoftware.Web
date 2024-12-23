using Microsoft.Extensions.Options;
using OpenIddict.Abstractions;
using Serenity;
using Serenity.Abstractions;
using Serenity.Pro.OpenIddict;
using System;

namespace HRMSoftware.Administration.Pages
{
    public class OpenIdAuthorizationController : OpenIdAuthorizationControllerBase
    {
        private readonly IUserPasswordValidator userPasswordValidator;

        public OpenIdAuthorizationController(
            IUserPasswordValidator userPasswordValidator,
            IUserRetrieveService userRetrieveService,
            IOptionsMonitor<OpenIdSettings> options = null,
            IOpenIddictApplicationManager applicationManager = null,
            IOpenIddictAuthorizationManager authorizationManager = null,
            ITextLocalizer textLocalizer = null)
            : base(userRetrieveService, options, applicationManager, authorizationManager, textLocalizer)
        {
            this.userPasswordValidator = userPasswordValidator ?? throw new ArgumentNullException(nameof(userPasswordValidator));
        }

        protected override bool ValidatePassword(string username, string password)
        {
            return !string.IsNullOrEmpty(username) &&
                userPasswordValidator.Validate(ref username, password) == PasswordValidationResult.Valid;
        }
    }
}