import { Authorization, Decorators, EditorUtils, EntityDialog, SaveResponse, Select2Editor } from '@serenity-is/corelib';
import { ShiftForm, ShiftRow, ShiftService } from '../../../ServerTypes/Shift';
import { alertDialog, RetrieveResponse, serviceCall } from '@serenity-is/corelib/q';
import 'toolcool-color-picker';
import { userDefinition } from '../../../Administration/User/Authentication/Authorization';
import * as Q from "@serenity-is/corelib/q";
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { confirm } from '@serenity-is/corelib/q';
import { isEmptyOrNull } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.Shift.ShiftDialog')
export class ShiftDialog extends EntityDialog<ShiftRow, any> { 
    protected getFormKey() { return ShiftForm.formKey; }
    protected getRowDefinition() { return ShiftRow; }
    protected getService() { return ShiftService.baseUrl; }


    protected form = new ShiftForm(this.idPrefix);
    public list_of_shift: string[] = [];
    public ColorCode: string;
    public ShiftString: string;
    public view: boolean;

    constructor() {
        super();
        let DaysArray: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

        // Create link element for CSS
        var linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://cdn.jsdelivr.net/npm/clocklet/css/clocklet.min.css';

        // Create script element for JavaScript
        var scriptElement = document.createElement('script');
        scriptElement.src = 'https://cdn.jsdelivr.net/npm/clocklet';

        // Append link and script elements to the head of the document
        document.head.appendChild(linkElement);
        document.head.appendChild(scriptElement);
        for (var x in DaysArray) {
            //var WorkingTimeElement = '.' + DaysArray[x] + 'WorkingTime'
            var StartClocklet = document.getElementById(this.idPrefix + DaysArray[x] + 'StartingFrom')
            StartClocklet.setAttribute('data-clocklet', '');
            StartClocklet.addEventListener("clocklet.opening", function (event) {
                var myClocklet = document.getElementById(this.id) as HTMLElement;
                if (myClocklet)
                    myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
            });
            StartClocklet.addEventListener("clocklet.closed", function (event) {
            });
            var EndingClocklet = document.getElementById(this.idPrefix + DaysArray[x] + 'EndingAt')
            EndingClocklet.setAttribute('data-clocklet', '');
            EndingClocklet.addEventListener("clocklet.opening", function (event) {
                var myClocklet = document.getElementById(this.id) as HTMLElement;
                if (myClocklet)
                    myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
            });
            EndingClocklet.addEventListener("clocklet.closed", function (event) {
            });





            var LunchTimeStartClocklet = document.getElementById(this.idPrefix + DaysArray[x] + 'LunchTimeStartingFrom')
            LunchTimeStartClocklet.setAttribute('data-clocklet', '');
            LunchTimeStartClocklet.addEventListener("clocklet.opening", function (event) {
                var myClocklet = document.getElementById(this.id) as HTMLElement;
                if (myClocklet)
                    myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
            });
            LunchTimeStartClocklet.addEventListener("clocklet.closed", function (event) {
            });
            var LunchTimeEndingClocklet = document.getElementById(this.idPrefix + DaysArray[x] + 'LunchTimeEndingAt')
            LunchTimeEndingClocklet.setAttribute('data-clocklet', '');
            LunchTimeEndingClocklet.addEventListener("clocklet.opening", function (event) {

                var myClocklet = document.getElementById(this.id) as HTMLElement;

                if (myClocklet) {
                    myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
                }

            });
            LunchTimeEndingClocklet.addEventListener("clocklet.closed", function (event) {
            });
            $('.' + DaysArray[x] + 'LunchTimeStartingFrom').hide();
            $('.' + DaysArray[x] + 'LunchTimeEndingAt').hide();
            $('.' + DaysArray[x] + 'WorkingTime').hide();
        }

      
    }

