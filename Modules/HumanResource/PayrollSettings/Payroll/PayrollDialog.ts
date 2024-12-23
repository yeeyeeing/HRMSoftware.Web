import {  Criteria, Decorators, EditorUtils, EntityDialog, RetrieveResponse, Select2Editor } from '@serenity-is/corelib';
import { EmployeeAllowanceRow, EmployeeAllowanceService, EmployeeProfileService, EmployeeType, EPFClass, FixedDeductionRow, FixedDeductionService, MaritalStatus } from '../../../ServerTypes/EmployeeProfile';
import { EisSubjectionService, EmployerContributionsRow, EpfSubjectionService, HrdfSubjectionService, NoPaidLeaveRow, NoPaidLeaveService, PayrollDeductionsRow, PayrollDeductionsService, PayrollEarningsRow, PayrollEarningsService, PayrollForm, PayrollRow, PayrollService, PayslipDeductedOneTimeDeductionsRow, PayslipPaidMoneyClaimingRow, PayslipPaidOneTimeAllowanceRow, PcbSubjectionService, SocsoSubjectionService } from '../../../ServerTypes/PayrollSettings';
import { ListResponse, serviceCall, Authorization } from '@serenity-is/corelib/q';
import { OTApplicationRow, OTApplicationService } from '../../../ServerTypes/OTApplication';
import { alertDialog, isEmptyOrNull } from '@serenity-is/corelib/q';
import { MoneyClaimApplicationRow, MoneyClaimApplicationService } from '../../../ServerTypes/MoneyClaimApplication';
import { data } from 'jquery';
import { EmployeeEarlyLeavingRow, EmployeeEarlyLeavingService } from '../../../ServerTypes/EmployeeEarlyLeaving';
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { EmployeeLateRow, EmployeeLateService } from '../../../ServerTypes/EmployeeLate';
import { LeaveApplicationRow, LeaveApplicationService } from '../../../ServerTypes/LeaveApplication';
import { confirmDialog, confirm, notifySuccess, notifyError, notifyInfo } from '@serenity-is/corelib/q';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { AnnouncementWizardService } from '../../../ServerTypes/Announcement';

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
    public dateString: string;
    public AllowanceId: number[] = [];
    public DeductionId: number[] = [];
    public WizEmployeeRowId: number;
    public PayYear: number;
    public PayMonth: number;
    public PayDateWiz: string;
    public PayPeriodStart: string;
    public PayPeriodEnd: string;


    constructor(Wiz,WizEmployeeRowId, PayYear, PayMonth, PayDateWiz, PayPeriodStart, PayPeriodEnd) {
        super();
        this.Wiz = Wiz
        this.WizEmployeeRowId = WizEmployeeRowId
        this.PayYear = PayYear
        this.PayMonth = PayMonth
        this.PayDateWiz = PayDateWiz
        this.PayPeriodStart = PayPeriodStart
        this.PayPeriodEnd = PayPeriodEnd

        this.ReadOnly = false

    }

    public dialogClose(): void {

        $("#NewEarningsCategory").remove();
        super.dialogClose()
    }
  
    protected getDialogOptions() {
        let opt = super.getDialogOptions()
        opt.width = opt.width + 550
        return opt
    }
    public ResetTable(): void {
        console.log('reset  table')
        $('#AllowanceDeductionBody, #EarningDeductionBody, #MoneyClaimingBody').empty()
        $(`#EarlyLeavingRate, #LateArrivalRate, #EarlyLeavingSubtotal, #LateArrivalSubtotal,
        #NplDayRate, #totalOt, #NplHrRate, #AbsentDayRate`).text(0)
        var ot = document.getElementById("Ot1.0x")
        if (ot)
            ot.textContent = "0"

        ot = document.getElementById("Ot1.5x")
        if (ot)
            ot.textContent = "0"

        ot = document.getElementById("Ot2.0x")
        if (ot)
            ot.textContent = "0"
        
        ot = document.getElementById("Ot1.0xValueTotal")
        if (ot)
            ot.textContent = "0"
        ot = document.getElementById("Ot1.5xValueTotal")
        if (ot)
            ot.textContent = "0"
        ot = document.getElementById("Ot2.0xValueTotal")
        if (ot)
            ot.textContent = "0"
        $(`#OtOnePointFiveTime, #OtTwoTime, #OtOneTime, #TotalSOCSO, #TotalEPF, #Deduction,
        #Allowance, #TotalEIS, #TotalHRD, #TotalTaxableWage, #GrossWage, #EmployerEPF, #EmployeeEPF,
        #EmployerSOCSO, #EmployeeSOCSO, #EmployerEIS, #EmployeeEIS, #HRD, #PCB, #TotalAllowance, #TotalDeduction,
        #EarlyLeavingMinutes,  #LateArrivalMinutes, #GrossWage, #NettWage, #GrossWage, #totalEmployerContribution,
        #totalEmployeeContribution`).val(0)

    }
    public Setup(): void {
        var self = this
        var tabId = this.idPrefix + "PropertyGrid"
        var node3 = document.getElementById(tabId);
        console.log(node3)
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


        var div1 = document.createElement('div')
        div1.className = 'col-md-6'
        div1.id = 'left'
        var NplAbsentTableContainer = document.createElement('div')
        NplAbsentTableContainer.id = 'NplAbsentTableContainer'
        div1.appendChild(NplAbsentTableContainer)
        var OvertimeTableContainer = document.createElement('div')
        OvertimeTableContainer.id = 'OvertimeTableContainer'
        div1.appendChild(OvertimeTableContainer)

        var EarlyLeavingTableContainer = document.createElement('div')
        EarlyLeavingTableContainer.id = 'EarlyLeavingTableContainer'
        div1.appendChild(EarlyLeavingTableContainer)




        var NplAbsentTable = document.createElement("table");
        NplAbsentTable.id = 'NplAbsentTable'

        var NplAbsentTableHead = document.createElement("thead");
        NplAbsentTableHead.innerHTML = `
      <tr>
        <th rowspan="2">NPL/Absent</th>
        <th colspan="3" id="totalNplAbsentDeduction">
            <span>Total:</span> <span id="totalNplAbsent">0</span>
        </th>
      </tr>
      `;
        NplAbsentTable.appendChild(NplAbsentTableHead);
        var tableData = [
            { label: "NPL Day", id: "NplDayRate", inputId: "NplDay", valueId: "NplDayValue", value: 0, total: 0, adjustment: 0 },
            { label: "NPL Hourly", id: "NplHrRate", inputId: "NplHr", valueId: "NplHrValue", value: 0, total: 0, adjustment: 0 },
            { label: "Absent Day", id: "AbsentDayRate", inputId: "AbsentDay", valueId: "AbsentDayValue", value: 0, total: 0, adjustment: 0 },
        ];

        const NplAbsentTableBody = document.createElement("tbody");
        NplAbsentTableBody.id = 'NplAbsentTableBody'
        tableData.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td class="Description">${row.label}</td>
        <td class="rates"> <span class="ratesValue" id = ${row.id} > ${row.value} </span> </td>
        <td class ="numberInputContainer"> <input id = ${row.inputId} min="0" class="nplDates numberInput" type="number" value="${row.total.toFixed(2)}" ></td>
        <td class ="subTotalContainer">  <span id = ${row.valueId} class="subTotal">0.00</span> </td>
      `;
            NplAbsentTableBody.appendChild(tr);
        });
        NplAbsentTable.appendChild(NplAbsentTableBody);
        NplAbsentTableContainer.appendChild(NplAbsentTable);









        var OvertimeTable = document.createElement("table");
        OvertimeTable.id = 'OvertimeTable'

        var OvertimeTableHead = document.createElement("thead");
        OvertimeTableHead.innerHTML = `
      <tr>
        <th rowspan="2">Overtime</th>
        <th colspan="3" id="OvertimeAddition">
            <span>Total:</span> <span id="totalOt">0</span>
        </th>
      </tr>
      `;

        OvertimeTable.appendChild(OvertimeTableHead);
        var OtData = [
            { label: "OT1.0x", descId:"flatOtDesc",id: "Ot1.0x", valueId: "Ot1.0xValue", inputId: "OtOneTime", value: 0, total: 0, adjustment: 0 },
            { label: "OT1.5x", descId: "OnePointFiveOtDesc",id: "Ot1.5x", valueId: "Ot1.5xValue", inputId: "OtOnePointFiveTime", value: 0, total: 0, adjustment: 0 },
            { label: "OT2.0x", descId: "TwoOtDesc",id: "Ot2.0x", valueId: "Ot2.0xValue", inputId: "OtTwoTime", value: 0, total: 0, adjustment: 0 },
        ];


        const OvertimeTableBody = document.createElement("tbody");
        OvertimeTableBody.id = 'OvertimeTableBody'
        OtData.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td class="Description" id=${row.descId}>${row.label}</td>
        <td class="rates"> <span class="ratesValue" id=${row.id}> ${row.value} </span> </td>
        <td class ="numberInputContainer"> <input id=${row.inputId} min="0" class="overtime numberInput" type="number" value="${row.total.toFixed(2)}" ></td>
        <td>  <span class="subTotal" id=${row.valueId}Total>0.00</span> </td>
      `;
            OvertimeTableBody.appendChild(tr);
        });
        OvertimeTable.appendChild(OvertimeTableBody);
        OvertimeTableContainer.appendChild(OvertimeTable);












        var EarlyLeavingTable = document.createElement("table");
        EarlyLeavingTable.id = 'EarlyLeavingTable'

        var EarlyLeavingTableHead = document.createElement("thead");
        EarlyLeavingTableHead.innerHTML = `
      <tr>
        <th rowspan="2">Time Deduction</th>
        <th colspan="3" id="ShiftAddition">
            <span>Total:</span> <span id="totalTimeDeduction">0</span>
        </th>
      </tr>
      `;

        EarlyLeavingTable.appendChild(EarlyLeavingTableHead);
        var ShiftData = [
            { label: "Early Leaving", Minutes: "EarlyLeavingMinutes", RateId: "EarlyLeavingRate", SubtotalId: "EarlyLeavingSubtotal", total: 0, adjustment: 0 },
            { label: "Late Arrival", Minutes: "LateArrivalMinutes", RateId: "LateArrivalRate", SubtotalId: "LateArrivalSubtotal", total: 0, adjustment: 0 }
        ];

        const EarlyLeavingTableBody = document.createElement("tbody");
        EarlyLeavingTableBody.id = 'EarlyLeavingTableBody'
        ShiftData.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td class="Description">${row.label}</td>
        <td class="rates"> <span id=${row.RateId} class="ratesValue">0</span> </td>
        <td class ="numberInputContainer"> <input min="0" id=${row.Minutes} class="time numberInput" type="number" value="${row.total.toString()}" ></td>
        <td>  <span class="subTotal"  id=${row.SubtotalId} >0.00</span> </td>
      `;
            EarlyLeavingTableBody.appendChild(tr);
        });
        EarlyLeavingTable.appendChild(EarlyLeavingTableBody);
        EarlyLeavingTableContainer.appendChild(EarlyLeavingTable);










        var div2 = document.createElement('div')
        div2.className = 'col-md-4'
        div2.id = 'center'
        var AllowanceDeductionContainer = document.createElement('div')
        AllowanceDeductionContainer.id = 'AllowanceDeductionContainer'
        div2.appendChild(AllowanceDeductionContainer)

        var AllowanceDeductionTable = document.createElement("table");
        AllowanceDeductionTable.id = 'AllowanceDeductionTable'

        var AllowanceDeductionHead = document.createElement("thead");
        AllowanceDeductionHead.innerHTML = `
      <tr>
        <th colspan="3">Allowance/Deduction</th>
      </tr>
      <tr>
        <th>Code</th>
        <th>Description</th>
        <th>Amount</th>
      </tr>
      `;

        AllowanceDeductionTable.appendChild(AllowanceDeductionHead);

        const AllowanceDeductionBody = document.createElement("tbody");
        AllowanceDeductionBody.id = 'AllowanceDeductionBody'
        AllowanceDeductionTable.appendChild(AllowanceDeductionBody);
        AllowanceDeductionContainer.appendChild(AllowanceDeductionTable);












        var MoneyClaimingContainer = document.createElement('div')
        MoneyClaimingContainer.id = 'MoneyClaimingContainer'
        div2.appendChild(MoneyClaimingContainer)

        var MoneyClaimingTable = document.createElement("table");
        MoneyClaimingTable.id = 'MoneyClaimingTable'

        var MoneyClaimingHead = document.createElement("thead");
        MoneyClaimingHead.innerHTML = `
      <tr>
        <th colspan="3">Money Claiming</th>
      </tr>
      <tr>
        <th>Category</th>
        <th>Description</th>
        <th>Amount</th>
      </tr>
      `;

        MoneyClaimingTable.appendChild(MoneyClaimingHead);
        const MoneyClaimingBody = document.createElement("tbody");
        MoneyClaimingBody.id = 'MoneyClaimingBody'
        MoneyClaimingTable.appendChild(MoneyClaimingBody);
        MoneyClaimingContainer.appendChild(MoneyClaimingTable);











        var EarningDeductionContainer = document.createElement('div')
        EarningDeductionContainer.id = 'EarningDeductionContainer'
        div2.appendChild(EarningDeductionContainer)

        var EarningDeductionTable = document.createElement("table");
        EarningDeductionTable.id = 'EarningDeductionTable'

        var EarningDeductionHead = document.createElement("thead");
        EarningDeductionHead.innerHTML = `
      <tr>
        <th colspan="3">Extra Earnings/Deductions</th>
      </tr>
      <tr>
        <th>Code</th>
        <th>Description</th>
        <th>Amount</th>
      </tr>
      `;

        EarningDeductionTable.appendChild(EarningDeductionHead);
        const EarningDeductionBody = document.createElement("tbody");
        EarningDeductionBody.id = 'EarningDeductionBody'
        EarningDeductionTable.appendChild(EarningDeductionBody);
        EarningDeductionContainer.appendChild(EarningDeductionTable);












        var div3 = document.createElement('div')
        div3.className = 'col-md-2 section'
        div3.id = 'right'
        const htmlContent1 = `
      <h3>Statutory Contribution</h3>
      <table class = "StatutoryContribution">

        <tr>
          <td></td>
          <td>Employer</td>
          <td>Employee</td>
        </tr>

        <tr>
          <td>EPF</td>
          <td><input class="govPayment" id="EmployerEPF" type="number" value="0.0" ></td>
          <td><input class="govPayment" id="EmployeeEPF" type="number" value="0.0" ></td>
        </tr>

        
        <tr>
          <td>SOCSO </td>
          <td><input class="govPayment" id="EmployerSOCSO" type="number" value="0.0" ></td>
          <td><input class="govPayment" id="EmployeeSOCSO" type="number" value="0.0" ></td>
        </tr>

        <tr>
          <td>EIS </td>
          <td><input class="govPayment" id="EmployerEIS" type="number" value="0.0" ></td>
          <td><input class="govPayment" id="EmployeeEIS" type="number" value="0.0" ></td>
        </tr>

        <tr>
          <td>HRD</td>
          <td><input class="govPayment" id="HRD" type="number" value="0.0" ></td>
          <td></td>
        </tr>

        <tr>
          <td>PCB</td>
           <td></td>
          <td><input class="govPayment" id="PCB" type="number" value="0.0" ></td>
        </tr>

        <tr>
          <td>Total</td>
          <td><input class="govPayment" id="totalEmployerContribution" type="number" value="0.0" readonly></td>
          <td><input class="govPayment" id="totalEmployeeContribution" type="number" value="0.0" readonly></td>
        </tr>


      </table>
    `;
        const htmlContent2 = `
      <h3>Total Wages</h3>
      <table class = "TotalWages" >
        <tr>
          <td>Total Allowance</td>
          <td><input id="TotalAllowance" type="number" value="0.0" readonly></td>
        </tr>
        <tr>
          <td>Total Deduction</td>
          <td><input id="TotalDeduction" type="number" value="0.00" readonly></td>
        </tr>
        <tr>
          <td>EPF Wage</td>
          <td><input id="TotalEPF" type="number" value="0.0" readonly></td>
        </tr>
        <tr>
          <td>HRD Wage</td>
          <td><input id="TotalHRD" type="number" value="0.0" readonly></td>
        </tr>



        <tr>
          <td>SOCSO Wage</td>
          <td><input id="TotalSOCSO" type="number" value="0.0" readonly></td>
        </tr>
        <tr>
          <td>EIS Wage</td>
          <td><input id="TotalEIS" type="number" value="0.0" readonly></td>
        </tr>
        <tr>
          <td>Total Taxable Wage</td>
          <td><input id="TotalTaxableWage" type="number" value="0.0" readonly></td>
        </tr>
        <tr>
          <td>Gross Wage</td>
          <td><input id="GrossWage"  type="number" value="0.0" readonly></td>
        </tr>
        <tr>
          <td>Nett Wage</td>
          <td><input id="NettWage" type="number" value="0.0" readonly></td>
        </tr>
      </table>
    `

        var AllowanceDeductionContainer = document.createElement('div')
        AllowanceDeductionContainer.id = 'AllowanceDeductionContainer'
        AllowanceDeductionContainer.className = 'section'
        AllowanceDeductionContainer.innerHTML = htmlContent1
        div3.appendChild(AllowanceDeductionContainer)


        var Container2 = document.createElement('div')
        Container2.id = 'Container2'
        Container2.className = 'section'
        Container2.innerHTML = htmlContent2
        div3.appendChild(Container2)


        document.getElementById("PayRollGrid").append(div1);
        document.getElementById("PayRollGrid").append(div2);
        document.getElementById("PayRollGrid").append(div3);


        var govPayment = document.getElementsByClassName('govPayment');
        $(govPayment).on('change', async function (e) {
            self.updateWages()
        })


        var nplDates = document.getElementsByClassName('numberInput');
        $(nplDates).on('change', async function (e) {
            self.updateTotals()
        })

    }
    public onDialogOpen() {
        super.onDialogOpen()
        var self = this
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


                            if (this.isNew()) {
                                var Overtime = 'Overtime Payments'
                                var Eis = this.CheckSubjection(this.ListOfEisSubjection, Overtime)
                                var Epf = this.CheckSubjection(this.ListOfEpfSubjection, Overtime)
                                var Hrdf = this.CheckSubjection(this.ListOfHrdfSubjection, Overtime)
                                var Pcb = this.CheckSubjection(this.ListOfPcbSubjection, Overtime)
                                var Socso = this.CheckSubjection(this.ListOfSocsoSubjection, Overtime)
                                self.form.OtSubjectEis.value = Eis == 1 ? true : false
                                self.form.OtSubjectEpf.value = Epf == 1 ? true : false
                                self.form.OtSubjectHrdf.value = Hrdf == 1 ? true : false
                                self.form.OtSubjectPcb.value = Pcb == 1 ? true : false
                                self.form.OtSubjectSocso.value = Socso == 1 ? true : false

                                $('#totalOt').attr('eis', Eis)
                                $('#totalOt').attr('epf', Epf)
                                $('#totalOt').attr('hrdf', Hrdf)
                                $('#totalOt').attr('pcb', Pcb)
                                $('#totalOt').attr('socso', Socso)
                            }

                        });

                    });

                });

            });

        });

    }
    public WeekdayMultiplier: number;
    public WeekendMultiplier: number;
    public PublicHolidayMultiplier: number;
    public calculateAge(): number {
        const today = new Date(this.dateString);
        const birthday = new Date(this.form.BirthDay.value);
        const age = today.getFullYear() - birthday.getFullYear();
        const lastBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
        if (today < lastBirthday) 
            lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
        const timeSinceLastBirthday = today.getTime() - lastBirthday.getTime();
        const nextBirthday = new Date(lastBirthday);
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        const yearLengthInMilliseconds = nextBirthday.getTime() - lastBirthday.getTime();
        const fractionalAge = timeSinceLastBirthday / yearLengthInMilliseconds;
        return age + fractionalAge;
    }
    public dialogOpen(asPanel?: boolean): void {
        $('.field.BasicPay, .field.DailyPay, .field.DailyRate, .field.DaysWorked, .field.HourlyRate, .field.BirthDay, .field.Age').addClass('col-md-2');
        $(` .field.WorkingSpouse`).addClass('col-md-1');
        $(` .field.ChildrenUnderEighteen, .field.ChildrenInUniversity, .field.DisabledChildInUniversity, .field.DisabledChild`).addClass('col-md-2');
        $(`.field.MaritalStatus`).addClass('col-md-3');
        $(`.field.MaritalStatus label.caption, .field.WorkingSpouse label.caption, .field.ChildrenUnderEighteen label.caption, .field.ChildrenInUniversity label.caption,
        .field.DisabledChildInUniversity label.caption, .field.DisabledChild label.caption, .field.Age label.caption, .field.BirthDay label.caption`).removeClass('caption');
 
        this.ResetTable()    
        $('.field.EisClass').addClass('col-md-2');
        $('.field.SocsoClass').addClass('col-md-6');
        $('.field.EpfClass').addClass('col-md-3');
        $('.field.TaxClass').addClass('col-md-1');
        $(`.field.BasicPay label.caption, .field.DailyPay label.caption, .field.DailyRate label.caption, .field.DaysWorked label.caption,
        .field.HourlyRate label.caption, .field.EisClass label.caption, .field.SocsoClass label.caption, .field.EpfClass label.caption, .field.TaxClass label.caption `).removeClass('caption');
        EditorUtils.setReadonly(this.form.BasicPay.element, true);
        EditorUtils.setReadonly(this.form.DaysWorked.element, true);
        EditorUtils.setReadonly(this.form.HourlyRate.element, true);
        EditorUtils.setReadonly(this.form.DailyRate.element, true);
        EditorUtils.setReadonly(this.form.TaxClass.element, true);
        EditorUtils.setReadonly(this.form.Age.element, true);
        EditorUtils.setReadonly(this.form.BirthDay.element, true);
        this.form.EpfClass.value = EPFClass.Class_1.valueOf().toString()
        $(`.DeductedEarlyLeavingList, .OneTimeDeductionList, .DeductedNoPaidLeaveList,
        .DeductedLateArrivalList, .OneTimeAllowanceList, .PaidMoneyClaimingList, .PaidOtList, .EarlyLeavingRate, .LateArrivalRate, .EarlyLeaving,
        .LateArrival, .FlatOt, .OtOne, .OtOnePointFive, .OtTwo, .NPLHourlyRate, .NPLDailyRate, .NPLHourly, .NPLDaily, .AbsentDailyRate, .AbsentDaily,
        .OtSubjectEpf, .OtSubjectEis, .OtSubjectPcb, .OtSubjectSocso, .OtSubjectHrdf, .AllowanceList, .DeductionList, .OtOnePointFiveRate, .OtTwoRate`).hide()
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
                    self.PublicHolidayMultiplier = (response.Entities[index].PublicHolidayOnePointFive == true ? 1.5 : 2)
                    self.WeekendMultiplier = (response.Entities[index].WeekendOnePointFive == true ? 1.5 : 2)
                    self.WeekdayMultiplier = (response.Entities[index].WeekdayOnePointFive == true ? 1.5 : 2)
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

        });

        super.dialogOpen(asPanel);
        
        if (self.isNew())
        this.applyChangesButton.hide()
        EditorUtils.setReadonly(this.form.EmployeeName.element, true);
        var EmployeeRowIdValue = this.form.EmployeeRowId.value
        let ElementsArray: string[] = ['Deduction', 'Earnings', 'Nett', 'EmployeeEIS', 'EmployeeEPF', 'EmployeeSOCSO', 'EmployeePCB', 'PayrollTable', 'EmployerTable', 'EmployerHRDF', 'EmployerEPF', 'EmployerEIS', 'EmployerSOCSO']
        for (var index in ElementsArray)
            $('.' + ElementsArray[index]).hide();
        this.Setup()
        EmployeeProfileService.List({
        }, response => {
            var PayPeriodStartElement = document.getElementById(this.idPrefix + 'PayPeriodStart')
            var PayPeriodEndElement = document.getElementById(this.idPrefix + 'PayPeriodEnd')

            var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
            var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth')
            var PayYearElement = document.getElementById(this.idPrefix + 'PayYear')


            var EisClass = document.getElementById(this.idPrefix + 'EisClass')
            var SocsoClass = document.getElementById(this.idPrefix + 'SocsoClass')
            var EpfClass = document.getElementById(this.idPrefix + 'EpfClass')
            var MaritalStatusElement = document.getElementById(this.idPrefix + 'MaritalStatus')
            var WorkingSpouse = document.getElementById(this.idPrefix + 'WorkingSpouse')
            var ChildrenUnderEighteen = document.getElementById(this.idPrefix + 'ChildrenUnderEighteen')
            var ChildrenInUniversity = document.getElementById(this.idPrefix + 'ChildrenInUniversity')
            var DisabledChild = document.getElementById(this.idPrefix + 'DisabledChild')
            var DisabledChildInUniversity = document.getElementById(this.idPrefix + 'DisabledChildInUniversity')

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
            let EmployeeRowIdEditor = new Select2Editor($(EmployeeRowIdElement))
            interface Item {
                id: number;
                name: string;
                BasicPay: number;
                Allowance: number;
                type: number;
                EpfSubjection: number;
                EisClass: number;
                EpfClass: number;
                SocsoClass: number;

                MaritalStatus: number;
                WorkingSpouse: boolean;
                ChildrenUnderEighteen: number;
                ChildrenInUniversity: number;
                DisabledChildInUniversity: number;
                DisabledChild: number;
                Birthday: string;
            }


            let listOfDicts: Item[] = [];
            for (var index in response.Entities) {
                EmployeeRowIdEditor.addItem({ id: (response.Entities[index].Id).toString(), text: (response.Entities[index].EmployeeID).toString(), }); // 8am - 6pm , will consider lates
                listOfDicts.push({
                    id: response.Entities[index].Id, name: response.Entities[index].EmployeeName, BasicPay:
                        response.Entities[index].BasicSalary, Allowance: response.Entities[index].Allowance, type: response.Entities[index].EmployeeType,
                    EpfSubjection: response.Entities[index].EpfContribution, 'EisClass': response.Entities[index].EisClass,
                    'EpfClass': response.Entities[index].EpfClass, 'SocsoClass': response.Entities[index].SocsoClass,
                    'MaritalStatus': response.Entities[index].MaritalStatus, 'WorkingSpouse': response.Entities[index].WorkingSpouse,
                    'ChildrenUnderEighteen': response.Entities[index].ChildrenUnderEighteen, 'ChildrenInUniversity': response.Entities[index].ChildrenInUniversity,
                    'DisabledChildInUniversity': response.Entities[index].DisabledChildInUniversity, 'DisabledChild': response.Entities[index].DisabledChild,
                    'Birthday': response.Entities[index].Birthday
                });
            }
            this.listOfDicts = listOfDicts
            if (self.isNew())
            $(EmployeeRowIdElement).on('change', async function (e) {
                e.stopImmediatePropagation()
                self.GeneratePayrollTable(1)
            })

            if (self.Wiz!=1)
            { 
            $(EisClass).on('change', async function (e) {
                e.stopImmediatePropagation()
                self.updatePayroll()
            })

            $(SocsoClass).on('change', async function (e) {
                e.stopImmediatePropagation()
                self.updatePayroll()
            })

            $(EpfClass).on('change', async function (e) {
                e.stopImmediatePropagation()
                self.updatePayroll()
            })

            $(WorkingSpouse).on('change', async function (e) {
                console.log('haha')
                e.stopImmediatePropagation()
                self.updatePayroll()
            })
            $(ChildrenUnderEighteen).on('change', async function (e) {
                e.stopImmediatePropagation()
                self.updatePayroll()
            })
            $(MaritalStatusElement).on('change', async function (e) {
                console.log('hhaa')
                if (parseInt(self.form.MaritalStatus.value) == MaritalStatus.Married.valueOf())
                    $('.WorkingSpouse, .ChildrenUnderEighteen, .ChildrenInUniversity, .DisabledChild, .DisabledChildInUniversity').show()

                else if (parseInt(self.form.MaritalStatus.value) == MaritalStatus.Single.valueOf())
                    $('.WorkingSpouse, .ChildrenUnderEighteen, .ChildrenInUniversity, .DisabledChild, .DisabledChildInUniversity').hide()

            })
            $(ChildrenInUniversity).on('change', async function (e) {
                e.stopImmediatePropagation()
                self.updatePayroll()
            })

            $(DisabledChild).on('change', async function (e) {
                e.stopImmediatePropagation()
                self.updatePayroll()
            })
            $(DisabledChildInUniversity).on('change', async function (e) {
                e.stopImmediatePropagation()
                self.updatePayroll()
            })
        }
            if (this.isNew()) {

                $(PayMonthElement).on('change', async function (e) {
                    e.stopImmediatePropagation()
                    self.GeneratePayrollTable(1)
                })
                $(PayYearElement).on('change', async function (e) {
                    e.stopImmediatePropagation()
                    self.GeneratePayrollTable(1)
                })
                $(PayPeriodStartElement).on('change', async function (e) {
                    if (self.form.PayPeriodStart.valueAsDate > self.form.PayPeriodEnd.valueAsDate) {
                        alertDialog('Pay period start cannot be ahead of pay period end')
                        self.form.PayPeriodStart.value = ''
                        return
                    }
                    self.GeneratePayrollTable(0)

                })
                $(PayPeriodEndElement).on('change', async function (e) {
                    if (self.form.PayPeriodStart.valueAsDate > self.form.PayPeriodEnd.valueAsDate) {
                        alertDialog('Pay period start cannot be ahead of pay period end')
                        self.form.PayPeriodEnd.value = ''
                        return
                    }
                    self.GeneratePayrollTable(0)
                })
                $(`.field.MaritalStatus, .field.WorkingSpouse, .field.ChildrenUnderEighteen, .field.ChildrenInUniversity,
        .field.DisabledChildInUniversity, .field.DisabledChild,  .field.DaysWorked, .field.BasicPay, .field.DailyRate,
        .field.HourlyRate, .field.EisClass, .field.SocsoClass, .field.EpfClass, .field.TaxClass, .field.addEarnings, .field.addDeductions,
        .field.BirthDay, .field.Age,  .addEarnings, .addDeductions`).hide();
               
            }
            else if (!this.isNew()) {
                EditorUtils.setReadonly(this.form.PayMonth.element, true);
                EditorUtils.setReadonly(this.form.PayYear.element, true);
                EditorUtils.setReadonly(this.form.PayDate.element, true);
                EditorUtils.setReadonly(this.form.PayPeriodEnd.element, true);
                EditorUtils.setReadonly(this.form.PayPeriodStart.element, true);
                $(PayYearElement).val(this.form.PayYear.value).trigger('change')
                $(PayMonthElement).val(this.form.PayMonth.value).trigger('change')
                for (var index in listOfDicts) {
                    if (listOfDicts[index].id == parseInt(EmployeeRowIdValue))
                        this.EmployeeType = listOfDicts[index].type
                }
                $(EmployeeRowIdElement).val(EmployeeRowIdValue.toString()).trigger('change');
                EditorUtils.setReadonly(this.form.EmployeeRowId.element, true);
                $("#PCB").val(this.form.EmployeePCB.value)
                $("#EmployeeEIS").val(this.form.EmployeeEIS.value)
                $("#EmployeeEPF").val(this.form.EmployeeEPF.value) 
                $("#EmployeeSOCSO").val(this.form.EmployeeSOCSO.value) 
                $("#EmployerEIS").val(this.form.EmployerEIS.value) 
                $("#EmployerEPF").val(this.form.EmployerEPF.value) 
                $("#HRD").val(this.form.EmployerHRDF.value) 
                $("#EmployerSOCSO").val(this.form.EmployerSOCSO.value) 
                $("#NplDayRate").text(this.form.NPLDailyRate.value)
                $("#NplHrRate").text(this.form.NPLHourlyRate.value) 
                $("#AbsentDayRate").text(this.form.AbsentDailyRate.value) 
                $("#NplDay").val(this.form.NPLDaily.value)
                $("#NplHr").val(this.form.NPLHourly.value)
                $("#AbsentDay").val(this.form.AbsentDaily.value)
                // console.log((this.form.FlatOt.value * 1.5))
                document.getElementById('Ot1.0x').textContent = this.form.FlatOt.value.toString()
                document.getElementById('Ot1.5x').textContent = this.form.OtOnePointFiveRate.value.toString()
                document.getElementById('Ot2.0x').textContent = this.form.OtTwoRate.value.toString()
                $('#OtOneTime').val(this.form.OtOne.value)
                $('#OtOnePointFiveTime').val(this.form.OtOnePointFive.value)
                $('#OtTwoTime').val(this.form.OtTwo.value)
                $("#EarlyLeavingRate").text(this.form.EarlyLeavingRate.value)
                $("#LateArrivalRate").text(this.form.LateArrivalRate.value)
                $('#EarlyLeavingMinutes').val(this.form.EarlyLeaving.value)
                $('#LateArrivalMinutes').val(this.form.LateArrival.value)
                $('#totalOt').attr('eis', self.form.OtSubjectEis.value.toString())
                $('#totalOt').attr('epf', self.form.OtSubjectEpf.value.toString())
                $('#totalOt').attr('hrdf', self.form.OtSubjectHrdf.value.toString())
                $('#totalOt').attr('pcb', self.form.OtSubjectPcb.value.toString())
                $('#totalOt').attr('socso', self.form.OtSubjectSocso.value.toString())
                let i = 0;
                for (i = 0; i < this.form.AllowanceList.value.length;i++) {
                    var rowBuffer = document.createElement('tr')
                    rowBuffer.innerHTML = `<td>${this.form.AllowanceList.value[i].code}</td><td>${this.form.AllowanceList.value[i].Description}</td>
                                            <td class = "AllowanceAmount" eis =  ${this.form.AllowanceList.value[i].SubjectionEis.toString()} epf =  ${this.form.AllowanceList.value[i].SubjectionEpf.toString()}
                                            hrdf =  ${this.form.AllowanceList.value[i].SubjectionHrdf.toString()} pcb =  ${this.form.AllowanceList.value[i].SubjectionPcb.toString()}
                                                socso =  ${this.form.AllowanceList.value[i].SubjectionSocso.toString()} 
                                            >${this.form.AllowanceList.value[i].AllowanceAmount}</td>`
                    $('#AllowanceDeductionBody').append(rowBuffer)
                }
                for (i = 0; i < this.form.DeductionList.value.length; i++) {
                    var rowBuffer = document.createElement('tr')
                    rowBuffer.innerHTML = `<td>${this.form.DeductionList.value[i].code}</td><td>${this.form.DeductionList.value[i].Description}</td><td class = "DeductionAmount">${this.form.DeductionList.value[i].DeductionAmount}</td>`
                    $('#AllowanceDeductionBody').append(rowBuffer)
                }
                for (i = 0; i < this.form.PaidMoneyClaimingList.value.length; i++) {
                    var rowBuffer = document.createElement('tr')
                    rowBuffer.innerHTML = `<td>${this.form.PaidMoneyClaimingList.value[i].ClaimingCategory}</td><td>${this.form.PaidMoneyClaimingList.value[i].Description}</td>
                                            <td  eis =  ${this.form.PaidMoneyClaimingList.value[i].SubjectionEis.toString()} epf =  ${this.form.PaidMoneyClaimingList.value[i].SubjectionEpf.toString()}
                                            hrdf =  ${this.form.PaidMoneyClaimingList.value[i].SubjectionHrdf.toString()} pcb =  ${this.form.PaidMoneyClaimingList.value[i].SubjectionPcb.toString()}
                                                socso =  ${this.form.PaidMoneyClaimingList.value[i].SubjectionSocso.toString()} 
                                            >${this.form.PaidMoneyClaimingList.value[i].ClaimAmount}</td>`
                    $('#MoneyClaimingBody').append(rowBuffer)

                }
                for (i = 0; i < this.form.PayrollEarnings.value.length; i++) {
                    var info = this.form.PayrollEarnings.value[i]
                    var bufferRow = document.createElement('tr')
                    var bufferRow = document.createElement('tr')
                    bufferRow.innerHTML = `<td> <span>${info.EarningCode}</span>           <button class="remove">×</button>
                            </td><td>${info.Description}</td><td> <input class = numberInput type="number" min="0" eis = ${info.SubjectionToEis} epf = ${info.SubjectionToEpf} hrdf = ${info.SubjectionToHrdf}
                             pcb = ${info.SubjectionToPcb} socso = ${info.SubjectionToSocso}  value = ${info.Amount} ></input>           </td>`
                    $('#EarningDeductionBody').append(bufferRow)
                }
                for (i = 0; i < this.form.PayrollDeductions.value.length; i++) 
                {
                    info = this.form.PayrollDeductions.value[i]
                    var bufferRow = document.createElement('tr')
                    bufferRow.innerHTML = `<td>${info.DeductionCode}  <button class="remove">×</button>
                            </td><td>${info.Description}</td><td> <input class = numberInput type="number" max="0"  value = "${info.Amount}" ></input>           </td>`
                    $('#EarningDeductionBody').append(bufferRow)

                }
                $('.remove').on('click', async function (e) {
                    $(this).closest('tr').remove(); // Remove the row
                    self.updatePayroll()
                })
                $('.numberInput').on('change', async function (e) {
                    self.updatePayroll()
                })
                self.updateTotals()
                self.updatePayroll()
            }
            if (self.Wiz == 1) {
                self.form.EmployeeRowId.value = self.WizEmployeeRowId.toString()
                self.form.PayMonth.value = self.PayMonth
                self.form.PayYear.value = self.PayYear
                self.form.PayPeriodStart.value = self.PayPeriodStart
                self.form.PayPeriodEnd.value = self.PayPeriodEnd
                self.form.PayDate.value = self.PayDateWiz
            }
            /*
            if (!isEmptyOrNull(self.WizEmployeeRowId)) {
                self.form.EmployeeRowId.value = self.WizEmployeeRowId.toString()
                self.form.PayMonth.value = self.PayMonth
                self.form.PayYear.value = self.PayYear
                self.form.PayPeriodStart.value = self.PayPeriodStart
                self.form.PayPeriodEnd.value = self.PayPeriodEnd
                self.form.PayDate.value = self.PayDateWiz
                self.Wiz = 1
                $(PayYearElement).val(this.form.PayYear.value).trigger('change')
            }
            */
        });
    }
    public Wiz: number;
    public extraEarningDeduction: number;
    public updatePayroll(): void {
        var self = this
        this.extraEarningDeduction = 0
        if (isEmptyOrNull(self.form.EpfClass.value) || isEmptyOrNull(self.form.EisClass.value) ||
            isEmptyOrNull(self.form.SocsoClass.value) || isEmptyOrNull(self.form.WorkingSpouse.value) ||
            isEmptyOrNull(self.form.ChildrenUnderEighteen.value) || isEmptyOrNull(self.form.ChildrenInUniversity.value) ||
            isEmptyOrNull(self.form.DisabledChild.value) || isEmptyOrNull(self.form.DisabledChildInUniversity.value))
            return

        var BasicPay = this.form.BasicPay.value
        var totalNplAbsent = parseFloat(document.getElementById('totalNplAbsent').innerHTML)
        var totalTimeDeduction = parseFloat(document.getElementById('totalTimeDeduction').innerHTML)
        var OtElement = document.getElementById('totalOt')
        var totalOt = parseFloat(OtElement.innerHTML)
        let totalNplTimeDeduction = totalNplAbsent + totalTimeDeduction
        let totalAllowance = 0;
        let totalDeductions = 0;

        let subjectEis = 0;
        let subjectEpf = 0;
        let subjectHrdf = 0;
        let subjectPcb = 0;
        let subjectSocso = 0;
        // Get the table body by its ID
        let AllowanceDeductionBody = document.getElementById("AllowanceDeductionBody");
        if (AllowanceDeductionBody) {
            Array.from(AllowanceDeductionBody.rows).forEach(row => {
                let amountCell = row.cells[2];  // Third column: Allowance amount cell
                let amount = parseFloat(amountCell.innerText.trim()) || 0; // Parse the amount
                if (amount > 0)
                    totalAllowance += amount
                else if (amount < 0)
                    totalDeductions += amount

                if (amountCell.getAttribute("eis") === "true") subjectEis += amount;
                if (amountCell.getAttribute("epf") === "true") subjectEpf += amount;
                if (amountCell.getAttribute("hrdf") === "true") subjectHrdf += amount;
                if (amountCell.getAttribute("pcb") === "true") subjectPcb += amount;
                if (amountCell.getAttribute("socso") === "true") subjectSocso += amount;
            });
        }

        $('#TotalAllowance').val(totalAllowance)
        $('#TotalDeduction').val(totalDeductions)
        let MoneyClaimingBody = document.getElementById("MoneyClaimingBody");
        if (MoneyClaimingBody) {
            Array.from(MoneyClaimingBody.rows).forEach(row => {
                let amountCell = row.cells[2];  // Third column: Allowance amount cell
                let amount = parseFloat(amountCell.innerText.trim()) || 0; // Parse the amount
                self.extraEarningDeduction += amount
                // Check and add the amount to respective sums if the attribute is "true"
                if (amountCell.getAttribute("eis") === "true") subjectEis += amount;
                if (amountCell.getAttribute("epf") === "true") subjectEpf += amount;
                if (amountCell.getAttribute("hrdf") === "true") subjectHrdf += amount;
                if (amountCell.getAttribute("pcb") === "true") subjectPcb += amount;
                if (amountCell.getAttribute("socso") === "true") subjectSocso += amount;
            });
        }

        let EarningDeductionBody = document.getElementById('EarningDeductionBody')
        if (EarningDeductionBody){
            Array.from(EarningDeductionBody.rows).forEach(row => {
                console.log(row)
                let amountCell = row.querySelector('input.numberInput');  // Third column: Allowance amount cell
                let amount = parseFloat(amountCell.value) || 0; // Parse the amount
                self.extraEarningDeduction += amount
                // Check and add the amount to respective sums if the attribute is "true"
                if (amountCell.getAttribute("eis") === "true") subjectEis += amount;
                if (amountCell.getAttribute("epf") === "true") subjectEpf += amount;
                if (amountCell.getAttribute("hrdf") === "true") subjectHrdf += amount;
                if (amountCell.getAttribute("pcb") === "true") subjectPcb += amount;
                if (amountCell.getAttribute("socso") === "true") subjectSocso += amount;
            });
        }

        // Iterate through each row in the table body
        if (OtElement.getAttribute("eis") === "true") subjectEis += totalOt;
        if (OtElement.getAttribute("epf") === "true") subjectEpf += totalOt;
        if (OtElement.getAttribute("hrdf") === "true") subjectHrdf += totalOt;
        if (OtElement.getAttribute("pcb") === "true") subjectPcb += totalOt;
        if (OtElement.getAttribute("socso") === "true") subjectSocso += totalOt;
        subjectEis += BasicPay;
        subjectEpf += BasicPay;
        subjectHrdf += BasicPay;
        subjectPcb += BasicPay;
        subjectSocso += BasicPay;
        subjectEis -= totalNplTimeDeduction;
        subjectEpf -= totalNplTimeDeduction;
        subjectHrdf -= totalNplTimeDeduction;
        subjectPcb -= totalNplTimeDeduction;
        subjectSocso -= totalNplTimeDeduction;
        $('#TotalEPF').val(subjectEpf.toFixed(2))
        $('#TotalHRD').val(subjectHrdf.toFixed(2))
        $('#TotalSOCSO').val(subjectSocso.toFixed(2))
        $('#TotalEIS').val(subjectEis.toFixed(2))
        $('#TotalTaxableWage').val(subjectPcb.toFixed(2))
        
        var WorkSpouse = self.form.WorkingSpouse.value == true? 1:0
        serviceCall<ListResponse<any>>({
            service: PayrollService.baseUrl + '/CalculateGovernmentPaymentSpecial',
            method: "GET",
            data: {
                "EisCategory": self.form.EisClass.value,
                "EpfCategory": self.form.EpfClass.value,
                "SocsoCategory": self.form.SocsoClass.value,
                "EpfAmount": subjectEpf,
                "EisAmount": subjectEis,
                "SocsoAmount": subjectSocso,
                "PcbAmount": subjectPcb,
                "HrdfAmount": subjectHrdf,


                "WorkingSpouse": WorkSpouse,
                "ChildrenUnderEighteen": self.form.ChildrenUnderEighteen.value,
                "ChildrenInUniversity": self.form.ChildrenInUniversity.value,
                "NumberOfDisabledChild": self.form.DisabledChild.value,
                "NumberOfDisabledChildInUni": self.form.DisabledChildInUniversity.value,
            },
            async: false,
            onSuccess: (response) => {
               // console.log(response)
                self.EmployerContributions.length = 0
                self.form.TaxClass.value = response.Entities[0].TaxClass
                $('#EmployeeEPF').val(response.Entities[0].EmployeeEPF.toFixed(2))
                $('#EmployeeEIS').val(response.Entities[0].EmployeeEIS.toFixed(2))
                $('#PCB').val(response.Entities[0].EmployeePCB.toFixed(2))
                $('#EmployeeSOCSO').val(response.Entities[0].EmployeeSOCSO.toFixed(2))
                $('#EmployerEPF').val(response.Entities[0].EmployerEPF.toFixed(2))
                $('#EmployerEIS').val(response.Entities[0].EmployerEIS.toFixed(2))
                $('#HRD').val(response.Entities[0].EmployerHRDF.toFixed(2))
                $('#EmployerSOCSO').val(response.Entities[0].EmployerSOCSO.toFixed(2))


                /*
                if (self.EmployeeType == EmployeeType.Local) {// if is local 
                    $('#EmployeeEPF').val(response.Entities[0].EmployeeEPF.toFixed(2))
                    $('#EmployeeEIS').val(response.Entities[0].EmployeeEIS.toFixed(2))
                    $('#PCB').val(response.Entities[0].EmployeePCB.toFixed(2))
                    $('#EmployeeSOCSO').val(response.Entities[0].EmployeeSOCSO.toFixed(2))
                    $('#EmployerEPF').val(response.Entities[0].EmployerEPF.toFixed(2))
                    $('#EmployerEIS').val(response.Entities[0].EmployerEIS.toFixed(2))
                    $('#HRD').val(response.Entities[0].EmployerHRDF.toFixed(2))
                    $('#EmployerSOCSO').val(response.Entities[0].EmployerSOCSO.toFixed(2))
                   
                }
                else if (self.EmployeeType == EmployeeType.Foreigner) {// if is foreigner 
                    self.EmployeeSocso = 0
                    self.EmployerSocso = response.Entities[0].EmployerSOCSO
                    $('#EmployerSOCSO').val(response.Entities[0].EmployerSOCSO)
                    if (self.EpfSubjection) { // if volunteer for epf payments
                        if (response.Entities[0].EmployeeEPF > 0) {
                            $('#EmployeeEPF').val(response.Entities[0].EmployeeEPF)

                        }
                        if (response.Entities[0].EmployerEPF > 0) {
                            $('#EmployerEPF').val(response.Entities[0].EmployerEPF)
                        }
                        self.EmployeeEpf = response.Entities[0].EmployeeEPF
                        self.EmployerEpf = response.Entities[0].EmployerEPF
                    }
                    $('#PCB').val(response.Entities[0].EmployeePCB)

                    self.EmployeePcb = response.Entities[0].EmployeePCB
                    self.EmployeeEis = self.EmployerEis = 0
                    self.EmployerHrdf = 0
                }
                */
                self.updateWages()
            }
        })
    }
    public updateTotals() {
    // NPL/Absent totals
    const NplDayRate = parseFloat(document.getElementById('NplDayRate').textContent);
    const NplHrRate = parseFloat(document.getElementById('NplHrRate').textContent);
    const AbsentDayRate = parseFloat(document.getElementById('AbsentDayRate').textContent);

    const NplDay = parseFloat(document.getElementById('NplDay').value) || 0;
    const NplHr = parseFloat(document.getElementById('NplHr').value) || 0;
    const AbsentDay = parseFloat(document.getElementById('AbsentDay').value) || 0;

    // Calculate subtotal for each row
    document.getElementById('NplDayValue').textContent = (NplDayRate * NplDay).toFixed(2);
    document.getElementById('NplHrValue').textContent = (NplHrRate * NplHr).toFixed(2);
    document.getElementById('AbsentDayValue').textContent = (AbsentDayRate * AbsentDay).toFixed(2);

    // Update the total NPL/Absent
    const totalNplAbsent = (NplDayRate * NplDay) + (NplHrRate * NplHr) + (AbsentDayRate * AbsentDay);
    document.getElementById('totalNplAbsent').textContent = totalNplAbsent.toFixed(2);

    // Overtime totals
    const Ot1xRate = parseFloat(document.getElementById('Ot1.0x').textContent);
    const Ot1_5xRate = parseFloat(document.getElementById('Ot1.5x').textContent);
    const Ot2xRate = parseFloat(document.getElementById('Ot2.0x').textContent);

    const OtOneTime = parseFloat(document.getElementById('OtOneTime').value) || 0;
    const OtOnePointFiveTime = parseFloat(document.getElementById('OtOnePointFiveTime').value) || 0;
    const OtTwoTime = parseFloat(document.getElementById('OtTwoTime').value) || 0;

    // Calculate subtotal for each overtime row
    document.getElementById('Ot1.0xValueTotal').textContent = (Ot1xRate * OtOneTime).toFixed(2);
    document.getElementById('Ot1.5xValueTotal').textContent = (Ot1_5xRate * OtOnePointFiveTime).toFixed(2);
    document.getElementById('Ot2.0xValueTotal').textContent = (Ot2xRate * OtTwoTime).toFixed(2);

    // Update the total overtime
    const totalOt = (Ot1xRate * OtOneTime) + (Ot1_5xRate * OtOnePointFiveTime) + (Ot2xRate * OtTwoTime);
    document.getElementById('totalOt').textContent = totalOt.toFixed(2);

    // Early Leaving/Late Arrival totals
    const EarlyLeavingRate = parseFloat(document.getElementById('EarlyLeavingRate').textContent);
    const LateArrivalRate = parseFloat(document.getElementById('LateArrivalRate').textContent);

    const EarlyLeavingMinutes = parseFloat(document.getElementById('EarlyLeavingMinutes').value) || 0;
    const LateArrivalMinutes = parseFloat(document.getElementById('LateArrivalMinutes').value) || 0;

    // Calculate subtotal for each time deduction row
    document.getElementById('EarlyLeavingSubtotal').textContent = (EarlyLeavingRate * EarlyLeavingMinutes).toFixed(2);
    document.getElementById('LateArrivalSubtotal').textContent = (LateArrivalRate * LateArrivalMinutes).toFixed(2);

    // Update the total time deduction
    const totalTimeDeduction = (EarlyLeavingRate * EarlyLeavingMinutes) + (LateArrivalRate * LateArrivalMinutes);
    document.getElementById('totalTimeDeduction').textContent = totalTimeDeduction.toFixed(2);
}
    public updateWages(): void {
        var BasicPay = this.form.BasicPay.value
        var TotalAllowance = parseFloat($('#TotalAllowance').val())
        var TotalDeduction = parseFloat($('#TotalDeduction').val())
        var TotalOt = parseFloat($('#totalOt').text())
        var totalNplAbsent = 0;
        if (document.getElementById('totalNplAbsent'))
            totalNplAbsent = parseFloat(document.getElementById('totalNplAbsent').innerHTML);
        var totalTimeDeduction = 0
        if (document.getElementById('totalTimeDeduction'))
            totalTimeDeduction = parseFloat(document.getElementById('totalTimeDeduction').innerHTML)

        var GrossWages = BasicPay + TotalAllowance + TotalOt + this.extraEarningDeduction
            - TotalDeduction - totalNplAbsent - totalTimeDeduction;
        $('#GrossWage').val(GrossWages.toFixed(2))
        let totalEmployeeContrib = parseFloat($('#EmployeeEPF').val()) + parseFloat($('#EmployeeSOCSO').val())
            + parseFloat($('#EmployeeEIS').val()) + parseFloat($('#PCB').val())
        let totalEmployerContrib = parseFloat($('#EmployerEPF').val()) + parseFloat($('#EmployerEIS').val()) + parseFloat($('#EmployerSOCSO').val())
        $('#totalEmployeeContribution').val(totalEmployeeContrib.toFixed(2))
        $('#totalEmployerContribution').val(totalEmployerContrib.toFixed(2))
        let NettWage = GrossWages - totalEmployeeContrib
        $('#NettWage').val(NettWage.toFixed(2))
        if (this.Wiz == 1)
            this.saveAndCloseButton.click()

    }
    public FixedOtRateOption: any;

    public GeneratePayrollTable(setDate): void {
        var self = this
        if (self.Wiz != 1)
        self.ResetTable()    
        var PayrollEarningsNode = document.getElementById('PayrollTable')
        var EmployeeRowIdElement = document.getElementById(this.idPrefix + 'EmployeeRowId')
        var PayMonthElement = document.getElementById(this.idPrefix + 'PayMonth')
        var PayYearElement = document.getElementById(this.idPrefix + 'PayYear')
        var PersonNameElement = document.getElementById(this.idPrefix + 'EmployeeName')
        var ExternalDeductions = this.ExternalDeductions
        var ExternalEarnings = this.ExternalEarnings
        var EarningsString = this.EarningsString
        var DeductionsString = this.DeductionsString
        var listOfDicts = self.listOfDicts

        if (!isEmptyOrNull($(EmployeeRowIdElement).val())) {
            for (var index in listOfDicts) {
                if (listOfDicts[index].id == $(EmployeeRowIdElement).val())
                    $(PersonNameElement).val(listOfDicts[index].name)
            }
        }
        else 
            self.form.EmployeeName.value = ``
        if (isEmptyOrNull($(EmployeeRowIdElement).val()) || isEmptyOrNull($(PayMonthElement).val()) || isEmptyOrNull($(PayYearElement).val())) {

            $(`.field.MaritalStatus, .field.WorkingSpouse, .field.ChildrenUnderEighteen, .field.ChildrenInUniversity,
        .field.DisabledChildInUniversity, .field.DisabledChild,  .field.DaysWorked, .field.BasicPay, .field.DailyRate,
        .field.HourlyRate, .field.EisClass, .field.SocsoClass, .field.EpfClass, .field.TaxClass, .addEarnings, .addDeductions,
        .field.BirthDay, .field.Age`).hide();
            return
        }
        else {
            if(setDate == 1)
            { 
            var todayYear = self.form.PayYear.value
            var todayMonth = self.form.PayMonth.value

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

            self.form.PayDate.value = LatestDateFormat
            self.form.PayPeriodEnd.value = LatestDateFormat
            self.form.PayPeriodStart.value = LastMonthFormat
        }

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

            self.AllowanceId.length = 0
            self.DeductionId.length = 0

            if (isEmptyOrNull($(PayMonthElement).val()) && isEmptyOrNull($(PayYearElement).val())) {
                self.form.PayPeriodEnd.valueAsDate = new Date(self.form.PayYear.value, self.form.PayMonth.value, self.PayDate)
                self.form.PayDate.valueAsDate = new Date(self.form.PayYear.value, self.form.PayMonth.value, self.PayDate)
                var LastMonth = self.form.PayPeriodEnd.valueAsDate
                LastMonth.setMonth(LastMonth.getMonth() - 1);
                LastMonth.setDate(LastMonth.getDate() - 1);
                self.form.PayPeriodStart.valueAsDate = LastMonth
            }
            var PayrollDate = `${self.form.PayYear.value}/${self.form.PayMonth.value + 1}/${1}`
            /*
            serviceCall<ListResponse<any>>({
                service: EmployeeProfileService.baseUrl + '/CalculateWorkingHourAndDayWithDate',
                method: "GET",
                data: {
                    "EmployeeRowID": parseInt($(EmployeeRowIdElement).val()),
                    "Date": PayrollDate
                },
                async: false,
                onSuccess: (response) => {
                    var totalWorkingHour = response.Entities[0].TotalWorkingTimeInMinutes/60
                    var meanDailyWorkingHour = totalWorkingHour / self.form.DaysWorked.value
                    self.meanDailyWorkingHour = meanDailyWorkingHour
                }
            })
            */
           var wait = 0
            serviceCall<ListResponse<any>>({
                service: PayrollService.baseUrl + '/CalculateNplAbsentOtSpecial',
                method: "GET",
                data: {
                    "EmployeeRowID": parseInt($(EmployeeRowIdElement).val()),
                    "Date": PayrollDate
                },
                async: false,
                onSuccess: (response) => {
                    wait = 1
                    self.form.DaysWorked.value = response.Entities[0].NumberOfWorkingDays
                    $("#NplDayRate").html(response.Entities[0].NPLDaily.toFixed(2));
                    $("#NplHrRate").html(response.Entities[0].NPLHourly.toFixed(2));
                    $("#AbsentDayRate").html(response.Entities[0].AbsentDaily.toFixed(2));
                    $("#EarlyLeavingRate").html(response.Entities[0].EarlyLeavingRate.toFixed(2));
                    $("#LateArrivalRate").html(response.Entities[0].LateArrivalRate.toFixed(2));
                    self.form.DailyRate.value = response.Entities[0].DailyRate.toFixed(2)
                    self.form.HourlyRate.value = response.Entities[0].HourlyRate.toFixed(2)
                    
                }
            })
            while (wait == 0);
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


                    for (var index in listOfDicts) {
                        if (listOfDicts[index].id == $(EmployeeRowIdElement).val()) {
                            self.form.PayrollEarnings.value.length = 0
                            self.form.PayrollDeductions.value.length = 0

                            $('.addEarnings, .addDeductions').show()
                            $(`.field.MaritalStatus, .field.WorkingSpouse, .field.ChildrenUnderEighteen, .field.ChildrenInUniversity,
                            .field.DisabledChildInUniversity, .field.DisabledChild,  .field.DaysWorked, .field.BasicPay, .field.DailyRate,
                            .field.HourlyRate, .field.EisClass, .field.SocsoClass, .field.EpfClass, .field.TaxClass, .field.BirthDay, .field.Age`).show();
                            var wait = 0
                            serviceCall<RetrieveResponse<any>>({
                                service: EmployeeProfileService.baseUrl + '/CalculateOtRate',
                                data: {
                                    "EmployeeRowID": self.form.EmployeeRowId.value,
                                    "Date": PayrollDate
                                },
                                method: "GET",
                                async: false,
                                onSuccess: (response) =>
                                {
                                    if (document.getElementById('PayRoll-Description').children.length == 0) 
                                        self.Setup()
             
                                    console.log(response.Entities[0])
                                    self.FixedOtRateOption = response.Entities[0].FixedOtRateOption
                                    if (self.FixedOtRateOption == false) {
                                        self.form.FlatOt.value = response.Entities[0].OtRate
                                        let roundedOtRate = parseFloat(response.Entities[0].OtRate.toFixed(2));
                                        // Calculate 1.5x and 2.0x multipliers
                                        let otRate1_5x = (roundedOtRate * 1.5).toFixed(2);
                                        let otRate2_0x = (roundedOtRate * 2).toFixed(2);
                                        document.getElementById("flatOtDesc").innerHTML = "OT1.0x"
                                        document.getElementById("OnePointFiveOtDesc").innerHTML = "OT1.5x"
                                        document.getElementById("TwoOtDesc").innerHTML = "OT2.0x"

                                        document.getElementById("Ot1.0x").textContent = roundedOtRate.toFixed(2);
                                        document.getElementById("Ot1.5x").textContent = otRate1_5x
                                        document.getElementById("Ot2.0x").textContent = otRate2_0x
                                    }
                                    else {
                                        document.getElementById("flatOtDesc").innerHTML = "Weekday"
                                        document.getElementById("OnePointFiveOtDesc").innerHTML = "Weekend"
                                        document.getElementById("TwoOtDesc").innerHTML = "Public Holiday"

                                        document.getElementById("Ot1.0x").textContent = response.Entities[0].OtRateWeekday;
                                        document.getElementById("Ot1.5x").textContent = response.Entities[0].OtRateWeekend;
                                        document.getElementById("Ot2.0x").textContent = response.Entities[0].OtRatePublicHoliday


                                    }
                                    wait = 1
                                }
                            })
                            while (wait == 0);
                            self.form.BirthDay.value = listOfDicts[index].Birthday
                            self.form.Age.value = self.calculateAge()
                            self.form.MaritalStatus.value = listOfDicts[index].MaritalStatus.toString()
                            self.form.WorkingSpouse.value = listOfDicts[index].WorkingSpouse
                            self.form.ChildrenUnderEighteen.value = listOfDicts[index].ChildrenUnderEighteen
                            self.form.ChildrenInUniversity.value = listOfDicts[index].ChildrenInUniversity
                            self.form.DisabledChildInUniversity.value = listOfDicts[index].DisabledChildInUniversity
                            self.form.DisabledChild.value = listOfDicts[index].DisabledChild

                            self.form.BasicPay.value = listOfDicts[index].BasicPay
                            self.EmployeeType = listOfDicts[index].type
                            self.EpfSubjection = listOfDicts[index].EpfSubjection
                            self.form.EisClass.value = listOfDicts[index].EisClass.toString()
                            self.form.EpfClass.value = listOfDicts[index].EpfClass.toString()
                            self.form.SocsoClass.value = listOfDicts[index].SocsoClass.toString()
                            
                            var EmployeeName = listOfDicts[index].name
                            var criteria: any;
                            EmployeeAllowanceService.List({
                                Criteria: Criteria.and(criteria, [[EmployeeAllowanceRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()]
                                    , [self.form.PayPeriodStart.get_value(), '>=', [EmployeeAllowanceRow.Fields.EffectiveFrom]],
                                )
                            }, response => {
                                console.log(response.Entities)
                                $('#AllowanceDeductionBody').empty()
                                var TotalAllowance = 0
                                for (var index in response.Entities) {
                                    if (!isEmptyOrNull(response.Entities[index].EffectiveUntil)) {
                                        var timestamp = response.Entities[index].EffectiveUntil;
                                        var date = new Date(timestamp);
                                        if (self.form.PayPeriodStart.valueAsDate > date)
                                            continue
                                    }
                                    
                                    if (response.Entities[index].OneTime == true) {
                                        if (response.Entities[index].PaidOneTime == true)
                                            continue
                                    }
                                    if (response.Entities[index].FullAttendance == true) {
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
                                    var rowBuffer = document.createElement('tr')
                                    rowBuffer.innerHTML = `<td>${response.Entities[index].AllowanceCode}</td><td>${response.Entities[index].Description}</td>
                                            <td class = "AllowanceAmount" eis =  ${response.Entities[index].SubjectionEis.toString()} epf =  ${response.Entities[index].SubjectionEpf.toString()}
                                            hrdf =  ${response.Entities[index].SubjectionHrdf.toString()} pcb =  ${response.Entities[index].SubjectionPcb.toString()}
                                                socso =  ${response.Entities[index].SubjectionSocso.toString()} 
                                            >${response.Entities[index].Amount}</td>`
                                    $('#AllowanceDeductionBody').append(rowBuffer)
                                    self.AllowanceId.push(response.Entities[index].Id)
                                    TotalAllowance += response.Entities[index].Amount
                                }
                                $('#TotalAllowance').val(TotalAllowance)
                                $(PersonNameElement).val(EmployeeName)
                                if (PayrollEarningsNode) {
                                    var rows = PayrollEarningsNode.getElementsByTagName('TR');
                                    var numRows = rows.length;
                                    for (var i = numRows - 1; i > 0; i--)
                                        rows[i].parentNode.removeChild(rows[i]);
                                }
                                var criteria: any;

                                OTApplicationService.List({
                                    Criteria: Criteria.and(criteria, [[OTApplicationRow.Fields.Status], '=', '1'], [[OTApplicationRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val() ],
                                        [[OTApplicationRow.Fields.OtDate], '>=', self.form.PayPeriodStart.get_value()],
                                        [[OTApplicationRow.Fields.OtDate], '<=', self.form.PayPeriodEnd.get_value()])
                                }, response => {
                                    let WeekendTime = 0
                                    let WeekdayTime = 0
                                    let PublicHolidayTime = 0
                                    let TwoTimes = 0
                                    let OnePointFiveTimes = 0
                                    response.Entities.forEach(data => {
                                        if (data.WeekendOt) 
                                            WeekendTime += data.OtMinute;
                                        else if (data.WeekdayOt) 
                                            WeekdayTime += data.OtMinute;
                                        else if (data.PublicHolidayOt) 
                                            PublicHolidayTime += data.OtMinute;
                                    })
                                    if (self.FixedOtRateOption == false) {
                                        self.PublicHolidayMultiplier == 2.0 ? TwoTimes += PublicHolidayTime : OnePointFiveTimes += PublicHolidayTime
                                        self.WeekendMultiplier == 2.0 ? TwoTimes += WeekendTime : OnePointFiveTimes += WeekendTime
                                        self.WeekdayMultiplier == 2.0 ? TwoTimes += WeekdayTime : OnePointFiveTimes += WeekdayTime

                                        TwoTimes = TwoTimes / 60
                                        OnePointFiveTimes = OnePointFiveTimes / 60

                                        $('#OtOnePointFiveTime').val(OnePointFiveTimes)
                                        $('#OtTwoTime').val(TwoTimes)
                                    }
                                    else {
                                        WeekdayTime = WeekdayTime / 60;
                                        WeekendTime = WeekendTime / 60;
                                        PublicHolidayTime = PublicHolidayTime / 60;

                                        $('#OtOneTime').val(WeekdayTime)
                                        $('#OtOnePointFiveTime').val(WeekendTime)
                                        $('#OtTwoTime').val(PublicHolidayTime)
                                    }
                                    $('#OtTwoTime').trigger('change')
                                   
                                    var criteria: any;
                                NoPaidLeaveService.List({
                                    Criteria: Criteria.and(criteria, [[NoPaidLeaveRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()],
                                        [[NoPaidLeaveRow.Fields.LeaveDate], '>=', self.form.PayPeriodStart.get_value()],
                                        [[NoPaidLeaveRow.Fields.LeaveDate], '<=', self.form.PayPeriodEnd.get_value()]
                                    )
                                }, response => {
                                    let NoPaidLeaveDays = 0

                                    for (var index in response.Entities) {
                                        if (!isEmptyOrNull(response.Entities[index].Deductions)) {
                                            self.NoPaidLeaveId.push(response.Entities[index].Id)
                                            NoPaidLeaveDays += response.Entities[index].HalfDay ? 0.5 : 1
                                        }
                                    }
                                    var criteria: any;
                                    FixedDeductionService.List({
                                        Criteria: Criteria.and(criteria, [[FixedDeductionRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()]
                                            , [self.form.PayPeriodStart.get_value(), '>=', [FixedDeductionRow.Fields.EffectiveFrom]])
                                    }, response => {
                                        var TotalDeductions = 0
                                        for (var index in response.Entities) {
                                            if (response.Entities[index].OneTime == true) {
                                                if (response.Entities[index].DeductedOneTime == true)
                                                    continue
                                            }
                                            if (!isEmptyOrNull(response.Entities[index].EffectiveUntil)) {
                                                var timestamp = response.Entities[index].EffectiveUntil;
                                                var date = new Date(timestamp);
                                                if (self.form.PayPeriodStart.valueAsDate > date)
                                                    continue
                                            }
                                            var row = document.createElement('tr')
                                            row.innerHTML = `<td>${response.Entities[index].DeductionCode}</td><td>${response.Entities[index].Description}</td><td class = "DeductionAmount">-${response.Entities[index].Amount}</td>`
                                            $('#AllowanceDeductionBody').append(row)
                                            self.DeductionId.push(response.Entities[index].Id)
                                            TotalDeductions += response.Entities[index].Amount
                                        }
                                        $('#TotalDeduction').val(TotalDeductions)
                                        var criteria: any;
                                        MoneyClaimApplicationService.List({
                                            Criteria: Criteria.and(criteria, [[MoneyClaimApplicationRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()]
                                                , [[MoneyClaimApplicationRow.Fields.Paid], '=', '0'], [[MoneyClaimApplicationRow.Fields.Status], '=', '1'],
                                                [[MoneyClaimApplicationRow.Fields.ClaimingDate], '>=', self.form.PayPeriodStart.get_value()],
                                                [[MoneyClaimApplicationRow.Fields.ClaimingDate], '<=', self.form.PayPeriodEnd.get_value()])
                                        }, response => {
                                            $('#MoneyClaimingBody').empty()
                                            for (var index in response.Entities) {
                                                var rowBuffer = document.createElement('tr')
                                                rowBuffer.innerHTML = `<td>${response.Entities[index].ClaimingCategory}</td><td>${response.Entities[index].Description}</td>
                                            <td  eis =  ${response.Entities[index].SubjectionEis.toString()} epf =  ${response.Entities[index].SubjectionEpf.toString()}
                                            hrdf =  ${response.Entities[index].SubjectionHrdf.toString()} pcb =  ${response.Entities[index].SubjectionPcb.toString()}
                                                socso =  ${response.Entities[index].SubjectionSocso.toString()} 
                                            >${response.Entities[index].ClaimAmount}</td>`
                                                $('#MoneyClaimingBody').append(rowBuffer)


                                            }

                                            var criteria: any;
                                            EmployeeEarlyLeavingService.List({
                                                Criteria: Criteria.and(criteria, [[EmployeeEarlyLeavingRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()],
                                                    [[EmployeeEarlyLeavingRow.Fields.Date], '>=', self.form.PayPeriodStart.get_value()],
                                                    [[EmployeeEarlyLeavingRow.Fields.Date], '<=', self.form.PayPeriodEnd.get_value()]
                                                )

                                            }, response => {
                                                response.Entities.length > 0 ? NoEarlyLeaving = false : ''
                                                let EarlyLeavingMinutes = 0
                                                for (var index in response.Entities) {
                                                    if (response.Entities[index].Deducted == 0) {
                                                        EarlyLeavingMinutes += response.Entities[index].EarlyMins
                                                        self.EarlyLeavingId.push(response.Entities[index].Id)
                                                    }
                                                }
                                                $('#EarlyLeavingMinutes').val(EarlyLeavingMinutes)
                                                var criteria: any;
                                                EmployeeLateService.List({
                                                    Criteria: Criteria.and(criteria, [[EmployeeLateRow.Fields.EmployeeRowId], '=', $(EmployeeRowIdElement).val()],
                                                        [[EmployeeLateRow.Fields.Date], '>=', self.form.PayPeriodStart.get_value()],
                                                        [[EmployeeLateRow.Fields.Date], '<=', self.form.PayPeriodEnd.get_value()]
                                                    )
                                                }, response => {
                                                    var LateMinutes = 0
                                                    response.Entities.length > 0 ? NoLate = false : ''
                                                    for (var index in response.Entities) {
                                                        if (response.Entities[index].Deducted == 0) {
                                                            if (!isEmptyOrNull(response.Entities[index].Deductions)) {
                                                                LateMinutes += response.Entities[index].LateMins
                                                                self.LateArrivalId.push(response.Entities[index].Id)
                                                            }
                                                        }
                                                    }
                                                    $('#LateArrivalMinutes').val(LateMinutes)
                                                    self.updatePayroll()
                                                    //self.updateWages()

                                                })
                                            })


                                        })

                                    })


                                })
                                })
                            })
                            
                            break
                        }
                    }

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
    protected getToolbarButtons() {
        var buttons = super.getToolbarButtons();
        var CssLink = document.createElement('style')
        CssLink.textContent =
            `

    .section {
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #ccc;
      background-color: #f9f9f9;
      border-radius: 8px;
    }

    .section h3 {
      margin-bottom: 15px;
      font-size: 18px;
      color: #333;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    table td {
      padding: 8px;
      text-align: left;
      vertical-align: middle;
    }

    table td input[type="number"] {
      width: 100%;
      text-align: right;
      padding: 5px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #f9f9f9;
    }









    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }

    th, td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: center;
    }

    th {
      background-color: #d9e9f9; /* Light blue for headers */
      font-weight: bold;
    }

    td:nth-child(3), td:nth-child(5) {
      background-color: #fde8f1; /* Light pink for specific columns */
    }

    tr:nth-child(even) {
      background-color: #f9f9f9; /* Alternating row colors */
    }

    tr {
    position: sticky;
    }
        
    tr:hover {
      background-color: #f1f1f1; /* Hover effect for rows */
    }

    .numberInput {
      text-align: right; /* Align text consistently */
      width: 100%;
      border: none;
      background-color: transparent;
    }

    .Description {
    text-align: left; /* Align text consistently */
    width: 50px; /* Ensures consistent width for all spans */

    }

    .numberInputContainer {
    text-align: left; /* Align text consistently */
    width: 100px; /* Ensures consistent width for all spans */
    }


    .rates {
    text-align: right; /* Align text consistently */
    width: 100px; /* Ensures consistent width for all spans */
    }
    

    #PayRollGrid {
    display: flex;
    gap: 5px; /* Adds a 20px gap between #left, #center, and #right */
}

