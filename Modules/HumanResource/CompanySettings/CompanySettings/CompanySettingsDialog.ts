import { Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { CompanySettingsForm, CompanySettingsRow, CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { alertDialog, confirm, RetrieveResponse, serviceCall, isEmptyOrNull } from '@serenity-is/corelib/q';
import Holidays from 'date-holidays';
import { OccupationService } from '../../../ServerTypes/OrganisationHierarchy';

@Decorators.registerClass('HRMSoftware.CompanySettings.CompanySettingsDialog')

export class CompanySettingsDialog extends EntityDialog<CompanySettingsRow, any> {
    protected getFormKey() { return CompanySettingsForm.formKey; }
    protected getRowDefinition() { return CompanySettingsRow; }
    protected getService() { return CompanySettingsService.baseUrl; }

    protected form = new CompanySettingsForm(this.idPrefix);
    public WeekdayOtMultiplier: number;
    public WeekendOtMultiplier: number;
    public FixedOtRate: number;
    protected getDialogOptions() {
        let opt = super.getDialogOptions()
        opt.height = 800
        opt.width = 1200
        return opt
    }
    public ConstructOtDescription(): void {
        if (this.form.FixedOtRateCalculation.value == true) {
            if (this.form.FixedOtRateDenominator.value <= 0) {
                this.form.OtCalculationDescription.value = ``
                return
            }
            this.form.OtCalculationDescription.value = `Hourly Ot Rate = (Basic Salary + Allowances Subjected)/ (${this.form.FixedOtRateDenominator.value } x Employee's Daily Working Hours)`
        }
        else if (this.form.VariableOtRateCalculation.value == true) {
            this.form.OtCalculationDescription.value = `Hourly Ot Rate = (Basic Salary + Allowances Subjected)/Working Hours`
        }
        else if (this.form.OTMonthDays.value == true) {
            this.form.OtCalculationDescription.value = `Hourly Ot Rate = (Basic Salary + Allowances Subjected)/Current Month Days`
        }
        else 
            this.form.OtCalculationDescription.value = ''
    }
    public ConstructNplDescription(): void {
        if (this.form.DailyNplBasedOnWorkingHour.value == true) 
            this.form.NoPaidLeaveDes.value = `Daily No Paid Leave Rate = Basic Salary/Working Hours`
        
        else if (this.form.DailyNplBasedOnFixedDenominator.value == true) {
            if (this.form.FixedNPLDenominator.value <= 0) {
                this.form.NoPaidLeaveDes.value = ``
                return
            }
            this.form.NoPaidLeaveDes.value = `Daily No Paid Leave Rate = Basic Salary/ (${this.form.FixedNPLDenominator.value} x Employee's Daily Working Hours)`
        }
        else if (this.form.DailyNplMonthDays.value == true) 
            this.form.NoPaidLeaveDes.value = `Daily No Paid Leave Rate = Basic Salary/Current Month Days`
        else
            this.form.NoPaidLeaveDes.value = ''
    }
    public ConstructHourlyNplDescription(): void {
        if (this.form.HourlyNoPaidLeaveNPL.value == true)
            this.form.HourlyNoPaidLeaveDes.value = `Hourly No Paid Leave Rate = Daily No Paid Leave Rate / Employee's Daily Working Hours`
        else if (this.form.HourlyNoPaidLeaveAbsent.value == true) 
            this.form.HourlyNoPaidLeaveDes.value = `Hourly No Paid Leave Rate = Daily Absent/  Employee's Daily Working Hours`
        
        else
            this.form.HourlyNoPaidLeaveDes.value = ''
    }

    public ConstructEarlyLeavingDescription(): void {
        if (this.form.EarlyLeavingBasedOnWorkingHour.value == true)
            this.form.EarlyLeavingDes.value = `Early Leaving Penalty Per Minute = Basic Salary/Working Hours`

        else if (this.form.EarlyLeavingBasedOnFixedDenominator.value == true) {
            if (this.form.FixedEarlyLeavingDenominator.value <= 0) {
                this.form.EarlyLeavingDes.value = ``
                return
            }
            this.form.EarlyLeavingDes.value = `Early Leaving Penalty Per Minute = Basic Salary/ (${this.form.FixedEarlyLeavingDenominator.value} x Employee's Daily Working Hours)`
        }
        else if (this.form.EarlyLeavingMonthDays.value == true)
            this.form.EarlyLeavingDes.value = `Early Leaving Penalty Per Minute = Basic Salary/Current Month Days`
        else
            this.form.EarlyLeavingDes.value = ''
    }

    public ConstructLateArrivalDescription(): void {
        if (this.form.LateArrivalBasedOnWorkingHour.value == true)
            this.form.LateArrivalDes.value = `Late Arrival Penalty Per Minute = Basic Salary/Working Hours`

        else if (this.form.LateArrivalBasedOnFixedDenominator.value == true) {
            if (this.form.FixedLateArrivalDenominator.value <= 0) {
                this.form.LateArrivalDes.value = ``
                return
            }
            this.form.LateArrivalDes.value = `Late Arrival Penalty Per Minute = Basic Salary/ (${this.form.FixedLateArrivalDenominator.value} x Employee's Daily Working Hours)`
        }
        else if (this.form.LateArrivalMonthDays.value == true)
            this.form.LateArrivalDes.value = `Late Arrival Penalty Per Minute = Basic Salary/Current Month Days`
        else
            this.form.LateArrivalDes.value = ''
    }
    public ConstructAbsentDescription(): void {
        if (this.form.AbsentBasedOnWorkingHour.value == true)
            this.form.AbsentDes.value = `Daily Absent Penalty = Basic Salary/Working Hours`

        else if (this.form.AbsentBasedOnFixedDenominator.value == true) {
            if (this.form.FixedAbsentDenominator.value <= 0) {
                this.form.AbsentDes.value = ``
                return
            }
            this.form.AbsentDes.value = `Daily Absent Penalty = Basic Salary/${this.form.FixedAbsentDenominator.value} `
        }
        else if (this.form.AbsentMonthDays.value == true)
            this.form.AbsentDes.value = `Daily Absent Penalty = Basic Salary/Current Month Days`
        else
            this.form.AbsentDes.value = ''
    }


    public dialogOpen(asPanel?: boolean): void {

        super.dialogOpen(asPanel);
        var self = this
        $('.field.WeekdayTwo, .field.WeekdayOnePointFive, .field.WeekendTwo, .field.WeekendOnePointFive, .field.PublicHolidayTwo, .field.PublicHolidayOnePointFive').addClass('col-md-2');

        this.getDialogTitle()
        if (self.form.MoneyClaimingEitherOne.value == false
            && !(self.form.MoneyClaimingEmployeeApproval.value == true && self.form.MoneyClaimingHrApproval.value == true))
            $('.MoneyClaimingEitherOne').hide();
     
        if (self.form.LeaveApplicationEitherOne.value == false
            && !(self.form.LeaveApplicationEmployeeApproval.value == true && self.form.LeaveApplicationHrApproval.value == true))
            $('.LeaveApplicationEitherOne').hide();
        if (self.form.OTEitherOne.value == false
            && !(self.form.OTApplicationEmployeeApproval.value == true && self.form.OTApplicationHrApproval.value == true))
            $('.OTEitherOne').hide();

        var MoneyClaimingEmployee = document.getElementById(this.idPrefix + 'MoneyClaimingEmployeeApproval')
        $(MoneyClaimingEmployee).on('change', async function () {
            if (self.form.MoneyClaimingEmployeeApproval.value == true && self.form.MoneyClaimingHrApproval.value == true)
                $('.MoneyClaimingEitherOne').show();
            else {
                $('.MoneyClaimingEitherOne').hide();
                self.form.MoneyClaimingEitherOne.value = false
            }
        })
        var MoneyClaimingHrApproval = document.getElementById(this.idPrefix + 'MoneyClaimingHrApproval')
        $(MoneyClaimingHrApproval).on('change', async function () {
            if (self.form.MoneyClaimingEmployeeApproval.value == true && self.form.MoneyClaimingHrApproval.value == true)
                $('.MoneyClaimingEitherOne').show();
            else {
                $('.MoneyClaimingEitherOne').hide();
                self.form.MoneyClaimingEitherOne.value = false
            }
        })



        var LeaveApplicationEmployeeApproval = document.getElementById(this.idPrefix + 'LeaveApplicationEmployeeApproval')
        $(LeaveApplicationEmployeeApproval).on('change', async function () {
            if (self.form.LeaveApplicationEmployeeApproval.value == true && self.form.LeaveApplicationHrApproval.value == true)
                $('.LeaveApplicationEitherOne').show();
            else {
                $('.LeaveApplicationEitherOne').hide();
                self.form.LeaveApplicationEitherOne.value = false
            }
        })
        var LeaveApplicationHrApproval = document.getElementById(this.idPrefix + 'LeaveApplicationHrApproval')
        $(LeaveApplicationHrApproval).on('change', async function () {
            if (self.form.LeaveApplicationEmployeeApproval.value == true && self.form.LeaveApplicationHrApproval.value == true)
                $('.LeaveApplicationEitherOne').show();
            else {
                $('.LeaveApplicationEitherOne').hide();
                self.form.LeaveApplicationEitherOne.value = false
            }
        })





        var FixedOtRateCalculation = document.getElementById(this.idPrefix + 'FixedOtRateCalculation')
        $(FixedOtRateCalculation).on('change', async function () {
            if (self.form.FixedOtRateCalculation.value == true)
                self.form.VariableOtRateCalculation.value = self.form.OTMonthDays.value =false
            
            if (self.form.FixedOtRateCalculation.value == true)
                $('.FixedOtRateDenominator').show()
            else if (self.form.FixedOtRateCalculation.value == false)
                $('.FixedOtRateDenominator').hide()
            
            self.ConstructOtDescription()

        })
        $(FixedOtRateCalculation).trigger('change');

        var FixedOtRateDenominator = document.getElementById(this.idPrefix + 'FixedOtRateDenominator')
        $(FixedOtRateDenominator).on('change', async function () {
            self.ConstructOtDescription()
        })
        var VariableOtRateCalculation = document.getElementById(this.idPrefix + 'VariableOtRateCalculation')
        $(VariableOtRateCalculation).on('change', async function () {
            if (self.form.VariableOtRateCalculation.value == true) {
                self.form.FixedOtRateCalculation.value = self.form.OTMonthDays.value =  false
                $('.FixedOtRateDenominator').hide()
            }
            self.ConstructOtDescription()
        })

        var OTMonthDays = document.getElementById(this.idPrefix + 'OTMonthDays')
        $(OTMonthDays).on('change', async function () {
            if (self.form.OTMonthDays.value == true) {
                self.form.FixedOtRateCalculation.value = self.form.VariableOtRateCalculation.value = false
                $('.FixedOtRateDenominator').hide()
            }
            self.ConstructOtDescription()
        })

        var WeekendTwo = document.getElementById(this.idPrefix + 'WeekendTwo')
        $(WeekendTwo).on('change', async function () {
            if (self.form.WeekendOnePointFive.value == true)
                self.form.WeekendOnePointFive.value = false
        })

        var WeekendOnePointFive = document.getElementById(this.idPrefix + 'WeekendOnePointFive')
        $(WeekendOnePointFive).on('change', async function () {
            if (self.form.WeekendTwo.value == true)
                self.form.WeekendTwo.value = false
        })
        var WeekdayTwo = document.getElementById(this.idPrefix + 'WeekdayTwo')
        $(WeekdayTwo).on('change', async function () {
            if (self.form.WeekdayOnePointFive.value == true)
                self.form.WeekdayOnePointFive.value = false
        })












        const NplElements = ['DailyNplBasedOnWorkingHour', 'DailyNplBasedOnFixedDenominator', 'DailyNplMonthDays'];
        const FixedNPLDenominator = document.getElementById(this.idPrefix + 'FixedNPLDenominator');
        NplElements.forEach((id) => {
            const element = document.getElementById(this.idPrefix + id);
            element.addEventListener('change', (e) => {
                if (element.checked) {
                    NplElements
                        .filter(otherId => otherId !== id)
                        .forEach(otherId => {
                            const otherElement = document.getElementById(this.idPrefix + otherId);
                            otherElement.checked = false;
                        });
                }
                // Always call the method to update the description
                self.ConstructNplDescription();
            });
        });
        $(FixedNPLDenominator).on('change', async function () {
            self.ConstructNplDescription()
        })
        self.ConstructNplDescription();

        const HourlyNplElements = ['HourlyNoPaidLeaveNPL', 'HourlyNoPaidLeaveAbsent'];
        HourlyNplElements.forEach((id) => {
            const element = document.getElementById(this.idPrefix + id);
            element.addEventListener('change', (e) => {
                if (element.checked) {
                    HourlyNplElements
                        .filter(otherId => otherId !== id)
                        .forEach(otherId => {
                            const otherElement = document.getElementById(this.idPrefix + otherId);
                            otherElement.checked = false;
                        });
                }
                // Always call the method to update the description
                self.ConstructHourlyNplDescription();
            });
        });
        self.ConstructHourlyNplDescription();









        const EarlyLeavingElements = ['EarlyLeavingBasedOnWorkingHour', 'EarlyLeavingBasedOnFixedDenominator', 'EarlyLeavingMonthDays'];
        const FixedEarlyLeavingDenominator = document.getElementById(this.idPrefix +'FixedEarlyLeavingDenominator')
        EarlyLeavingElements.forEach((id) => {
            const element = document.getElementById(this.idPrefix + id);
            element.addEventListener('change', (e) => {
                if (element.checked) {
                    EarlyLeavingElements
                        .filter(otherId => otherId !== id)
                        .forEach(otherId => {
                            const otherElement = document.getElementById(this.idPrefix + otherId);
                            otherElement.checked = false;
                        });
                }
                // Always call the method to update the description
                self.ConstructEarlyLeavingDescription();
            });

        });
        $(FixedEarlyLeavingDenominator).on('change', async function () {
            self.ConstructEarlyLeavingDescription()
        })
        self.ConstructEarlyLeavingDescription()









        const LateArrivalElements = ['LateArrivalBasedOnWorkingHour', 'LateArrivalBasedOnFixedDenominator', 'LateArrivalMonthDays'];
        const FixedLateArrivalDenominator = document.getElementById(this.idPrefix + 'FixedLateArrivalDenominator')
        LateArrivalElements.forEach((id) => {
            const element = document.getElementById(this.idPrefix + id);
            element.addEventListener('change', () => {
                if (element.checked) {
                    LateArrivalElements
                        .filter(otherId => otherId !== id)
                        .forEach(otherId => {
                            const otherElement = document.getElementById(this.idPrefix + otherId);
                            otherElement.checked = false;
                        });
                }
                self.ConstructLateArrivalDescription()
            });
        });
        $(FixedLateArrivalDenominator).on('change', async function () {
            self.ConstructLateArrivalDescription()
        })
        self.ConstructLateArrivalDescription()



        const AbsentElements = ['AbsentBasedOnWorkingHour', 'AbsentBasedOnFixedDenominator', 'AbsentMonthDays'];
        const FixedAbsentDenominator = document.getElementById(this.idPrefix + 'FixedAbsentDenominator')
        AbsentElements.forEach((id) => {
            const element = document.getElementById(this.idPrefix + id);
            element.addEventListener('change', () => {
                if (element.checked) {
                    AbsentElements
                        .filter(otherId => otherId !== id)
                        .forEach(otherId => {
                            const otherElement = document.getElementById(this.idPrefix + otherId);
                            otherElement.checked = false;
                        });
                }
                self.ConstructAbsentDescription()

            });
        });
        $(FixedAbsentDenominator).on('change', async function () {
            self.ConstructAbsentDescription()
        })
        self.ConstructAbsentDescription()







        var WeekdayOnePointFive = document.getElementById(this.idPrefix + 'WeekdayOnePointFive')
        $(WeekdayOnePointFive).on('change', async function () {
            if (self.form.WeekdayTwo.value == true)
                self.form.WeekdayTwo.value = false
        })



        var PublicHolidayTwo = document.getElementById(this.idPrefix + 'PublicHolidayTwo')
        $(PublicHolidayTwo).on('change', async function () {
            if (self.form.PublicHolidayOnePointFive.value == true)
                self.form.PublicHolidayOnePointFive.value = false
        })

        var PublicHolidayOnePointFive = document.getElementById(this.idPrefix + 'PublicHolidayOnePointFive')
        $(PublicHolidayOnePointFive).on('change', async function () {
            if (self.form.PublicHolidayTwo.value == true)
                self.form.PublicHolidayTwo.value = false
        })



        var OTApplicationEmployeeApproval = document.getElementById(this.idPrefix + 'OTApplicationEmployeeApproval')
        $(OTApplicationEmployeeApproval).on('change', async function () {
            if (self.form.OTApplicationEmployeeApproval.value == true && self.form.OTApplicationHrApproval.value == true)
                $('.OTEitherOne').show();
            else {
                $('.OTEitherOne').hide();
                self.form.OTEitherOne.value = false
            }
        })
        var OTApplicationHrApproval = document.getElementById(this.idPrefix + 'OTApplicationHrApproval')
        $(OTApplicationHrApproval).on('change', async function () {
            if (self.form.OTApplicationEmployeeApproval.value == true && self.form.OTApplicationHrApproval.value == true)
                $('.OTEitherOne').show();
            else {
                $('.OTEitherOne').hide();
                self.form.OTEitherOne.value = false
            }
        })






        this.dialogTitle = ""
        var PublicHoliday = new Holidays();

        this.applyChangesButton.hide()
        this.deleteButton.hide()




        


        var refresh_leave_on_specidic_date = this.form.RefreshLeaveOnSpecificDate
        var refresh_leave_on_year_of_service = this.form.RefreshLeaveOnYearOfService
        var leave_refresh_day = this.form.LeaveRefreshDay.element
        var leave_refresh_month = this.form.LeaveRefreshMonth.element
        EditorUtils.setReadonly(leave_refresh_day, true);
        EditorUtils.setReadonly(leave_refresh_month, true);
        EditorUtils.setReadonly(this.form.OtCalculationDescription.element, true);
        EditorUtils.setReadonly(this.form.NoPaidLeaveDes.element, true);
        EditorUtils.setReadonly(this.form.EarlyLeavingDes.element, true);
        EditorUtils.setReadonly(this.form.LateArrivalDes.element, true);
        EditorUtils.setReadonly(this.form.AbsentDes.element, true);
        EditorUtils.setReadonly(this.form.HourlyNoPaidLeaveDes.element, true);

        var original_value = 1
        if (this.isNew() == false) {
            original_value = this.form.PayDay.value
         
        }

        var PayDayElement = document.getElementById(this.idPrefix + 'PayDay')
        let PayDayEditor = new Select2Editor($(PayDayElement))

        for (let i = 1; i <= 31; i++) 
            PayDayEditor.addItem({ id: i.toString(), text: i.toString(), });
      
        $(PayDayElement).val(original_value.toString()).trigger('change');
        






        original_value = 1

        if (this.isNew() == false && this.form.RefreshLeaveOnSpecificDate.value == true)
            original_value = this.form.LeaveRefreshDay.value



        var LeaveRefreshDayElement = document.getElementById(this.idPrefix + 'LeaveRefreshDay')
        let LeaveRefreshDayEditor = new Select2Editor($(LeaveRefreshDayElement))

        for (let i = 1; i <= 31; i++) 
            LeaveRefreshDayEditor.addItem({ id: (i).toString(), text: i.toString(), });
        
        $(LeaveRefreshDayElement).val(original_value.toString()).trigger('change');







        const months: string[] = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        original_value = 1

        if (this.isNew() == false && this.form.RefreshLeaveOnSpecificDate.value == true)
            original_value = this.form.LeaveRefreshMonth.value

        var LeaveRefreshMonthElement = document.getElementById(this.idPrefix + 'LeaveRefreshMonth')

        let LeaveRefreshMonthEditor = new Select2Editor($(LeaveRefreshMonthElement))

        for (let i = 1; i <= 12; i++) 
            LeaveRefreshMonthEditor.addItem({ id: (i).toString(), text: months[i-1] });
        $(LeaveRefreshMonthElement).val(original_value.toString()).trigger('change');














        var RefreshLeaveOnSpecificDateElement = document.getElementById(this.idPrefix + 'RefreshLeaveOnSpecificDate')
        $(RefreshLeaveOnSpecificDateElement).on('change', async function () {


            if (refresh_leave_on_year_of_service.value == true)
                refresh_leave_on_year_of_service.value = false


            if (refresh_leave_on_specidic_date.value == true) {
                EditorUtils.setReadonly(leave_refresh_day, false);
                EditorUtils.setReadonly(leave_refresh_month, false);

            }
            else if (refresh_leave_on_specidic_date.value == false) {
                EditorUtils.setReadonly(leave_refresh_day, true);
                EditorUtils.setReadonly(leave_refresh_month, true);
            }
        })
        var RefreshLeaveOnYearOfServiceElement = document.getElementById(this.idPrefix + 'RefreshLeaveOnYearOfService')
        $(RefreshLeaveOnYearOfServiceElement).on('change', async function () {

            if (refresh_leave_on_specidic_date.value == true)
                refresh_leave_on_specidic_date.value = false

            if (refresh_leave_on_year_of_service.value == true)
            {
                EditorUtils.setReadonly(leave_refresh_day, true);
                EditorUtils.setReadonly(leave_refresh_month, true);
            }
        })




        var JobGradeLeave = this.form.EntitleAnnualBasedOnJobGrade
        var YearOfServiceLeave = this.form.EntitleAnnualBasedOnYearOfService

        var EntitleAnnualBasedOnJobGradeElement = document.getElementById(this.idPrefix + 'EntitleAnnualBasedOnJobGrade')
        $(EntitleAnnualBasedOnJobGradeElement).on('change', async function () {

            if (YearOfServiceLeave.value == true)
                YearOfServiceLeave.value = false

        })
        var EntitleAnnualBasedOnYearOfServiceElement = document.getElementById(this.idPrefix + 'EntitleAnnualBasedOnYearOfService')
        $(EntitleAnnualBasedOnYearOfServiceElement).on('change', async function () {
            if (JobGradeLeave.value == true)
                JobGradeLeave.value = false
        })


        var MonthlyEntitlement = this.form.MonthlyEntitlementAnnualLeave
        var OneOffEntitlement = this.form.OneOffEntitlementAnnualLeave

     
        var MonthlyEntitlementAnnualLeaveElement = document.getElementById(this.idPrefix + 'MonthlyEntitlementAnnualLeave')
        $(MonthlyEntitlementAnnualLeaveElement).on('change', async function () {
            if (OneOffEntitlement.value == true)
                OneOffEntitlement.value = false
        })



        var OneOffEntitlementAnnualLeaveElement = document.getElementById(this.idPrefix + 'OneOffEntitlementAnnualLeave')
        $(OneOffEntitlementAnnualLeaveElement).on('change', async function () {
            if (MonthlyEntitlement.value == true)
                MonthlyEntitlement.value = false
        })







        var MaximumBasicSalaryToEntitleForOTPayFormElement = this.form.MaximumBasicSalaryToEntitleForOTPay
        var MaximumBasicSalaryToEntitleForOTPay = this.form.MaximumBasicSalary
        var MaximumPositionToEntitleForOTPay = this.form.OTJobGradeTime

        var MaximumBasicSalaryToEntitleForOTPayElement = document.getElementById(this.idPrefix + 'MaximumBasicSalaryToEntitleForOTPay')
        var MaximumJobGradeToEntitleForOTPayFormElement = document.getElementById(this.idPrefix + 'MaximumJobGradeToEntitleForOTPay')

        $(MaximumBasicSalaryToEntitleForOTPayElement).on('change', async function ()
        {

            if (self.form.MaximumJobGradeToEntitleForOTPay.value == true)
                self.form.MaximumJobGradeToEntitleForOTPay.value = false

            if (MaximumBasicSalaryToEntitleForOTPayFormElement.value == false && self.form.MaximumJobGradeToEntitleForOTPay.value == false) {
                EditorUtils.setReadonly(MaximumPositionToEntitleForOTPay.element, true);
                EditorUtils.setReadonly(MaximumBasicSalaryToEntitleForOTPay.element, true);

            }
            else {
                EditorUtils.setReadonly(MaximumPositionToEntitleForOTPay.element, MaximumBasicSalaryToEntitleForOTPayFormElement.value);
                EditorUtils.setReadonly(MaximumBasicSalaryToEntitleForOTPay.element, self.form.MaximumJobGradeToEntitleForOTPay.value);

            }
        })

        $(MaximumJobGradeToEntitleForOTPayFormElement).on('change', async function () {
            if (self.form.MaximumBasicSalaryToEntitleForOTPay.value == true)
                self.form.MaximumBasicSalaryToEntitleForOTPay.value = false

            if (MaximumBasicSalaryToEntitleForOTPayFormElement.value == false && self.form.MaximumJobGradeToEntitleForOTPay.value == false) {
                EditorUtils.setReadonly(MaximumPositionToEntitleForOTPay.element, true);
                EditorUtils.setReadonly(MaximumBasicSalaryToEntitleForOTPay.element, true);
            }
            else {
                EditorUtils.setReadonly(MaximumPositionToEntitleForOTPay.element, MaximumBasicSalaryToEntitleForOTPayFormElement.value);
                EditorUtils.setReadonly(MaximumBasicSalaryToEntitleForOTPay.element, self.form.MaximumJobGradeToEntitleForOTPay.value);

            }

            
        })
        $(MaximumBasicSalaryToEntitleForOTPayElement).trigger('change')
        let ElementNameArray: string[] = ['ClockOutGracePeriod', 'ClockInGracePeriod', 'OTMinimumMinute','MaximumOtMinute'];
        for (var index in ElementNameArray) {
            var Element = document.getElementById(this.idPrefix + ElementNameArray[index])
            $(Element).on("blur", function () {
                // If input is empty, set default text
                if ($(this).val() == "") {
                    $(this).val("(Minutes)");
                    $(Element).css({
                        "color": "grey" // Set text color to grey
                    });
                }
            });
            // Clear default text when input is focused
            $(Element).on("focus", function () {
                if ($(this).val() == "(Minutes)") {
                    $(this).val("");
                    $(Element).css({
                        "color": "black" // Set text color to grey
                    });
                }
            });
            if ($(Element).val() != ""
                && $(Element).val() != "(Minutes)")
                $(Element).css({
                    "color": "black" // Set text color to grey
                });
            else
                $(Element).css({
                    "color": "grey" // Set text color to grey
                });
            $(Element).on("change", function () {
                if ($(this).val() != "" && $(this).val() != "(Minutes)")
                    $(this).css("color", "black");
                else
                    $(this).css("color", "grey");

            });
        }
        


        var buffer = ''
        if (this.isNew() == true)
        {
            EditorUtils.setReadonly(MaximumPositionToEntitleForOTPay.element, true);
            EditorUtils.setReadonly(MaximumBasicSalaryToEntitleForOTPay.element, true);
            this.form.MaximumBasicSalary.value = 0
        }
        else if (this.isNew() == false)
        {
            buffer = this.form.BasedCountry.value
             
            if (this.form.RefreshLeaveOnSpecificDate.value == true)
            {
                EditorUtils.setReadonly(this.form.LeaveRefreshDay.element, false);
                EditorUtils.setReadonly(this.form.LeaveRefreshMonth.element, false);
            }
            else if (this.form.RefreshLeaveOnYearOfService.value == true)
            {
                EditorUtils.setReadonly(this.form.LeaveRefreshDay.element, true);
                EditorUtils.setReadonly(this.form.LeaveRefreshMonth.element, true);
            }
        }
        var CountryElement = document.getElementById(this.idPrefix + 'BasedCountry')
        let CountryEditor = new Select2Editor($(CountryElement))
        
        for (var countries in PublicHoliday.getCountries())
        {
            var selection = PublicHoliday.getCountries()[countries] + ', ' + countries
            CountryEditor.addItem({ id: (countries).toString(), text: selection.toString(), });
        }

        if (this.isNew() == false)
            $(CountryElement).val(buffer.toString()).trigger('change');
        OccupationService.List({
        }, response => {
        
            var MaximumPositionElement = document.getElementById(this.idPrefix + 'MaximumPosition')
            let MaximumPositionEditor = new Select2Editor($(MaximumPositionElement))

            for (var index in response.Entities)
                MaximumPositionEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].Name).toString(), });
        });
    }


    protected save_submitHandler(response): void
    {  
        if (this.form.RefreshLeaveOnSpecificDate.value == true)
        {
            if (this.form.LeaveRefreshMonth.value == null) {
                alertDialog("Please Fill in the leave Refresh Month")
                return
            }
            if (this.form.LeaveRefreshDay.value == null) {
                alertDialog("Please Fill in the leave Refresh Day")
                return
            }
        }
        if (this.form.MaximumBasicSalaryToEntitleForOTPay.value == true) {
            if (this.form.MaximumBasicSalary.value == null) {
                alertDialog("Please Fill in the Maximum Basic Salary")
                return
            }
        }
        if (this.form.MaximumJobGradeToEntitleForOTPay.value == true) {
            if (this.form.OTJobGradeTime.value == null)
            {
                alertDialog("Please Fill in the Maximum OT Pays")
                return
            }
        }
        if (this.form.FixedOtRateCalculation.value == false &&
            this.form.VariableOtRateCalculation.value == false) {
            alertDialog("Please Choose the Ot Calculation Method")
            return
        }
        if (this.form.WeekdayTwo.value == false &&
            this.form.WeekdayOnePointFive.value == false) {
            alertDialog("Please Choose Weekday Ot Calculation Method")
            return
        }
        if (this.form.WeekendTwo.value == false &&
            this.form.WeekendOnePointFive.value == false) {
            alertDialog("Please Choose Weekend Ot Calculation Method")
            return
        }
        if (this.form.PublicHolidayTwo.value == false &&
            this.form.PublicHolidayOnePointFive.value == false) {
            alertDialog("Please Choose Public Holiday Ot Calculation Method")
            return
        }

        if (this.form.DailyNplBasedOnFixedDenominator.value == false &&
            this.form.DailyNplBasedOnWorkingHour.value == false &&
            this.form.DailyNplMonthDays.value == false) {
            alertDialog("Please Choose NPL Penalty Calculation Method")
            return
        }
        if (this.form.EarlyLeavingBasedOnFixedDenominator.value == false &&
            this.form.EarlyLeavingBasedOnWorkingHour.value == false &&
            this.form.EarlyLeavingMonthDays.value == false) {
            alertDialog("Please Choose Early Leaving Penalty Calculation Method")
            return
        }
        if (this.form.LateArrivalBasedOnFixedDenominator.value == false &&
            this.form.LateArrivalBasedOnWorkingHour.value == false &&
            this.form.LateArrivalMonthDays.value == false) {
            alertDialog("Please Choose Late Arrival Penalty Calculation Method")
            return
        }
        if (this.form.AbsentBasedOnFixedDenominator.value == false &&
            this.form.AbsentBasedOnWorkingHour.value == false &&
            this.form.AbsentMonthDays.value == false) {
            alertDialog("Please Choose Absent Penalty Calculation Method")
            return
        }


        if (this.form.HourlyNoPaidLeaveNPL.value == false &&
            this.form.HourlyNoPaidLeaveAbsent.value == false) {
            alertDialog("Please Choose Hourly NPL Penalty Calculation Method")
            return
        }



        if (this.form.OTMinimumMinute.value < 0) {
            alertDialog("Minute Value must be greater than 0")
            return
        }

        if (this.form.RefreshLeaveOnSpecificDate.value == true)
        {
            var today = new Date()
            var year = today.getFullYear()
            var month = this.form.LeaveRefreshMonth.value
            var day = this.form.LeaveRefreshDay.value

            const date = new Date(year, month, day);
            if (!isNaN(date.getTime()))// if is invalid date
            {
                alertDialog("Please select a valid leave refresh date")
                return
            }
        }

        const encounteredIds: Set<number> = new Set();
        for (var index in this.form.OTJobGradeTime.value)
        {
            var number = this.form.OTJobGradeTime.value[index].JobGradeId
            if (encounteredIds.has(number))
            {
                alertDialog("This id has been defined")
                return;
            }
            encounteredIds.add(number);
        }
        var res = response
        if (this.isNew() == false)
        {
            confirm("Edit changes to the company settings?", () => {
                super.save_submitHandler(res);
            });
        }
        else
            super.save_submitHandler(response)
    }
    protected onSaveSuccess(response): void {
        super.onSaveSuccess(response);
        if (this.isNew() == true)
            return
        location.reload()
    }
    protected onDialogClose(): void
    {
        super.onDialogClose()
    }
}