import{l as G}from"../../../../_chunks/chunk-DCWHR4KR.js";import{a as L,c as C,d as s,e as a}from"../../../../_chunks/chunk-5TAMAFA5.js";import{G as W}from"../../../../_chunks/chunk-FIJG4RKS.js";import{f as j,j as M,n as Q}from"../../../../_chunks/chunk-HERT6KZV.js";import{b as T}from"../../../../_chunks/chunk-BFH3N3PU.js";import{d as P}from"../../../../_chunks/chunk-M5MV7SGZ.js";import"../../../../_chunks/chunk-T7E74GLF.js";import{a as B}from"../../../../_chunks/chunk-TIB4BNCY.js";import"../../../../_chunks/chunk-DMDSRNFC.js";import"../../../../_chunks/chunk-YDNSOE4Z.js";import{a as f}from"../../../../_chunks/chunk-27W64ILM.js";import"../../../../_chunks/chunk-2C2HJ25O.js";import{b as S}from"../../../../_chunks/chunk-XGDIBSP2.js";import"../../../../_chunks/chunk-K2UT2MVJ.js";import{a as F}from"../../../../_chunks/chunk-DNINIZJD.js";import{c as D,g as I,h as k,j as w,k as N}from"../../../../_chunks/chunk-L3ECGIWB.js";var J=I(N(),1);var l=I(F(),1);var E=I(F(),1);var i=I(N(),1);var _=I(N(),1),p=I(N(),1);var R=class extends E.EntityDialog{constructor(){super();this.form=new C(this.idPrefix);var e=document.createElement("link");e.rel="stylesheet",e.href="https://cdn.jsdelivr.net/npm/clocklet@0.3.0/css/clocklet.min.css";var t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/clocklet@0.3.0",document.head.appendChild(e),document.head.appendChild(t);var m=$(".fieldset").children().attr("id");let v="PropertyGrid",y="StartingAt",r="EndingAt",u=m.lastIndexOf(v);if(u!==-1)var O=m.substring(0,u)+y,b=m.substring(0,u)+r;var o=document.getElementById(O);o.setAttribute("data-clocklet",""),o.setAttribute("id","ot-start-clocklet"),o.addEventListener("clocklet.opening",function(d){let c=document.getElementById("ot-start-clocklet");c&&(c.style.zIndex=Number.MAX_SAFE_INTEGER.toString())}),o.addEventListener("clocklet.closed",function(d){});var h=document.getElementById(b);h.setAttribute("data-clocklet",""),h.setAttribute("id","ot-end-clocklet"),h.addEventListener("clocklet.opening",function(d){let c=document.getElementById("ot-end-clocklet");c&&(c.style.zIndex=Number.MAX_SAFE_INTEGER.toString())}),h.addEventListener("clocklet.closed",function(d){})}getFormKey(){return C.formKey}getRowDefinition(){return s}getService(){return a.baseUrl}calculateOtRate(){var e=this;if(e.form.WeekendOt.value==!1&&e.form.WeekdayOt.value==!1&&e.form.PublicHolidayOt.value==!1){e.form.OtRate.value=0;return}(0,p.serviceCall)({service:S.baseUrl+"/CalculateOtRate",data:{EmployeeRowID:e.form.EmployeeRowId.value,Date:e.form.OtDate.value},method:"GET",async:!1,onSuccess:t=>{console.log(t),e.form.WeekendOt.value==!0?e.form.OtRate.value=t.Entities[0].OtRateWeekend:e.form.WeekdayOt.value==!0?e.form.OtRate.value=t.Entities[0].OtRateWeekday:e.form.PublicHolidayOt.value==!0&&(e.form.OtRate.value=t.Entities[0].OtRatePublicHoliday)}})}dialogOpen(e){super.dialogOpen(e),E.EditorUtils.setReadonly(this.form.OtRate.element,!0),E.EditorUtils.setReadonly(this.form.EmployeeName.element,!0);var t=this,m=document.getElementById(this.idPrefix+"OtDate");$(m).on("change",()=>{t.calculateOtRate()});var v=document.getElementById(this.idPrefix+"WeekendOt");$(v).on("change",()=>{t.form.PublicHolidayOt.value==!0&&(t.form.PublicHolidayOt.value=!1),t.form.WeekdayOt.value==!0&&(t.form.WeekdayOt.value=!1),t.calculateOtRate()});var y=document.getElementById(this.idPrefix+"PublicHolidayOt");$(y).on("change",()=>{t.form.WeekendOt.value==!0&&(t.form.WeekendOt.value=!1),t.form.WeekdayOt.value==!0&&(t.form.WeekdayOt.value=!1),t.calculateOtRate()});var r=document.getElementById(this.idPrefix+"WeekdayOt");$(r).on("change",()=>{t.form.WeekendOt.value==!0&&(t.form.WeekendOt.value=!1),t.form.PublicHolidayOt.value==!0&&(t.form.PublicHolidayOt.value=!1),t.calculateOtRate()}),(0,p.serviceCall)({service:W.baseUrl+"/GetTodayDateTime",method:"GET",data:{},async:!1,onSuccess:u=>{t.form.OtDate.value=u}})}save_submitHandler(e){var t=document.getElementById("ot-start-clocklet"),m=document.getElementById("ot-end-clocklet"),v=t.value,y=m.value;let r=v.split(":"),u=y.split(":"),O=parseInt(r[0],10),b=parseInt(r[1],10),o=parseInt(u[0],10),h=parseInt(u[1],10);var d=60*(o-O)+(h-b);if(this.minimum_ot_time>d){(0,_.alertDialog)("This OT cannot be applied as the duration is less than minimum time");return}super.save_submitHandler(e)}onDialogOpen(){if(super.onDialogOpen(),$(".EmployeeUpdated").hide(),$(".HrUpdated").hide(),(0,p.isEmptyOrNull)(this.form.EmployeeUpdatedName.value))$(".EmployeeUpdatedName").hide();else{var e=document.getElementById(this.idPrefix+"EmployeeUpdatedName");$(e).on("click",function(){return w(this,null,function*(){var o=new P(parseInt(this.form.EmployeeUpdated.value));o.loadByIdAndOpenDialog(parseInt(this.form.EmployeeUpdated.value))})})}if((0,p.isEmptyOrNull)(this.form.HrUpdatedName.value))$(".HrUpdatedName").hide();else{var t=document.getElementById(this.idPrefix+"HrUpdatedName");$(t).on("click",function(){return w(this,null,function*(){var o=new P(parseInt(this.form.HrUpdated.value));o.loadByIdAndOpenDialog(parseInt(this.form.HrUpdated.value))})})}var m=".RejectedEmployeeName",v=".ApproveEmployeeName",y=document.getElementById(this.idPrefix+"EmployeeRowId"),r=this,u=document.getElementById(this.idPrefix+"OtDate");if(!i.Authorization.userDefinition.Permissions[f.HumanResources]&&this.isNew()&&(this.form.EmployeeRowId.value=i.Authorization.userDefinition.EmployeeRowID,E.EditorUtils.setReadonly(this.form.EmployeeRowId.element,!0),S.Retrieve({EntityId:$(y).val()},o=>{r.form.EmployeeName.value=o.Entity.EmployeeName,$(r.form.EmployeeRowId.element).val(i.Authorization.userDefinition.EmployeeRowID.toString()).trigger("change")})),this.isNew()){$(y).on("change",function(){return w(this,null,function*(){if(r.form.EmployeeName.value="",(0,p.isEmptyOrNull)($(y).val())){$(r.form.OtRate.element).val("");return}S.Retrieve({EntityId:$(y).val()},o=>{if(r.form.EmployeeName.value=o.Entity.EmployeeName,r.fixedOtRateOption==!0&&o.Entity.BasicSalary<r.thresholdSalary?r.form.OtRate.value=r.fixedOtRate:$(r.form.OtRate.element).val(""),!((0,p.isEmptyOrNull)($(this).val())||(0,p.isEmptyOrNull)($(u).val())))var h=o.Entity.Id,d=$(u).val().split(/[\/?]/),c=d[2],x=d[0],A=d[1]})})});var O=document.querySelectorAll(".text-bg-success");O.forEach(function(o){$(o).hide()}),$(v).hide();var b=document.querySelectorAll(".text-bg-danger");b.forEach(function(o){$(o).hide()}),$(m).hide(),$(v).hide()}else if(!this.isNew()){if(!i.Authorization.userDefinition.Permissions[f.HumanResources]&&r.form.EmployeeRowId.value!=i.Authorization.userDefinition.EmployeeRowID&&(this.readOnly=!0),r.form.EmployeeRowId.value==i.Authorization.userDefinition.EmployeeRowID){E.EditorUtils.setReadonly(this.form.EmployeeRowId.element,!0),E.EditorUtils.setReadonly(this.form.EmployeeName.element,!0);return}a.Retrieve({EntityId:this.entityId},o=>{var h=o.Entity.EmployeeRowId,d=o.Entity.HrStatus,c=o.Entity.EmployeeStatus;r.EmployeeApproval=o.Entity.EmployeeStatus,r.HrApproval=o.Entity.HrStatus;var x=o.Entity.Status;x==0?(0,p.serviceCall)({service:T.baseUrl+"/PermissionToAcknowledge",data:{UserEmployeeRowID:i.Authorization.userDefinition.EmployeeRowID,ApplicantEmployeeRowID:h},method:"GET",async:!1,onSuccess:A=>{var z=A;if(r.SuperiorPermission=A,r.form.EmployeeRowId.value!=i.Authorization.userDefinition.EmployeeRowID&&this.set_readOnly(!0),$(".delete-button").removeClass("disabled"),d==0||c==0)z==!0&&!c&&$(".tool-button").removeClass("hidden"),i.Authorization.userDefinition.Permissions[f.HumanResources]&&!d&&$(".tool-button").removeClass("hidden");else if((d==-1||c==-1||d==1&&c==1)&&($(m).hide(),$(v).hide(),r.form.EmployeeRowId.value==i.Authorization.userDefinition.EmployeeRowID)){var q=document.querySelectorAll(".text-bg-success");q.forEach(function(U){$(U).hide()});var V=document.querySelectorAll(".text-bg-danger");V.forEach(function(U){$(U).hide()})}},onError:A=>{console.log(A.Error)}}):(this.set_readOnly(!0),$(".delete-button").removeClass("disabled"))})}}getToolbarButtons(){var e=this,t=super.getToolbarButtons(),m=document.createElement("style");return m.textContent=`
            .hidden {
      display: none;
    }
            `,document.head.appendChild(m),t.push({title:"Approve Application",cssClass:"text-bg-success p-2 hidden",icon:"fa-check text-green",onClick:()=>{(0,p.confirm)("Do you want to approve this leave application?",()=>{i.Authorization.userDefinition.Permissions[f.HumanResources]?e.SuperiorPermission==!0?e.EmployeeApproval==2||e.HrApproval==2?e.EmployeeApproval==2?a.Update({EntityId:this.entityId,Entity:{HrStatus:1,HrUpdated:i.Authorization.userDefinition.EmployeeRowID}}):e.HrApproval==2&&a.Update({EntityId:this.entityId,Entity:{EmployeeStatus:1,EmployeeUpdated:i.Authorization.userDefinition.EmployeeRowID}}):e.HrApproval==1?a.Update({EntityId:this.entityId,Entity:{EmployeeStatus:1,EmployeeUpdated:i.Authorization.userDefinition.EmployeeRowID}}):e.EmployeeApproval==1?a.Update({EntityId:this.entityId,Entity:{HrStatus:1,HrUpdated:i.Authorization.userDefinition.EmployeeRowID}}):a.Update({EntityId:this.entityId,Entity:{EmployeeStatus:1,HrStatus:1,EmployeeUpdated:i.Authorization.userDefinition.EmployeeRowID,HrUpdated:i.Authorization.userDefinition.EmployeeRowID}}):a.Update({EntityId:this.entityId,Entity:{HrStatus:1,HrUpdated:i.Authorization.userDefinition.EmployeeRowID}}):a.Update({EntityId:this.entityId,Entity:{EmployeeStatus:1,EmployeeUpdated:i.Authorization.userDefinition.EmployeeRowID}}),location.reload()})}}),t.push({title:"Rejected Application",cssClass:"text-bg-danger p-2 hidden",icon:"fa-times text-red",onClick:()=>{(0,p.confirm)("Do you want to reject this leave application?",()=>{i.Authorization.userDefinition.Permissions[f.HumanResources]?e.SuperiorPermission==!0?e.EmployeeApproval==2||e.HrApproval==2?e.EmployeeApproval==2?a.Update({EntityId:this.entityId,Entity:{HrStatus:-1,HrUpdated:i.Authorization.userDefinition.EmployeeRowID}}):e.HrApproval==2&&a.Update({EntityId:this.entityId,Entity:{EmployeeStatus:-1,EmployeeUpdated:i.Authorization.userDefinition.EmployeeRowID}}):e.HrApproval==0?a.Update({EntityId:this.entityId,Entity:{HrStatus:-1,HrUpdated:i.Authorization.userDefinition.EmployeeRowID}}):e.EmployeeApproval==0?a.Update({EntityId:this.entityId,Entity:{EmployeeStatus:-1,EmployeeUpdated:i.Authorization.userDefinition.EmployeeRowID}}):a.Update({EntityId:this.entityId,Entity:{EmployeeStatus:-1,EmployeeUpdated:i.Authorization.userDefinition.EmployeeRowID,HrStatus:-1,HrUpdated:i.Authorization.userDefinition.EmployeeRowID}}):a.Update({EntityId:this.entityId,Entity:{HrStatus:-1,HrUpdated:i.Authorization.userDefinition.EmployeeRowID}}):a.Update({EntityId:this.entityId,Entity:{EmployeeStatus:-1,EmployeeUpdated:i.Authorization.userDefinition.EmployeeRowID}}),location.reload()})}}),t}};D(R,"OTApplicationDialog"),R=k([E.Decorators.registerClass("HRMSoftware.OTApplication.OTApplicationDialog")],R);var H=I(N(),1);var g=class extends l.EntityGrid{getColumnsKey(){return L.columnsKey}getDialogType(){return R}getRowDefinition(){return s}getService(){return a.baseUrl}getQuickFilters(){let n=super.getQuickFilters();return H.Authorization.hasPermission(f.HumanResources)&&(n.push({cssClass:"hidden-xs",field:s.Fields.OccupationName,type:l.Select2Editor,title:"Occupation"}),n.push({cssClass:"hidden-xs",field:s.Fields.JobGradeName,type:l.Select2Editor,title:"Job Grade"}),n.push({cssClass:"hidden-xs",field:s.Fields.DivisionName,type:l.Select2Editor,title:"Division"}),n.push({cssClass:"hidden-xs",field:s.Fields.DepartmentName,type:l.Select2Editor,title:"Department"}),n.push({cssClass:"hidden-xs",field:s.Fields.EmployeeName,type:l.Select2Editor,title:"Name"}),n.push({cssClass:"hidden-xs",field:s.Fields.EmployeeID,type:l.Select2Editor,title:"Employee ID"}),n.push({cssClass:"hidden-xs",field:s.Fields.CostCentreName,type:l.Select2Editor,title:"Cost Centre"}),n.reverse()),n}createQuickFilters(){if(super.createQuickFilters(),H.Authorization.hasPermission(f.HumanResources)){let n=["January","February","March","April","May","June","July","August","September","October","November","December"];Q.List({},e=>{for(var t in e.Entities)this.findQuickFilter(l.Select2Editor,s.Fields.OccupationName).items.push({id:e.Entities[t].Name.toString(),text:e.Entities[t].Name.toString()})}),M.List({},e=>{for(var t in e.Entities)this.findQuickFilter(l.Select2Editor,s.Fields.JobGradeName).items.push({id:e.Entities[t].Name.toString(),text:e.Entities[t].Name.toString()})}),B.List({},e=>{for(var t in e.Entities)this.findQuickFilter(l.Select2Editor,s.Fields.DepartmentName).items.push({id:e.Entities[t].Name.toString(),text:e.Entities[t].Name.toString()})}),j.List({},e=>{for(var t in e.Entities)this.findQuickFilter(l.Select2Editor,s.Fields.DivisionName).items.push({id:e.Entities[t].Name.toString(),text:e.Entities[t].Name.toString()})}),S.List({},e=>{for(var t in e.Entities)this.findQuickFilter(l.Select2Editor,s.Fields.EmployeeName).items.push({id:e.Entities[t].EmployeeName.toString(),text:e.Entities[t].EmployeeName.toString()}),this.findQuickFilter(l.Select2Editor,s.Fields.EmployeeID).items.push({id:e.Entities[t].EmployeeID.toString(),text:e.Entities[t].EmployeeID.toString()})}),G.List({},e=>{for(var t in e.Entities)this.findQuickFilter(l.Select2Editor,s.Fields.CostCentreName).items.push({id:e.Entities[t].Name.toString(),text:e.Entities[t].Name.toString()})})}}constructor(n){super(n)}getAddButtonCaption(){return"Apply Over Time Claiming"}getColumns(){var n=super.getColumns(),e;if(!H.Authorization.hasPermission(f.HumanResources))for(e in n)(n[e].name=="Employee Id"||n[e].name=="Approved By")&&n.splice(e,1);return n}onViewProcessData(n){return n=super.onViewProcessData(n),this.toolbar.findButton("column-picker-button").toggle(!1),n}};D(g,"OTApplicationGrid"),g=k([l.Decorators.registerClass("HRMSoftware.OTApplication.OTApplicationGrid")],g);function X(){(0,J.initFullHeightGridPage)(new g($("#GridDiv")).element)}D(X,"pageInit");export{X as default};
//# sourceMappingURL=OTApplicationPage.js.map