import {  Criteria, Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { EmployeeAllowanceRow, EmployeeAllowanceService, EmployeeProfileService, EmployeeType, FixedDeductionRow, FixedDeductionService } from '../../ServerTypes/EmployeeProfile';
import { EisSubjectionService, EmployerContributionsRow, EpfSubjectionService, HrdfSubjectionService, NoPaidLeaveRow, NoPaidLeaveService, PayrollDeductionsRow, PayrollEarningsRow, PayrollForm, PayrollRow, PayrollService, PcbSubjectionService, SocsoSubjectionService } from '../../ServerTypes/PayrollSettings';
import { ListResponse, serviceCall, Authorization } from '@serenity-is/corelib/q';
import { OTApplicationRow, OTApplicationService } from '../../ServerTypes/OTApplication';
import { alertDialog, isEmptyOrNull } from '@serenity-is/corelib/q';
import { MoneyClaimApplicationRow, MoneyClaimApplicationService } from '../../ServerTypes/MoneyClaimApplication';
import { data } from 'jquery';
import { EmployeeEarlyLeavingRow, EmployeeEarlyLeavingService } from '../../ServerTypes/EmployeeEarlyLeaving';
import { CompanySettingsService } from '../../ServerTypes/CompanySettings';
import { EmployeeLateRow, EmployeeLateService } from '../../ServerTypes/EmployeeLate';
import { LeaveApplicationRow, LeaveApplicationService } from '../../ServerTypes/LeaveApplication';
import { confirmDialog, confirm, notifySuccess, notifyError, notifyInfo } from '@serenity-is/corelib/q';
import { PermissionKeys } from '../../ServerTypes/Administration';
import { AnnouncementWizardService } from '../../ServerTypes/Announcement';

export interface Subjection {
    id: number;
    name: string;
    subjection: number;
}
/*
subjection format
(X,X,X,X)
(EPF,EIS,HRDF,SOCSO)
Example:(0,1,1,0)
The external earning subjected to eis and socso
*/
@Decorators.registerClass('HRMSoftware.PayrollSettings.PayrollDialog')
export class PayrollDialog extends EntityDialog<PayrollRow, any> {
    protected getFormKey() { return PayrollForm.formKey; }
    protected getRowDefinition() { return PayrollRow; }
    protected getService() { return PayrollService.baseUrl; }

    protected form = new PayrollForm(this.idPrefix);
    public ExternalEarnings: string[] = [];
    public ExternalDeductions: string[] = [];
    public ExternalEarning: string;
    public ExternalDeduction: string;
    public EarningsString: string[] = []
    public DeductionsString: string[] = []
    public FinalEarnings: string[] = []
    public FinalDeductions: string[] = []
    public EmployerContributions: string[] = []


    public EmployeeType: number; // check whether local or not
    public EpfSubjection: number;

    public NettDeductions: number;
    public NettEarnings: number;
    public NettEmployerContributions: number;

    public EmployeeRowId: number;

    public ListOfEpfSubjection: Subjection[] = [];
    public ListOfEisSubjection: Subjection[] = [];
    public ListOfHrdfSubjection: Subjection[] = [];
    public ListOfSocsoSubjection: Subjection[] = [];
    public ListOfPcbSubjection: Subjection[] = [];

    public EpfAmount: number;
    public EisAmount: number;
    public PcbAmount: number;
    public SocsoAmount: number;
    public HrdfAmount: number;


    public EmployeeEpf: number;
    public EmployeeEis: number;
    public EmployeePcb: number;
    public EmployeeSocso: number;



    public EmployerEpf: number;
    public EmployerEis: number;
    public EmployerSocso: number;
    public EmployerHrdf: number;


    public ListOfCriteria: string[] = [];



    public NoPaidLeaveId: number[] = [];
    public MoneyClaimingId: number[] = [];
    public OtPayId: number[] = [];
    public LateArrivalId: number[] = [];
    public EarlyLeavingId: number[] = [];




    public ReadOnly: boolean;
    public PayDate: number;

    public DeductEarlyLeaving: boolean;
    public DeductLateArrival: boolean;

    public listOfDicts: Item[] = [];
    public starter: any;
    public ender: any;
    public dateString: string;
    public OneTimeAllowanceId: number[] = [];
    public OneTimeDeductionId: number[] = [];


    constructor() {
        super();
        this.starter = 0x88
        this.ender = 0x99

        this.ReadOnly = false
        if (Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is HR guy 
        {
            PcbSubjectionService.List({
            }, response => {
                for (var index in response.Entities) {
                    if (response.Entities[index].IsActive == 1) {
                        var dict = response.Entities[index]
                        var keys = Object.keys(dict);
                        for (var j = 0; j < keys.length; j++) {
                            var key = keys[j];
                            if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                                continue
                            if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                                continue
                            var NewKey = key.replace(/([A-Z])/g, ' $1').trim();
                            // Access each key here
                            this.ListOfPcbSubjection.push({
                                id: j,
                                name: NewKey,
                                subjection: dict[key],
                            })
                        }
                        break
                    }
                }

            });
            EpfSubjectionService.List({
            }, response => {
                for (var index in response.Entities) {
                    if (response.Entities[index].IsActive == 1) {
                        var dict = response.Entities[index]
                        var keys = Object.keys(dict);
                        for (var j = 0; j < keys.length; j++) {
                            var key = keys[j];
                            if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                                continue
                            if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                                continue
                            var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

                            // Access each key here
                            this.ListOfEpfSubjection.push({
                                id: j,
                                name: NewKey,
                                subjection: dict[key],
                            })
                        }
                        break
                    }
                }

                var BufferDict = this.ListOfEpfSubjection
                var keys = Object.keys(BufferDict);

                for (var j = 0; j < keys.length; j++) {
                    var key = keys[j];
                    this.ListOfCriteria.push(BufferDict[key].name)
                }

            });
            EisSubjectionService.List({
            }, response => {
                for (var index in response.Entities) {
                    if (response.Entities[index].IsActive == 1) {
                        var dict = response.Entities[index]
                        var keys = Object.keys(dict);

                        for (var j = 0; j < keys.length; j++) {
                            var key = keys[j];
                            if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                                continue
                            if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                                continue
                            // Access each key here
                            var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

                            this.ListOfEisSubjection.push({
                                id: j,
                                name: NewKey,
                                subjection: dict[key],
                            })
                        }
                        break
                    }
                }

            });
            HrdfSubjectionService.List({
            }, response => {
                for (var index in response.Entities) {
                    if (response.Entities[index].IsActive == 1) {
                        var dict = response.Entities[index]
                        var keys = Object.keys(dict);
                        for (var j = 0; j < keys.length; j++) {
                            var key = keys[j];
                            if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                                continue
                            if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                                continue
                            // Access each key here
                            var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

                            this.ListOfHrdfSubjection.push({
                                id: j,
                                name: NewKey,
                                subjection: dict[key],
                            })
                        }
                        break
                    }
                }

            });
            SocsoSubjectionService.List({
            }, response => {
                for (var index in response.Entities) {
                    if (response.Entities[index].IsActive == 1) {
                        var dict = response.Entities[index]
                        var keys = Object.keys(dict);
                        for (var j = 0; j < keys.length; j++) {
                            var key = keys[j];
                            if (key.toLowerCase() == 'id' || key.toLowerCase() == 'isactive')
                                continue

                            if (dict[key] != true && dict[key] != false && dict[key] !== undefined)
                                continue

                            // Access each key here
                            var NewKey = key.replace(/([A-Z])/g, ' $1').trim();

                            this.ListOfSocsoSubjection.push({
                                id: j,
                                name: NewKey,
                                subjection: dict[key],
                            })
                        }
                        break
                    }
                }
            });

        } 
        }
    public dialogClose(): void {

        $("#NewEarningsCategory").remove();
        super.dialogClose()
    }
    public onDialogClose(): void {

        $("#NewEarningsCategory").remove();
        super.onDialogClose()
    }
    protected getDialogOptions() {
        let opt = super.getDialogOptions()
        opt.width = opt.width + 200
        return opt
    }
    public dialogOpen(asPanel?: boolean): void {
        

        $('.PaidOtList').hide()
        $('.PaidMoneyClaimingList').hide()
        $('.OneTimeAllowanceList').hide()

        $('.DeductedLateArrivalList').hide()
        $('.DeductedNoPaidLeaveList').hide()
        $('.DeductedEarlyLeavingList').hide()
        $('.OneTimeDeductionList').hide()
        function isValidDate(dateStr: string): string {
            const date = new Date(dateStr);
            if (!isNaN(date.getTime()))// not valid
            {
                date.setDate(28)
                const year = date.getFullYear();
                const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero based
                const day = ('0' + date.getDate()).slice(-2);
                return `${year}-${month}-${day}`
            }
            else
                return dateStr
        }
        var self = this
        var gettingDatestring = true
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

        CompanySettingsService.List({
        }, response => {
         
            for (var index in response.Entities) {
                if (response.Entities[index].IsActive == 1) {
                    this.DeductEarlyLeaving = response.Entities[index].DeductSalaryIfEarlyLeaving
                    this.DeductLateArrival = response.Entities[index].DeductSalaryIfLate
                    this.PayDate = response.Entities[index].PayDay
                    break
                }
            }
            var today = new Date(self.dateString)
            var todayMonth = today.getMonth()
            var todayYear = today.getFullYear()
            var dateFormat = todayYear.toString() + '-' + todayMonth.toString().padStart(2, '0') + '-' + this.PayDate.toString().padStart(2, '0')
            dateFormat = isValidDate(dateFormat)
            var DateObj = new Date(todayYear, todayMonth, this.PayDate)
            var DateObjYear = DateObj.getFullYear().toString()
            var DateObjMonth = (DateObj.getMonth() + 1).toString()
            var DateObjDay = DateObj.getDate().toString()


            var LastMonth = new Date(todayYear, todayMonth, this.PayDate)
            LastMonth.setMonth(LastMonth.getMonth() - 1);
            LastMonth.setDate(LastMonth.getDate() - 1);
            var LastMonthObjYear = LastMonth.getFullYear().toString()
            var LastMonthObjMonth = (LastMonth.getMonth() + 1).toString()
            var LastMonthObjDay = LastMonth.getDate().toString()

            var LatestDateFormat = DateObjMonth.padStart(2, '0') + '/' + DateObjDay.padStart(2, '0') + '/' + DateObjYear
            var LastMonthFormat = LastMonthObjMonth.padStart(2, '0') + '/' + LastMonthObjDay.padStart(2, '0') + '/' + LastMonthObjYear

            if (this.isNew()) {
                self.form.PayDate.value = LatestDateFormat
                self.form.PayPeriodEnd.value = LatestDateFormat
                self.form.PayPeriodStart.value = LastMonthFormat
            }

            var dropdown = $("#NewEarningsCategory")
            var NewDropDown = document.createElement('select')
            NewDropDown.id = 'NewEarningsCategory'
            dropdown.empty()
            var BufferDict = this.ListOfEpfSubjection
            var keys = Object.keys(BufferDict);
            for (var j = 0; j < keys.length; j++) {
                var key = keys[j];
                var option = new Option((BufferDict[key].name).toString(), (BufferDict[key].id).toString());
                NewDropDown.append(option);
            }
            $(NewDropDown).trigger('change');
            dropdown.replaceWith(NewDropDown);
            dropdown.select()
        });
        super.dialogOpen(asPanel);
        if (self.isNew() == false)
            self.saveAndCloseButton.hide()

        if (self.isNew())
        this.applyChangesButton.hide()
        EditorUtils.setReadonly(this.form.EmployeeName.element, true);
        var EmployeeRowIdValue = this.form.EmployeeRowId.value
        let ElementsArray: string[] = ['Deduction', 'Earnings', 'Nett', 'EmployeeEIS', 'EmployeeEPF', 'EmployeeSOCSO', 'EmployeePCB', 'PayrollTable', 'EmployerTable', 'EmployerHRDF', 'EmployerEPF', 'EmployerEIS', 'EmployerSOCSO']
        for (var index in ElementsArray)
            $('.' + ElementsArray[index]).hide();
        var tabId = $(".fieldset").children().attr('id');
        var ta = $(".fieldset").children().uniqueId()
        tabId = this.idPrefix + "PropertyGrid"
        var node3 = document.getElementById(tabId);
        var divNode = document.createElement('DIV')
        divNode.classList.add('category-title')
        divNode.setAttribute("id", "PayRoll-Description")
        divNode.style.display = 'flex'; // Make the container a flex container to display tables side by side
        node3.appendChild(divNode)
        var node4 = document.createElement("a");
        node4.classList.add("category-anchor");
        var textnode = document.createTextNode("Employee Payroll");
        node4.appendChild(textnode);
        document.getElementById("PayRoll-Description").append(node4);
        var node5 = document.getElementById("PayRoll-Description");
        node5.insertAdjacentHTML('afterend', '<div class="DataGrid" id="PayRollGrid"></div>');
        var PayRollGrid = document.getElementById("PayRollGrid");
        PayRollGrid.style.display = 'flex'; // Make the container a flex container to display tables side by side

        var TableNode = document.createElement('TABLE');
        TableNode.style.width = "66%";
        TableNode.id = 'PayrollTable'
        TableNode.className = 'table'

        var TableHead = document.createElement('thead');
        TableHead.className = "thead-dark"
        TableHead.id = 'PayrollTableHeader'

        var TableBody = document.createElement('tbody')
        TableBody.id = 'PayrollTableBody'

        var theadnode = document.createElement('tr')
        var TableFoot = document.createElement('tfoot')
        TableFoot.id = 'PayrollTableFoot'




        var header1 = document.createElement('TH');
        var header2 = document.createElement('TH');
        var header3 = document.createElement('TH');
        var header4 = document.createElement('TH');
        header1.style.width = "25%";
        header2.style.width = "25%";
        header3.style.width = "25%";
        header4.style.width = "25%";
        var textnode1 = document.createTextNode("Description");
        var textnode2 = document.createTextNode("Earnings");
        var textnode3 = document.createTextNode("Description");
        var textnode4 = document.createTextNode("Deductions");
        header1.appendChild(textnode1);
        header2.appendChild(textnode2);
        header3.appendChild(textnode3);
        header4.appendChild(textnode4);

        var EmployerContributionsNode = document.createElement('TABLE');
        //EmployerContributionsNode.style.width = "33%";
        EmployerContributionsNode.style.height = "55%";
        EmployerContributionsNode.id = 'EmployerContributionsTable'

        var EmployerContributionsTableHead = document.createElement('thead');
        EmployerContributionsTableHead.className = "thead-dark"
        EmployerContributionsTableHead.id = 'EmployerContributionsHeader'

        var EmployerContributionsTableBody = document.createElement('tbody')
        EmployerContributionsTableBody.id = 'EmployerContributionsBody'

        var EmployerContributionsTableFoot = document.createElement('tfoot')
        EmployerContributionsTableFoot.id = 'EmployerContributionsFoot'






        var EmployerContributionsDescriptionNode = document.createElement('TR');
        var EmployerContributionsHeader1 = document.createElement('TH');
        var EmployerContributionsHeader2 = document.createElement('TH');

        EmployerContributionsHeader1.style.width = "50%";
        EmployerContributionsHeader2.style.width = "50%";
        var EmployerContributionstextnode1 = document.createTextNode("Description");
        var EmployerContributionstextnode2 = document.createTextNode("Employer Contributions");
        EmployerContributionsHeader1.appendChild(EmployerContributionstextnode1);
        EmployerContributionsHeader2.appendChild(EmployerContributionstextnode2);
      

        theadnode.appendChild(header1)
        theadnode.appendChild(header2)
        theadnode.appendChild(header3)
        theadnode.appendChild(header4)

        TableHead.appendChild(theadnode)
        TableNode.appendChild(TableHead)
        TableNode.appendChild(TableBody)
        TableNode.appendChild(TableFoot)

        EmployerContributionsDescriptionNode.appendChild(EmployerContributionsHeader1)
        EmployerContributionsDescriptionNode.appendChild(EmployerContributionsHeader2)
        EmployerContributionsTableHead.appendChild(EmployerContributionsDescriptionNode)


        EmployerContributionsNode.appendChild(EmployerContributionsTableHead)
        EmployerContributionsNode.appendChild(EmployerContributionsTableBody)
        EmployerContributionsNode.appendChild(EmployerContributionsTableFoot)

        document.getElementById("PayRollGrid").append(TableNode);



        document.getElementById("PayRollGrid").append(EmployerContributionsNode);

        var div1 = document.createElement('div')
        div1.className='col-md-4'
        var div2 = document.createElement('div')
        div2.className = 'col-md-4'
        var div3 = document.createElement('div')
        div3.className = 'col-md-4'
        document.getElementById("PayRollGrid").append(EmployerContributionsNode);
        document.getElementById("PayRollGrid").append(div1);
        document.getElementById("PayRollGrid").append(div2);
        document.getElementById("PayRollGrid").append(div3);

        var self = this

        EmployeeProfileService.List({
        }, response => {
            var PayPeriodStartElement = document.getElementById(this.idPrefix + 'PayPeriodStart')
            var PayPeriodEndElement = document.getElementById(this.idPrefix + 'PayPeriodEnd')

            var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
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
            for (let i = 0; i < months.length; i++) {
                PayMonthEditor.addItem({ id: (i).toString(), text: (months[i]).toString(), }); // 8am - 6pm , will consider lates
            }
            if (self.isNew())
            PayMonthEditor.set_value(todayMonth.toString())
            for (let i = -1; i < 2; i++) {
                PayYearEditor.addItem({ id: (todayYear + i).toString(), text: (todayYear + i).toString(), }); // 8am - 6pm , will consider lates
            }
            if (self.isNew())
            PayYearEditor.set_value(todayYear.toString())
            let EmployeeRowIdEditor = new Select2Editor($(EmployeeRowIdElement))
            var PersonNameElement = document.getElementById(this.idPrefix + 'EmployeeName')
            //let PersonNameEditor = new Select2Editor($(PersonNameElement))
            interface Item {
                id: number;
                name: string;
                BasicPay: number;
                Allowance: number;
                type: number;
                EpfSubjection: number;
            }
            let listOfDicts: Item[] = [];
            for (var index in response.Entities) {
                EmployeeRowIdEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].EmployeeID).toString(), }); // 8am - 6pm , will consider lates
                listOfDicts.push({
                    id: response.Entities[index].Id, name: response.Entities[index].EmployeeName, BasicPay:
                        response.Entities[index].BasicSalary, Allowance: response.Entities[index].Allowance, type: response.Entities[index].EmployeeType,
                    EpfSubjection: response.Entities[index].EpfContribution
                });
            }
            this.listOfDicts = listOfDicts

            if (this.isNew() == true) {
                $(PayMonthElement).on('change', async function () {
                    self.GeneratePayrollTable()
                })
                $(PayYearElement).on('change', async function () {
                    self.GeneratePayrollTable()
                })
                $(EmployeeRowIdElement).on('change', async function () {
                    self.GeneratePayrollTable()
                })
                $(PayPeriodStartElement).on('change', async function () {
                    //                    self.GeneratePayrollTable()
                    if (self.form.PayPeriodStart.valueAsDate > self.form.PayPeriodEnd.valueAsDate) {
                        alertDialog('Pay period start cannot be ahead of pay period end')
                        self.form.PayPeriodStart.value = ''
                        return
                    }
                    self.GeneratePayrollTable()

                })
                $(PayPeriodEndElement).on('change', async function () {
                    // self.GeneratePayrollTable()
                    if (self.form.PayPeriodStart.valueAsDate > self.form.PayPeriodEnd.valueAsDate) {
                        alertDialog('Pay period start cannot be ahead of pay period end')
                        self.form.PayPeriodEnd.value  = ''
                        return
                    }
                    self.GeneratePayrollTable()
                })

            }
            else if (this.isNew() == false && EmployeeRowIdValue != null) {
                $(PayYearElement).val(this.form.PayYear.value).trigger('change')
                $(PayMonthElement).val(this.form.PayMonth.value).trigger('change')
                var TableDesc = this.form.PayrollTable.value
                var EmployerDesc = this.form.EmployerTable.value
                var Inverter = true, buffer = '', start = false
                var Starter = this.starter, Ender = this.ender
                for (let i = 0; i < TableDesc.length; i++) {
                    var charCode = TableDesc.charCodeAt(i)
                    if (charCode == Starter || (start == true && charCode != Ender))//start
                    {
                        if (start == true)
                            buffer += TableDesc[i].toString()
                        start = true
                    }
                    else if (charCode == Ender) // end
                    {
                        if (Inverter == true)
                            this.EarningsString.push(buffer)
                        else
                            this.DeductionsString.push(buffer)
                        start = false
                        buffer = ''
                        Inverter = !Inverter
                    }
                }
                buffer = '', start = false
                for (let i = 0; i < EmployerDesc.length; i++) {
                    var charCode = EmployerDesc.charCodeAt(i)
                    if (charCode == Starter || (start == true && charCode != Ender))//start
                    {
                        if (start == true)
                            buffer += EmployerDesc[i].toString()
                        start = true
                    }
                    else if (charCode == Ender) // end
                    {
                        this.EmployerContributions.push(buffer)
                        start = false
                        buffer = ''
                    }
                }
                // this.ReadOnly = true
                for (var index in listOfDicts) {
                    if (listOfDicts[index].id == parseInt(EmployeeRowIdValue))
                        this.EmployeeType = listOfDicts[index].type
                }
                $(EmployeeRowIdElement).val(EmployeeRowIdValue.toString()).trigger('change');
                EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);
                this.EmployerTable()
                this.EmployeeTable()
                if (Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is HR guy 
                {
                    var terminateButtons = document.querySelectorAll('.text-bg-danger')
                    terminateButtons.forEach(function (element) {
                        $(element).show()
                    });
                    var newId = self.idPrefix.substring(0, self.idPrefix.lastIndexOf('_'))
                    var resignButtons = document.getElementById(newId).querySelectorAll('.text-bg-success')
                    resignButtons.forEach(function (element) {
                        $(element).show()
                    });
                }
                else
                    this.readOnly = true
            }
        });
    }

    public GeneratePayrollTable(): void {
        var self = this
        var PayrollEarningsNode = document.getElementById('PayrollTable')

        var EmployerContributionsNode = document.getElementById('EmployerContributionsTable')
        var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
        var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth')
        var PayYearElement = document.getElementById(this.idPrefix + 'PayYear')
        var PersonNameElement = document.getElementById(this.idPrefix + 'EmployeeName')

        var ExternalDeductions = this.ExternalDeductions
        var ExternalEarnings = this.ExternalEarnings
        var EarningsString = this.EarningsString
        var DeductionsString = this.DeductionsString
        var EmployerContributions = this.EmployerContributions

        var EisAmount = this.EisAmount
        var EpfAmount = this.EpfAmount
        var SocsoAmount = this.SocsoAmount
        var PcbAmount = this.PcbAmount
        var HrdfAmount = this.HrdfAmount

        var ListOfEpfSubjection = this.ListOfEpfSubjection
        var ListOfEisSubjection = this.ListOfEisSubjection
        var ListOfHrdfSubjection = this.ListOfHrdfSubjection
        var ListOfSocsoSubjection = this.ListOfSocsoSubjection
        var ListOfPcbSubjection = this.ListOfPcbSubjection

  
        var listOfDicts = self.listOfDicts
        
        if (isEmptyOrNull($(PayMonthElement).val()) || isEmptyOrNull($(PayYearElement).val()) || isEmptyOrNull($(EmployeeRowIdElement).val())) {
            $('#PayrollTableBody').empty()
            $('#PayrollTableFoot').empty()
            var rows = document.getElementById('EmployerContributionsTable').getElementsByTagName('TR');
            // Get the number of rows
            var numRows = rows.length;
            for (var i = numRows - 1; i > 0; i--)
                rows[i].parentNode.removeChild(rows[i]);

            return
        }
        if (isEmptyOrNull($(EmployeeRowIdElement).val())) {
            var terminateButtons = document.querySelectorAll('.text-bg-danger')
            terminateButtons.forEach(function (element) {
                $(element).hide()
            });
            var newId = self.idPrefix.substring(0, self.idPrefix.lastIndexOf('_'))
            var resignButtons = document.getElementById(newId).querySelectorAll('.text-bg-success')
            resignButtons.forEach(function (element) {
                $(element).hide()
            });
            if (self.isNew())
                self.saveAndCloseButton.hide()
            var rows = PayrollEarningsNode.getElementsByTagName('TR');
            var numRows = rows.length;
            for (var i = numRows - 1; i > 0; i--)
                rows[i].parentNode.removeChild(rows[i]);
            var EmployerRows = EmployerContributionsNode.getElementsByTagName('TR');
            var numRows = EmployerRows.length;
            for (var i = numRows - 1; i > 0; i--)
                EmployerRows[i].parentNode.removeChild(EmployerRows[i]);
            self.form.EmployeeName.value = ""
            self.form.EmployeeRowId.value = ""
            return
        }
        else {
      
            var FullAttendance = true
            var HaveUnpaidLeave = false
            var HaveHospitalisationLeave = false
            var HaveSickLeave = false
            var HaveAnnualLeave = false
            var HaveMaternityLeave = false
            var HavePaternityLeave = false
            var HaveMarriageLeave = false
            var HaveCompassionateLeave = false
            var HaveEmergencyLeave = false
            var HaveGatepassLeave = false

            var NoLate = true
            var NoAbsence = true
            var NoEarlyLeaving = true

            self.NoPaidLeaveId.length = 0
            self.MoneyClaimingId.length = 0
            self.OtPayId.length = 0
            self.EmployerContributions.length = 0
            ExternalDeductions.length = 0
            ExternalEarnings.length = 0
            EarningsString.length = 0
            DeductionsString.length = 0
            self.FinalDeductions.length = 0
            self.FinalEarnings.length = 0
            self.NettEarnings = 0
            self.NettDeductions = 0
            EisAmount = 0
            EpfAmount = 0
            PcbAmount = 0
            SocsoAmount = 0
            HrdfAmount = 0
            self.OneTimeAllowanceId.length = 0
            self.OneTimeDeductionId.length = 0

           // var check = 0

            if (isEmptyOrNull($(PayMonthElement).val()) && isEmptyOrNull($(PayYearElement).val())) {
               // check = 1
                var convertedDateMonth = parseInt($(PayMonthElement).val())
                var convertedDateYear = parseInt($(PayYearElement).val())
                self.form.PayPeriodEnd.valueAsDate = new Date(self.form.PayYear.value, self.form.PayMonth.value, self.PayDate)
                self.form.PayDate.valueAsDate = new Date(self.form.PayYear.value, self.form.PayMonth.value, self.PayDate)
                var LastMonth = self.form.PayPeriodEnd.valueAsDate
                LastMonth.setMonth(LastMonth.getMonth() - 1);
                LastMonth.setDate(LastMonth.getDate() - 1);
                self.form.PayPeriodStart.valueAsDate = LastMonth
            }
          
            var criteria: any;
            EmployeeLateService.List({
                Criteria: Criteria.and(criteria, [[EmployeeLateRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()],
                    [[EmployeeLateRow.Fields.Date], '>=', self.form.PayPeriodStart.get_value()],
                    [[EmployeeLateRow.Fields.Date], '<=', self.form.PayPeriodEnd.get_value()]
                )
            }, response => {
                response.Entities.length > 0 ? NoLate = false : ''
                var criteria: any;
                NoPaidLeaveService.List({
                    Criteria: Criteria.and(criteria, [[NoPaidLeaveRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()],
                        [[NoPaidLeaveRow.Fields.LeaveDate], '>=', self.form.PayPeriodStart.get_value()],
                        [[NoPaidLeaveRow.Fields.LeaveDate], '<=', self.form.PayPeriodEnd.get_value()]
                    )
                }, response => {
                    response.Entities.length > 0 ? NoAbsence = false : ''
                    var criteria: any;
                    EmployeeEarlyLeavingService.List({
                        Criteria: Criteria.and(criteria, [[EmployeeEarlyLeavingRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()],
                            [[EmployeeEarlyLeavingRow.Fields.Date], '>=', self.form.PayPeriodStart.get_value()],
                            [[EmployeeEarlyLeavingRow.Fields.Date], '<=', self.form.PayPeriodEnd.get_value()]
                        )
                    }, response => {
                        response.Entities.length > 0 ? NoEarlyLeaving = false : ''
                        var criteria: any;
                        LeaveApplicationService.List({
                            Criteria: Criteria.and(criteria, [[LeaveApplicationRow.Fields.Status], '=', '1'],
                                [[LeaveApplicationRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()],
                                [[LeaveApplicationRow.Fields.StartDate], '<=', self.form.PayPeriodEnd.get_value()],
                                [[LeaveApplicationRow.Fields.EndDate], '>=', self.form.PayPeriodStart.get_value()],
                            )
                        }, response => {
                            response.Entities.length > 0 ? FullAttendance = false : ''
                            var criteria: any;
                            for (var res in response.Entities) {
                                var leaveReasonId = response.Entities[res].LeaveReasonId;

                                switch (leaveReasonId) {
                                    case 1:
                                        HaveUnpaidLeave = true;
                                        break;
                                    case 2:
                                        HaveHospitalisationLeave = true;
                                        break;
                                    case 3:
                                        HaveSickLeave = true;
                                        break;
                                    case 4:
                                        HaveAnnualLeave = true;
                                        break;
                                    case 5:
                                        HaveMaternityLeave = true;
                                        break;
                                    case 6:
                                        HavePaternityLeave = true;
                                        break;
                                    case 7:
                                        HaveMarriageLeave = true;
                                        break;
                                    case 8:
                                        HaveCompassionateLeave = true;
                                        break;
                                    case 10:
                                        HaveEmergencyLeave = true;
                                        break;
                                    case 11:
                                        HaveGatepassLeave = true;
                                        break;
                                }
                            }



                            PayrollService.List({
                                Criteria: [[PayrollRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()]

                            }, response => {
                                var ignore = false
                                for (var index in response.Entities) {
                                    var CurrentRecordMonth = response.Entities[index].PayMonth
                                    var CurrentRecordYear = response.Entities[index].PayYear
                                    if (convertedDateMonth == CurrentRecordMonth
                                        && convertedDateYear == CurrentRecordYear) {
                                        $(EmployeeRowIdElement).val(0)
                                        self.form.EmployeeRowId.value = ""
                                        notifyError('The employee already have payslip for current month')
                                        if (self.isNew())
                                            self.saveAndCloseButton.hide()
                                        ignore = true
                                        var rows = PayrollEarningsNode.getElementsByTagName('TR');
                                        // Get the number of rows
                                        var numRows = rows.length;
                                        for (var i = numRows - 1; i > 0; i--)
                                            rows[i].parentNode.removeChild(rows[i]);
                                        rows = EmployerContributionsNode.getElementsByTagName('TR');
                                        // Get the number of rows
                                        numRows = rows.length;
                                        for (var i = numRows - 1; i > 0; i--)
                                            rows[i].parentNode.removeChild(rows[i]);
                                        self.form.EmployeeName.value = ''

                                        return
                                    }
                                }
                                var terminateButtons = document.querySelectorAll('.text-bg-danger')
                                var newId = self.idPrefix.substring(0, self.idPrefix.lastIndexOf('_'))
                                var resignButtons = document.getElementById(newId).querySelectorAll('.text-bg-success')
                                if (ignore == false) {
                                    terminateButtons.forEach(function (element) {
                                        $(element).show()
                                    });
                                    resignButtons.forEach(function (element) {
                                        $(element).show()
                                    });
                                    if (self.isNew())
                                        self.saveAndCloseButton.show()
                                    for (var index in listOfDicts) {
                                        if (listOfDicts[index].id == $(EmployeeRowIdElement).val()) {
                                            self.EmployeeType = listOfDicts[index].type
                                            self.EpfSubjection = listOfDicts[index].EpfSubjection
                                            var BasicPay = listOfDicts[index].BasicPay
                                            var EmployeeRowId = listOfDicts[index].id
                                            var EmployeeName = listOfDicts[index].name
                                            var Earnings: any[] = [];
                                            var DeductionsRow: any[] = [];
                                            var EmployerContributions: any[] = [];

                                            var criteria: any;
                                            EmployeeAllowanceService.List({
                                                Criteria: Criteria.and(criteria, [[EmployeeAllowanceRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()]
                                                    , [self.form.PayPeriodStart.get_value(), '>=', [EmployeeAllowanceRow.Fields.EffectiveFrom]],
                                                )
                                            }, response => {
                                                for (var index in response.Entities) {
                                                    if (response.Entities[index].OneTime == true) {

                                                        if (response.Entities[index].PaidOneTime == true)
                                                            continue

                                                        else if (response.Entities[index].PaidOneTime == false)
                                                            self.OneTimeAllowanceId.push(response.Entities[index].Id)

                                                    }

                                                    if (response.Entities[index].FullAttendance == true)
                                                    {
                                                        if (
                                                            response.Entities[index].ExemptAnnualLeave == false &&
                                                            response.Entities[index].ExemptCompassionateLeave == false &&
                                                            response.Entities[index].ExemptEmergencyLeave == false &&
                                                            response.Entities[index].ExemptUnpaidLeave == false &&
                                                            response.Entities[index].ExemptSickLeave == false &&
                                                            response.Entities[index].ExemptPaternityLeave == false &&
                                                            response.Entities[index].ExemptMaternityLeave == false &&
                                                            response.Entities[index].ExemptMarriageLeave == false &&
                                                            response.Entities[index].ExemptHospitalisationLeave == false &&
                                                            response.Entities[index].ExemptGatepassLeave == false
                                                        ) {
                                                            if (FullAttendance == false)
                                                            continue
                                                        }
                                                        else {
                                                            if (response.Entities[index].ExemptAnnualLeave == true && HaveAnnualLeave == true)
                                                                continue

                                                            if (response.Entities[index].ExemptCompassionateLeave == true && HaveCompassionateLeave == true)
                                                                continue

                                                            if (response.Entities[index].ExemptEmergencyLeave == true && HaveEmergencyLeave == true)
                                                                continue

                                                            if (response.Entities[index].ExemptUnpaidLeave == true && HaveUnpaidLeave == true)
                                                                continue
                                                            if (response.Entities[index].ExemptSickLeave == true && HaveSickLeave == true)
                                                                continue
                                                            if (response.Entities[index].ExemptPaternityLeave == true && HavePaternityLeave == true)
                                                                continue
                                                            if (response.Entities[index].ExemptMaternityLeave == true && HaveMaternityLeave == true)
                                                                continue
                                                            if (response.Entities[index].ExemptMarriageLeave == true && HaveMarriageLeave == true)
                                                                continue
                                                            if (response.Entities[index].ExemptHospitalisationLeave == true && HaveHospitalisationLeave == true)
                                                                continue
                                                            if (response.Entities[index].ExemptGatepassLeave == true && HaveGatepassLeave == true)
                                                                continue

                                                        }
                                                   
                                                    }

                                                    else if (response.Entities[index].NoAbsence == true && NoAbsence == false)
                                                        continue

                                                    else if (response.Entities[index].NoEarlyLeaving == true && NoEarlyLeaving == false)
                                                        continue

                                                    else if (response.Entities[index].NoLate == true && NoLate == false)
                                                        continue


                                                    var AllowanceString = response.Entities[index].Description + ' : ' +
                                                        response.Entities[index].Amount + " : readonly"

                                                    var buffer = new ConcretePayrollEarningsRow()
                                                    buffer.Amount = response.Entities[index].Amount
                                                    buffer.SubjectionToEis = response.Entities[index].SubjectionEis
                                                    buffer.SubjectionToEpf = response.Entities[index].SubjectionEpf
                                                    buffer.SubjectionToHrdf = response.Entities[index].SubjectionHrdf
                                                    buffer.SubjectionToPcb = response.Entities[index].SubjectionPcb
                                                    buffer.SubjectionToSocso = response.Entities[index].SubjectionSocso
                                                    buffer.Description = response.Entities[index].Description
                                                    buffer.Id = Earnings.length

                                                    Earnings.push(buffer)

                                                    self.EarningsString.push(AllowanceString)
                                                    self.EisAmount += response.Entities[index].Amount * (response.Entities[index].SubjectionEis ? 1 : 0)
                                                    self.EpfAmount += response.Entities[index].Amount * (response.Entities[index].SubjectionEpf ? 1 : 0)
                                                    self.HrdfAmount += response.Entities[index].Amount * (response.Entities[index].SubjectionHrdf ? 1 : 0)
                                                    self.PcbAmount += response.Entities[index].Amount * (response.Entities[index].SubjectionPcb ? 1 : 0)
                                                    self.SocsoAmount += response.Entities[index].Amount * (response.Entities[index].SubjectionSocso ? 1 : 0)

                                                }
                                                $(PersonNameElement).val(EmployeeName)
                                                var rows = PayrollEarningsNode.getElementsByTagName('TR');
                                                var numRows = rows.length;
                                                for (var i = numRows - 1; i > 0; i--)
                                                    rows[i].parentNode.removeChild(rows[i]);
                                                var Deductions = 0
                                                var criteria: any;
                                               

                                                var criteria: any;

                                                NoPaidLeaveService.List({
                                                    // Criteria: [[NoPaidLeaveRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()]
                                                    Criteria: Criteria.and(criteria, [[NoPaidLeaveRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()]
                                                        , [[NoPaidLeaveRow.Fields.Deducted], '=', '0'])
                                                }, response => {
                                                    var NoPaidLeaveDeductions = 0
                                                    var NoPaidLeaveDays = 0
                                                    for (var index in response.Entities) {
                                                        if (!isEmptyOrNull(response.Entities[index].Deductions)) {
                                                            self.NoPaidLeaveId.push(response.Entities[index].Id)
                                                            NoPaidLeaveDays += response.Entities[index].HalfDay ? 0.5 : 1
                                                            NoPaidLeaveDeductions += response.Entities[index].Deductions
                                                        }

                                                    }
                                                    if (NoPaidLeaveDays != 0 && NoPaidLeaveDeductions != 0)
                                                        DeductionsString.push('(No Paid Leave) ' + NoPaidLeaveDays.toString() + " Days : " + NoPaidLeaveDeductions.toFixed(2).toString() + " : readonly")
                                                    Deductions += NoPaidLeaveDeductions
                                                    var criteria: any;
                                                    FixedDeductionService.List({
                                                        Criteria: Criteria.and(criteria, [[FixedDeductionRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()]
                                                            , [self.form.PayPeriodStart.get_value(), '>=', [FixedDeductionRow.Fields.EffectiveFrom]])

                                                    }, response => {
                                                        for (var index in response.Entities) {
                                                            if (response.Entities[index].OneTime == true) {
                                                                if (response.Entities[index].DeductedOneTime == true)
                                                                    continue

                                                                else if (response.Entities[index].DeductedOneTime == false)
                                                                    self.OneTimeDeductionId.push(response.Entities[index].Id)
                                                            }
                                                            var rowBuffer = new ConcretePayrollDeductionsRow()
                                                            rowBuffer.Amount = response.Entities[index].Amount
                                                            rowBuffer.Description = response.Entities[index].Description
                                                            rowBuffer.Id = DeductionsRow.length
                                                            DeductionsRow.push(rowBuffer)
                                                            Deductions += response.Entities[index].Amount
                                                        }

                                                        var criteria: any;
                                                        MoneyClaimApplicationService.List({
                                                            Criteria: Criteria.and(criteria, [[MoneyClaimApplicationRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()]
                                                                , [[MoneyClaimApplicationRow.Fields.Paid], '=', '0'], [[MoneyClaimApplicationRow.Fields.Status], '=', '1'])

                                                        }, response => {
                                                            for (var index in response.Entities) {
                                                                var Eis = self.CheckSubjection(ListOfEisSubjection, response.Entities[index].ClaimingCategory)
                                                                var Epf = self.CheckSubjection(ListOfEpfSubjection, response.Entities[index].ClaimingCategory)
                                                                var Hrdf = self.CheckSubjection(ListOfHrdfSubjection, response.Entities[index].ClaimingCategory)
                                                                var Pcb = self.CheckSubjection(ListOfPcbSubjection, response.Entities[index].ClaimingCategory)
                                                                var Socso = self.CheckSubjection(ListOfSocsoSubjection, response.Entities[index].ClaimingCategory)

                                                                buffer = new ConcretePayrollEarningsRow()
                                                                buffer.Amount = response.Entities[index].ClaimAmount
                                                                buffer.SubjectionToEis = (Eis == 1 ? true : false)
                                                                buffer.SubjectionToEpf = (Epf == 1 ? true : false)
                                                                buffer.SubjectionToHrdf = (Hrdf == 1 ? true : false)
                                                                buffer.SubjectionToPcb = (Pcb == 1 ? true : false)
                                                                buffer.SubjectionToSocso = (Socso == 1 ? true : false)
                                                                buffer.Description = response.Entities[index].Description
                                                                buffer.Id = Earnings.length
                                                                Earnings.push(buffer)

                                                                // EarningsString.push('(' + response.Entities[index].ClaimingCategory + ')' + response.Entities[index].Description + " : " + response.Entities[index].ClaimAmount.toFixed(2) + " : readonly")
                                                                self.MoneyClaimingId.push(response.Entities[index].Id)
                                                            }
                                                            //EarningsString.push('Basic Salary:' + BasicPay.toString())
                                                            var BasicSalaryString = 'Basic Salary'
                                                            Eis = self.CheckSubjection(ListOfEisSubjection, BasicSalaryString)
                                                            Epf = self.CheckSubjection(ListOfEpfSubjection, BasicSalaryString)
                                                            Hrdf = self.CheckSubjection(ListOfHrdfSubjection, BasicSalaryString)
                                                            Pcb = self.CheckSubjection(ListOfPcbSubjection, BasicSalaryString)
                                                            Socso = self.CheckSubjection(ListOfSocsoSubjection, BasicSalaryString)
                                                            buffer = new ConcretePayrollEarningsRow()
                                                            buffer.SubjectionToEis = (Eis == 1 ? true : false)
                                                            buffer.SubjectionToEpf = (Epf == 1 ? true : false)
                                                            buffer.SubjectionToHrdf = (Hrdf == 1 ? true : false)
                                                            buffer.SubjectionToPcb = (Pcb == 1 ? true : false)
                                                            buffer.SubjectionToSocso = (Socso == 1 ? true : false)
                                                            buffer.Amount = BasicPay
                                                            buffer.Description = BasicSalaryString
                                                            buffer.Id = Earnings.length
                                                            Earnings.push(buffer)

                                                            var retrieve_ot = false
                                                            serviceCall<ListResponse<any>>({
                                                                service: OTApplicationService.baseUrl + '/CalculateOtPay',
                                                                method: "GET",
                                                                data: {
                                                                    "EmployeeRowID": EmployeeRowId
                                                                },
                                                                async: false,
                                                                onSuccess: (response) => {
                                                                    // console.log(response.Entities)
                                                                    if (response.Entities[0].OtRate != -1 && response.Entities[0].OtMinute != -1 && response.Entities[0].TotalOtPay != -1) {
                                                                        var data = response.Entities
                                                                        // Step 1: Sort the array based on OtRate
                                                                        data.sort((a, b) => a.OtRate - b.OtRate);
                                                                        // Step 2: Aggregate totals by OtRate
                                                                        let aggregatedData = [];
                                                                        let currentOtRate = null;
                                                                        let sumTotalOtPay = 0;
                                                                        let sumOtMinute = 0;
                                                                        data.forEach(entry => {
                                                                            self.OtPayId.push(entry.id)


                                                                            if (entry.OtRate !== currentOtRate) {
                                                                                // Push the accumulated totals for the previous OtRate (if it exists)
                                                                                if (currentOtRate !== null) {
                                                                                    aggregatedData.push({
                                                                                        OtRate: currentOtRate,
                                                                                        TotalOtPay: sumTotalOtPay,
                                                                                        OtMinute: sumOtMinute
                                                                                    });
                                                                                }
                                                                                // Reset accumulators for the new OtRate
                                                                                currentOtRate = entry.OtRate;
                                                                                sumTotalOtPay = 0;
                                                                                sumOtMinute = 0;
                                                                            }
                                                                            // Accumulate totals for the current OtRate
                                                                            sumTotalOtPay += entry.TotalOtPay;
                                                                            sumOtMinute += entry.OtMinute;
                                                                        });

                                                                        // Don't forget to add the last accumulated totals after loop ends
                                                                        if (currentOtRate !== null) {
                                                                            aggregatedData.push({
                                                                                OtRate: currentOtRate,
                                                                                TotalOtPay: sumTotalOtPay,
                                                                                OtMinute: sumOtMinute
                                                                            });
                                                                        }
                                                                        var Overtime = 'Overtime Payments'
                                                                        var Eis = self.CheckSubjection(ListOfEisSubjection, Overtime)
                                                                        var Epf = self.CheckSubjection(ListOfEpfSubjection, Overtime)
                                                                        var Hrdf = self.CheckSubjection(ListOfHrdfSubjection, Overtime)
                                                                        var Pcb = self.CheckSubjection(ListOfPcbSubjection, Overtime)
                                                                        var Socso = self.CheckSubjection(ListOfSocsoSubjection, Overtime)
                                                                        console.log(Epf)
                                                                        for (var index in aggregatedData) {
                                                                            var OtHour = aggregatedData[index].OtMinute / 60.0
                                                                            //EarningsString.push('Overtime Payments: RM' + parseFloat(aggregatedData[index].OtRate).toFixed(2).toString() + 'x' + OtHour.toString() + 'hour = ' + aggregatedData[index].TotalOtPay.toString() + " : readonly")
                                                                            buffer = new ConcretePayrollEarningsRow()
                                                                            buffer.Id = Earnings.length
                                                                            buffer.SubjectionToEis = (Eis == 1 ? true : false)
                                                                            buffer.SubjectionToEpf = (Epf == 1 ? true : false)
                                                                            buffer.SubjectionToHrdf = (Hrdf == 1 ? true : false)
                                                                            buffer.SubjectionToPcb = (Pcb == 1 ? true : false)
                                                                            buffer.SubjectionToSocso = (Socso == 1 ? true : false)
                                                                            buffer.Amount = aggregatedData[index].TotalOtPay
                                                                            /*
                                                                            if (Eis == 1)
                                                                                EisAmount += aggregatedData[index].TotalOtPay
                                                                            if (Epf == 1)
                                                                                EpfAmount += aggregatedData[index].TotalOtPay
                                                                            if (Hrdf == 1)
                                                                                HrdfAmount += aggregatedData[index].TotalOtPay
                                                                            if (Pcb == 1)
                                                                                PcbAmount += aggregatedData[index].TotalOtPay
                                                                            if (Socso == 1)
                                                                                SocsoAmount += aggregatedData[index].TotalOtPay
                                                                            */

                                                                            buffer.Description = 'Overtime Payments: RM' + parseFloat(aggregatedData[index].OtRate).toFixed(2).toString() + 'x' + OtHour.toString() + 'hour'
                                                                            Earnings.push(buffer)

                                                                        }
                                                                    }
                                                                    retrieve_ot = true
                                                                }
                                                            })
                                                            while (retrieve_ot == false) { };
                                                            EmployeeEarlyLeavingService.List({
                                                                Criteria: [[EmployeeEarlyLeavingRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()]
                                                            }, response => {
                                                                var EarlyLeavingMinutes = 0, EarlyLeavingDeductions = 0
                                                                for (var index in response.Entities) {
                                                                    if (response.Entities[index].Deducted == 0) {
                                                                        if (!isEmptyOrNull(response.Entities[index].Deductions)) {
                                                                            EarlyLeavingMinutes += response.Entities[index].EarlyMins
                                                                            EarlyLeavingDeductions += response.Entities[index].Deductions
                                                                            Deductions += response.Entities[index].Deductions
                                                                            self.EarlyLeavingId.push(response.Entities[index].Id)
                                                                        }
                                                                    }
                                                                }
                                                                if (EarlyLeavingMinutes && EarlyLeavingDeductions && self.DeductEarlyLeaving)
                                                                    DeductionsString.push('(Early Leaving) ' + EarlyLeavingMinutes.toString() + " mins : " + EarlyLeavingDeductions.toFixed(2).toString() + " : readonly")

                                                                EmployeeLateService.List({
                                                                    Criteria: [[EmployeeLateRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()]
                                                                }, response => {
                                                                    var LateMinutes = 0, LateDeductions = 0
                                                                    for (var index in response.Entities) {
                                                                        if (response.Entities[index].Deducted == 0) {
                                                                            if (!isEmptyOrNull(response.Entities[index].Deductions)) {
                                                                                Deductions += response.Entities[index].Deductions
                                                                                LateMinutes += response.Entities[index].LateMins
                                                                                LateDeductions += response.Entities[index].Deductions
                                                                                self.LateArrivalId.push(response.Entities[index].Id)
                                                                            }
                                                                        }
                                                                    }

                                                                    if (LateMinutes && LateDeductions && self.DeductLateArrival)
                                                                        DeductionsString.push('(Late) ' + LateMinutes.toString() + " mins : " + LateDeductions.toFixed(2) + " : readonly")
                                                                    self.form.PayrollEarnings.value = Earnings


                                                                    for (let i = 0; i < self.form.PayrollEarnings.value.length; i++) {
                                                                        var EarningAmount = self.form.PayrollEarnings.value[i].Amount
                                                                        self.NettEarnings += EarningAmount
                                                                        var EisSubjection = self.form.PayrollEarnings.value[i].SubjectionToEis
                                                                        var EpfSubjection = self.form.PayrollEarnings.value[i].SubjectionToEpf
                                                                        var SocsoSubjection = self.form.PayrollEarnings.value[i].SubjectionToSocso
                                                                        var PcbSubjection = self.form.PayrollEarnings.value[i].SubjectionToPcb
                                                                        var HrdfSubjection = self.form.PayrollEarnings.value[i].SubjectionToHrdf
                                                                        
                                                                        EisAmount += (EisSubjection == true ? 1 : 0) * (EarningAmount)
                                                                        EpfAmount += (EpfSubjection == true ? 1 : 0) * (EarningAmount)
                                                                        SocsoAmount += (SocsoSubjection == true ? 1 : 0) * (EarningAmount)
                                                                        PcbAmount += (PcbSubjection == true ? 1 : 0) * (EarningAmount)
                                                                        HrdfAmount += (HrdfSubjection == true ? 1 : 0) * (EarningAmount)
                                                                    }
                                                                    var doneCalculatingGovPayments = false
                                                                    EpfAmount -= Deductions
                                                                    EisAmount -= Deductions
                                                                    SocsoAmount -= Deductions
                                                                    PcbAmount -= Deductions
                                                                    HrdfAmount -= Deductions
                                                                    console.log(EpfAmount)
                                                                    console.log(self.form.PayrollEarnings.value)
                                                                    console.log(PcbAmount)

                                                                    serviceCall<ListResponse<any>>({
                                                                        service: PayrollService.baseUrl + '/CalculateGovernmentPayments',
                                                                        method: "GET",
                                                                        data: {
                                                                            "EmployeeRowID": EmployeeRowId,
                                                                            "EpfAmount": EpfAmount,
                                                                            "EisAmount": EisAmount,
                                                                            "SocsoAmount": SocsoAmount,
                                                                            "PcbAmount": PcbAmount,
                                                                            "HrdfAmount": HrdfAmount,
                                                                        },
                                                                        async: false,
                                                                        onSuccess: (response) => {
                                                                             console.log(response.Entities)
                                                                            doneCalculatingGovPayments = true
                                                                            self.EmployerContributions.length = 0
                                                                            var rowBuffer;
                                                                            if (self.EmployeeType == EmployeeType.Local) {// if is local 
                                                                                if (response.Entities[0].EmployeeEPF > 0) {
                                                                                    rowBuffer = new ConcretePayrollDeductionsRow()
                                                                                    rowBuffer.Amount = response.Entities[0].EmployeeEPF
                                                                                    rowBuffer.Description = 'Employee EPF'
                                                                                    rowBuffer.GovernmentPayments = 1
                                                                                    rowBuffer.Id = DeductionsRow.length
                                                                                    DeductionsRow.push(rowBuffer)
                                                                                    DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                                                                                }
                                                                                if (response.Entities[0].EmployeeEIS > 0) {
                                                                                    rowBuffer = new ConcretePayrollDeductionsRow()
                                                                                    rowBuffer.Amount = response.Entities[0].EmployeeEIS
                                                                                    rowBuffer.Description = 'Employee EIS'
                                                                                    rowBuffer.GovernmentPayments = 1
                                                                                    rowBuffer.Id = DeductionsRow.length
                                                                                    DeductionsRow.push(rowBuffer)
                                                                                    DeductionsString.push('Employee EIS:' + response.Entities[0].EmployeeEIS.toFixed(2))
                                                                                }
                                                                                if (response.Entities[0].EmployeePCB > 0) {
                                                                                    rowBuffer = new ConcretePayrollDeductionsRow()
                                                                                    rowBuffer.Amount = response.Entities[0].EmployeePCB
                                                                                    rowBuffer.Description = 'Employee PCB'
                                                                                    rowBuffer.GovernmentPayments = 1
                                                                                    rowBuffer.Id = DeductionsRow.length
                                                                                    DeductionsRow.push(rowBuffer)
                                                                                    DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                                                                                }
                                                                                if (response.Entities[0].EmployeeSOCSO > 0) {
                                                                                    rowBuffer = new ConcretePayrollDeductionsRow()
                                                                                    rowBuffer.Amount = response.Entities[0].EmployeeSOCSO
                                                                                    rowBuffer.Description = 'Employee SOCSO'
                                                                                    rowBuffer.GovernmentPayments = 1
                                                                                    rowBuffer.Id = DeductionsRow.length
                                                                                    DeductionsRow.push(rowBuffer)
                                                                                    DeductionsString.push('Employee SOCSO:' + response.Entities[0].EmployeeSOCSO.toFixed(2))
                                                                                }
                                                                                if (response.Entities[0].EmployerEPF > 0) {
                                                                                    rowBuffer = new ConcreteEmployerContributionsRow()
                                                                                    rowBuffer.Amount = response.Entities[0].EmployerEPF
                                                                                    rowBuffer.Description = 'Employer EPF'
                                                                                    rowBuffer.Id = EmployerContributions.length
                                                                                    EmployerContributions.push(rowBuffer)
                                                                                }
                                                                                if (response.Entities[0].EmployerEIS > 0)
                                                                                {
                                                                                    rowBuffer = new ConcreteEmployerContributionsRow()
                                                                                    rowBuffer.Amount = response.Entities[0].EmployerEIS
                                                                                    rowBuffer.Description = 'Employer EIS'
                                                                                    rowBuffer.Id = EmployerContributions.length
                                                                                    EmployerContributions.push(rowBuffer)
                                                                                }
                                                                                if (response.Entities[0].EmployerHRDF > 0) {

                                                                                    rowBuffer = new ConcreteEmployerContributionsRow()
                                                                                    rowBuffer.Amount = response.Entities[0].EmployerHRDF
                                                                                    rowBuffer.Description = 'HRDF'
                                                                                    rowBuffer.Id = EmployerContributions.length
                                                                                    EmployerContributions.push(rowBuffer)

                                                                                }
                                                                                if (response.Entities[0].EmployerSOCSO > 0) {
                                                                                    rowBuffer = new ConcreteEmployerContributionsRow()
                                                                                    rowBuffer.Amount = response.Entities[0].EmployerSOCSO
                                                                                    rowBuffer.Description = 'Employer SOCSO'
                                                                                    rowBuffer.Id = EmployerContributions.length
                                                                                    EmployerContributions.push(rowBuffer)
                                                                                }

                                                                                self.EmployeeEis = response.Entities[0].EmployeeEIS
                                                                                self.EmployeeEpf = response.Entities[0].EmployeeEPF
                                                                                self.EmployeeSocso = response.Entities[0].EmployeeSOCSO
                                                                                self.EmployeePcb = response.Entities[0].EmployeePCB
                                                                                self.EmployerEis = response.Entities[0].EmployerEIS
                                                                                self.EmployerEpf = response.Entities[0].EmployerEPF
                                                                                self.EmployerSocso = response.Entities[0].EmployerSOCSO
                                                                                self.EmployerHrdf = response.Entities[0].EmployerHRDF
                                                                            }
                                                                            else if (self.EmployeeType == EmployeeType.Foreigner) {// if is foreigner 
                                                                                self.EmployeeSocso = 0
                                                                                self.EmployerSocso = response.Entities[0].EmployerSOCSO
                                                                                if (response.Entities[0].EmployerSOCSO > 0) {
                                                                                    rowBuffer = new ConcreteEmployerContributionsRow()
                                                                                    rowBuffer.Amount = response.Entities[0].EmployerSOCSO
                                                                                    rowBuffer.Description = 'SOCSO'
                                                                                    rowBuffer.Id = EmployerContributions.length
                                                                                    EmployerContributions.push(rowBuffer)
                                                                                }
                                                                                if (self.EpfSubjection) { // if volunteer for epf payments
                                                                                    if (response.Entities[0].EmployeeEPF > 0) {
                                                                                        rowBuffer = new ConcretePayrollDeductionsRow()
                                                                                        rowBuffer.Amount = response.Entities[0].EmployeeEPF
                                                                                        rowBuffer.Description = 'Employee EPF'
                                                                                        rowBuffer.GovernmentPayments = 1
                                                                                        rowBuffer.Id = DeductionsRow.length
                                                                                        DeductionsRow.push(rowBuffer)
                                                                                        DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                                                                                    }
                                                                                    if (response.Entities[0].EmployerEPF > 0) {
                                                                                        rowBuffer = new ConcreteEmployerContributionsRow()
                                                                                        rowBuffer.Amount = response.Entities[0].EmployerEPF
                                                                                        rowBuffer.Description = 'Employer EPF'
                                                                                        rowBuffer.Id = EmployerContributions.length
                                                                                        EmployerContributions.push(rowBuffer)
                                                                                    }
                                                                                    self.EmployeeEpf = response.Entities[0].EmployeeEPF
                                                                                    self.EmployerEpf = response.Entities[0].EmployerEPF
                                                                                }
                                                                                DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                                                                                rowBuffer = new ConcretePayrollDeductionsRow()
                                                                                rowBuffer.Amount = response.Entities[0].EmployeeEPF
                                                                                rowBuffer.Description = 'Employee PCB'
                                                                                rowBuffer.GovernmentPayments = 1
                                                                                rowBuffer.Id = DeductionsRow.length
                                                                                DeductionsRow.push(rowBuffer)



                                                                                self.EmployeePcb = response.Entities[0].EmployeePCB
                                                                                self.EmployeeEis = self.EmployerEis = 0
                                                                                self.EmployerHrdf = 0
                                                                            }
                                                                        }
                                                                    })
                                                                    while (doneCalculatingGovPayments == false) { }
                                                                  

                                                                    self.form.PayrollDeductions.value = DeductionsRow
                                                                    self.form.EmployerContributions.value = EmployerContributions

                                                                    for (let i = 0; i < self.form.PayrollEarnings.value.length; i++) {
                                                                        self.NettEarnings += self.form.PayrollEarnings.value[i].Amount
                                                                        EisAmount += (self.form.PayrollEarnings.value[i].SubjectionToEis == true ? 1 : 0) * (EarningAmount)
                                                                        EpfAmount += (self.form.PayrollEarnings.value[i].SubjectionToEpf == true ? 1 : 0) * (EarningAmount)
                                                                        SocsoAmount += (self.form.PayrollEarnings.value[i].SubjectionToSocso == true ? 1 : 0) * (EarningAmount)
                                                                        PcbAmount += (self.form.PayrollEarnings.value[i].SubjectionToPcb == true ? 1 : 0) * (EarningAmount)
                                                                        HrdfAmount += (self.form.PayrollEarnings.value[i].SubjectionToHrdf == true ? 1 : 0) * (EarningAmount)
                                                                    }
                                                                    self.EmployeeTable()
                                                                    self.EmployerTable()
                                                                })
                                                            })


                                                        })

                                                    })


                                                })
                                                })
                                            
                                            break
                                        }
                                    }
                                }
                                else {
                                    terminateButtons.forEach(function (element) {
                                        $(element).hide()
                                    });
                                    resignButtons.forEach(function (element) {
                                        $(element).hide()
                                    });
                                }
                            })
                        })
                    })
                })
            })
        }
    }

    public CheckSubjection(arrayOfDict, input): number {
        var extractedText = input.match(/\((.*?)\)/);
        var trimmedString;
        // Check if text inside parentheses is found
        if (extractedText && extractedText.length > 1)
            trimmedString = extractedText[1]; // Extracted text is at index 1
        else
            trimmedString = input; // If no parentheses found, set trimmed string to original string

        if (trimmedString == 'Others')
            return 0

        for (var i = 0; i < arrayOfDict.length; i++) {
            var dict = arrayOfDict[i];
            for (var key in dict) {
                if (dict[key] == trimmedString)
                    return dict['subjection']
            }
        }
        return 0
    }
    public extractNameAndPrice(input: string): [string, number]
    {
        var [name, priceString] = input.split(':', 2).map(part => part.trim());
        var price = parseFloat(priceString);
        return [name, price];
    }
    public extractOtRateAndPrice(input: string): [string, number] {
        let equalsIndex = input.indexOf("=");
        // Extract the substring between ':' and '='
        let overtimePayments = input.substring(0, equalsIndex).trim();
        // Extract the substring after '='
        var overtimeAmount = parseFloat(input.substring(equalsIndex + 1).trim());

        return [overtimePayments, overtimeAmount];
    }
    public EmployerTable(): void {
        var self = this
        var EmployerContributionsTable = $('#EmployerContributionsBody')
        EmployerContributionsTable.empty()
        var NettEmployerContributions = 0
        var i = 0
        for (let i = 0; i < self.form.EmployerContributions.value.length;i++) {
            var RowNode = document.createElement('TR');
            RowNode.id = i.toString()
            if ((i + 1) % 2 == 1)
                RowNode.style.backgroundColor = "#f8f8f8"; // Set background color to light gray
            var EmployerContributionCriteria = self.form.EmployerContributions.value[i].Description
            var EmployerContributionAmount = self.form.EmployerContributions.value[i].Amount
            var EmployerContributionContent1 = document.createElement('TD');
            var EmployerContributionContent2Holder = document.createElement('TD');

            var EmployerContributionContent2 = document.createElement('input');
            EmployerContributionContent2Holder.appendChild(EmployerContributionContent2)
            if (!Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is HR guy 
                EmployerContributionContent2.readOnly = true

            var EmployerContributionContentText1 = document.createTextNode(EmployerContributionCriteria);
            EmployerContributionContent2.value = EmployerContributionAmount.toFixed(2).toString()
            EmployerContributionContent2.type = 'number'
            EmployerContributionContent1.appendChild(EmployerContributionContentText1)
            EmployerContributionContent2.addEventListener('change', function (e) {
                let objBuffer: any[] = self.form.EmployerContributions.value
                let objToEdit = objBuffer.find(item => item.Id === parseInt(e.target.parentElement.parentElement.id));
                objToEdit.Amount = parseFloat(e.target.value)
                self.form.EmployerContributions.value = objBuffer
                self.EmployerTable()

            });
            EmployerContributionContent1.style.whiteSpace = "nowrap";
            EmployerContributionContent2.style.whiteSpace = "nowrap";
            RowNode.appendChild(EmployerContributionContent1)
            RowNode.appendChild(EmployerContributionContent2Holder)
            NettEmployerContributions += parseFloat(EmployerContributionAmount.toFixed(2).toString())

            if (this.ReadOnly == true)
                EmployerContributionContent2.readOnly = true

            EmployerContributionContent2.style.width = "100%";
            EmployerContributionsTable.append(RowNode)
        }

        var EmployerContributionsFoot = $('#EmployerContributionsFoot')
        EmployerContributionsFoot.empty()
        this.NettEmployerContributions = NettEmployerContributions
        RowNode = document.createElement('TR');
        var NettEmployerContributionContent1 = document.createElement('TD');
        var NettEmployerContributionContent2 = document.createElement('TD');
        var NettEmployerContributionContentText1 = document.createTextNode("Nett Contribution:");
        var NettEmployerContributionContentText2 = document.createTextNode(NettEmployerContributions.toFixed(2).toString());
        NettEmployerContributionContent1.appendChild(NettEmployerContributionContentText1)
        NettEmployerContributionContent2.appendChild(NettEmployerContributionContentText2)
        NettEmployerContributionContent1.style.whiteSpace = "nowrap";
        NettEmployerContributionContent2.style.whiteSpace = "nowrap";

        RowNode.appendChild(NettEmployerContributionContent1)
        RowNode.appendChild(NettEmployerContributionContent2)
        EmployerContributionsFoot.append(RowNode)
    }
    public EmployeeTable(): void {
        var self = this
        var PayrollEarningsBody = $('#PayrollTableBody')
        PayrollEarningsBody.empty()
        this.NettDeductions = 0
        this.NettEarnings = 0
        var tableIndex = this.form.PayrollEarnings.value.length > this.form.PayrollDeductions.value.length ? this.form.PayrollEarnings.value.length : this.form.PayrollDeductions.value.length
        for (let i = 0; i < tableIndex; i++) {
        var RowNode = document.createElement('TR');
        RowNode.id = i.toString()
        if ((i + 1) % 2 == 1)
            RowNode.style.backgroundColor = "#f8f8f8"; // Set background color to light gray
        var content1, content2, content1container, content2container
        var content3, content4, content3container, content4container
        content1container = document.createElement('TD');
        content2container = document.createElement('TD');
        content3container = document.createElement('TD');
        content4container = document.createElement('TD');
        if (this.form.PayrollEarnings.value[i] !== undefined) {
            var EarningCriteria = this.form.PayrollEarnings.value[i].Description
            var EarningAmount = this.form.PayrollEarnings.value[i].Amount
            this.NettEarnings += EarningAmount
            content2 = document.createElement('input');
            content2.type = "number";
            content1 = document.createTextNode(EarningCriteria);
            content2.value = EarningAmount.toFixed(2).toString();
            content1container.appendChild(content1);
            content2container.appendChild(content2);
            content2.style.width = "100%";
            console.log(this.form.PayrollEarnings.value[i].External)
            if (this.form.PayrollEarnings.value[i].External == true) {
                var spanClass = document.createElement('span');
                spanClass.innerHTML = 'x'; // Set the inner content as the 'x'
                spanClass.style.position = 'absolute';
                spanClass.style.bottom = '0';
                spanClass.style.right = '0';
                spanClass.style.cursor = 'pointer';
                spanClass.style.fontWeight = 'bold';
                spanClass.style.color = 'red';

                spanClass.title = 'Remove'; // Tooltip text

                // Add the click event listener to remove the parent element
                spanClass.onclick = function (e) {
                    this.parentElement.parentElement.remove();
                    var filteredArray = self.form.PayrollEarnings.value.filter(item => item.Id !== parseInt(this.parentElement.parentElement.id));
                    self.form.PayrollEarnings.value = filteredArray
                    self.ValueChangeCallback()
                };

                content1container.appendChild(spanClass)
            }
            content1container.style.whiteSpace = "nowrap";
            content1container.style.position = 'relative'; // Ensure <td> is positioned for absolute positioning to work
            content1container.style.fontSize = "12px"; // Adjust the font size as needed
            content2container.style.display = "block";
            content2container.style.width = "100%";
            content2.addEventListener('change', function (e) {
                let objBuffer: any[] = self.form.PayrollEarnings.value
                let objToEdit = objBuffer.find(item => item.Id === parseInt(e.target.parentElement.parentElement.id));
                objToEdit.Amount = parseFloat(e.target.value)
                self.form.PayrollEarnings.value = objBuffer
                self.ValueChangeCallback()

            });

        }

        if (this.form.PayrollDeductions.value[i] !== undefined) {
            var DeductionCriteria = this.form.PayrollDeductions.value[i].Description
            var DeductionAmount = this.form.PayrollDeductions.value[i].Amount
            content4 = document.createElement('input');
            content4.type = "number";
            this.NettDeductions += DeductionAmount
            content3 = document.createTextNode(DeductionCriteria);
            content4.value = DeductionAmount.toFixed(2).toString();
            content3container.appendChild(content3);
            content4container.appendChild(content4);
            content4.style.width = "100%";

            if (this.form.PayrollDeductions.value[i].External == true) {
                var spanClass = document.createElement('span');
                spanClass.innerHTML = 'x'; // Set the inner content as the 'x'
                spanClass.style.position = 'absolute';
                spanClass.style.bottom = '0';
                spanClass.style.right = '0';
                spanClass.style.cursor = 'pointer';
                spanClass.style.fontWeight = 'bold';
                spanClass.style.color = 'red';

                spanClass.title = 'Remove'; // Tooltip text

                // Add the click event listener to remove the parent element
                spanClass.onclick = function (e) {
                    this.parentElement.parentElement.remove();
                    var filteredArray = self.form.PayrollDeductions.value.filter(item => item.Id !== parseInt(this.parentElement.parentElement.id));
                    self.form.PayrollDeductions.value = filteredArray
                    self.ValueChangeCallback()
                };

                content3container.appendChild(spanClass)
            }

            content3container.style.whiteSpace = "nowrap";
            content3container.style.position = 'relative'; // Ensure <td> is positioned for absolute positioning to work
            content3container.style.fontSize = "12px"; // Adjust the font size as needed
            content4container.style.display = "block";
            content4container.style.width = "100%";
            content4.addEventListener('change', function (e) {
                let objBuffer: any[] = self.form.PayrollDeductions.value
                let objToEdit = objBuffer.find(item => item.Id === parseInt(e.target.parentElement.parentElement.id));
                objToEdit.Amount = parseFloat(e.target.value)
                self.form.PayrollDeductions.value = objBuffer
                self.EmployeeTable()

            });

        }
        RowNode.appendChild(content1container);
        RowNode.appendChild(content2container);
        RowNode.appendChild(content3container);
        RowNode.appendChild(content4container);

        PayrollEarningsBody.append(RowNode)
    }

        var EarningsTableFoot = $('#PayrollTableFoot')
        EarningsTableFoot.empty()
        var EarningsRowNode = document.createElement('TR');
        var contentText1 = document.createTextNode("Nett Earnings:");
        var NewContent1 = document.createElement('TD');
        NewContent1.appendChild(contentText1)
        NewContent1.id = 'NettEarnings'
        var NewContent2 = document.createElement('TD');
        var NewContentText2 = document.createTextNode(this.NettEarnings.toFixed(2).toString());
        NewContent2.appendChild(NewContentText2)

        EarningsRowNode.appendChild(NewContent1)
        EarningsRowNode.appendChild(NewContent2)

        
        var contentText3 = document.createTextNode("Nett Deductions:");
        var NewContent3 = document.createElement('TD');
        NewContent3.appendChild(contentText3)
        var NewContent4 = document.createElement('TD');
        var NewContentText4 = document.createTextNode(this.NettDeductions.toFixed(2).toString());
        NewContent4.appendChild(NewContentText4)
        NewContent3.id = 'NettDeductions'
        NewContent4.id = 'NettDeductionsAmount'
        EarningsRowNode.appendChild(NewContent3)
        EarningsRowNode.appendChild(NewContent4)
        EarningsTableFoot.append(EarningsRowNode)


        var NettSalary = this.NettEarnings - this.NettDeductions
        var DeductionRowNode_2 = document.createElement('TR');
        var NettSalaryContentText3 = document.createTextNode("Nett Salary:");
        var NettSalaryContent3 = document.createElement('TD');
        NettSalaryContent3.appendChild(NettSalaryContentText3)
        var NettSalaryContent4 = document.createElement('td');
        var NettSalaryContentText4 = document.createTextNode(NettSalary.toFixed(2).toString());
        NettSalaryContent4.appendChild(NettSalaryContentText4)
        DeductionRowNode_2.appendChild(NettSalaryContent3)
        DeductionRowNode_2.appendChild(NettSalaryContent4)
        EarningsTableFoot.append(DeductionRowNode_2)
        

        self.NettDeductions = this.NettDeductions
        self.NettEarnings = this.NettEarnings
        self.FinalDeductions = this.DeductionsString
        self.FinalEarnings = this.EarningsString

    }
    public ValueChangeCallback(): void {
        var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
        var TableBodyNode = $('#PayrollTableBody')
        var TableFootNode = $('#PayrollTableFoot')
        this.NettDeductions = 0
        this.NettEarnings = 0
        this.EarningsString.length = 0
        this.DeductionsString.length = 0
        this.FinalDeductions.length = 0
        this.FinalEarnings.length = 0
        this.EisAmount = 0
        this.EpfAmount = 0
        this.PcbAmount = 0
        this.SocsoAmount = 0
        this.HrdfAmount = 0
        var self = this
        this.EmployerContributions.length = 0
        var EmployerContributions = this.EmployerContributions

        TableBodyNode.empty()
        TableFootNode.empty()
        var bufferObj:any[] = this.form.PayrollDeductions.value
        let filteredData = bufferObj.filter(item => item.GovernmentPayments !== 1);
        this.form.PayrollDeductions.value = filteredData
        var tableIndex = this.form.PayrollEarnings.value.length > this.form.PayrollDeductions.value.length ? this.form.PayrollEarnings.value.length : this.form.PayrollDeductions.value.length
        for (let i = 0; i < tableIndex; i++) {
            if (this.form.PayrollEarnings.value[i] !== undefined) {
                var EarningAmount = this.form.PayrollEarnings.value[i].Amount
                var EisSubjection = this.form.PayrollEarnings.value[i].SubjectionToEis.valueOf()
                var EpfSubjection = this.form.PayrollEarnings.value[i].SubjectionToEpf.valueOf()
                var PcbSubjection = this.form.PayrollEarnings.value[i].SubjectionToPcb.valueOf()
                var SocsoSubjection = this.form.PayrollEarnings.value[i].SubjectionToSocso.valueOf()
                var HrdfSubjection = this.form.PayrollEarnings.value[i].SubjectionToHrdf.valueOf()
                this.EisAmount += (EisSubjection==true ? 1 : 0) * EarningAmount
                this.EpfAmount += (EpfSubjection == true ? 1 : 0) * EarningAmount
                this.PcbAmount += (PcbSubjection == true ? 1 : 0) * EarningAmount
                this.SocsoAmount += (SocsoSubjection == true ? 1 : 0) * EarningAmount
                this.HrdfAmount += (HrdfSubjection == true ? 1 : 0) * EarningAmount
            }
            if (this.form.PayrollDeductions.value[i] !== undefined) {

                var DeductionAmount = this.form.PayrollDeductions.value[i].Amount
                this.EisAmount -= DeductionAmount
                this.EpfAmount -= DeductionAmount
                this.PcbAmount -= DeductionAmount
                this.SocsoAmount -= DeductionAmount
                this.HrdfAmount -= DeductionAmount
            }
        }
        var doneCalculatingGovPayments = false
        var deductionsRow: any[] = this.form.PayrollDeductions.value 
        serviceCall<ListResponse<any>>({
            service: PayrollService.baseUrl + '/CalculateGovernmentPayments',
            method: "GET",
            data: {
                "EmployeeRowID": $(EmployeeRowIdElement).val(),
                "EpfAmount": this.EpfAmount,
                "EisAmount": this.EisAmount,
                "SocsoAmount": this.SocsoAmount,
                "PcbAmount": this.PcbAmount,
                "HrdfAmount": this.HrdfAmount,
            },
            async: false,
            onSuccess: (response) => {
                // console.log(response.Entities)
                doneCalculatingGovPayments = true
                var EmployerContribBuffer: any[] = [];
                var rowBuffer;
                if (self.EmployeeType == EmployeeType.Local) {// if is local 
                    if (response.Entities[0].EmployeeEPF > 0) {
                        rowBuffer = new ConcretePayrollDeductionsRow()
                        rowBuffer.Amount = response.Entities[0].EmployeeEPF
                        rowBuffer.Description = 'Employee EPF'
                        rowBuffer.GovernmentPayments = 1
                        rowBuffer.Id = deductionsRow.length
                        deductionsRow.push(rowBuffer)
                    }
                    if (response.Entities[0].EmployeeEIS > 0) {
                        rowBuffer = new ConcretePayrollDeductionsRow()
                        rowBuffer.Amount = response.Entities[0].EmployeeEIS
                        rowBuffer.Description = 'Employee EIS'
                        rowBuffer.GovernmentPayments = 1
                        rowBuffer.Id = deductionsRow.length
                        deductionsRow.push(rowBuffer)
                    }
                    if (response.Entities[0].EmployeePCB > 0) {
                        rowBuffer = new ConcretePayrollDeductionsRow()
                        rowBuffer.Amount = response.Entities[0].EmployeePCB
                        rowBuffer.Description = 'Employee PCB'
                        rowBuffer.GovernmentPayments = 1
                        rowBuffer.Id = deductionsRow.length
                        deductionsRow.push(rowBuffer)
                    }
                    if (response.Entities[0].EmployeeSOCSO > 0) {
                        rowBuffer = new ConcretePayrollDeductionsRow()
                        rowBuffer.Amount = response.Entities[0].EmployeeSOCSO
                        rowBuffer.Description = 'Employee SOCSO'
                        rowBuffer.GovernmentPayments = 1
                        rowBuffer.Id = deductionsRow.length
                        deductionsRow.push(rowBuffer)
                    }
                    if (response.Entities[0].EmployerEPF > 0) {
                        rowBuffer = new ConcreteEmployerContributionsRow()
                        rowBuffer.Amount = response.Entities[0].EmployerEPF
                        rowBuffer.Description = 'Employer EPF'
                        rowBuffer.Id = EmployerContribBuffer.length
                        EmployerContribBuffer.push(rowBuffer)
                    }
                    if (response.Entities[0].EmployerEIS > 0) {
                        rowBuffer = new ConcreteEmployerContributionsRow()
                        rowBuffer.Amount = response.Entities[0].EmployerEIS
                        rowBuffer.Description = 'Employer EIS'
                        rowBuffer.Id = EmployerContribBuffer.length
                        EmployerContribBuffer.push(rowBuffer)
                    }
                    if (response.Entities[0].EmployerHRDF > 0) {

                        rowBuffer = new ConcreteEmployerContributionsRow()
                        rowBuffer.Amount = response.Entities[0].EmployerHRDF
                        rowBuffer.Description = 'HRDF'
                        rowBuffer.Id = EmployerContribBuffer.length
                        EmployerContribBuffer.push(rowBuffer)

                    }
                    if (response.Entities[0].EmployerSOCSO > 0) {
                        rowBuffer = new ConcreteEmployerContributionsRow()
                        rowBuffer.Amount = response.Entities[0].EmployerSOCSO
                        rowBuffer.Description = 'SOCSO'
                        rowBuffer.Id = EmployerContribBuffer.length
                        EmployerContribBuffer.push(rowBuffer)
                    }

                    self.EmployeeEis = response.Entities[0].EmployeeEIS
                    self.EmployeeEpf = response.Entities[0].EmployeeEPF
                    self.EmployeeSocso = response.Entities[0].EmployeeSOCSO
                    self.EmployeePcb = response.Entities[0].EmployeePCB
                    self.EmployerEis = response.Entities[0].EmployerEIS
                    self.EmployerEpf = response.Entities[0].EmployerEPF
                    self.EmployerSocso = response.Entities[0].EmployerSOCSO
                    self.EmployerHrdf = response.Entities[0].EmployerHRDF
                }
                else if (self.EmployeeType == EmployeeType.Foreigner) {// if is foreigner 
                    self.EmployeeSocso = 0
                    self.EmployerSocso = response.Entities[0].EmployerSOCSO
                    if (response.Entities[0].EmployerSOCSO > 0) {
                        rowBuffer = new ConcreteEmployerContributionsRow()
                        rowBuffer.Amount = response.Entities[0].EmployerSOCSO
                        rowBuffer.Description = 'Employer SOCSO'
                        rowBuffer.Id = EmployerContribBuffer.length
                        EmployerContribBuffer.push(rowBuffer)
                    }
                    if (self.EpfSubjection) { // if volunteer for epf payments
                        if (response.Entities[0].EmployeeEPF > 0) {
                            rowBuffer = new ConcretePayrollDeductionsRow()
                            rowBuffer.Amount = response.Entities[0].EmployeeEPF
                            rowBuffer.Description = 'Employee EPF'
                            rowBuffer.GovernmentPayments = 1
                            rowBuffer.Id = deductionsRow.length
                            deductionsRow.push(rowBuffer)
                           // DeductionsString.push('Employee EPF:' + response.Entities[0].EmployeeEPF.toFixed(2))
                        }
                        if (response.Entities[0].EmployerEPF > 0) {
                            rowBuffer = new ConcreteEmployerContributionsRow()
                            rowBuffer.Amount = response.Entities[0].EmployerEPF
                            rowBuffer.Description = 'Employer EPF'
                            rowBuffer.Id = EmployerContribBuffer.length
                            EmployerContribBuffer.push(rowBuffer)
                        }
                        self.EmployeeEpf = response.Entities[0].EmployeeEPF
                        self.EmployerEpf = response.Entities[0].EmployerEPF
                    }
                   // DeductionsString.push('Employee PCB:' + response.Entities[0].EmployeePCB.toFixed(2))
                    rowBuffer = new ConcretePayrollDeductionsRow()
                    rowBuffer.Amount = response.Entities[0].EmployeeEPF
                    rowBuffer.Description = 'Employee PCB'
                    rowBuffer.GovernmentPayments = 1
                    rowBuffer.Id = deductionsRow.length
                    deductionsRow.push(rowBuffer)
                    self.EmployeePcb = response.Entities[0].EmployeePCB
                    self.EmployeeEis = self.EmployerEis = 0
                    self.EmployerHrdf = 0
                }
                self.form.EmployerContributions.value = EmployerContribBuffer
            }
        })
        while (doneCalculatingGovPayments == false) { }
        this.form.PayrollDeductions.value = deductionsRow

        this.EmployeeTable()
        this.EmployerTable()




    }
    protected getToolbarButtons() {
        var buttons = super.getToolbarButtons();
        var Linkx = document.createElement('style')
        Linkx.textContent =
            `

    /* Hover effect */
        td:hover {
            background-color: #f0f8ff; /* Light color to highlight on hover */
        }

            `
        document.head.appendChild(Linkx)
        // *** Create Dropdown-Button ***
        var self = this

        buttons.push(
            {
                title: "Add Earnings",	// *** Get button text from translation
                cssClass: 'text-bg-success p-2',
                icon: 'fa-plus text-green',
                onClick: () => {
                    const addButton = $('.PayrollEarnings .add-button');
                    addButton.click()
                    var PrevLength = self.form.PayrollEarnings.value.length
                    $('.s-HRMSoftware-PayrollSettings-PayrollEarningsEditDialog').on("dialogclose", function () {
                        if (PrevLength != self.form.PayrollEarnings.value.length) {
                            var BufferPayrollEarnings: any[] = self.form.PayrollEarnings.value
                            let i;
                            let ExternalSet = BufferPayrollEarnings.length - 1;
                            for ( i = 0; i < BufferPayrollEarnings.length; i++) 
                                BufferPayrollEarnings[i].Id = i
                            BufferPayrollEarnings[ExternalSet].External = true
                            self.form.PayrollEarnings.value = BufferPayrollEarnings
                            self.ValueChangeCallback()
                        }
                    })
                },
            }
        );
        buttons.push(
            {
                title: "Add Deductions",	// *** Get button text from translation
                cssClass: 'text-bg-danger p-2',
                icon: 'fa-minus text-red',
                onClick: () => {
                    const addButton = $('.PayrollDeductions .add-button');
                    addButton.click()
                    var PrevLength = self.form.PayrollDeductions.value.length
                    $('.s-HRMSoftware-PayrollSettings-PayrollDeductionsEditDialog').on("dialogclose", function () {
                        if (PrevLength != self.form.PayrollDeductions.value.length) {
                            var BufferPayrollDeductions: any[] = self.form.PayrollDeductions.value
                            let i;
                            let ExternalSet = BufferPayrollDeductions.length - 1;
                            for ( i = 0; i < BufferPayrollDeductions.length; i++) 
                                BufferPayrollDeductions[i].Id = i
                            BufferPayrollDeductions[ExternalSet].External = true
                            self.form.PayrollDeductions.value = BufferPayrollDeductions
                            self.ValueChangeCallback()

                        }
                    })
                },
            }
        );
        return buttons;
    }
    protected save_submitHandler(response): void
    {
        var res = response
        var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
        var self = this
        if (self.isNew()) {
            PayrollService.List({

                Criteria: [[EmployeeAllowanceRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()]

            }, response => {
                for (var PayrollServiceIndex in response.Entities) {
                    var CurrentRecordMonth = response.Entities[PayrollServiceIndex].PayMonth
                    var CurrentRecordYear = response.Entities[PayrollServiceIndex].PayYear
                    var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth')
                    var PayYearElement = document.getElementById(this.idPrefix + 'PayYear')
                    var convertedDateMonth = parseInt($(PayMonthElement).val())
                    var convertedDateYear = parseInt($(PayYearElement).val())

                    if (convertedDateMonth == CurrentRecordMonth
                        && convertedDateYear == CurrentRecordYear) {
                        notifyError('The employee already have payslip for current month')
                        if (self.isNew())
                            self.saveAndCloseButton.hide()

                        return
                    }
                }
                var TableDescriptor = '', EmployerDescriptor = ''
                var index = 0
                if (this.FinalDeductions.length > this.FinalEarnings.length)
                    index = this.FinalDeductions.length
                else
                    index = this.FinalEarnings.length
                for (let i = 0; i < index; i++) {
                    var DeductionString = this.FinalDeductions[i]
                    var EarningString = this.FinalEarnings[i]

                    if (DeductionString === undefined)
                        DeductionString = '-'

                    if (EarningString === undefined)
                        EarningString = '-'
                    DeductionString = String.fromCharCode(this.starter) + DeductionString + String.fromCharCode(this.ender)
                    EarningString = String.fromCharCode(this.starter) + EarningString + String.fromCharCode(this.ender)
                    TableDescriptor += EarningString
                    TableDescriptor += DeductionString
                }
                index = this.EmployerContributions.length
                for (let i = 0; i < index; i++) {
                    var EmployerString = this.EmployerContributions[i]
                    EmployerString = String.fromCharCode(this.starter) + EmployerString + String.fromCharCode(this.ender)
                    EmployerDescriptor += EmployerString
                }
                this.form.Deduction.value = this.NettDeductions
                this.form.Earnings.value = this.NettEarnings
                this.form.Nett.value = this.form.Earnings.value - this.form.Deduction.value
                this.form['EmployerHRDF'].value = this.EmployerHrdf
                this.form['EmployerEPF'].value = this.EmployerEpf
                this.form['EmployerEIS'].value = this.EmployerEis
                this.form['EmployerSOCSO'].value = this.EmployerSocso
                this.form['EmployeeEIS'].value = this.EmployeeEis
                this.form['EmployeeEPF'].value = this.EmployeeEpf
                this.form['EmployeePCB'].value = this.EmployeePcb
                this.form['EmployeeSOCSO'].value = this.EmployeeSocso
                this.form['PayrollTable'].value = TableDescriptor
                this.form['EmployerTable'].value = EmployerDescriptor
                for (var id in this.OtPayId) {
                    OTApplicationService.Update({
                        EntityId: this.OtPayId[id],
                        Entity:
                        {
                            "Paid": 1
                        },
                    });
                    this.form.PaidOtList.value = this.form.PaidOtList.value == '' ? this.OtPayId[id].toString() : this.form.PaidOtList.value + ', ' + this.OtPayId[id].toString()
                }
                
                for (var id in this.MoneyClaimingId){
                    MoneyClaimApplicationService.Update({
                        EntityId: this.MoneyClaimingId[id],
                        Entity:
                        {
                            "Paid": 1
                        },
                    });
                    this.form.PaidMoneyClaimingList.value = this.form.PaidMoneyClaimingList.value == '' ? this.MoneyClaimingId[id].toString() : this.form.PaidMoneyClaimingList.value + ', ' + this.MoneyClaimingId[id].toString()
                }
                    
                for (var id in this.NoPaidLeaveId) {
                    NoPaidLeaveService.Update({
                        EntityId: this.NoPaidLeaveId[id],
                        Entity:
                        {
                            "Deducted": 1
                        },
                    });
                    this.form.DeductedNoPaidLeaveList.value = this.form.DeductedNoPaidLeaveList.value == '' ? this.NoPaidLeaveId[id].toString() : this.form.DeductedNoPaidLeaveList.value + ', ' + this.NoPaidLeaveId[id].toString()
                }
                for (var id in this.LateArrivalId) {
                    EmployeeLateService.Update({
                        EntityId: this.LateArrivalId[id],
                        Entity:
                        {
                            "Deducted": 1
                        },
                    });
                    this.form.DeductedLateArrivalList.value = this.form.DeductedLateArrivalList.value == '' ? this.LateArrivalId[id].toString() : this.form.DeductedLateArrivalList.value + ', ' + this.LateArrivalId[id].toString()
                }
                for (var id in this.EarlyLeavingId) {
                    EmployeeEarlyLeavingService.Update({
                        EntityId: this.EarlyLeavingId[id],
                        Entity:
                        {
                            "Deducted": 1
                        },
                    });
                    this.form.DeductedEarlyLeavingList.value = this.form.DeductedEarlyLeavingList.value == '' ? this.EarlyLeavingId[id].toString() : this.form.DeductedEarlyLeavingList.value + ', ' + this.EarlyLeavingId[id].toString()
                }
                for (var id in this.OneTimeAllowanceId) {
                    EmployeeAllowanceService.Update({
                        EntityId: this.OneTimeAllowanceId[id],
                        Entity:
                        {
                            "PaidOneTime": true
                        },
                    });
                    this.form.OneTimeAllowanceList.value = this.form.OneTimeAllowanceList.value == '' ? this.OneTimeAllowanceId[id].toString() : this.form.OneTimeAllowanceList.value + ', ' + this.OneTimeAllowanceId[id].toString()
                }
                for (var id in this.OneTimeDeductionId) {
                    FixedDeductionService.Update({
                        EntityId: this.OneTimeDeductionId[id],
                        Entity:
                        {
                            "DeductedOneTime": true
                        },
                    });
                    this.form.OneTimeDeductionList.value = this.form.OneTimeDeductionList.value == '' ? this.OneTimeDeductionId[id].toString() : this.form.OneTimeDeductionList.value + ', ' + this.OneTimeDeductionId[id].toString()
                }

                super.save_submitHandler(res)
            })

        }
        else {
            var TableDescriptor = '', EmployerDescriptor = ''
            var index = 0
            if (this.FinalDeductions.length > this.FinalEarnings.length)
                index = this.FinalDeductions.length
            else
                index = this.FinalEarnings.length
            for (let i = 0; i < index; i++) {
                var DeductionString = this.FinalDeductions[i]
                var EarningString = this.FinalEarnings[i]
                if (DeductionString === undefined)
                    DeductionString = '-'
                if (EarningString === undefined)
                    EarningString = '-'
                DeductionString = String.fromCharCode(this.starter) + DeductionString + String.fromCharCode(this.ender)
                EarningString = String.fromCharCode(this.starter) + EarningString + String.fromCharCode(this.ender)
                TableDescriptor += EarningString
                TableDescriptor += DeductionString
            }
            index = this.EmployerContributions.length
            for (let i = 0; i < index; i++) {
                var EmployerString = this.EmployerContributions[i]
                EmployerString = String.fromCharCode(this.starter) + EmployerString + String.fromCharCode(this.ender)
                EmployerDescriptor += EmployerString
            }
            this.form.Deduction.value = this.NettDeductions
            this.form.Earnings.value = this.NettEarnings
            this.form.Nett.value = this.form.Earnings.value - this.form.Deduction.value
            this.form['EmployerHRDF'].value = this.EmployerHrdf
            this.form['EmployerEPF'].value = this.EmployerEpf
            this.form['EmployerEIS'].value = this.EmployerEis
            this.form['EmployerSOCSO'].value = this.EmployerSocso
            this.form['EmployeeEIS'].value = this.EmployeeEis
            this.form['EmployeeEPF'].value = this.EmployeeEpf
            this.form['EmployeePCB'].value = this.EmployeePcb
            this.form['EmployeeSOCSO'].value = this.EmployeeSocso
            this.form['PayrollTable'].value = TableDescriptor
            this.form['EmployerTable'].value = EmployerDescriptor
            super.save_submitHandler(res)
        }
    }
    protected onSaveSuccess(response): void {
        super.onSaveSuccess(response);
        if (!this.isNew()) {
            var queryString = "PayrollRowId=" + encodeURIComponent(this.entityId)
            var url = window.location.origin + '/PayrollSettings/Payroll/PdfSharpConvert?' + queryString
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send()
        }
    } 
}

class ConcretePayrollEarningsRow extends PayrollEarningsRow {
    constructor() {
        super();
    }
}


class ConcretePayrollDeductionsRow extends PayrollDeductionsRow {
    constructor() {
        super();
    }
}

class ConcreteEmployerContributionsRow extends EmployerContributionsRow {
    constructor() {
        super();
    }
}
