import { Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import { EmployeeAllowanceForm, EmployeeAllowanceRow, EmployeeAllowanceService, EmployeeCp38EditorForm, EmployeeCp38Row, EmployeeCp38Service, MasterAllowanceRow, MasterAllowanceService } from '../../../ServerTypes/EmployeeProfile';
import { GridEditorDialog } from "@serenity-is/extensions";
import { alertDialog, isEmptyOrNull, getHighlightTarget, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeCp38EditDialog')
export class EmployeeCp38EditDialog extends GridEditorDialog<EmployeeCp38Row> {
    protected getFormKey() { return EmployeeCp38EditorForm.formKey; }
    protected getRowDefinition() { return EmployeeCp38Row; }
    protected getService() { return EmployeeCp38Service.baseUrl; }
    protected getLocalTextPrefix() { return EmployeeCp38Row.localTextPrefix; }
    protected getNameProperty() { return EmployeeCp38Row.nameProperty; }

    protected form: EmployeeCp38EditorForm = new EmployeeCp38EditorForm(this.idPrefix);
    public currentVal: any;
    constructor() {
        super();
        this.form = new EmployeeCp38EditorForm(this.idPrefix);

    }




}