    public dialogOpen(asPanel?: boolean): void {
        super.dialogOpen(asPanel);
        var self = this
        let DaysArray: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        var ShiftColorElement = document.getElementById(`${this.idPrefix}ShiftColor`)
        ShiftColorElement.setAttribute("class", "color-picker");
        var ColorChoser = document.createElement('toolcool-color-picker');
        // Set the id attribute
        ColorChoser.setAttribute('id', 'color-picker-1');
        // Set the color attribute
        ColorChoser.addEventListener('change', (evt: Event) => {
            const customEvent = evt as CustomEvent;
            self.form.ShiftColor.value = customEvent.detail.hex
            let hexColor = self.form.ShiftColor.value
            let red = parseInt(hexColor.substring(1, 3), 16);
            let green = parseInt(hexColor.substring(3, 5), 16);
            let blue = parseInt(hexColor.substring(5), 16);
            ShiftColorElement.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        });
        ShiftColorElement.after(ColorChoser)

        
        if (this.isNew() == false) {
            var TypeOfShiftElement = document.getElementById(this.idPrefix + 'TypeOfShift')
            var original_val = $(TypeOfShiftElement).val()

            let TypeOfShiftEditor = new Select2Editor($(TypeOfShiftElement))
            TypeOfShiftEditor.addItem({ id: (0).toString(), text: ('Fixed Time').toString(), }); // 8am - 6pm , will consider lates
            TypeOfShiftEditor.addItem({ id: (1).toString(), text: ('Fixed Time Flexible Hours').toString(), }); // 7am - 7pm , 8hour, no consider lates
            TypeOfShiftEditor.addItem({ id: (2).toString(), text: ('Flexible Hours').toString(), });

            $(TypeOfShiftElement).val(original_val.toString()).trigger('change');
            
            this.form.ShiftColor.value = ''
            let ElementsArray: string[] = ['StartingFrom', 'EndingAt', 'WorkingTime', 'LunchTimeStartingFrom', 'LunchTimeEndingAt']
            
            for (var index in DaysArray) {
                /*
                for (var x in ElementsArray) { 
                    var ElementString = DaysArray[index] + ElementsArray[x]
                    var ElementValue = this.form[ElementString]?.value
                    if (isEmptyOrNull(ElementValue)) {
                        $('.' + ElementString).parent().hide();
                    }
                }
                */
                var ElementString = DaysArray[index] + "WorkingTime"
                var ElementValue = this.form[ElementString]?.value
                if (original_val == 0)
                    $('.' + ElementString).hide();//.DaysArray[x]WorkingTime
            }
            
        }

        else if(this.isNew() == true)
        {            
            CompanySettingsService.List({
            }, response => {

                var TypeOfShiftElement = document.getElementById(this.idPrefix + 'TypeOfShift')

                let TypeOfShiftEditor = new Select2Editor($(TypeOfShiftElement))



                if (response.Entities[0].FixedHour == true)
                    TypeOfShiftEditor.addItem({ id: (0).toString(), text: ('Fixed Time').toString(), }); // 8am - 6pm , will consider lates

                if (response.Entities[0].FixedHourFlexiTime == true)
                    TypeOfShiftEditor.addItem({ id: (1).toString(), text: ('Fixed Time Flexible Hours').toString(), }); // 7am - 7pm , 8hour, no consider lates

                if (response.Entities[0].FixedTime == true)
                    TypeOfShiftEditor.addItem({ id: (2).toString(), text: ('Flexible Hours').toString(), });//from 0 until 24 anytime u want, X working hours

                var IdPrefix = this.idPrefix
                var Element
                for (var index in DaysArray) {
                     Element = document.getElementById(IdPrefix + DaysArray[index] + 'WorkingTime')
                    $(Element).val('(Minutes)')
                    $(Element).on("blur", function () {
                        // If input is empty, set default text
                        if ($(this).val() == '') {
                            $(this).val("(Minutes)");
                            $(this).css({
                                "color": "grey" // Set text color to grey
                            });
                        }
                    });
                    // Clear default text when input is focused
                    $(Element).on("focus", function () {
                        if ($(this).val() == "(Minutes)") {
                            $(this).val('');
                            $(this).css({
                                "color": "black" // Set text color to grey
                            });
                        }
                    });
                    if ($(Element).val() != ''
                        && $(Element).val() != "(Minutes)")
                        $(Element).css({
                            "color": "black" // Set text color to grey
                        });
                    else
                        $(Element).css({
                            "color": "grey" // Set text color to grey
                        });

                    $(Element).on("change", function () {
                        if ($(this).val() != '' && $(this).val() != "(Minutes)")
                            $(this).css("color", "black");
                        else
                            $(this).css("color", "grey");

                    });

                }
                $(TypeOfShiftElement).on('change', async function () {


               

                    if ($(TypeOfShiftElement).val() == 1 || $(TypeOfShiftElement).val() == 2)
                    {
                        for (var index in DaysArray) {
                            $('.' + DaysArray[index] + 'LunchTimeStartingFrom').hide();
                            $('.' + DaysArray[index] + 'LunchTimeEndingAt').hide();
                            $('.' + DaysArray[index] + 'StartingFrom').show();//.DaysArray[x]WorkingTime
                            $('.' + DaysArray[index] + 'EndingAt').show();//.DaysArray[x]WorkingTime
                            $('.' + DaysArray[index] + 'WorkingTime').show();//.DaysArray[x]WorkingTime
                        }
                        if ($(TypeOfShiftElement).val() == 2) {
                            for (var index in DaysArray) {
                                $('.' + DaysArray[index] + 'StartingFrom').hide();//.DaysArray[x]WorkingTime
                                $('.' + DaysArray[index] + 'EndingAt').hide();//.DaysArray[x]WorkingTime
                            }
                        }
                    }
                    else if ($(TypeOfShiftElement).val() == 0) {
                        for (var index in DaysArray) {
                            $('.' + DaysArray[index] + 'WorkingTime').hide();//.DaysArray[x]WorkingTime
                            $('.' + DaysArray[index] + 'LunchTimeStartingFrom').show();
                            $('.' + DaysArray[index] + 'LunchTimeEndingAt').show();
                        }
                    }
                })
            });

            for (var x in DaysArray)
            {
                //var WorkingTimeElement = '.' + DaysArray[x] + 'WorkingTime'
                var StartClocklet = document.getElementById(this.idPrefix + DaysArray[x]+ 'StartingFrom')
                StartClocklet.setAttribute('data-clocklet', '');
                StartClocklet.addEventListener("clocklet.opening", function (event) {
                    var myClocklet = document.getElementById(this.id) as HTMLElement;
                    if (myClocklet)
                        myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
                });
                StartClocklet.addEventListener("clocklet.closed", function (event) {
                });
                var EndingClocklet = document.getElementById(this.idPrefix + DaysArray[x] + 'EndingAt')
                EndingClocklet.setAttribute('data-clocklet', '');
                EndingClocklet.addEventListener("clocklet.opening", function (event) {
                    var myClocklet = document.getElementById(this.id) as HTMLElement;
                    if (myClocklet) 
                        myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
                });
                EndingClocklet.addEventListener("clocklet.closed", function (event) {
                });





                var LunchTimeStartClocklet = document.getElementById(this.idPrefix + DaysArray[x] + 'LunchTimeStartingFrom')
                LunchTimeStartClocklet.setAttribute('data-clocklet', '');
                LunchTimeStartClocklet.addEventListener("clocklet.opening", function (event) {
                    var myClocklet = document.getElementById(this.id) as HTMLElement;
                    if (myClocklet)
                        myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
                });
                LunchTimeStartClocklet.addEventListener("clocklet.closed", function (event) {
                });
                var LunchTimeEndingClocklet = document.getElementById(this.idPrefix + DaysArray[x] + 'LunchTimeEndingAt')
                LunchTimeEndingClocklet.setAttribute('data-clocklet', '');
                LunchTimeEndingClocklet.addEventListener("clocklet.opening", function (event) {

                    var myClocklet = document.getElementById(this.id) as HTMLElement;

                    if (myClocklet) {
                        myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
                    }

                });
                LunchTimeEndingClocklet.addEventListener("clocklet.closed", function (event) {
                });
                $('.' + DaysArray[x] + 'LunchTimeStartingFrom').hide();
                $('.' + DaysArray[x] + 'LunchTimeEndingAt').hide();
                $('.' + DaysArray[x] + 'WorkingTime').hide();
            }

            EditorUtils.setReadonly(this.form.ShiftColor.element, true);
           }
    }






