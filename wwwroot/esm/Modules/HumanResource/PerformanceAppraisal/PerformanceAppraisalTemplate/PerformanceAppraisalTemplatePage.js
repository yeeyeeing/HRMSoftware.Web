import{A as D,B as O,C as L,D as S,E as A,F as w,o as V,p as J,t as M,y as U,z as R}from"../../../../_chunks/chunk-R2HZVO35.js";import{a as B}from"../../../../_chunks/chunk-TIB4BNCY.js";import{a as H}from"../../../../_chunks/chunk-DMDSRNFC.js";import{a as j}from"../../../../_chunks/chunk-DNINIZJD.js";import{c as k,g as Q,h as q,k as N}from"../../../../_chunks/chunk-L3ECGIWB.js";var Y=Q(N(),1);var F=Q(j(),1);var P=Q(j(),1);var T=Q(N(),1);var I=class extends P.EntityDialog{constructor(){super(...arguments);this.form=new O(this.idPrefix)}getFormKey(){return O.formKey}getRowDefinition(){return A}getService(){return w.baseUrl}getID(e){this.templateID=e}onDialogOpen(){super.onDialogOpen(),this.element.closest(".ui-dialog").css("top","1%");let e=$('<div id="form-container"></div>').appendTo(this.element),r=[],n=[],l=[],s=[],h=[],d=[];B.List({},p=>{for(let i in p.Entities){let t=p.Entities[i];r.push(t.Id),n.push(t.Name)}M.List({},i=>{for(let t in i.Entities){let a=i.Entities[t];l.push(a.Id),s.push(a.Questions),h.push(a.AnswerType),a.AnswerType===2?d.push("text"):a.AnswerType===3&&d.push("rating")}this.displayTemplateForm(e,r,n,l,s,h,d)})}),this.applyChangesButton.remove(),this.saveAndCloseButton.remove(),this.deleteButton.remove()}displayTemplateForm(e,r,n,l,s,h,d){e.empty(),l.length>0&&s.length>0?w.List({Criteria:[[A.Fields.Id],"=",this.templateID]},p=>{if(p.Entities.length===0){let i=`
                        <div class="field-row" style="display: flex;">
                            <div class="field-column" style="display: flex; flex-direction: column; width: 30%;">
                                <div class="field">
                                    <label class="field-label">Duration (week):</label>
                                    <select id="DurationSelect" class="field-input">
                                        <option value="" disabled selected>Select duration...</option>
                                        <!-- Options from 1 to 10 -->
                                        <option value="1" style="text-align: center;">1</option>
                                        <option value="2" style="text-align: center;">2</option>
                                        <option value="3" style="text-align: center;">3</option>
                                        <option value="4" style="text-align: center;">4</option>
                                        <option value="5" style="text-align: center;">5</option>
                                        <option value="6" style="text-align: center;">6</option>
                                        <option value="7" style="text-align: center;">7</option>
                                        <option value="8" style="text-align: center;">8</option>
                                        <option value="9" style="text-align: center;">9</option>
                                        <option value="10" style="text-align: center;">10</option>
                                    </select>
                                </div>
                                <div class="field">
                                    <label class="field-label">Department:</label>
                                    <div class="field-box">
                                        <div class="search-depart-container">
                                            <div class="close-depart-inline">
                                                <input type="text" id="DepartSearch" class="search-depart-box" placeholder="Search department...">
                                                <span id="clearDepartSearch" class="clear-depart-icon fa fa-times"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="selectAll_depart" name="selectAll_depart" checked>
                                            <label for="selectAll_depart" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                        </div>
                                        <div class="depart-list-container">
                                            ${r.map((c,o)=>`
                                                <div class="depart-checkbox-group">
                                                    <input type="checkbox" id="department_${c}" name="departments" value="${c}">
                                                    <label for="department_${c}">${n[o]}</label>
                                                </div>
                                            `).join("")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                   
                            <div class="field-column" style="display: flex; flex-direction: column; width: 70%">
                                <div class="field">
                                    <label class="field-label">Rating Customize:</label>
                                    <select id="RatingCustomize" class="Rating-customize">
                                        <option value="" disabled selected>Select number of scale...</option>
                                        <!-- Options from 1 to 10 -->
                                        <option value="1" style="text-align: center;">1</option>
                                        <option value="2" style="text-align: center;">2</option>
                                        <option value="3" style="text-align: center;">3</option>
                                        <option value="4" style="text-align: center;">4</option>
                                        <option value="5" style="text-align: center;">5</option>
                                        <option value="6" style="text-align: center;">6</option>
                                    </select>
                                </div>
                                <div class="field">
                                    <label for="QuestionList" class="field-label">Questions:</label>
                                    <div class="field-box">
                                        <div class="search-container">
                                            <div class="close-inline">
                                                <input type="text" id="QuestionSearch" class="search-box" placeholder="Search question...">
                                                <span id="clearQuestionSearch" class="clear-icon fa fa-times"></span>
                                            </div>
                                            <div class="filter-close-inline">
                                                <select id="FilterAnswerType" class="field-select-filter">
                                                    <option value="">Filter</option>
                                                    <option value="text">text</option>
                                                    <option value="rating">rating</option>
                                                </select>
                                                <span id="clearFilter" class="filter-clear-icon fa fa-times"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="selectAll" name="selectAll" checked>
                                            <label for="selectAll" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                        </div>
                                        <div class="question-list-container">
                                            ${l.map((c,o)=>`
                                                <div class="question-list">
                                                    <input type="checkbox" id="Question_${c}" name="QuestionList" value="${c}" checked>
                                                    <label for="Question_${c}">${s[o]}</label>
                                                    <label class="answer-type">${d[o]}</label>
                                                    <hr style="color: #222222;">
                                                </div>`).join("")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `,t=$("<div></div>").prependTo(this.element),a=$('<button><i class="fa fa-save"></i> Save</button>').appendTo(t);t.css({display:"inline-block"}),a.css({position:"relative",border:"1px solid #b1b1b1","background-color":"white",padding:"5px 9px","border-radius":"5px","font-size":"16px",cursor:"pointer",width:"80px"}),a.hover(function(){$(this).css({"background-color":"gray",color:"black"})},function(){$(this).css({"background-color":"white",color:"black"})}),a.on("click",()=>this.saveData()),$(i).appendTo(e),this.applyStyles(e),this.addSelectAllFunctionality("#selectAll",'.question-list-container input[type="checkbox"]'),this.addSelectAllFunctionality("#selectAll_depart",'.depart-list-container input[type="checkbox"]'),this.addSearchFunctionality("#QuestionSearch","#clearQuestionSearch",'.question-list-container input[type="checkbox"]',s),this.addSearchFunctionality("#DepartSearch","#clearDepartSearch",'.depart-list-container input[type="checkbox"]',n),this.addFilterFunctionality("#FilterAnswerType",".question-list-container div",d)}else{let i=p.Entities[0];D.List({Criteria:[[R.Fields.TemplateId],"=",this.templateID]},t=>{S.List({Criteria:[[L.Fields.TemplateId],"=",this.templateID]},a=>{let c=[];for(let v of t.Entities)c.push(v.DepartmentId);let o=[];for(let v of a.Entities)o.push(v.QuestionId);let u=c||[],g=o||[],f=i.Duration||"",b=i.RatingScale||"",x=`
                                <div class="field-row" style="display: flex;">
                                    <div class="field-column" style="display: flex; flex-direction: column; width: 30%">
                                        <div class="field">
                                            <label class="field-label">Duration (week):</label>
                                            <select id="DurationSelect" class="field-input">
                                                <option value="" disabled ${f===""?"selected":""}>Select duration...</option>
                                                <!-- Options from 1 to 10 -->
                                                <option value="1" style="text-align: center;" ${f===1?"selected":""}>1</option>
                                                <option value="2" style="text-align: center;" ${f===2?"selected":""}>2</option>
                                                <option value="3" style="text-align: center;" ${f===3?"selected":""}>3</option>
                                                <option value="4" style="text-align: center;" ${f===4?"selected":""}>4</option>
                                                <option value="5" style="text-align: center;" ${f===5?"selected":""}>5</option>
                                                <option value="6" style="text-align: center;" ${f===6?"selected":""}>6</option>
                                                <option value="7" style="text-align: center;" ${f===7?"selected":""}>7</option>
                                                <option value="8" style="text-align: center;" ${f===8?"selected":""}>8</option>
                                                <option value="9" style="text-align: center;" ${f===9?"selected":""}>9</option>
                                                <option value="10" style="text-align: center;" ${f===10?"selected":""}>10</option>
                                            </select>
                                        </div>
                                        <div class="field">
                                            <label class="field-label">Department:</label>
                                            <div class="field-box">
                                                <div class="search-depart-container">
                                                    <div class="close-depart-inline">
                                                        <input type="text" id="DepartSearch" class="search-depart-box" placeholder="Search department...">
                                                        <span id="clearDepartSearch" class="clear-depart-icon fa fa-times"></span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <input type="checkbox" id="selectAll_depart" name="selectAll_depart" checked>
                                                    <label for="selectAll_depart" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                                </div>
                                                <div class="depart-list-container">
                                                    ${r.map((v,z)=>`
                                                        <div class="depart-checkbox-group">
                                                            <input type="checkbox" id="department_${v}" name="departments" value="${v}" ${u.includes(v)?"checked":""}>
                                                            <label for="department_${v}">${n[z]}</label>
                                                        </div>
                                                    `).join("")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        
                                    <div class="field-column" style="display: flex; flex-direction: column; width: 70%;">
                                        <div class="field" style="width: 100%;">
                                            <div class="field-column-row-content" style="width: 35%; margin-right: 5px;">
                                                <label class="field-label">Rating Customize:</label>
                                                <select id="RatingCustomize" class="Rating-customize-row-content">
                                                    <option value="" disabled ${b===""?"selected":""}>Select number of scale...</option>
                                                    <option value="1" style="text-align: center;" ${b===1?"selected":""}>1</option>
                                                    <option value="2" style="text-align: center;" ${b===2?"selected":""}>2</option>
                                                    <option value="3" style="text-align: center;" ${b===3?"selected":""}>3</option>
                                                    <option value="4" style="text-align: center;" ${b===4?"selected":""}>4</option>
                                                    <option value="5" style="text-align: center;" ${b===5?"selected":""}>5</option>
                                                    <option value="6" style="text-align: center;" ${b===6?"selected":""}>6</option>
                                                </select>
                                            </div>
                                            <div class="field-column-row-content"style="width: 63%;">
                                                <label class="field-label">Template Name:</label>
                                                <input type="text" id="TemplateName" class="template-name" value="${i.TemplateName}">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label for="QuestionList" class="field-label">Questions:</label>
                                            <div class="field-box">
                                                <div class="search-container">
                                                    <div class="close-inline">
                                                        <input type="text" id="QuestionSearch" class="search-box" placeholder="Search question...">
                                                        <span id="clearQuestionSearch" class="clear-icon fa fa-times"></span>
                                                    </div>
                                                    <div class="filter-close-inline">
                                                        <select id="FilterAnswerType" class="field-select-filter">
                                                            <option value="">Filter</option>
                                                            <option value="text">text</option>
                                                            <option value="rating">rating</option>
                                                        </select>
                                                        <span id="clearFilter" class="filter-clear-icon fa fa-times"></span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <input type="checkbox" id="selectAll" name="selectAll" checked>
                                                    <label for="selectAll" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                                </div>
                                                <div class="question-list-container">
                                                    ${l.map((v,z)=>`
                                                        <div class="question-list">
                                                            <input type="checkbox" id="Question_${v}" name="QuestionList" value="${v}" ${g.includes(v)?"checked":""}>
                                                            <label for="Question_${v}">${s[z]}</label>
                                                            <label class="answer-type">${d[z]}</label>
                                                            <hr style="color: #222222;">
                                                        </div>`).join("")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                               </div>
                           `,y=$("<div></div>").prependTo(this.element),E=$('<button><i class="fa fa-save"></i> Save</button>').appendTo(y),_=$('<button><i class="fa fa-trash"></i> Del</button>').appendTo(y);y.css({display:"inline-block"}),E.css({border:"1px solid #b1b1b1","background-color":"white",padding:"7px 9px","border-radius":"5px","font-size":"16px",cursor:"pointer",width:"80px",display:"inline-block","margin-right":"5px"}),_.css({border:"1px solid #b1b1b1","background-color":"white",padding:"7px 9px","border-radius":"5px","font-size":"16px",cursor:"pointer",width:"80px",display:"inline-block"}),E.hover(function(){$(this).css({"background-color":"gray",color:"black"})},function(){$(this).css({"background-color":"white",color:"black"})}),_.hover(function(){$(this).css({"background-color":"red",color:"white"})},function(){$(this).css({"background-color":"white",color:"black"})}),E.on("click",()=>this.updateData()),_.on("click",()=>{(0,T.confirm)("Delete record?",()=>{this.delData()})}),$(x).appendTo(e),this.applyStyles(e),this.addSelectAllFunctionality("#selectAll",'.question-list-container input[type="checkbox"]'),this.addSelectAllFunctionality("#selectAll_depart",'.depart-list-container input[type="checkbox"]'),this.addSearchFunctionality("#QuestionSearch","#clearQuestionSearch",'.question-list-container input[type="checkbox"]',s),this.addSearchFunctionality("#DepartSearch","#clearDepartSearch",'.depart-list-container input[type="checkbox"]',n),this.addFilterFunctionality("#FilterAnswerType",".question-list-container div",d),this.scrollToFirstChecked('.question-list-container input[type="checkbox"]','.depart-list-container input[type="checkbox"]')})})}}):l.length===0&&s.length===0&&w.List({Criteria:[[A.Fields.Id],"=",this.templateID]},p=>{let i=p.Entities[0];if(p.Entities.length>0)D.List({Criteria:[[R.Fields.TemplateId],"=",this.templateID]},t=>{let a=[];for(let y of t.Entities)a.push(y.DepartmentId);let c=a||[],o=p.Entities[0].Duration||"",u=p[0].RatingScale||"",g=`
                            <div class="field-row" style="display: flex;">
                                <div class="field-column" style="display: flex; flex-direction: column;">
                                    <div class="field">
                                        <label class="field-label">Duration (week):</label>
                                        <select id="DurationSelect" class="field-input">
                                            <option value="" disabled ${o===""?"selected":""}>Select duration...</option>
                                            <!-- Options from 1 to 10 -->
                                            <option value="1" style="text-align: center;" ${o===1?"selected":""}>1</option>
                                            <option value="2" style="text-align: center;" ${o===2?"selected":""}>2</option>
                                            <option value="3" style="text-align: center;" ${o===3?"selected":""}>3</option>
                                            <option value="4" style="text-align: center;" ${o===4?"selected":""}>4</option>
                                            <option value="5" style="text-align: center;" ${o===5?"selected":""}>5</option>
                                            <option value="6" style="text-align: center;" ${o===6?"selected":""}>6</option>
                                            <option value="7" style="text-align: center;" ${o===7?"selected":""}>7</option>
                                            <option value="8" style="text-align: center;" ${o===8?"selected":""}>8</option>
                                            <option value="9" style="text-align: center;" ${o===9?"selected":""}>9</option>
                                            <option value="10" style="text-align: center;" ${o===10?"selected":""}>10</option>
                                        </select>
                                    </div>
                                    <div class="field">
                                        <label class="field-label">Department:</label>
                                        <div class="field-box">
                                            <div class="search-depart-container">
                                                <div class="close-depart-inline">
                                                    <input type="text" id="DepartSearch" class="search-depart-box" placeholder="Search department...">
                                                    <span id="clearDepartSearch" class="clear-depart-icon fa fa-times"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="selectAll_depart" name="selectAll_depart" checked>
                                                <label for="selectAll_depart" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                            </div>
                                            <div class="depart-list-container">
                                                ${r.map((y,E)=>`
                                                    <div class="depart-checkbox-group">
                                                        <input type="checkbox" id="department_${y}" name="departments" value="${y}" ${c.includes(y)?"checked":""}>
                                                        <label for="department_${y}">${n[E]}</label>
                                                    </div>
                                                `).join("")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="field-column" style="display: flex; flex-direction: column; width: 70%;">
                                    <div class="field" style="width: 100%;">
                                        <div class="field-column-row-content" style="width: 40%; margin-right: 5px;">
                                            <label class="field-label">Rating Customize:</label>
                                            <select id="RatingCustomize" class="Rating-customize-row-content">
                                                <select id="RatingCustomize" class="Rating-customize-row-content">
                                                    <option value="" disabled ${u===""?"selected":""}>Select number of scale...</option>
                                                    <option value="1" style="text-align: center;" ${u===1?"selected":""}>1</option>
                                                    <option value="2" style="text-align: center;" ${u===2?"selected":""}>2</option>
                                                    <option value="3" style="text-align: center;" ${u===3?"selected":""}>3</option>
                                                    <option value="4" style="text-align: center;" ${u===4?"selected":""}>4</option>
                                                    <option value="5" style="text-align: center;" ${u===5?"selected":""}>5</option>
                                                    <option value="6" style="text-align: center;" ${u===6?"selected":""}>6</option>
                                                </select>
                                        </div>
                                        <div class="field-column-row-content"style="width: 58%;">
                                            <label class="field-label">Template Name:</label>
                                            <input type="text" id="TemplateName" class="template-name" value="${i.TemplateName}">
                                        </div>
                                    </div>
                                    <div class="field" >
                                        <label for="QuestionList" class="field-label">Questions:</label>
                                        <div class="field-box">
                                            <div class="search-container">
                                                <div class="close-inline">
                                                    <input type="text" id="QuestionSearch" class="search-box" placeholder="Search question...">
                                                    <span id="clearQuestionSearch" class="clear-icon fa fa-times"></span>
                                                </div>
                                                <div class="filter-close-inline">
                                                    <select id="FilterAnswerType" class="field-select-filter">
                                                        <option value="">Filter</option>
                                                        <option value="text">text</option>
                                                        <option value="rating">rating</option>
                                                    </select>
                                                    <span id="clearFilter" class="filter-clear-icon fa fa-times"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="selectAll" name="selectAll" checked>
                                                <label for="selectAll" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                            </div>
                                            <div class="question-list-container">
                                                <div id="warning-message" class="warning-container">
                                                    <p class="warning-text">No questions found or has been removed.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                       `,f=$("<div></div>").prependTo(this.element),b=$('<button><i class="fa fa-save"></i> Save</button>').appendTo(f),x=$('<button><i class="fa fa-trash"></i> Del</button>').appendTo(f);f.css({display:"inline-block"}),b.css({border:"1px solid #b1b1b1","background-color":"white",padding:"7px 9px","border-radius":"5px","font-size":"16px",cursor:"pointer",width:"80px",display:"inline-block","margin-right":"5px"}),x.css({border:"1px solid #b1b1b1","background-color":"white",padding:"7px 9px","border-radius":"5px","font-size":"16px",cursor:"pointer",width:"80px",display:"inline-block"}),b.hover(function(){$(this).css({"background-color":"gray",color:"black"})},function(){$(this).css({"background-color":"white",color:"black"})}),x.hover(function(){$(this).css({"background-color":"red",color:"white"})},function(){$(this).css({"background-color":"white",color:"black"})}),b.on("click",()=>this.updateData()),x.on("click",()=>{(0,T.confirm)("Delete record?",()=>{this.delData()})}),$(g).appendTo(e),this.applyStyles(e),this.addSelectAllFunctionality("#selectAll",'.question-list-container input[type="checkbox"]'),this.addSelectAllFunctionality("#selectAll_depart",'.depart-list-container input[type="checkbox"]'),this.addSearchFunctionality("#QuestionSearch","#clearQuestionSearch",'.question-list-container input[type="checkbox"]',s),this.addSearchFunctionality("#DepartSearch","#clearDepartSearch",'.depart-list-container input[type="checkbox"]',n),this.addFilterFunctionality("#FilterAnswerType",".question-list-container div",d),this.scrollToFirstChecked('.question-list-container input[type="checkbox"]','.depart-list-container input[type="checkbox"]')});else{let t=p.Entities[0];D.List({Criteria:[[R.Fields.TemplateId],"=",this.templateID]},a=>{let c=[];for(let x of a.Entities)c.push(x.DepartmentId);let o=c||[],u=t.RatingScale||[],g=`
                            <div class="field-row" style="display: flex;">
                                <div class="field-column" style="display: flex; flex-direction: column;">
                                    <div class="field">
                                        <label class="field-label">Duration (week):</label>
                                        <select id="DurationSelect" class="field-input">
                                            <option value="" disabled selected>Select duration...</option>
                                            <!-- Options from 1 to 10 -->
                                            <option value="1" style="text-align: center;">1</option>
                                            <option value="2" style="text-align: center;">2</option>
                                            <option value="3" style="text-align: center;">3</option>
                                            <option value="4" style="text-align: center;">4</option>
                                            <option value="5" style="text-align: center;">5</option>
                                            <option value="6" style="text-align: center;">6</option>
                                            <option value="7" style="text-align: center;">7</option>
                                            <option value="8" style="text-align: center;">8</option>
                                            <option value="9" style="text-align: center;">9</option>
                                            <option value="10" style="text-align: center;">10</option>
                                        </select>
                                    </div>
                                    <div class="field">
                                        <label class="field-label">Department:</label>
                                        <div class="field-box">
                                            <div class="search-depart-container">
                                                <div class="close-depart-inline">
                                                    <input type="text" id="DepartSearch" class="search-depart-box" placeholder="Search department...">
                                                    <span id="clearDepartSearch" class="clear-depart-icon fa fa-times"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="selectAll_depart" name="selectAll_depart" checked>
                                                <label for="selectAll_depart" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                            </div>
                                            <div class="depart-list-container">
                                                ${r.map((x,y)=>`
                                                    <div class="depart-checkbox-group">
                                                        <input type="checkbox" id="department_${x}" name="departments" value="${x}" ${o.includes(x)?"checked":""}>
                                                        <label for="department_${x}">${n[y]}</label>
                                                    </div>
                                                `).join("")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="field-column" style="display: flex; flex-direction: column; width: 70%">
                                    <div class="field">
                                        <label class="field-label">Rating Customize:</label>
                                        <select id="RatingCustomize" class="Rating-customize">
                                            <select id="RatingCustomize" class="Rating-customize-row-content">
                                                <option value="" disabled ${u===""?"selected":""}>Select number of scale...</option>
                                                <!-- Options from 1 to 10 -->
                                                <option value="1" style="text-align: center;" ${u===1?"selected":""}>1</option>
                                                <option value="2" style="text-align: center;" ${u===2?"selected":""}>2</option>
                                                <option value="3" style="text-align: center;" ${u===3?"selected":""}>3</option>
                                                <option value="4" style="text-align: center;" ${u===4?"selected":""}>4</option>
                                                <option value="5" style="text-align: center;" ${u===5?"selected":""}>5</option>
                                                <option value="6" style="text-align: center;" ${u===6?"selected":""}>6</option>
                                            </select>
                                        </select>
                                    </div>
                                    <div class="field">
                                        <label for="QuestionList" class="field-label">Questions:</label>
                                        <div class="field-box">
                                            <div class="search-container">
                                                <div class="close-inline">
                                                    <input type="text" id="QuestionSearch" class="search-box" placeholder="Search question...">
                                                    <span id="clearQuestionSearch" class="clear-icon fa fa-times"></span>
                                                </div>
                                                <div class="filter-close-inline">
                                                    <select id="FilterAnswerType" class="field-select-filter">
                                                        <option value="">Filter</option>
                                                        <option value="text">text</option>
                                                        <option value="rating">rating</option>
                                                    </select>
                                                    <span id="clearFilter" class="filter-clear-icon fa fa-times"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="selectAll" name="selectAll" checked>
                                                <label for="selectAll" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                            </div>
                                            <div class="question-list-container">
                                                <div id="warning-message" class="warning-container">
                                                    <p class="warning-text">No questions found or has been removed.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                       `,f=$("<div></div>").prependTo(this.element),b=$('<button><i class="fa fa-save"></i> Save</button>').appendTo(f);f.css({display:"inline-block"}),b.css({position:"relative",border:"1px solid #b1b1b1","background-color":"white",padding:"5px 9px","border-radius":"5px","font-size":"16px",cursor:"pointer",width:"80px"}),b.hover(function(){$(this).css({"background-color":"gray",color:"black"})},function(){$(this).css({"background-color":"white",color:"black"})}),b.on("click",()=>this.saveData()),$(g).appendTo(e),this.applyStyles(e),this.addSelectAllFunctionality("#selectAll",'.question-list-container input[type="checkbox"]'),this.addSelectAllFunctionality("#selectAll_depart",'.depart-list-container input[type="checkbox"]'),this.addSearchFunctionality("#QuestionSearch","#clearQuestionSearch",'.question-list-container input[type="checkbox"]',s),this.addSearchFunctionality("#DepartSearch","#clearDepartSearch",'.depart-list-container input[type="checkbox"]',n),this.addFilterFunctionality("#FilterAnswerType",".question-list-container div",d),this.scrollToFirstChecked('.question-list-container input[type="checkbox"]','.depart-list-container input[type="checkbox"]')})}})}applyStyles(e){e.find(".warning-container").css({border:"1px solid #ffcc00","background-color":"#fff3cd",color:"#856404",padding:"15px",margin:"5px auto","margin-bottom":"40px","border-radius":"5px","font-family":"Arial, sans-serif","font-size":"16px","text-align":"center",width:"60%","box-sizing":"border-box"}),e.find(".warning-text").css({"text-align":"center",margin:"5px auto"}),e.find(".field").css({"border-radius":"5px","box-sizing":"border-box",display:"inline-block","vertical-align":"top"}),e.find(".field-column-row").css({display:"flex","justify-content":"space-between","margin-bottom":"10px",width:"100%","margin-top":"1%","margin-left":"2%"}),e.find(".field-column-row-content").css({"border-radius":"5px","box-sizing":"border-box",display:"inline-block","vertical-align":"top"}),e.find(".Rating-customize-row-content").css({height:"40px",width:"95%"}),e.find(".field-label").css({"font-weight":"bold",color:"#000000","margin-bottom":"10px",display:"block"}),e.find(".field-select").css({width:"30%",padding:"8px",border:"1px solid #ccc","border-radius":"4px","font-size":"14px","box-sizing":"border-box"}),e.find(".field-row").css({display:"flex","justify-content":"space-between","margin-bottom":"20px",width:"100%"}),e.find(".column-field-row").css({display:"flex","flex-direction":"row","justify-content":"space-between",width:"100%"}),e.find(".date-field-row").css({display:"flex","justify-content":"space-between","padding-bottom":"70px",width:"100%"}),e.find(".field-box").css({border:"1px solid #ddd","border-radius":"5px",padding:"10px","background-color":"#f9f9f9","overflow-y":"hidden",display:"flex","flex-direction":"column"}),e.find(".template-name").css({width:"100%",padding:"8px 8px 8px 8px",border:"1px solid #ccc","border-radius":"4px","font-size":"14px","box-sizing":"border-box",height:"40px"}),e.find(".close-inline").css({position:"relative",display:"inline-block",width:"80%"}),e.find(".close-depart-inline").css({position:"relative",display:"inline-block",width:"100%"}),e.find(".field-input").css({height:"40px",width:"100%"}),e.find(".Rating-customize").css({height:"40px",width:"40%"}),e.find(".search-box").css({width:"100%",padding:"8px 30px 8px 8px",border:"1px solid #ccc","border-radius":"4px","font-size":"14px","margin-bottom":"10px","box-sizing":"border-box"}),e.find(".search-depart-box").css({width:"100%",padding:"8px 30px 8px 8px",border:"1px solid #ccc","border-radius":"4px","font-size":"14px","margin-bottom":"10px","box-sizing":"border-box"}),e.find(".clear-icon").css({position:"absolute",right:"10px",top:"40%",transform:"translateY(-50%)",cursor:"pointer","font-size":"16px",color:"red",display:"none","z-index":"1"}),e.find(".clear-depart-icon").css({position:"absolute",right:"10px",top:"40%",transform:"translateY(-50%)",cursor:"pointer","font-size":"16px",color:"red",display:"none","z-index":"1"}),e.find(".filter-close-inline").css({position:"relative",display:"inline-block",width:"18%"}),e.find(".field-select-filter").css({width:"100%",padding:"8px",border:"1px solid #ccc","border-radius":"4px","font-size":"14px","margin-bottom":"10px","box-sizing":"border-box"}),e.find(".filter-clear-icon").css({position:"absolute",right:"20px",top:"25%",cursor:"pointer","font-size":"16px",color:"red","z-index":"1"}),e.find(".question-list-container").css({"flex-grow":"1",height:"300px","overflow-y":"auto"}),e.find(".answer-type").css({width:"100px","text-align":"right","flex-shrink":"0","margin-right":"10px"}),e.find(".column-header").css({width:"100px","text-align":"right","flex-shrink":"0","margin-right":"10px"}),e.find(".question-list-container div").css({display:"flex","align-items":"flex-start","margin-bottom":"10px"}),e.find('input[type="checkbox"]').css({"margin-right":"10px","flex-shrink":"0","align-self":"flex-start",width:"20px",height:"20px"}),e.find(".field-box label").css({"word-wrap":"break-word","white-space":"normal","flex-grow":"1"}),e.find(".depart-list-container").css({"flex-grow":"1",height:"300px","overflow-y":"auto"}),e.find(".checkbox-group").css({display:"flex","align-items":"center","box-sizing":"border-box"}),e.find(".depart-checkbox-group").css({display:"flex","align-items":"center","box-sizing":"border-box"}),e.find('.checkbox-group input[type="checkbox"]').css({"margin-right":"8px",width:"20px",height:"20px"}),e.find('.depart-checkbox-group input[type="checkbox"]').css({"margin-right":"8px","margin-bottom":"20px",width:"20px",height:"20px"}),e.find(".checkbox-group label").css({"font-size":"14px",color:"#333"})}scrollToFirstChecked(e,r){let n=this.element.find(`${e}:checked`),l=this.element.find(`${r}:checked`);l.length>0&&l[0].scrollIntoView({behavior:"smooth",block:"center"}),n.length>0&&setTimeout(()=>{n[0].scrollIntoView({behavior:"smooth",block:"center"})},800)}addSearchFunctionality(e,r,n,l){let s=$(e),h=$(r);function d(){s.val()?h.show():h.hide()}k(d,"updateClearButton"),$(e).on("input",function(){var a;let p=((a=$(this).val())==null?void 0:a.toString().toLowerCase())||"",i=!1,t=new RegExp("\\b"+p+"\\b","i");$(n).each(function(c){let o=l[c]?l[c].toLowerCase():"",u=$(this).closest("div");(o.includes(p)||t.test(o))&&p.length>0?(u.css("background-color","#d1e7fd"),i||(u[0].scrollIntoView({behavior:"smooth",block:"center"}),i=!0)):u.css("background-color","")}),i||$(n).closest("div").css("background-color",""),d()}),h.on("click",function(){s.val("").trigger("input"),h.hide()}),d()}addFilterFunctionality(e,r,n){let l=$(e),s=$("#clearFilter");function h(){l.val()?s.show():s.hide()}k(h,"updateClearButton"),$(l).on("change",function(){var p;let d=((p=$(this).val())==null?void 0:p.toString().toLowerCase())||"";$(r).each(function(i){let t=$(this).closest("div"),a=n[i]?n[i].toLowerCase():"";d===""||a===d?t.show():t.hide()}),h()}),s.on("click",function(){l.val("").trigger("change"),$(r).closest("div").show(),s.hide()}),h()}addSelectAllFunctionality(e,r){let n=$(e);n.on("change",function(){let h=$(this).is(":checked");$(r).filter(":visible").prop("checked",h)}),$(r).on("change",function(){let h=$(r).filter(":visible"),d=h.length===h.filter(":checked").length;n.prop("checked",d)});let l=$(r).filter(":visible"),s=l.length===l.filter(":checked").length;n.prop("checked",s)}fetchDepartmentNames(e){let r=e.map(n=>B.List({Criteria:[[H.Fields.Id],"=",n]}).then(l=>l.Entities.length>0?l.Entities[0].Name:"").catch(l=>(console.error("Error fetching department:",l),"")));return Promise.all(r)}isEmptyOrNull(e){return e==null||e===""}saveData(){let e=[];if(this.validateForm()){let h=function(i){let t=new Date(i),a=String(t.getDate()).padStart(2,"0"),o=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],u=t.getFullYear(),g=String(t.getHours()).padStart(2,"0"),f=String(t.getMinutes()).padStart(2,"0"),b=String(t.getSeconds()).padStart(2,"0");return`${a} ${o} ${u} ${g}:${f}:${b}`};k(h,"formatDate");let r=$("#DurationSelect").val()||"",n=$("#RatingCustomize").val()||"",l=[];$('input[name="departments"]:checked').each((i,t)=>{let a=$(t).val()||"";l.push(a)});let s=[];$('input[name="QuestionList"]:checked').each((i,t)=>{let a=$(t).val()||"";s.push(a)});let d=new Date().toLocaleString("en-US",{timeZone:"Asia/Kuala_Lumpur"}),p=h(d);this.fetchDepartmentNames(l).then(i=>{let a=`Template (${i.filter(c=>c).join(" ")}) ${p}`;e.push({TemplateName:a,Duration:r,RatingScale:n}),this.isNew()&&w.Create({Entity:e[0]}).then(c=>{let o=c.EntityId;l.forEach(u=>{D.Create({Entity:{TemplateId:o,DepartmentId:u}}).then(g=>{console.log("Template Department saved...")}).catch(g=>{console.error("Error saving template department:",g)})}),s.forEach(u=>{S.Create({Entity:{TemplateId:o,QuestionId:u}}).then(g=>{console.log("Template Question saved..."),setTimeout(()=>{this.dialogClose(),window.location.reload()},1e3)}).catch(g=>{console.error("Error saving template question:",g)})})})})}}updateData(){let e=[];if(this.validateForm()){let r=$("#DurationSelect").val()||"",n=$("#TemplateName").val()||"",l=$("#RatingCustomize").val()||"",s=[];$('input[name="departments"]:checked').each((d,p)=>{let i=$(p).val()||"";s.push(i)});let h=[];$('input[name="QuestionList"]:checked').each((d,p)=>{let i=$(p).val()||"";h.push(i)}),e.push({TemplateName:n,Duration:r,RatingScale:l}),w.List({Criteria:[[A.Fields.Id],"=",this.templateID]}).then(d=>{d.Entities.length>0&&(e[0].Id=this.templateID,w.Update({Entity:e[0]}).then(p=>{D.List({Criteria:[[R.Fields.TemplateId],"=",this.templateID]}).then(i=>{i.Entities.forEach((t,a)=>{let c=s[a];c?D.Update({Entity:{Id:t.Id,TemplateId:this.templateID,DepartmentId:c}}).then(o=>{console.log("Template Department updated ...",o)}).catch(o=>{console.error("Error updating template department:",o)}):D.Delete({EntityId:t.Id}).then(()=>{console.log("Template Department deleted ...")}).catch(o=>{console.error("Error deleting template department:",o)})});for(let t=i.Entities.length;t<s.length;t++){let a=s[t];D.Create({Entity:{TemplateId:this.templateID,DepartmentId:a}}).then(c=>{console.log("New template department ...",c)}).catch(c=>{console.error("Error creating new template department:",c)})}}).catch(i=>{console.error("Error retrieving template department data:",i)}),S.List({Criteria:[[L.Fields.TemplateId],"=",this.templateID]}).then(i=>{i.Entities.forEach((t,a)=>{let c=h[a];c?S.Update({Entity:{Id:t.Id,TemplateId:this.templateID,QuestionId:c}}).then(o=>{console.log("Template Question updated ...",o)}).catch(o=>{console.error("Error updating template question:",o)}):S.Delete({EntityId:t.Id}).then(()=>{console.log("Template Question deleted ...")}).catch(o=>{console.error("Error deleting template question:",o)})});for(let t=i.Entities.length;t<h.length;t++){let a=h[t];S.Create({Entity:{TemplateId:this.templateID,QuestionId:a}}).then(c=>{console.log("New template question ...",c)}).catch(c=>{console.error("Error creating new template question:",c)})}}).catch(i=>{console.error("Error retrieving template question data:",i)})}),setTimeout(()=>{this.dialogClose(),window.location.reload()},1e3))})}}delData(){w.List({Criteria:[[A.Fields.Id],"=",this.templateID]},e=>{e.Entities.length>0?J.List({Criteria:[[V.Fields.TemplateId],"=",this.templateID]},r=>{if(r.Entities.length===0){let n=e.Entities[0];w.Delete({EntityId:n.Id}).then(l=>{console.log("Deleted PerformanceAppraisalTemplate successfully:",l),S.List({Criteria:[[L.Fields.TemplateId],"=",this.templateID]},s=>{if(s.Entities.length>0){let h=[];for(let d of s.Entities){let p=S.Delete({EntityId:d.Id}).then(i=>{console.log(`Deleted PerformanceAppraisalTemplateQuestion ID ${d.Id} successfully.`,i)}).catch(i=>{console.error(`Error deleting PerformanceAppraisalTemplateQuestion ID ${d.Id}:`,i)});h.push(p)}}else console.log("No PerformanceAppraisalTemplateQuestion found with the given formID")}).catch(s=>{console.error("Error fetching PerformanceAppraisalTemplateQuestion:",s)})}).catch(l=>{console.error("Error deleting PerformanceAppraisalTemplate:",l)})}else(0,T.alertDialog)("This template is currently in use and cannot be deleted.")}):console.log("No PerformanceAppraisalTemplate found with the given formID")}).catch(e=>{console.error("Error fetching PerformanceAppraisalTemplate:",e)}),setTimeout(()=>{this.dialogClose(),window.location.reload()},2e3)}validateForm(){let e=!0,r=!1,n=$("#RatingCustomize").val()||"";this.isEmptyOrNull(n)?(e=!1,r=!0,$("#RatingCustomize").addClass("error")):$("#RatingCustomize").removeClass("error");let l=$("#DurationSelect").val()||"";return this.isEmptyOrNull(l)?(e=!1,r=!0,$("#DurationSelect").addClass("error")):$("#DurationSelect").removeClass("error"),$('input[name="departments"]:checked').length===0?(e=!1,r=!0,console.log("No departments selected."),$(".DepartmentContainer").addClass("error")):$(".DepartmentContainer").removeClass("error"),$('input[name="QuestionList"]:checked').length===0?(e=!1,r=!0,$(".question-list-container").addClass("error")):$(".question-list-container").removeClass("error"),r&&(0,T.alertDialog)("Please fill in all required fields."),e}};k(I,"PerformanceAppraisalTemplateDialog"),I=q([P.Decorators.registerClass("HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateDialog")],I);var K=Q(N(),1);var C=class extends F.EntityGrid{getColumnsKey(){return U.columnsKey}getDialogType(){return I}getRowDefinition(){return A}getService(){return w.baseUrl}constructor(m){super(m)}onViewProcessData(m){return m=super.onViewProcessData(m),this.toolbar.findButton("column-picker-button").toggle(!1),m}getDefaultSortBy(){return[A.Fields.InsertDate+" desc"]}getButtons(){let m=super.getButtons();return m.push({title:"Delete All Records",cssClass:"delete-button",onClick:()=>this.deleteAllRecords()}),m}getColumns(){F.DataGrid.defaultRowHeight=50;let m=super.getColumns();return m.splice(0,0,{id:"Edit",field:"Edit",name:"",cssClass:"align-center",format:e=>`<a class="inline-action edit-link" data-id="${e.item.Id}" title="Edit">
                      <i class="fa fa-pencil" style="color: orange;"></i>
                  </a>`,width:22,minWidth:22,maxWidth:22}),m}onClick(m,e,r){if(super.onClick(m,e,r),!m.isDefaultPrevented()){var n=this.itemAt(e),l=$(m.target);if(l.parent().hasClass("inline-action")&&(l=l.parent()),l.hasClass("edit-link")){var s=new I;this.initDialog(s),s.getID(n.Id),s.loadEntityAndOpenDialog({TemplateID:n.Id})}}}deleteAllRecords(){let m=this.view.getItems().map(e=>e.Id);m.length!==0&&(0,K.confirm)("Are you sure you want to delete all visible records?",()=>{w.DeleteAll({RecordIds:m},e=>{this.refresh()})})}};k(C,"PerformanceAppraisalTemplateGrid"),C=q([F.Decorators.registerClass("HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateGrid")],C);function W(){(0,Y.initFullHeightGridPage)(new C($("#GridDiv")).element)}k(W,"pageInit");export{W as default};
//# sourceMappingURL=PerformanceAppraisalTemplatePage.js.map
