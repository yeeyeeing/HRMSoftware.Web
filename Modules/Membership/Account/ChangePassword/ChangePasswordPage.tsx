import { ChangePasswordForm, ChangePasswordRequest } from "@/ServerTypes/Membership";
import { Texts } from "@/ServerTypes/Texts";
import {  PropertyPanel } from "@serenity-is/corelib";
import { format, informationDialog, resolveUrl, serviceCall } from "@serenity-is/corelib/q";
import { UserService } from "../../../ServerTypes/Administration";
import { EmployeeProfileService } from "../../../ServerTypes/EmployeeProfile";
import { Authorization } from "@serenity-is/corelib/q";

export default function pageInit() {
    $(function () {
        new ChangePasswordPanel($('#PanelDiv')
            .addClass('s-container-tight mt-5'));
    });
}

const myTexts = Texts.Forms.Membership.ChangePassword;

class ChangePasswordPanel extends PropertyPanel<ChangePasswordRequest, any> {

    protected getFormKey() { return ChangePasswordForm.formKey; }

    private form = new ChangePasswordForm(this.idPrefix);

    constructor(container: JQuery) {
        super(container);

        this.form.NewPassword.addValidationRule(this.uniqueName, () => {
            if (this.form.NewPassword.value.length < 7) {
                return format(Texts.Validation.MinRequiredPasswordLength, 7);
            }
        });

        this.form.ConfirmPassword.addValidationRule(this.uniqueName, () => {
            if (this.form.ConfirmPassword.value !== this.form.NewPassword.value) {
                return Texts.Validation.PasswordConfirmMismatch;
            }
        });
    }

    protected submitClick() {
        if (!this.validateForm())
            return;

        var request = this.getSaveEntity();
        serviceCall({
            url: resolveUrl('~/Account/ChangePassword'),
            request: request,
            onSuccess: () => {

                EmployeeProfileService.List({
                }, response => {
                    for (var index in response.Entities)
                    {
                        if (response.Entities[index].Id == Authorization.userDefinition.EmployeeRowID)
                        {
                            EmployeeProfileService.Update({
                                EntityId: response.Entities[index].Id,
                                Entity:
                                {
                                    "UserPassword": this.form.NewPassword.value
                                  
                                },
                            });
                        }
                    }

                })
                

                informationDialog(myTexts.Success, () => {
                    window.location.href = resolveUrl('~/');
                })
            }
        })
    }

    renderContents() {
        const id = this.useIdPrefix();
        this.element.empty().append(
            <div class="s-Panel">
                <h3 class="page-title mb-4 text-center">{myTexts.FormTitle}</h3>
                <form id={id.Form} action="">
                    <div id={id.PropertyGrid}></div>
                    <div class="px-field mt-4">
                        <button id={id.SubmitButton} type="submit" class="btn btn-primary w-100"
                            onClick={e => { e.preventDefault(); this.submitClick() }}>
                            {myTexts.SubmitButton}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

