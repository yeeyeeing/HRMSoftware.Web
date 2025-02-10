import{a as pe}from"./chunk-TOBXC2UI.js";import{C as le,D as de,E as G,F as K,g as W,h as B,o as N,p as P,s as ae,t as oe,v as te,w as j,x as Q}from"./chunk-R2HZVO35.js";import{a as se,b as ne}from"./chunk-TYRFK7TU.js";import{a as ge}from"./chunk-DNINIZJD.js";import{a as Z,b as ee,c as H,g as ie,h as re,j as _,k as ue}from"./chunk-L3ECGIWB.js";var V=ie(ge(),1),z=ie(ue(),1);var J=class extends V.EntityDialog{constructor(){super(...arguments);this.form=new te(this.idPrefix);this.answertypelst=[];this.questionlst=[]}getFormKey(){return te.formKey}getRowDefinition(){return j}getService(){return Q.baseUrl}getResponseRowID(e){this.FormId=e}getTemplateID(e){this.TemplateId=e}getTargetID(e){this.TargetID=e}onDialogOpen(){super.onDialogOpen(),this.dialogTitle="Performance Appraisal",this.saveAndCloseButton.hide(),this.applyChangesButton.hide();let e=$("<div></div>").appendTo(this.element),a=$('<div id="target-info-container"></div>').appendTo(this.element),l=$('<div id="questions-container"></div>').appendTo(this.element),c=new Date().toISOString().slice(0,10),d=[],w=[],v=[],i="",s="",p="",A="",t="",r="",g="",x=0;ne.List({Criteria:[[se.Fields.Id],"=",this.TargetID]},f=>{for(var M in f.Entities){let O=f.Entities[M];i=O.EmployeeName,s=O.EmployeeID,p=O.DepartmentDept,A=O.Occupation}P.List({Criteria:[[N.Fields.Id],"=",this.FormId]}).then(O=>{for(let m of O.Entities)t=m.StartDate,r=m.EndDate;Q.List({Criteria:[[j.Fields.Id],"=",this.FormId]}).then(m=>{if(m.Entities.length===0)g=c;else{let T=m.Entities[0];T.UpdateDate?g=T.UpdateDate.split("T")[0]:g=T.InsertDate.split("T")[0]}function F(T){let C=new Date(T),L=C.getFullYear(),S=String(C.getMonth()+1).padStart(2,"0"),k=String(C.getDate()).padStart(2,"0");return`${L}-${S}-${k}`}H(F,"formatDate");let U=F(t),I=new Date(r).toISOString().split("T")[0],q=F(r);this.displayEmployeeInfo(a,i,s,A,p,U,I,q,g)})})}),K.List({Criteria:[[G.Fields.Id],"=",this.TemplateId]},f=>{x=f.Entities[0].RatingScale,de.List({Criteria:[[le.Fields.TemplateId],"=",this.TemplateId]},M=>{for(var O in M.Entities){let m=M.Entities[O];d.push(m.QuestionId)}d.length>0?d.forEach(m=>{oe.List({Criteria:[[ae.Fields.Id],"=",m]},F=>{for(let I of F.Entities)w.push(I.Questions),v.push(I.AnswerType);w.length===d.length&&this.displayQuestionsAndAnswers(l,e,w,v,x);let U=`
                                <button id="scrollToTopBtn" style="display: none; position: fixed; bottom: 20px; right: 20px; z-index: 99; background-color: #34495e; color: white; border: none; padding: 10px 15px; border-radius: 50%; cursor: pointer;">
                                    <i class="fa fa-upload"></i>
                                </button>
                            `;l.append(U),$(window).scroll(function(){$(window).scrollTop()>200?$("#scrollToTopBtn").fadeIn():$("#scrollToTopBtn").fadeOut()}),$(document).on("click","#scrollToTopBtn",function(){$("html, body").animate({scrollTop:0},5)})})}):Q.List({Criteria:[[j.Fields.FormId],"=",this.FormId]},m=>{if(m.Entities.length>0)this.displayQuestionsAndAnswers(l,e,[],[],x);else if(m.Entities.length===0){l.append(`
                            <div id="warning-message" class="warning-container">
                                <p class="warning-text">Template question not found or has been removed.</p>
                            </div>
                        `);let F=`
                                <button id="scrollToTopBtn" style="display: none; position: fixed; bottom: 20px; right: 20px; z-index: 99; background-color: #34495e; color: white; border: none; padding: 10px 15px; border-radius: 50%; cursor: pointer;">
                                    <i class="fa fa-upload"></i>
                                </button>
                            `;l.append(F),$(window).scroll(function(){$(window).scrollTop()>200?$("#scrollToTopBtn").fadeIn():$("#scrollToTopBtn").fadeOut()}),$(document).on("click","#scrollToTopBtn",function(){$("html, body").animate({scrollTop:0},5)}),this.applyStyles(l)}})})})}displayEmployeeInfo(e,a,l,c,d,w,v,i,s){let p=`
            <hr style="border: 1px solid #000000; margin-left: 10%; margin-right: 10%;">
            
            <div id="employee-info" 
            style="padding: 20px; margin-right: 10%; margin-left: 10%; color: #ffffff; border-radius: 8px; 
            border: 1px solid transparent; font-family: Arial, sans-serif;">
            
                <div style="margin-bottom: 20px; font-size: 22px; color: #000000; font-weight: bold; 
                background-color: #b1b1b1; text-align: center; border-radius: 6px; border: 1px solid #dee2e6;
                max-width: 100%;">Employee Information</div>
                
                <table style="width: 100%; border-spacing: 15px; border-collapse: separate;">
                    <tr>
                        <td style="width: 20%; color: #000000; font-weight: bold;">Name:</td>
                        <td style="width: 30%; color: #000000; border: 1px solid #dee2e6; border-radius: 4px; padding: 8px 12px; background-color: lightgrey;">${a}</td>
                        <td style="width: 20%; color: #000000; font-weight: bold;">Employee ID:</td>
                        <td style="width: 30%; color: #000000; border: 1px solid #dee2e6; border-radius: 4px; padding: 8px 12px; background-color: lightgrey;">${l}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #000000;">Job Title:</td>
                        <td style="border: 1px solid #dee2e6; color: #000000; border-radius: 4px; padding: 8px 12px; 
                        background-color: lightgrey;">${c}</td>
                        <td style="font-weight: bold; color: #000000;">Date:</td>
                        <td style="border: 1px solid #dee2e6; color: #000000; border-radius: 4px; padding: 8px 12px; 
                        background-color: lightgrey;">${s}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #000000;">Department:</td>
                        <td style="border: 1px solid #dee2e6; color: #000000; border-radius: 4px; padding: 8px 12px; 
                        background-color: lightgrey;">${d}</td>
                        <td style="font-weight: bold; color: #000000;">Head Of Dept:</td>
                        <td style="border: 1px solid #dee2e6; color: #000000; border-radius: 4px; padding: 8px 12px; 
                        background-color: lightgrey;"></td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #000000;">Appraisal Period:</td>
                        <td colspan="3" style=" color: #000000; border: 1px solid #dee2e6; border-radius: 4px; 
                        padding: 8px 12px; background-color:lightgrey;">${w}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        to&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${i}</td>
                    </tr>
                </table>
                
                <hr style="border: 1px solid #000000;">
            </div>`;$(p).appendTo(e)}isWithinDateRange(e,a,l){let c=new Date(e),d=new Date(a);return isNaN(c.getTime())||isNaN(d.getTime())?(console.error("Invalid date(s) provided"),!1):(l>=c&&l<=d&&console.log(c,l,d,l>=c&&l<=d),l>=c&&l<=d)}displayQuestionsAndAnswers(e,a,l,c,d){e.empty();let w=l.map((m,F)=>({question:m,answertypeId:c[F]}));w.sort((m,F)=>m.answertypeId-F.answertypeId),this.answertypelst=w.map(m=>m.answertypeId),this.questionlst=w.map(m=>m.question);let v=!1,i=!1,s=!1,p=new Date,A=String(p),t="",r="",g=0,x=0,f=0;function M(m){let F=new Date(m),U=F.getFullYear(),I=String(F.getMonth()+1).padStart(2,"0"),q=String(F.getDate()).padStart(2,"0");return`${U}-${I}-${q}`}H(M,"formatDate");let O=M(A);P.List({Criteria:[[N.Fields.Id],"=",this.FormId]}).then(m=>{let F=m.Entities[0].EndDate,U=new Date(F);if(p>=U){let I;I=`
                    <div id="warning-message" class="warning-container">
                        <p class="warning-text">The deadline has passed. The following is the last saved record.</p>
                    </div>
                `,e.append(I),Q.List({Criteria:[[j.Fields.FormId],"=",this.FormId]}).then(q=>{q.Entities.length>0?P.List({Criteria:[[N.Fields.Id],"=",this.FormId]}).then(T=>{for(let D of T.Entities)t=D.StartDate,r=D.EndDate;let C=[],L=[];q.Entities.forEach(D=>{let o=D.Question,u=D.Answer,h=D.AnswerType;h==="text"?C.push({question:o,answer:u}):h==="rating"&&L.push({question:o,answer:u})});function S(D){let o=new Date(D),u=o.getFullYear(),h=String(o.getMonth()+1).padStart(2,"0"),b=String(o.getDate()).padStart(2,"0");return`${u}-${h}-${b}`}H(S,"formatDate"),C.forEach(({question:D,answer:o},u)=>{let h;if(!v){let R=S(t),y=S(r);e.append(`
                                        <p class="reminder-text">
                                            Please complete the form between <span class="date-text">${R}</span> and <span class="date-text">${y}</span>.
                                            During this period, you can edit and resubmit the form as needed. After the deadline, no further submissions or edits will be allowed.
                                        </p>
                                        <p class="instruction-text">Appraisee to complete and return to the appraiser prior to the interview.</p>
                                    `),v=!0}h=`
                                    <div class="text-answer">
                                        <textarea name="answer-${u}" placeholder="Enter your answer here..." 
                                                  style="width: 100%; height: 100px; background-color: ${s?"white":"#D3D3D3"};" 
                                                  ${s?"":"readonly"} required>${o}</textarea>
                                    </div>
                                `;let b=`
                                    <div class="question-item">
                                        <p style="font-weight: bold; text-align: justify;">${D}</p>
                                        ${h}
                                    </div>
                                `;e.append(b)}),L.forEach(({question:D,answer:o},u)=>{x=x+1,g=g+parseInt(o);let h;i||(e.append(`
                                        <p class="instruction-radio">Rate your capability or knowledge in the following areas based on your current 
                                        role requirements. Use the rating scale provided, where lower scores represent less capability and higher 
                                        scores represent greater capability, from left to right.</p>
                                    `),i=!0);let b=Array.from({length:d},(y,n)=>n+1);h=`
                                    <div class="rating-container">
                                        <div class="rating" style="background-color: ${s?"transparent":"#D3D3D3"};">
                                            ${b.map(y=>`
                                                <div class="radio-item">
                                                    <input type="radio" name="answer-${u}" value="${y}" id="rating-${u}-${y}" ${y==o?"checked":""} ${s?"":"disabled"} required />
                                                    <label for="rating-${u}-${y}" class="radio-label">${y}</label>
                                                </div>
                                            `).join("")}
                                        </div>
                                    </div>
                                `;let R=`
                                    <div class="question-item">
                                        <p style="font-weight: bold; text-align: justify;">${D}</p>
                                        ${h}
                                    </div>
                                `;e.append(R)}),f=g/(x*d)*100,(isNaN(f)||f===0)&&(f=0);let k=`
                                <div class="overallRating">
                                    <label>Overall Rating (average the rating numbers above by percentage): </label>
                                    <input class="percentage" id="percentage" style="justify-content: flex-end;" value="${f.toFixed(2)}%" />
                                </div>
                            `;e.append(k),this.applyStyles(e)}):(console.log("Pass deadline but incomplete..."),P.List({Criteria:[[N.Fields.Id],"=",this.FormId]}).then(T=>{for(let S of T.Entities)t=S.StartDate,r=S.EndDate;s=this.isWithinDateRange(t,r,p),w.forEach(({question:S,answertypeId:k},D)=>{let o,h=q.Entities.reduce((y,n)=>(y[n.Question]=n.Answer,y),{})[S]||"";function b(y){let n=new Date(y),E=n.getFullYear(),Y=String(n.getMonth()+1).padStart(2,"0"),X=String(n.getDate()).padStart(2,"0");return`${E}-${Y}-${X}`}if(H(b,"formatDate"),k===2){if(!v){let y=b(t),n=b(r);e.append(`
                                        <p class="reminder-text">
                                            Please complete the form between <span class="date-text">${y}</span> and <span class="date-text">${n}</span>.
                                            During this period, you can edit and resubmit the form as needed. After the deadline, no further submissions or edits will be allowed.
                                        </p>
                                        <p class="instruction-text">Appraisee to complete and return to the appraiser prior to the interview.</p>
                                    `),v=!0}o=`
                                        <div class="text-answer">
                                            <textarea name="answer-${D}" placeholder="Enter your answer here..." 
                                                      style="width: 100%; height: 100px; background-color: ${s?"white":"#D3D3D3"};" 
                                                      ${s?"":"readonly"} required>${h}</textarea>
                                        </div>
                                    `}else if(k===3){x=x+1,g=g+parseInt(h),i||(e.append('<p class="instruction-radio">Rate your capability or knowledge in the following areas based on your current role requirements. Use the rating scale provided, where lower scores represent less capability and higher scores represent greater capability, from left to right.</p>'),i=!0);let y=Array.from({length:d},(n,E)=>E+1);o=`
                                        <div class="rating-container">
                                            <div class="rating" style="background-color: ${s?"transparent":"#D3D3D3"};">
                                                ${y.map(n=>`
                                                    <div class="radio-item">
                                                        <input type="radio" name="answer-${D}" value="${n}" id="rating-${D}-${n}" ${n==h?"checked":""} ${s?"":"disabled"} required />
                                                        <label for="rating-${D}-${n}" class="radio-label">${n}</label>
                                                    </div>
                                                `).join("")}
                                            </div>
                                        </div>
                                    `}let R=`
                                    <div class="question-item">
                                        <p style="font-weight: bold; text-align: justify;">${S}</p>
                                        ${o}
                                    </div>
                                `;e.append(R)}),f=g/(x*d)*100,(isNaN(f)||f===0)&&(f=0);let C=`
                                <div class="overallRating">
                                    <label>Overall Rating (average the rating numbers above by percentage): </label>
                                    <input class="percentage" id="percentage" style="justify-content: flex-end;" value="${f.toFixed(2)}%" />
                                </div>
                            `;e.append(C);let L='<hr style="border: 1px solid #000000; margin-left: 10%; margin-right: 10%; margin-top: 8%;">';e.append(L),this.applyStyles(e)}))}).catch(q=>console.error("Error fetching existing answers:",q))}else l.length===0?Q.List({Criteria:[[j.Fields.FormId],"=",this.FormId]}).then(I=>{P.List({Criteria:[[N.Fields.Id],"=",this.FormId]}).then(q=>{for(let o of q.Entities)t=o.StartDate,r=o.EndDate;let T=[],C=[];I.Entities.forEach(o=>{let u=o.Question,h=o.Answer,b=o.AnswerType;b==="text"?T.push({question:u,answer:h}):b==="rating"&&C.push({question:u,answer:h})});function L(o){let u=new Date(o),h=u.getFullYear(),b=String(u.getMonth()+1).padStart(2,"0"),R=String(u.getDate()).padStart(2,"0");return`${h}-${b}-${R}`}H(L,"formatDate");let S;S=`
                                <div id="warning-message" class="warning-container">
                                    <input class="warning-text">Template question not found or has been removed. The following is the last saved record.</input>
                                </div>
                            `,e.append(S),T.forEach(({question:o,answer:u},h)=>{let b;if(!v){let y=L(t),n=L(r);e.append(`
                                        <p class="reminder-text">
                                            Please complete the form between <span class="date-text">${y}</span> and <span class="date-text">${n}</span>.
                                            During this period, you can edit and resubmit the form as needed. After the deadline, no further submissions or edits will be allowed.
                                        </p>
                                        <p class="instruction-text">Appraisee to complete and return to the appraiser prior to the interview.</p>
                                    `),v=!0}b=`
                                    <div class="text-answer">
                                        <textarea name="answer-${h}" placeholder="Enter your answer here..." 
                                                  style="width: 100%; height: 100px; background-color: ${s?"white":"#D3D3D3"};" 
                                                  ${s?"":"readonly"} required>${u}</textarea>
                                    </div>
                                `;let R=`
                                    <div class="question-item">
                                        <p style="font-weight: bold; text-align: justify;">${o}</p>
                                        ${b}
                                    </div>
                                `;e.append(R)}),C.forEach(({question:o,answer:u},h)=>{x=x+1,g=g+parseInt(u);let b;i||(e.append(`
                                    <p class="instruction-radio">Rate your capability or knowledge in the following areas based on your current role requirements. 
                                    Use the rating scale provided, where lower scores represent less capability and higher scores represent greater capability, 
                                    from left to right.</p>
                                    
                                `),i=!0);let R=Array.from({length:d},(n,E)=>E+1);b=`
                                    <div class="rating-container">
                                        <div class="rating" style="background-color: ${s?"transparent":"#D3D3D3"};">
                                            ${R.map(n=>`
                                                <div class="radio-item">
                                                    <input type="radio" name="answer-${h}" value="${n}" id="rating-${h}-${n}" ${n==u?"checked":""} ${s?"":"disabled"} required />
                                                    <label for="rating-${h}-${n}" class="radio-label">${n}</label>
                                                </div>
                                            `).join("")}
                                        </div>
                                    </div>
                                `;let y=`
                                    <div class="question-item">
                                        <p style="font-weight: bold; text-align: justify;">${o}</p>
                                        ${b}
                                    </div>
                                `;e.append(y)}),f=g/(x*d)*100,(isNaN(f)||f===0)&&(f=0);let k=`
                                <div class="overallRating">
                                    <label>Overall Rating (average the rating numbers above by percentage): </label>
                                    <input class="percentage" id="percentage" style="justify-content: flex-end;" value="${f.toFixed(2)}%" />
                                </div>
                            `;e.append(k);let D='<hr style="border: 1px solid #000000; margin-left: 10%; margin-right: 10%; margin-top: 5%;">';e.append(D),this.applyStyles(e)})}).catch(I=>console.error("Error fetching existing answers:",I)):Q.List({Criteria:[[j.Fields.FormId],"=",this.FormId]}).then(I=>{P.List({Criteria:[[N.Fields.Id],"=",this.FormId]}).then(q=>{for(let k of q.Entities)t=k.StartDate,r=k.EndDate;s=this.isWithinDateRange(t,r,p),w.forEach(({question:k,answertypeId:D},o)=>{let u,b=I.Entities.reduce((n,E)=>(n[E.Question]=E.Answer,n),{})[k]||"";function R(n){let E=new Date(n),Y=E.getFullYear(),X=String(E.getMonth()+1).padStart(2,"0"),ce=String(E.getDate()).padStart(2,"0");return`${Y}-${X}-${ce}`}if(H(R,"formatDate"),D===2){if(!v){let n=R(t),E=R(r);e.append(`
                                            <p class="reminder-text">
                                                Please complete the form between <span class="date-text">${n}</span> and <span class="date-text">${E}</span>.
                                                During this period, you can edit and resubmit the form as needed. After the deadline, no further submissions or edits will be allowed.
                                            </p>
                                            <p class="instruction-text">Appraisee to complete and return to the appraiser prior to the interview.</p>
                                        `),v=!0}u=`
                                        <div class="text-answer">
                                            <textarea name="answer-${o}" placeholder="Enter your answer here..." 
                                                      style="width: 100%; height: 100px; background-color: ${s?"white":"#D3D3D3"};" 
                                                      ${s?"":"readonly"} required>${b}</textarea>
                                        </div>
                                    `}else if(D===3){x=x+1,g=g+parseInt(b),i||(e.append('<p class="instruction-radio">Rate your capability or knowledge in the following areas based on your current role requirements. Use the rating scale provided, where lower scores represent less capability and higher scores represent greater capability, from left to right.</p>'),i=!0);let n=Array.from({length:d},(E,Y)=>Y+1);u=`
                                        <div class="rating-container">
                                            <div class="rating" style="background-color: ${s?"transparent":"#D3D3D3"};">
                                                ${n.map(E=>`
                                                    <div class="radio-item">
                                                        <input type="radio" name="answer-${o}" value="${E}" id="rating-${o}-${E}" ${E==b?"checked":""} ${s?"":"disabled"} required />
                                                        <label for="rating-${o}-${E}" class="radio-label">${E}</label>
                                                    </div>
                                                `).join("")}
                                            </div>
                                        </div>
                                    `}let y=`
                                    <div class="question-item">
                                        <p style="font-weight: bold; text-align: justify;">${k}</p>
                                        ${u}
                                    </div>
                                `;e.append(y)}),f=g/(x*d)*100,(isNaN(f)||f===0)&&(f=0);let T=`
                                <div class="overallRating">
                                    <label>Overall Rating (average the rating numbers above by percentage): </label>
                                    <input class="percentage" id="percentage" style="justify-content: flex-end;" value="${f.toFixed(2)}%" />
                                </div>
                            `;e.append(T);let C='<hr style="border: 1px solid #000000; margin-left: 10%; margin-right: 10%; margin-top: 5%;">';e.append(C);let L=$('<button><i class="fa fa-save"></i> Save</button>').appendTo(a),S=$('<button><i class="fa fa-paper-plane"></i> Submit</button>').appendTo(a);a.css({position:"relative","z-index":1e3,"margin-bottom":"1%"}),L.css({border:"1px solid #b1b1b1","background-color":"white",padding:"7px 9px","border-radius":"5px","font-size":"16px",cursor:"pointer",width:"80px",display:"inline-block","margin-right":"5px"}),S.css({border:"1px solid #b1b1b1","background-color":"white",padding:"7px 9px","border-radius":"5px","font-size":"16px",cursor:"pointer",width:"100px",display:"inline-block"}),L.hover(function(){$(this).css({"background-color":"gray",color:"black"})},function(){$(this).css({"background-color":"white",color:"black"})}),S.hover(function(){$(this).css({"background-color":"darkblue",color:"white"})},function(){$(this).css({"background-color":"white",color:"black"})}),L.on("click",()=>{(0,z.confirm)("Save the answer as draft?",()=>{this.saveData()})}),S.on("click",()=>{(0,z.confirm)("Submit appraisal form?",()=>{this.submitData()})}),this.applyStyles(e)})}).catch(I=>console.error("Error fetching existing answers:",I))}),this.evaluation(a)}evaluation(e){P.List({Criteria:[[N.Fields.Id],"=",this.FormId]},a=>{let l=new Date,c=a.Entities[0].EvaluateStartDate,d=new Date(c);if(a.Entities[0].SubmissionStatus===2&&l>=d){let w=$('<button><i class="fa fa-file-signature"></i> Evaluation</button>').appendTo(e);e.css({position:"relative","z-index":1e3,"margin-bottom":"1%"}),w.css({border:"1px solid #b1b1b1","background-color":"white",padding:"7px 9px","border-radius":"5px","font-size":"16px",cursor:"pointer",width:"125px",display:"inline-block","margin-right":"5px"}),w.hover(function(){$(this).css({"background-color":"darkred",color:"white"})},function(){$(this).css({"background-color":"white",color:"black"})}),w.on("click",()=>{B.List({Criteria:[[W.Fields.FormId],"=",this.FormId]},v=>{if(v.Entities.length>0){let i=v.Entities[0].Id;(0,z.confirm)("Evaluate this appraisal form?",()=>{var s=new pe;s.loadByIdAndOpenDialog(i)})}})})}console.log("check1")})}applyStyles(e){e.find(".warning-container").css({border:"1px solid #ffcc00","background-color":"#fff3cd",color:"#856404",padding:"15px",margin:"5px 0","margin-bottom":"40px","border-radius":"5px","font-family":"Arial, sans-serif","font-size":"16px","text-align":"center","margin-left":"10%","margin-right":"10%"}),e.find(".question-item").css({"margin-bottom":"25px",padding:"10px",border:"1px solid #ddd","border-radius":"5px","margin-right":"12%","margin-left":"12%"}),e.find(".text-answer").css({"margin-bottom":"10px"}),e.find('.text-answer input[type="text"]').css({width:"100%",height:"80px",padding:"8px",border:"1px solid #ccc","border-radius":"4px","font-size":"14px"}),e.find(".rating-container").css({display:"flex","align-items":"center","justify-content":"flex-end"}),e.find(".rating").css({display:"flex","align-items":"center","justify-content":"space-between"}),e.find(".overallRating").css({"margin-bottom":"25px",padding:"10px",border:"1px solid #000000","border-radius":"5px","margin-right":"12%","margin-left":"12%","font-weight":"bold","background-color":"#b1b1b1",display:"flex","justify-content":"space-between","align-items":"center"}),e.find(".percentage").css({"font-weight":"bold","text-align":"right","margin-right":"5%","margin-top":"1%"}),e.find('.rating input[type="radio"]').css({"margin-left":"30px","margin-right":"30px",width:"20px",height:"20px"}),e.find(".instruction-text").css({"font-weight":"bold","margin-bottom":"25px","margin-left":"12%",color:"darkblue","font-size":"17px"}),e.find(".reminder-text").css({"font-weight":"bold","margin-bottom":"25px","margin-left":"12%","margin-right":"12%",color:"darkred","font-size":"17px","text-align":"justify"}),e.find(".reminder-text .date-text").css({color:"orange","font-weight":"bold","font-size":"18px"}),e.find(".instruction-radio-label").css({"font-weight":"bold","margin-bottom":"5px","margin-right":"13%","text-align":"right",color:"darkred","font-size":"16px"}),e.find(".instruction-radio").css({"font-weight":"bold","margin-top":"3%","margin-bottom":"15px","margin-left":"12%","margin-right":"13%",color:"darkblue","font-size":"17px","text-align":"justify"}),e.find(".radio-item").css({display:"flex","flex-direction":"column","align-items":"center","margin-right":"10px"}),e.find(".radio-label").css({"margin-top":"5px","font-size":"10px","font-weight":"bold"})}isEmptyOrNull(e){return e==null||e===""}saveData(){let e=[],a=0,l=0,c=0;P.List({Criteria:[[N.Fields.Id],"=",this.FormId]},d=>_(this,null,function*(){yield K.List({Criteria:[[G.Fields.Id],"=",d.Entities[0].TemplateId]},w=>_(this,null,function*(){let v=w.Entities[0].RatingScale;$("#questions-container .question-item").each((i,s)=>{var r,g,x;let p;this.answertypelst[i]===2?p=((r=$(s).find('textarea[name^="answer-"]').val())==null?void 0:r.toString())||"":this.answertypelst[i]===3?(p=((g=$(s).find('input[name^="answer-"]:checked').val())==null?void 0:g.toString())||"",(isNaN(parseInt(p))||parseInt(p)===0)&&(p="0"),l=l+parseInt(p),c=c+1):p=((x=$(s).find('input[name^="answer-"]').val())==null?void 0:x.toString())||"";let A=this.questionlst[i],t=this.answertypelst[i]===2?"text":this.answertypelst[i]===3?"rating":this.answertypelst[i];e.push({Question:A,Answer:p,AnswerType:t,FormID:this.FormId})}),a=l/(c*v)*100,isNaN(a)||a===0?a=0:a=parseFloat(a.toFixed(2)),Q.List({Criteria:[[j.Fields.FormId],"=",this.FormId]}).then(i=>{let s=i.Entities,p=[],A=[];e.forEach(t=>{let r=s.find(g=>g.Question===t.Question);r?A.push(ee(Z({},t),{Id:r.Id})):p.push(t)}),p.forEach(t=>{Q.Create({Entity:t}).then(r=>{(0,z.alertDialog)("Answer have been saved.")}).catch(r=>{console.error("Error:",r)})}),A.forEach(t=>{Q.Update({Entity:t}).then(r=>{(0,z.alertDialog)("Answer have been saved.")}).catch(r=>{console.error("Error:",r)})}),P.Update({EntityId:this.FormId,Entity:{SubmissionStatus:3}}).then(t=>{}).catch(t=>{console.error("Error updating SubmissionStatus:",t)}),B.List({Criteria:[[W.Fields.FormId],"=",this.FormId]},t=>{t.Entities.length>0?B.Update({EntityId:t.Entities[0].Id,Entity:{OverallRate:a}}):B.Create({EntityId:this.FormId,Entity:{FormId:this.FormId,OverallRate:a}})})}).catch(i=>{console.error("Error checking FormID:",i)}),setTimeout(()=>{this.dialogClose(),window.location.reload()},1e3)}))}))}submitData(){let e=[],a=0,l=0,c=0;P.List({Criteria:[[N.Fields.Id],"=",this.FormId]},d=>_(this,null,function*(){yield K.List({Criteria:[[G.Fields.Id],"=",d.Entities[0].TemplateId]},w=>_(this,null,function*(){let v=w.Entities[0].RatingScale;$("#questions-container .question-item").each((i,s)=>{var r,g,x;let p;if(this.answertypelst[i]===2?p=((r=$(s).find('textarea[name^="answer-"]').val())==null?void 0:r.toString())||"":this.answertypelst[i]===3?(p=((g=$(s).find('input[name^="answer-"]:checked').val())==null?void 0:g.toString())||"",l=l+parseInt(p),c=c+1):p=((x=$(s).find('input[name^="answer-"]').val())==null?void 0:x.toString())||"",this.isEmptyOrNull(p))return!1;let A=this.questionlst[i],t=this.answertypelst[i]===2?"text":this.answertypelst[i]===3?"rating":this.answertypelst[i];e.push({Question:A,Answer:p,AnswerType:t,FormID:this.FormId})}),a=l/(c*v)*100,isNaN(a)||a===0?a=0:a=parseFloat(a.toFixed(2)),this.validateForm()&&Q.List({Criteria:[[j.Fields.FormId],"=",this.FormId]}).then(i=>{let s=i.Entities,p=[],A=[];e.forEach(t=>{let r=s.find(g=>g.Question===t.Question);r?A.push(ee(Z({},t),{Id:r.Id})):p.push(t)}),p.forEach(t=>{Q.Create({Entity:t}).then(r=>{}).catch(r=>{console.error("Error:",r)})}),A.forEach(t=>{Q.Update({Entity:t}).then(r=>{}).catch(r=>{console.error("Error:",r)})}),P.Update({EntityId:this.FormId,Entity:{SubmissionStatus:2}}).then(t=>{this.onSaveSuccess({EntityId:this.FormId})}).catch(t=>{console.error("Error updating SubmissionStatus:",t)}),B.List({Criteria:[[W.Fields.FormId],"=",this.FormId]},t=>{t.Entities.length>0?B.Update({EntityId:t.Entities[0].Id,Entity:{OverallRate:a}}):B.Create({Entity:{FormId:this.FormId,OverallRate:a}})})}).catch(i=>{console.error("Error checking FormID:",i)})}))}))}onSaveSuccess(e){super.onSaveSuccess(e),(0,z.alertDialog)("Your appraisal form have been submitted."),setTimeout(()=>{this.dialogClose(),window.location.reload()},1e3)}validateForm(){let e=!0,a=!1;return $("#questions-container .question-item").each((l,c)=>{var w,v,i;let d;this.answertypelst[l]===2?d=((w=$(c).find('textarea[name^="answer-"]').val())==null?void 0:w.toString())||"":this.answertypelst[l]===3?d=((v=$(c).find('input[name^="answer-"]:checked').val())==null?void 0:v.toString())||"":d=((i=$(c).find('input[name^="answer-"]').val())==null?void 0:i.toString())||"",this.isEmptyOrNull(d)?(e=!1,a=!0,$(c).find("input, .rating").addClass("error"),$(c).find(".error-message").remove()):($(c).find("input, .rating").removeClass("error"),$(c).find(".error-message").remove())}),a&&(0,z.alertDialog)("Please fill in all required fields."),e}};H(J,"PerformanceAppraisalResponseDialog"),J=re([V.Decorators.panel(),V.Decorators.registerClass("HRMSoftware.PerformanceAppraisal.PerformanceAppraisalResponseDialog")],J);export{J as a};
//# sourceMappingURL=chunk-KND3NCWE.js.map
