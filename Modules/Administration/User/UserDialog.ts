import { UserForm, UserRow, UserService } from "@/ServerTypes/Administration";
import { Texts } from "@/ServerTypes/Texts";
import { Decorators, EditorUtils, EntityDialog } from "@serenity-is/corelib";
import { format, localText } from "@serenity-is/corelib/q";
import { UserPermissionDialog } from "../UserPermission/UserPermissionDialog";
import {  Select2Editor } from '@serenity-is/corelib';
import { EmployeeProfileService } from "../../ServerTypes/EmployeeProfile";
import { alertDialog, isEmptyOrNull } from '@serenity-is/corelib/q';

@Decorators.registerClass()
export class UserDialog extends EntityDialog<UserRow, any> {
    protected getFormKey() { return UserForm.formKey; }
    protected getIdProperty() { return UserRow.idProperty; }
    protected getIsActiveProperty() { return UserRow.isActiveProperty; }
    protected getLocalTextPrefix() { return UserRow.localTextPrefix; }
    protected getNameProperty() { return UserRow.nameProperty; }
    protected getService() { return UserService.baseUrl; }

    protected form = new UserForm(this.idPrefix);

    constructor() {
        super();

        this.form.Password.element.attr("autocomplete", "new-password");

        this.form.Password.change(() => {
            EditorUtils.setRequired(this.form.PasswordConfirm, this.form.Password.value.length > 0);
        });

        this.form.Password.addValidationRule(this.uniqueName, e => {
            if (this.form.Password.value.length < 6)
                return format(localText(Texts.Validation.MinRequiredPasswordLength), 6);
        });

        this.form.PasswordConfirm.addValidationRule(this.uniqueName, e => {
            if (this.form.Password.value != this.form.PasswordConfirm.value)
                return localText(Texts.Validation.PasswordConfirmMismatch);
        });
    }

    protected getToolbarButtons()
    {
        let buttons = super.getToolbarButtons();

        buttons.push({
            title: localText(Texts.Site.UserDialog.EditPermissionsButton),
            cssClass: 'edit-permissions-button',
            icon: 'fa-lock text-green',
            onClick: () =>
            {
                new UserPermissionDialog({
                    userID: this.entity.UserId,
                    username: this.entity.Username
                }).dialogOpen();
            }
        });

        return buttons;
    }

    protected updateInterface() {
        super.updateInterface();

        this.toolbar.findButton("edit-permissions-button").toggleClass("disabled", this.isNewOrDeleted());
    }
    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        var self = this
        var EmployeeRowID = document.getElementById(this.idPrefix + 'EmployeeRowID')
        let EmployeeRowEditor = new Select2Editor($(EmployeeRowID))
        EditorUtils.setReadonly(this.form.EmployeeName.element, true);
        EmployeeProfileService.List({
        }, response => {
            for (var index in response.Entities) {
                if (isEmptyOrNull(response.Entities[index].CreateUser))//if no account yet
                EmployeeRowEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].EmployeeID).toString(), });
            }
        });
        $(EmployeeRowID).on('change', async function () {

            if (isEmptyOrNull($(EmployeeRowID).val())) {
                self.form.EmployeeName.value = ''
            }
            else {
                EmployeeProfileService.Retrieve({
                    EntityId: $(EmployeeRowID).val()
                }, response => {
                    self.form.EmployeeName.value = response.Entity.EmployeeName
                });
            }

        })
    }

    protected afterLoadEntity() {
        super.afterLoadEntity();

        // these fields are only required in new record mode
        this.form.Password.element.toggleClass('required', this.isNew())
            .closest('.field').find('sup').toggle(this.isNew());
        this.form.PasswordConfirm.element.toggleClass('required', this.isNew())
            .closest('.field').find('sup').toggle(this.isNew());
    }

    protected save_submitHandler(response): void {
        super.save_submitHandler(response);
        EmployeeProfileService.Update({
            EntityId: this.form.EmployeeRowID.value,
            Entity:
            {
                "UserPassword": this.form.Password.value
            },
        });

    }
}
