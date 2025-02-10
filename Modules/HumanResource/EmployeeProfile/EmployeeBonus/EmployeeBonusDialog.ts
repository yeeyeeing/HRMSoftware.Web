import { EmployeeBonusForm, EmployeeBonusRow, EmployeeBonusService } from '../../../ServerTypes/EmployeeProfile';
import { EmployeeIncentiveForm, EmployeeIncentiveRow, EmployeeIncentiveService } from '../../../ServerTypes/EmployeeProfile';
import { Criteria, Decorators, EditorUtils, EntityDialog, RetrieveResponse, Select2Editor } from '@serenity-is/corelib';
import { ListResponse, serviceCall, Authorization } from '@serenity-is/corelib/q';
import { AnnouncementWizardService } from '../../../ServerTypes/Announcement';

@Decorators.registerClass('HRMSoftware.EmployeeProfile.EmployeeBonusDialog')
export class EmployeeBonusDialog extends EntityDialog<EmployeeBonusRow, any> {
    protected getFormKey() { return EmployeeBonusForm.formKey; }
    protected getRowDefinition() { return EmployeeBonusRow; }
    protected getService() { return EmployeeBonusService.baseUrl; }

    protected form = new EmployeeBonusForm(this.idPrefix);
    public dateString: string;

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        var gettingDatestring = true
        var self = this;
        serviceCall<ListResponse<any>>({
            service: AnnouncementWizardService.baseUrl + '/GetTodayDateTime',
            method: "GET",
            data: {
            },
            async: false,
            onSuccess: (response) => {
                self.dateString = response
                gettingDatestring = false
            }
        })
        while (gettingDatestring == true);

        var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth')
        var PayYearElement = document.getElementById(this.idPrefix + 'PayYear')

        let PayMonthEditor = new Select2Editor($(PayMonthElement))
        let PayYearEditor = new Select2Editor($(PayYearElement))
        const months: string[] = [
            'January',   // 0
            'February',  // 1
            'March',     // 2
            'April',     // 3
            'May',       // 4
            'June',      // 5
            'July',      // 6
            'August',    // 7
            'September', // 8
            'October',   // 9
            'November',  // 10
            'December'   // 11
        ];
        var today = new Date(self.dateString)
        var todayYear = today.getFullYear()

        var todayMonth = today.getMonth()
        // Example usage:
        for (let i = 0; i < months.length; i++)
            PayMonthEditor.addItem({ id: (i).toString(), text: (months[i]).toString(), }); // 8am - 6pm , will consider lates
        if (self.isNew())
            PayMonthEditor.set_value(todayMonth.toString())
        for (let i = -1; i < 2; i++)
            PayYearEditor.addItem({ id: (todayYear + i).toString(), text: (todayYear + i).toString(), }); // 8am - 6pm , will consider lates
        if (self.isNew())
            PayYearEditor.set_value(todayYear.toString())

    }

}