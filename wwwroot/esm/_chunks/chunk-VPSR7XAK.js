import{h as v,i as h,j as D}from"./chunk-2C2HJ25O.js";import{b as y}from"./chunk-XGDIBSP2.js";import{a as R}from"./chunk-DNINIZJD.js";import{c as u,g as f,h as c,k as E}from"./chunk-L3ECGIWB.js";var d=f(R(),1);var t=f(E(),1);var m=class extends d.EntityDialog{constructor(){super(...arguments);this.form=new v(this.idPrefix)}getFormKey(){return v.formKey}getRowDefinition(){return h}getService(){return D.baseUrl}onDialogOpen(){super.onDialogOpen(),this.deleteButton.hide();var l=this,s=document.getElementById(this.idPrefix+"ResignLeaveDate"),g=document.getElementById(this.idPrefix+"ResignationDate"),p=document.getElementById(this.idPrefix+"NoticePeriod");d.EditorUtils.setReadonly(this.form.ResignLeaveDate.element,!0),$("#"+this.idPrefix+"NoticePeriod").attr("placeholder","notice period in day"),$(p).on("change",function(P){if((0,t.isEmptyOrNull)($(p).val())){l.form.ResignLeaveDate.value="";return}if((0,t.isEmptyOrNull)($(g).val())){l.form.ResignLeaveDate.value="";return}let r=$(g).val(),a=r.split("/"),i=parseInt(a[0])-1,n=parseInt(a[1]),o=parseInt(a[2]),e=new Date(o,i,n);e.setDate(e.getDate()+l.form.NoticePeriod.value),i=(e.getMonth()+1).toString().padStart(2,"0"),n=e.getDate().toString().padStart(2,"0"),o=e.getFullYear(),r=`${i}/${n}/${o}`,$(s).val(r)}),$(g).on("change",function(P){if((0,t.isEmptyOrNull)($(p).val())||(0,t.isEmptyOrNull)($(g).val()))return;let r=$(g).val(),a=r.split("/"),i=parseInt(a[0])-1,n=parseInt(a[1]),o=parseInt(a[2]),e=new Date(o,i,n);e.setDate(e.getDate()+l.form.NoticePeriod.value),i=(e.getMonth()+1).toString().padStart(2,"0"),n=e.getDate().toString().padStart(2,"0"),o=e.getFullYear(),r=`${i}/${n}/${o}`,$(s).val(r)})}save_submitHandler(l){var s=this;if((0,t.isEmptyOrNull)(s.form.ResignationDate.value)){(0,t.alertDialog)("Please make sure the resign date is correct");return}(0,t.confirm)("Are you sure this employee has resigned?",()=>{y.Update({EntityId:s.entityId,Entity:{Terminated:1}}),s.readOnly=!0,super.save_submitHandler(l)})}};u(m,"EmployeeResignDialog"),m=c([d.Decorators.registerClass("HRMSoftware.EmployeeProfile.EmployeeResignDialog")],m);export{m as a};
//# sourceMappingURL=chunk-VPSR7XAK.js.map