    protected onSaveSuccess(response: SaveResponse): void {

        super.onSaveSuccess(response);

    }


    protected save_submitHandler(response): void {
        function abs(num: number): number {
            return num < 0 ? -num : num;
        }
        let DaysList: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        var Element;



        if (this.form.TypeOfShift.value == 1)//fixed hour flexi time
        {

            for (let item of DaysList) {
                var WorkingTimeBuffer = item + 'WorkingTime'
                var WorkingTimeValue = this.form[WorkingTimeBuffer]?.value

                var StartingFromBuffer = item + 'StartingFrom'
                var StartingFromValue = this.form[StartingFromBuffer]?.value

                var EndingAtBuffer = item + 'EndingAt'
                var EndingAtValue = this.form[EndingAtBuffer]?.value

                if ((StartingFromValue != '' && EndingAtValue == '') || (StartingFromValue == '' && EndingAtValue != ''))//ending at/starting from have value
                {
                    if (StartingFromValue == '') {
                        alertDialog(item + ' Starting From'+ item + ' is empty');
                        return
                    }
                    else if (EndingAtValue == '') {
                        alertDialog(item + ' Ending At ' + item + ' is empty');
                        return
                    }
                }

                // Split the strings into hours and minutes
                const startTimeParts: string[] = StartingFromValue.split(':');
                const endTimeParts: string[] = EndingAtValue.split(':');

                // Convert the parts into numbers
                const startHours: number = parseInt(startTimeParts[0], 10);
                const startMinutes: number = parseInt(startTimeParts[1], 10);
                const endHours: number = parseInt(endTimeParts[0], 10);
                const endMinutes: number = parseInt(endTimeParts[1], 10);
                var timediff = abs(endHours - startHours)*60 + abs(endMinutes - startMinutes) 


                if (WorkingTimeValue > timediff) {
                    alertDialog(item + ' Working Time is greater than End Time and Start Time');
                    return
                }



            }
        }


        else if (this.form.TypeOfShift.value == 0) {
            
            for (let item of DaysList) {
                var WorkingTimeBuffer = item + 'LunchTimeStartingFrom'
                var LunchTimeStarting = this.form[WorkingTimeBuffer]?.value
                var WorkingTimeBuffer = item + 'LunchTimeEndingAt'
                var LunchTimeEnding = this.form[WorkingTimeBuffer]?.value
                var StartingFromBuffer = item + 'StartingFrom'
                var StartingFromValue = this.form[StartingFromBuffer]?.value
                var EndingAtBuffer = item + 'EndingAt'
                var EndingAtValue = this.form[EndingAtBuffer]?.value
                if ((StartingFromValue != '' && EndingAtValue == '') || (StartingFromValue == '' && EndingAtValue != ''))//ending at/starting from have value
                {
                    if (StartingFromValue == '') {
                        alertDialog(item + ' Starting From ' + item + ' is empty');
                        return
                    }
                    else if (EndingAtValue == '') {
                        alertDialog(item + ' Ending At ' + item + ' is empty');
                        return
                    }
                }

                if ((LunchTimeStarting != '' && LunchTimeEnding == '') || (LunchTimeStarting == '' && LunchTimeEnding != ''))//ending at/starting from have value
                {
                    if (LunchTimeStarting == '') {
                        alertDialog(item + 'Lunch Time Starting ' + item + ' is empty');
                        return
                    }
                    else if (LunchTimeEnding == '') {
                        alertDialog(item + 'Lunch Time Ending ' + item + ' is empty');
                        return
                    }
                }





            }
            
        }

       // confirm("Once the shift pattern is created, it cannot be edited", () => {



       // });
        /*
        for (var index in DaysList) {
            Element = document.getElementById(this.idPrefix + DaysList[index] + 'WorkingTime')
            if ($(Element).val() == '' || $(Element).val() == null) 
                $(Element).val('(Minutes)')
        }
        */
        super.save_submitHandler(response);
        

        /*
        for (var index in dynamicList) {
            Element = document.getElementById(this.idPrefix + dynamicList[index] + 'WorkingTime')
          $(Element).val('(Minutes)')
        }
        */
        



    }



    }