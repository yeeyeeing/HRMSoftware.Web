import{a as x,b as E,m as S,n as b,o as s,p as f}from"../../../../_chunks/chunk-KJR5IZZY.js";import"../../../../_chunks/chunk-2SJ2SYN6.js";import"../../../../_chunks/chunk-K2UT2MVJ.js";import{a as h}from"../../../../_chunks/chunk-DNINIZJD.js";import{c as i,g as u,h as c,j as n,k as L}from"../../../../_chunks/chunk-L3ECGIWB.js";var y=u(L(),1);var p=u(h(),1);var v=u(h(),1);var l=u(L(),1);var a=class extends v.EntityDialog{constructor(){super(...arguments);this.form=new b(this.idPrefix)}getFormKey(){return b.formKey}getRowDefinition(){return s}getService(){return f.baseUrl}onDialogOpen(){super.onDialogOpen();var e=this;this.applyChangesButton.hide(),$(".field.SubjectionEis label.caption, .field.SubjectionEpf label.caption, .field.SubjectionHrdf label.caption").removeClass("caption"),$(".field.SubjectionPcb label.caption, .field.SubjectionSocso label.caption, .field.SubjectionOt label.caption").removeClass("caption"),$(".field.SubjectionEis, .field.SubjectionEpf, .field.SubjectionHrdf, .field.SubjectionPcb, .field.SubjectionSocso,  .field.SubjectionOt").addClass("col-md-2");var r=document.getElementById(this.idPrefix+"AllowanceSubjections");$(r).on("change",function(){return n(this,null,function*(){e.form.AllowanceSubjections.value==!0?($(".FullAttendance").show(),$(".NoLate").show(),$(".NoAbsence").show(),$(".NoEarlyLeaving").show(),e.form.FullAttendance.value==!1&&$(".ExemptUnpaidLeave").parent().hide()):(e.form.FullAttendance.value=e.form.NoLate.value=e.form.NoAbsence.value=!1,$(".FullAttendance").hide(),$(".NoLate").hide(),$(".NoAbsence").hide(),$(".NoEarlyLeaving").hide(),$(".ExemptUnpaidLeave").parent().hide())})});var t=document.getElementById(this.idPrefix+"FullAttendance");$(t).on("change",function(){return n(this,null,function*(){e.form.ExemptUnpaidLeave.value=e.form.ExemptHospitalisationLeave.value=e.form.ExemptSickLeave.value=e.form.ExemptAnnualLeave.value=e.form.ExemptMaternityLeave.value=e.form.ExemptPaternityLeave.value=e.form.ExemptMarriageLeave.value=e.form.ExemptCompassionateLeave.value=e.form.ExemptEmergencyLeave.value=e.form.ExemptGatepassLeave.value=!1,e.form.FullAttendance.value==!0?$(".ExemptUnpaidLeave").parent().show():$(".ExemptUnpaidLeave").parent().hide()})});var m=document.getElementById(this.idPrefix+"Recurring");$(m).on("change",function(){return n(this,null,function*(){$(".PaidOneTime").hide(),e.form.OneTime.value==!0&&(e.form.OneTime.value=!1),e.form.Recurring.value==!0&&(e.form.OneTime.value=!1)})});var d=document.getElementById(this.idPrefix+"OneTime");$(d).on("change",function(){return n(this,null,function*(){$(".PaidOneTime").hide(),e.form.Recurring.value==!0&&(e.form.Recurring.value=!1),e.form.OneTime.value==!0&&($(".PaidOneTime").show(),e.form.Recurring.value=!1)})}),e.form.OneTime.value==!0&&($(".PaidOneTime").show(),e.form.Recurring.value=!1),$(r).trigger("change")}save_submitHandler(e){var r=e,t=this;if(this.form.Recurring.value==!1&&this.form.OneTime.value==!1){(0,l.alertDialog)("Please choose the frequency of this allowance");return}if(this.form.AllowanceSubjections.value==!0&&this.form.FullAttendance.value==!1&&this.form.NoAbsence.value==!1&&this.form.NoEarlyLeaving.value==!1&&this.form.NoLate.value==!1){(0,l.alertDialog)("Please choose subjection of this allowance");return}this.isNew()?super.save_submitHandler(e):(0,l.confirmDialog)("Do you want to update all employee with the Allowance?",()=>{E.List({Criteria:[[x.Fields.MasterAllowanceId],"=",t.entityId]},m=>{for(var d in m.Entities)E.Update({EntityId:m.Entities[d].Id,Entity:{AllowanceCode:t.form.AllowanceCode.value,AllowanceSubjections:t.form.AllowanceSubjections.value,Amount:t.form.Amount.value,Description:t.form.Description.value,ExemptAnnualLeave:t.form.ExemptAnnualLeave.value,ExemptCompassionateLeave:t.form.ExemptCompassionateLeave.value,ExemptEmergencyLeave:t.form.ExemptEmergencyLeave.value,ExemptGatepassLeave:t.form.ExemptGatepassLeave.value,ExemptHospitalisationLeave:t.form.ExemptHospitalisationLeave.value,ExemptMarriageLeave:t.form.ExemptMarriageLeave.value,ExemptMaternityLeave:t.form.ExemptMaternityLeave.value,ExemptPaternityLeave:t.form.ExemptPaternityLeave.value,ExemptSickLeave:t.form.ExemptSickLeave.value,ExemptUnpaidLeave:t.form.ExemptUnpaidLeave.value,FullAttendance:t.form.FullAttendance.value,NoAbsence:t.form.NoAbsence.value,NoEarlyLeaving:t.form.NoEarlyLeaving.value,NoLate:t.form.NoLate.value,OneTime:t.form.OneTime.value,Recurring:t.form.Recurring.value,SubjectionEis:t.form.SubjectionEis.value,SubjectionEpf:t.form.SubjectionEpf.value,SubjectionHrdf:t.form.SubjectionHrdf.value,SubjectionOt:t.form.SubjectionOt.value,SubjectionPcb:t.form.SubjectionPcb.value,SubjectionSocso:t.form.SubjectionSocso.value}});super.save_submitHandler(r)})},{onNo:()=>{super.save_submitHandler(r)}})}};i(a,"MasterAllowanceDialog"),a=c([v.Decorators.registerClass("HRMSoftware.EmployeeProfile.MasterAllowanceDialog")],a);var o=class extends p.EntityGrid{getColumnsKey(){return S.columnsKey}getDialogType(){return a}getRowDefinition(){return s}getService(){return f.baseUrl}constructor(g){super(g)}};i(o,"MasterAllowanceGrid"),o=c([p.Decorators.registerClass("HRMSoftware.EmployeeProfile.MasterAllowanceGrid")],o);function A(){(0,y.initFullHeightGridPage)(new o($("#GridDiv")).element)}i(A,"pageInit");export{A as default};
//# sourceMappingURL=MasterAllowancePage.js.map