#left,
#center,
#right {
    flex: 1; /* Ensures each section takes equal space (optional) */
}

            `
        document.head.appendChild(CssLink)


        
        // *** Create Dropdown-Button ***
        var self = this

        buttons.push(
            {
                title: "Add Earnings",	// *** Get button text from translation
                cssClass: 'text-bg-success p-2 addEarnings',
                icon: 'fa-plus text-green',
                onClick: () => {
                    const addButton = $('.PayrollEarnings .add-button');
                    addButton.click()
                    var PrevLength = self.form.PayrollEarnings.value.length
                    $('.s-HRMSoftware-PayrollSettings-PayrollEarningsEditDialog').on("dialogclose", function () {
                        if (PrevLength != self.form.PayrollEarnings.value.length) {
                            var info = self.form.PayrollEarnings.value[self.form.PayrollEarnings.value.length - 1]
                            var bufferRow = document.createElement('tr')
                            bufferRow.innerHTML = `<td> <span>${info.EarningCode}</span>           <button class="remove">×</button>
                            </td><td>${info.Description}</td><td> <input class = numberInput type="number" min="0" eis = ${info.SubjectionToEis} epf = ${info.SubjectionToEpf} hrdf = ${info.SubjectionToHrdf}
                             pcb = ${info.SubjectionToPcb} socso = ${info.SubjectionToSocso}  value = ${info.Amount} ></input>           </td>`
                        
                            $('#EarningDeductionBody').append(bufferRow)
                            $('.remove').on('click', async function (e) {
                                $(this).closest('tr').remove(); // Remove the row
                                self.updatePayroll()
                            })
                            $('.numberInput').on('change', async function (e) {
                                self.updatePayroll()
                            })

                            self.updatePayroll()
                        }

                    })
                },
            }
        );
        buttons.push(
            {
                title: "Add Deductions",	// *** Get button text from translation
                cssClass: 'text-bg-danger p-2 addDeductions',
                icon: 'fa-minus text-red',
                onClick: () => {
                    const addButton = $('.PayrollDeductions .add-button');
                    addButton.click()
                    var PrevLength = self.form.PayrollDeductions.value.length
                    $('.s-HRMSoftware-PayrollSettings-PayrollDeductionsEditDialog').on("dialogclose", function () {
                        if (PrevLength != self.form.PayrollDeductions.value.length) {
                            var info = self.form.PayrollDeductions.value[self.form.PayrollDeductions.value.length - 1]
                            var bufferRow = document.createElement('tr');
                            bufferRow.innerHTML = `<td>   <span>${info.DeductionCode}</span>  <button class="remove">×</button>
                            </td><td>${info.Description}</td><td> <input class = numberInput type="number" max="0"  value = "-${info.Amount}" ></input>           </td>`
                            $('#EarningDeductionBody').append(bufferRow)
                            $('.remove').on('click', async function (e) {
                                $(this).closest('tr').remove(); // Remove the row
                                self.updatePayroll()
                            })
                            $('.numberInput').on('change', async function (e) {
                                self.updatePayroll()
                            })
                            self.updatePayroll()

                        }
                    })
                },
            }
        );
        return buttons;
    }
    protected save_submitHandler(response): void {
        let i = 0;
        let ExtraEarningDeductionBody = document.getElementById("EarningDeductionBody");
        let ExtraEarningDeductionRows = ExtraEarningDeductionBody.querySelectorAll("tr");
        if (ExtraEarningDeductionRows.length) {
            let ExtraEarningList: any[] = [];
            let ExtraDeductionList: any[] = [];
            let ExtraEarningDeductionData = Array.from(ExtraEarningDeductionRows).map(row => {
                let cells = row.querySelectorAll("td");
                return {
                    code: cells[0].querySelector("span").textContent,          // e.g., "111"
                    description: cells[1].innerText,    // e.g., "Director Fee"
                    amount: cells[2].querySelector(".numberInput").value,       // e.g., "100"
                    eis: cells[2].querySelector(".numberInput").getAttribute("eis"), // e.g., "false"
                    epf: cells[2].querySelector(".numberInput").getAttribute("epf"), // e.g., "false"
                    hrdf: cells[2].querySelector(".numberInput").getAttribute("hrdf"), // e.g., "false"
                    pcb: cells[2].querySelector(".numberInput").getAttribute("pcb"), // e.g., "false"
                    socso: cells[2].querySelector(".numberInput").getAttribute("socso") // e.g., "false"
                };
            });
            for (i = 0; i < ExtraEarningDeductionData.length; i++) {
                var AllowanceDeductionRow
                if (parseFloat(ExtraEarningDeductionData[i].amount) > 0) {
                    AllowanceDeductionRow = new ConcretePayrollEarningsRow()
                    AllowanceDeductionRow.Amount = parseFloat(ExtraEarningDeductionData[i].amount)
                    AllowanceDeductionRow.Description = ExtraEarningDeductionData[i].description
                    AllowanceDeductionRow.SubjectionToPcb = toBoolean(ExtraEarningDeductionData[i].pcb)
                    AllowanceDeductionRow.SubjectionToEis = toBoolean(ExtraEarningDeductionData[i].eis)
                    AllowanceDeductionRow.SubjectionToHrdf = toBoolean(ExtraEarningDeductionData[i].hrdf)
                    AllowanceDeductionRow.SubjectionToSocso = toBoolean(ExtraEarningDeductionData[i].socso)
                    AllowanceDeductionRow.SubjectionToEpf = toBoolean(ExtraEarningDeductionData[i].epf)
                    AllowanceDeductionRow.EarningCode = ExtraEarningDeductionData[i].code

                    ExtraEarningList.push(AllowanceDeductionRow)
                }
                else if (parseFloat(ExtraEarningDeductionData[i].amount) < 0) {
                    AllowanceDeductionRow = new ConcretePayrollDeductionsRow()
                    AllowanceDeductionRow.Amount = parseFloat(ExtraEarningDeductionData[i].amount)
                    AllowanceDeductionRow.Description = ExtraEarningDeductionData[i].description
                    AllowanceDeductionRow.DeductionCode = ExtraEarningDeductionData[i].code
                    ExtraDeductionList.push(AllowanceDeductionRow)
                }
            }
            this.form.PayrollEarnings.value = ExtraEarningList
            this.form.PayrollDeductions.value = ExtraDeductionList
        }

        this.form.NPLDaily.value = $("#NplDay").val()
        this.form.NPLHourly.value = $("#NplHr").val()
        this.form.AbsentDaily.value = $("#AbsentDay").val()
        this.form.OtOne.value = $('#OtOneTime').val()
        this.form.OtOnePointFive.value = $('#OtOnePointFiveTime').val()
        this.form.OtTwo.value = $('#OtTwoTime').val()
        this.form.EarlyLeaving.value = $('#EarlyLeavingMinutes').val()
        this.form.LateArrival.value = $('#LateArrivalMinutes').val()
        this.form.FlatOt.value = parseFloat(document.getElementById('Ot1.0x').textContent)
        this.form.OtOnePointFiveRate.value = parseFloat(document.getElementById('Ot1.5x').textContent)
        this.form.OtTwoRate.value = parseFloat(document.getElementById('Ot2.0x').textContent)

        var self = this
        function toBoolean(value) {
            return value === "true";
        }

        this.form.EmployeePCB.value = $("#PCB").val()
        this.form.EmployeeEIS.value = $("#EmployeeEIS").val()
        this.form.EmployeeEPF.value = $("#EmployeeEPF").val()
        this.form.EmployeeSOCSO.value = $("#EmployeeSOCSO").val()
        this.form.EmployerEIS.value = $("#EmployerEIS").val()
        this.form.EmployerEPF.value = $("#EmployerEPF").val()
        this.form.EmployerHRDF.value = $("#HRD").val()
        this.form.EmployerSOCSO.value = $("#EmployerSOCSO").val()
        this.form.NPLDailyRate.value = parseFloat($("#NplDayRate").text())
        this.form.NPLHourlyRate.value = parseFloat($("#NplHrRate").text())
        this.form.AbsentDailyRate.value = parseFloat($("#AbsentDayRate").text())



        this.form.EarlyLeavingRate.value = parseFloat($("#EarlyLeavingRate").text())
        this.form.LateArrivalRate.value = parseFloat($("#LateArrivalRate").text())


        let MoneyClaimingBody = document.getElementById("MoneyClaimingBody");
        let MoneyClaimingRows = MoneyClaimingBody.querySelectorAll("tr");
        if (MoneyClaimingRows.length) {
            let MoneyClaimingList: any[] = [];
            let MoneyClaimingData = Array.from(MoneyClaimingRows).map(row => {
                let cells = row.querySelectorAll("td");
                return {
                    ClaimingCategory: cells[0].innerText,    // e.g., "Director Fee"
                    description: cells[1].innerText,          // e.g., "111"
                    amount: cells[2].innerText,       // e.g., "100"
                    eis: cells[2].getAttribute("eis"), // e.g., "false"
                    epf: cells[2].getAttribute("epf"), // e.g., "false"
                    hrdf: cells[2].getAttribute("hrdf"), // e.g., "false"
                    pcb: cells[2].getAttribute("pcb"), // e.g., "false"
                    socso: cells[2].getAttribute("socso") // e.g., "false"
                };
            });

            for (i = 0; i < MoneyClaimingData.length; i++) {
                var MoneyClaimingRow = new ConcreteMoneyClaimApplicationRow()
                MoneyClaimingRow.ClaimAmount = parseFloat(MoneyClaimingData[i].amount)
                MoneyClaimingRow.Description = MoneyClaimingData[i].description
                MoneyClaimingRow.ClaimingCategory = MoneyClaimingData[i].ClaimingCategory
                MoneyClaimingRow.SubjectionPcb = toBoolean(MoneyClaimingData[i].pcb)
                MoneyClaimingRow.SubjectionEis = toBoolean(MoneyClaimingData[i].eis)
                MoneyClaimingRow.SubjectionHrdf = toBoolean(MoneyClaimingData[i].hrdf)
                MoneyClaimingRow.SubjectionSocso = toBoolean(MoneyClaimingData[i].socso)
                MoneyClaimingRow.SubjectionEpf = toBoolean(MoneyClaimingData[i].epf)
                MoneyClaimingList.push(MoneyClaimingRow)
            }
            this.form.PaidMoneyClaimingList.value = MoneyClaimingList

        }

        let AllowanceDeductionBody = document.getElementById("AllowanceDeductionBody");
        let AllowanceDeductionRows = AllowanceDeductionBody.querySelectorAll("tr");
        if (AllowanceDeductionRows.length) {
            let AllowanceList: any[] = [];
            let DeductionList: any[] = [];

            let AllowanceDeductionData = Array.from(AllowanceDeductionRows).map(row => {
                let cells = row.querySelectorAll("td");
                return {
                    code: cells[0].innerText,          // e.g., "111"
                    description: cells[1].innerText,    // e.g., "Director Fee"
                    amount: cells[2].innerText,       // e.g., "100"
                    eis: cells[2].getAttribute("eis"), // e.g., "false"
                    epf: cells[2].getAttribute("epf"), // e.g., "false"
                    hrdf: cells[2].getAttribute("hrdf"), // e.g., "false"
                    pcb: cells[2].getAttribute("pcb"), // e.g., "false"
                    socso: cells[2].getAttribute("socso") // e.g., "false"
                };
            });
            let allowanceIndex = 0, deductionIndex = 0
            for (i = 0; i < AllowanceDeductionData.length; i++) {
                var AllowanceDeductionRow
                if (parseFloat(AllowanceDeductionData[i].amount) > 0) {
                    AllowanceDeductionRow = new ConcreteEmployeeAllowanceRow()
                    AllowanceDeductionRow.AllowanceId = self.AllowanceId[allowanceIndex]
                    AllowanceDeductionRow.AllowanceAmount = parseFloat(AllowanceDeductionData[i].amount)
                    AllowanceDeductionRow.Description = AllowanceDeductionData[i].description
                    AllowanceDeductionRow.SubjectionPcb = toBoolean(AllowanceDeductionData[i].pcb)
                    AllowanceDeductionRow.SubjectionEis = toBoolean(AllowanceDeductionData[i].eis)
                    AllowanceDeductionRow.SubjectionHrdf = toBoolean(AllowanceDeductionData[i].hrdf)
                    AllowanceDeductionRow.SubjectionSocso = toBoolean(AllowanceDeductionData[i].socso)
                    AllowanceDeductionRow.SubjectionEpf = toBoolean(AllowanceDeductionData[i].epf)
                    AllowanceDeductionRow.code = AllowanceDeductionData[i].code
                    allowanceIndex+=1
                    AllowanceList.push(AllowanceDeductionRow)
                }
                else if (parseFloat(AllowanceDeductionData[i].amount) < 0) {
                    AllowanceDeductionRow = new ConcreteFixedDeductionRow()
                    AllowanceDeductionRow.DeductionId = self.DeductionId[deductionIndex]

                    AllowanceDeductionRow.DeductionAmount = parseFloat(AllowanceDeductionData[i].amount)
                    AllowanceDeductionRow.Description = AllowanceDeductionData[i].description
                    AllowanceDeductionRow.code = AllowanceDeductionData[i].code
                    DeductionList.push(AllowanceDeductionRow)
                    deductionIndex+=1
                }
            }
            this.form.AllowanceList.value = AllowanceList
            this.form.DeductionList.value = DeductionList
        }

        super.save_submitHandler(response)
        
    }
    /*
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
    */
}

class ConcreteMoneyClaimApplicationRow extends PayslipPaidMoneyClaimingRow {
    constructor() {
        super();
    }
}

class ConcretePayrollDeductionsRow extends PayrollDeductionsRow {
    constructor() {
        super();
    }
}
class ConcretePayrollEarningsRow extends PayrollEarningsRow {
    constructor() {
        super();
    }
}
class ConcreteEmployeeAllowanceRow extends PayslipPaidOneTimeAllowanceRow {
    constructor() {
        super();
    }
}
class ConcreteFixedDeductionRow extends PayslipDeductedOneTimeDeductionsRow {
    constructor() {
        super();
    }
}
