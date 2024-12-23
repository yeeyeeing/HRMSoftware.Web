import { Decorators, EntityDialog, RetrieveResponse, SaveResponse, Select2Editor, EditorUtils } from '@serenity-is/corelib';
import { InitYearForm, InitYearRow, InitYearService } from '../../../ServerTypes/InitYear';
import Holidays from 'date-holidays'
import { AnnualLeavePolicyService } from '../../../../ServerTypes/AnnualLeavePolicy';
import { alertDialog } from '@serenity-is/corelib/q';
import { serviceCall, isEmptyOrNull } from '@serenity-is/corelib/q';
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { AnnualLeaveJobGradePolicyService } from '../../../ServerTypes/AnnualLeaveJobGradePolicy';
import { SickLeavePolicyService } from '../../../ServerTypes/SickLeavePolicy';
import { JobGradeService } from '../../../ServerTypes/OrganisationHierarchy';

@Decorators.registerClass('HRMSoftware.InitYear.InitYearDialog')
export class InitYearDialog extends EntityDialog<InitYearRow, any> {
    protected getFormKey() { return InitYearForm.formKey; }
    protected getRowDefinition() { return InitYearRow; }
    protected getService() { return InitYearService.baseUrl; }
    public AlreadyInitYear: number[] = [];
    public JobGradeList: number[] = [];

    public StartingRange: number[] = [];
    public EndingRange: number[] = [];
    protected form = new InitYearForm(this.idPrefix);
    public max: number;
    public check_job_grade_annual_leave: number;


    constructor() {
        super();
        this.deleteButton.remove()
        this.cloneButton.remove()


        CompanySettingsService.List({
        }, response => {

            for (var index in response.Entities)
            {
                if (response.Entities[index].IsActive==1)
                {
                    if (response.Entities[index].EntitleAnnualBasedOnJobGrade == true) {
                        EditorUtils.setReadonly(this.form.PolicyList.element, true);
                        this.check_job_grade_annual_leave = 1

                    }
                    if (response.Entities[index].EntitleAnnualBasedOnYearOfService == true) 
                        EditorUtils.setReadonly(this.form.AnnulLeaveBasedOnJobGrade.element, true);

                }
            }
        });





        JobGradeService.List({
        }, response => {
            for (var index in response.Entities) 
                this.JobGradeList.push(response.Entities[index].Id)
            
        });
        

    }


    

    protected onDialogOpen()
    {

        if (!isEmptyOrNull(this.entityId))
            this.dialogTitle = this.form.Year.value.toString() +" Year"

        else
            this.dialogTitle = ""

        if (this.isNew())
        {
            serviceCall<RetrieveResponse<any>>({
                service: InitYearService.baseUrl + '/ListYear',
                data: {

                },
                method: "GET",
                async: true,
                onSuccess: (response) => {

                    console.log(response.Entities[0].YearString)
                    let yearString = response.Entities[0].YearString
                    let yearsArray = yearString.split(',');

                    // Map over the array to remove '-' and parse into numbers

                    // Map over the array to extract the numeric part of each year

                    // Filter out years that contain '-'
                    yearsArray = yearsArray.filter(year => !year.includes('-'));
                    console.log(yearsArray)
                    // Join the filtered array back into a string

                    var YearElement = document.getElementById(this.idPrefix + 'Year')
                    var YearEditor = new Select2Editor($(YearElement))
                    for (var i = 0; i < yearsArray.length; i++) {
                        YearEditor.addItem({ id: (yearsArray[i]).toString(), text: (yearsArray[i]).toString(), });
                    }
                },
                onError: (error) => {
                }
            });

            InitYearService.List({
            }, response => {

                for (var entities in response.Entities) {
                    this.AlreadyInitYear.push(response.Entities[entities].Year)
                }
              
            });


        }


        else {
            this.saveAndCloseButton.remove()
            EditorUtils.setReadonly(this.form.Year.element, true);

        }


        super.onDialogOpen()


     

        //var LeaveBringForwardMethodElement = '.LeaveBringForwardMethod';
        var LeaveBringForwardMethodElement = document.getElementById(this.idPrefix + 'LeaveBringForwardMethod')




        //var BringForwardPercentageElement = '.BringForwardPercentage';
        var BringForwardPercentageElement = document.getElementById(this.idPrefix + 'BringForwardPercentage')



        //var BringForwardDaysElement =  '.BringForwardDays';
        var BringForwardDaysElement = document.getElementById(this.idPrefix + 'BringForwardDays')




        //var RoundUpElement = '.LeaveRoundUp';
        var RoundUpElement = document.getElementById(this.idPrefix + 'LeaveRoundUp')

        $('.LeaveRoundUp').hide();


        this.process_form()

        var this_reference = this
        $(LeaveBringForwardMethodElement).on('change', async function () {
            console.log($(LeaveBringForwardMethodElement).val())
            /*
            if ($(LeaveBringForwardMethodElement).val() == 3)//Manual
            {
                $('.BringForwardDays').show();
                $(BringForwardPercentageElement).val('');
                $('.BringForwardPercentage').hide()
                $('.LeaveRoundUp').hide();

            }

            else if ($(LeaveBringForwardMethodElement).val() == 6)//MaximumDaysCarryForwardByPercentage
            {
                $('.BringForwardPercentage').show();
                $('.LeaveRoundUp').show();
                $(BringForwardDaysElement).val('')
                $('.BringForwardDays').hide()
            }

            else {
                $('.BringForwardDays').hide();
                $('.BringForwardPercentage').hide();
                $('.LeaveRoundUp').hide();
            }
            */
            this_reference.process_form()
        })







    }

    public process_form()
    {
        var LeaveBringForwardMethodElement = document.getElementById(this.idPrefix + 'LeaveBringForwardMethod')
        var BringForwardPercentageElement = document.getElementById(this.idPrefix + 'BringForwardPercentage')
        var BringForwardDaysElement = document.getElementById(this.idPrefix + 'BringForwardDays')

        if ($(LeaveBringForwardMethodElement).val() == 3)//Manual
        {
            $('.BringForwardDays').show();
            $(BringForwardPercentageElement).val('');
            $('.BringForwardPercentage').hide()
            $('.LeaveRoundUp').hide();

        }

        else if ($(LeaveBringForwardMethodElement).val() == 6)//MaximumDaysCarryForwardByPercentage
        {
            $('.BringForwardPercentage').show();
            $('.LeaveRoundUp').show();
            $(BringForwardDaysElement).val('')
            $('.BringForwardDays').hide()
        }

        else {
            $('.BringForwardDays').hide();
            $('.BringForwardPercentage').hide();
            $('.LeaveRoundUp').hide();
        }

    }


    protected save_submitHandler(response): void
    {
        const CarryForwardMethod = parseInt(this.form.LeaveBringForwardMethod.value);
        if (this.form.BringForwardPercentage.value < 0 && CarryForwardMethod == 6)
        {
            alertDialog('The carry forward percentage must be greater than 0')
            return
        }
        function checkRangeClash(name:string,start: number[], end: number[]): boolean {
            for (let i = 0; i < start.length; i++) {
                for (let j = i + 1; j < start.length; j++) {
                    if ((start[i] >= start[j] && start[i] <= end[j]) ||
                        (end[i] >= start[j] && end[i] <= end[j]) ||
                        (start[j] <= start[i] && end[j] >= end[i])) {
                        alertDialog('interval overlapping in ' + start[i] + ' until ' + end[i] + ' and ' + start[j] + ' until ' + end[j] +' at '+name)

                        return true; // Clash found
                    }
                }
            }
            return false; // No clash
        }
        var AnnualLeavePolicyList = this.form.PolicyList.value
        this.StartingRange = []
        this.EndingRange = []
        for (var index in AnnualLeavePolicyList)
        {this.StartingRange.push(AnnualLeavePolicyList[index].ServiceFromYear)
            this.EndingRange.push(AnnualLeavePolicyList[index].ServiceUntilYear)}
        if (checkRangeClash("Annual Leave",this.StartingRange, this.EndingRange) == true)
            return
        var SickLeavePolicyList = this.form.SickLeavePolicyList.value
        this.StartingRange = []
        this.EndingRange = []
        for (var index in SickLeavePolicyList) {
            this.StartingRange.push(SickLeavePolicyList[index].ServiceFromYear)
            this.EndingRange.push(SickLeavePolicyList[index].ServiceUntilYear)
        }
        if (checkRangeClash("Sick Leave", this.StartingRange, this.EndingRange) == true) 
            return
        for (var index in this.AlreadyInitYear)
        {
            if (this.AlreadyInitYear[index] == this.form.Year.value)
            {
                alertDialog('the working calendar for' + this.form.Year.value + ' has already been completed')
                return
            }
        }
        if (this.check_job_grade_annual_leave == 1)
        {
            let dynamicList: number[] = []; // Initialize an empty array
            for (var index in this.form.AnnulLeaveBasedOnJobGrade)
                dynamicList.push(this.form.AnnulLeaveBasedOnJobGrade[index].JobGradeLevel)
            function hasDuplicates(array: number[]): boolean {
                let encountered: { [key: number]: boolean } = {};

                for (let num of array) {
                    if (encountered[num]) {
                        // If the number is already encountered, return true
                        return true;
                    } else {
                        // Mark the number as encountered
                        encountered[num] = true;
                    }
                }

                // If no duplicates found, return false
                return false;
            }
            if (hasDuplicates(dynamicList)) {
                alertDialog('Annual Leave Entitlement Based on job grade have duplicated job grade records')
                return
            }
            if (this.JobGradeList.length != dynamicList.length)
            {
                alertDialog('Please assign annual leaves for all currently existing JobGrade')
                return
            }
        }

         super.save_submitHandler(response)

            /*
            serviceCall<RetrieveResponse<any>>({
            service: AnnualLeavePolicyService.baseUrl + '/ListAnnualLeavePolicy',
            data: {

            },
            method: "GET",
            async: false,
            onSuccess: (response) => {
             
                
                for (var x in AnnualLeavePolicy)
                {
                    var FromYear = AnnualLeavePolicy[x].ServiceFromYear
                    var Until = AnnualLeavePolicy[x].ServiceUntilYear
                    var interval1: number[] = generateRange(FromYear, Until);
                    console.log(FromYear)
                    console.log(Until)
                    for (var index in this.StartingRange)
                    {
                        var StartingNumber = this.StartingRange[index]
                        var EndingNumber = this.EndingRange[index]
                        var interval2: number[] = generateRange(StartingNumber, EndingNumber);
                        console.log(interval1, interval2)
                        if (checkOverlap(interval1, interval2))
                        {
                            alertDialog('interval overlapping in ' + FromYear + ' until ' + Until)
                            return
                        }
                    }
                }
                
                console.log(response)
            },
            onError: (error) => {
                console.log(error.Error);
            }
        });
        */

       // super.save_submitHandler(response)


    }


    /*
    protected onSaveSuccess(response): void {


            super.onSaveSuccess(response);

        for (var index in this.form.PolicyList.value) {
            var RowID = this.form.PolicyList.value[index].Id
            AnnualLeavePolicyService.Update({
                EntityId: RowID,
                Entity:
                {
                    "Year": this.form.Year.value
                },
            });


        }

        for (var index in this.form.SickLeavePolicyList.value) {
            var RowID = this.form.SickLeavePolicyList.value[index].Id

            SickLeavePolicyService.Update({
                EntityId: RowID,
                Entity:
                {
                    "Year": this.form.Year.value
                },
            });
        }
        for (var index in this.form.AnnulLeaveBasedOnJobGrade.value) {
            var RowID = this.form.AnnulLeaveBasedOnJobGrade.value[index].Id
            AnnualLeaveJobGradePolicyService.Update({
                EntityId: RowID,
                Entity:
                {
                    "Year": this.form.Year.value
                },
            });
        }
    }
    */
    /*
    protected onDialogClose()
    {
        for (var index in this.form.PolicyList.value)
        {
            var RowID = this.form.PolicyList.value[index].Id
            AnnualLeavePolicyService.Update({
                EntityId: RowID,
                Entity:
                {
                    "Year": this.form.Year.value
                },
            });
        }
        for (var index in this.form.SickLeavePolicyList.value) {
            var RowID = this.form.SickLeavePolicyList.value[index].Id
            SickLeavePolicyService.Update({
                EntityId: RowID,
                Entity:
                {
                    "Year": this.form.Year.value
                },
            });
        }
        for (var index in this.form.AnnulLeaveBasedOnJobGrade.value) {
            var RowID = this.form.AnnulLeaveBasedOnJobGrade.value[index].Id
            AnnualLeaveJobGradePolicyService.Update({
                EntityId: RowID,
                Entity:
                {
                    "Year": this.form.Year.value
                },
            });
        }
        super.onDialogClose()
    }
    */

    protected afterLoadEntity()
    {
        super.afterLoadEntity();
    }
}