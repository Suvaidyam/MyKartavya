var k=(R,w,_)=>new Promise((y,b)=>{var v=g=>{try{o(_.next(g))}catch(u){b(u)}},c=g=>{try{o(_.throw(g))}catch(u){b(u)}},o=g=>g.done?y(g.value):Promise.resolve(g.value).then(v,c);o((_=_.apply(R,w)).next())});import{i as E,r as m,C as G,l as B,o as O,c as l,b as n,d as e,m as h,s as D,f as I,v as Y,t as x,F as U,h as L,u as q,n as H,z as Z,e as J,y as K,D as Q,E as W,G as X}from"./index-BmshQjEn.js";import{_ as ee}from"./Rectangle-Cxb5RPqE.js";import{l as p}from"./index-BUkOEfh8.js";const te={key:0,class:"max-w-md"},ae={class:"mb-4"},oe=["disabled"],se={key:0,class:"text-red-500 text-[11px] mt-1"},re={key:0,class:"mb-4 p-4 bg-green-50 border border-green-200 rounded-md"},le=["disabled"],ne=["disabled"],ie={key:0,class:"inline-block animate-spin w-4 h-4"},ue={key:1,class:"mt-6"},ce={class:"space-y-4"},de={key:0,class:"text-gray-500 text-center py-8"},me={class:"font-medium"},pe={class:"text-sm text-gray-600"},ve={class:"text-xs text-gray-500"},fe=["onClick"],ye={key:2,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},be={class:"bg-white rounded-lg p-6 max-w-sm w-full mx-4"},ge={class:"flex justify-end gap-3"},_e={__name:"CompanyMapping",setup(R){const w=E("call"),_=E("auth"),y=m(""),b=m(!1),v=m(!1),c=m(""),o=m(0),g=m([]),u=m(!1),$=m(!1),M=m(null),P=G(()=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(y.value)),V=()=>k(this,null,function*(){var f;if(z())try{if(u.value=!0,c.value="",!P.value){c.value="Please enter a valid email address";return}(yield w("frappe.client.insert",{doc:{doctype:"Volunteer Company Mapper",volunteer_email:y.value,volunteer:_.cookie.name}}))&&(b.value=!0,T(),p.success("Verification email sent! Please check your inbox."))}catch(s){const t=((f=s==null?void 0:s.message)==null?void 0:f.toLowerCase())||"";t.includes("email not found in sva user")?(c.value="This email is not registered in our system. Please use your company email address.",p.error("Invalid company email address")):t.includes("no company associated")?(c.value="No company is associated with this email. Please contact your company administrator.",p.error("No company association found")):t.includes("already exists")?(c.value="This email is already mapped to a company. Please use a different email.",p.error("Email already mapped")):t.includes("verification required")?(b.value=!0,T(),p.info("A verification email has already been sent. Please check your inbox.")):t.includes("rate limit")?(c.value="Please wait a few minutes before requesting another verification email.",p.warning("Too many attempts. Please wait.")):(c.value="An error occurred while processing your request. Please try again later.",p.error("Failed to process request"),console.error("Company mapping error:",s))}finally{u.value=!1}}),j=()=>{o.value===0&&V()},T=()=>{o.value=300;const f=setInterval(()=>{o.value>0?o.value--:clearInterval(f)},1e3)},N=()=>{y.value="",b.value=!1,v.value=!1,c.value=""},F=f=>{M.value=f,$.value=!0},A=()=>k(this,null,function*(){var f;try{yield w("frappe.client.delete",{doctype:"Volunteer Company Mapper",name:M.value}),p.success("Company mapping removed successfully!"),yield S()}catch(s){const t=((f=s==null?void 0:s.message)==null?void 0:f.toLowerCase())||"";t.includes("permission")?p.error("You do not have permission to remove this mapping"):t.includes("not found")?(p.error("This mapping no longer exists"),yield S()):(p.error("Failed to remove company mapping"),console.error("Remove mapping error:",s))}finally{$.value=!1,M.value=null}}),S=()=>k(this,null,function*(){var f;try{const s=yield w("frappe.client.get_list",{doctype:"Volunteer Company Mapper",fields:["name","volunteer_email","company_name","role_profile"],filters:{volunteer:_.cookie.name,is_email_verified:1}});g.value=s||[],v.value=g.value.length>0}catch(s){(((f=s==null?void 0:s.message)==null?void 0:f.toLowerCase())||"").includes("permission")?p.error("You do not have permission to view company mappings"):(p.error("Failed to fetch company mappings"),console.error("Fetch mappings error:",s)),g.value=[],v.value=!1}}),z=()=>(c.value="",y.value?P.value?y.value.includes("@gmail.com")||y.value.includes("@yahoo.com")||y.value.includes("@hotmail.com")?(c.value="Please use your company email address",!1):!0:(c.value="Please enter a valid email address",!1):(c.value="Email address is required",!1));return B(y,()=>{y.value&&!P.value?c.value="Please enter a valid email address":c.value=""}),O(()=>{S()}),(f,s)=>(n(),l("div",null,[s[8]||(s[8]=e("h2",{class:"text-xl font-semibold text-gray-700 mb-4"},"Company Mapping",-1)),v.value?(n(),l("div",ue,[e("div",{class:"flex justify-between items-center mb-4"},[s[5]||(s[5]=e("h3",{class:"text-lg font-medium text-gray-700"},"Mapped Companies",-1)),e("button",{onClick:N,class:"text-orange-500 hover:text-orange-600 text-sm"}," + Map New Company ")]),e("div",ce,[g.value.length===0?(n(),l("div",de," No companies mapped yet ")):h("",!0),(n(!0),l(U,null,L(g.value,t=>(n(),l("div",{key:t.name,class:"flex justify-between items-center p-4 bg-gray-50 rounded-lg"},[e("div",null,[e("p",me,x(t.company_name),1),e("p",pe,x(t.volunteer_email),1),e("p",ve,"Role: "+x(t.role_profile),1)]),e("button",{onClick:a=>F(t.name),class:"text-red-500 hover:text-red-600"}," Remove ",8,fe)]))),128))])])):(n(),l("div",te,[e("div",ae,[s[2]||(s[2]=e("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[I(" Company Email "),e("span",{class:"text-red-500"},"*")],-1)),D(e("input",{"onUpdate:modelValue":s[0]||(s[0]=t=>y.value=t),type:"email",placeholder:"Enter your company email",disabled:b.value,class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,8,oe),[[Y,y.value]]),c.value?(n(),l("p",se,x(c.value),1)):h("",!0)]),b.value?(n(),l("div",re,[s[3]||(s[3]=e("p",{class:"text-green-700 text-sm"},[e("span",{class:"font-medium"},"Verification email sent!"),e("br"),I(" Please check your email inbox and click the verification link to complete the company mapping process. ")],-1)),e("button",{onClick:j,class:"mt-2 text-orange-600 text-sm hover:text-orange-700",disabled:o.value>0},x(o.value>0?`Resend in ${o.value}s`:"Resend verification email"),9,le)])):h("",!0),e("div",null,[b.value?h("",!0):(n(),l("button",{key:0,onClick:V,disabled:!P.value||u.value,class:"bg-orange-500 text-white font-semibold py-2 px-4 rounded-sm hover:bg-orange-600 transition disabled:opacity-50 flex items-center gap-2"},[u.value?(n(),l("span",ie,s[4]||(s[4]=[e("svg",{class:"w-4 h-4",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),e("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})],-1)]))):h("",!0),I(" "+x(u.value?"Sending...":"Send Verification Email"),1)],8,ne))])])),$.value?(n(),l("div",ye,[e("div",be,[s[6]||(s[6]=e("h3",{class:"text-lg font-medium text-gray-900 mb-3"},"Confirm Removal",-1)),s[7]||(s[7]=e("p",{class:"text-gray-600 mb-6"},"Are you sure you want to remove this company mapping?",-1)),e("div",ge,[e("button",{onClick:s[1]||(s[1]=t=>$.value=!1),class:"px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-300 rounded-sm"}," Cancel "),e("button",{onClick:A,class:"px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600"}," Remove ")])])])):h("",!0)]))}},he={class:"max-w-[1920px] mx-auto px-10 pt-[82px] pb-4 bg-gray-50"},xe={class:"h-[261px] rounded-b-md bg-white"},we={class:"relative"},ke={class:"absolute left-8 -bottom-8"},Ce={class:"w-32 h-32 rounded-full border-4 border-white overflow-hidden"},$e=["src"],Pe={key:1,class:"w-full h-full bg-gray-200 flex items-center justify-center text-[40px] text-gray-600"},Me={class:"pt-10 px-4"},Ve={class:"text-3xl font-medium"},Se={class:"text-bodyh1 text-gray-600 mt-1"},qe={class:"bg-white rounded-lg shadow mt-4"},Te={class:"border-b border-gray-200"},De={class:"flex space-x-8 px-6","aria-label":"Tabs"},Ie={class:"p-6"},Ee={key:0},Re={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},je={class:"block text-bodyh1 font-normal text-gray-700 mb-1"},Ne={key:0,class:"text-red-500 pt-2"},Fe=["onUpdate:modelValue","type","name","placeholder"],Ae=["max"],ze=["onUpdate:modelValue","name"],Be={value:"",disabled:""},Ue=["value"],Le={key:3,class:"text-red-500 text-[11px] mt-1"},He={key:1},Ke={__name:"Updateprofile",setup(R){const w=E("call"),_=E("auth"),y=K(),b=m(null),v=m("personal");console.log(v.value);const c=m({first_name:{label:"First Name",type:"text",required:!0,pattern:/^[A-Za-z]+$/,error_message:"Please enter a valid first name (letters only)"},last_name:{label:"Last Name",type:"text",required:!1},mobile_number:{label:"Phone No.",type:"text",required:!0,pattern:/^[0-9]{10}$/,error_message:"Invalid phone number "},custom_country:{label:"Country",type:"select",required:!0},custom_state:{label:"State",type:"select",required:!0},custom_city:{label:"City",type:"select",required:!0},custom_company:{label:"Company",type:"select",required:!1},custom_date_of_birth:{label:"Date of Birth",type:"date",required:!0,min:"1900-01-01",max:new Date().toISOString().split("T")[0],max:"maxDate",error_message:"Please select a valid date of birth"},title:{label:"Title",type:"text",placeholder:"Enter your title",required:!1}}),o=m({first_name:"",last_name:"",mobile_number:"",custom_country:"",custom_state:"",custom_city:"",custom_company:"",custom_date_of_birth:"",title:""}),g=m(new Date().toISOString().split("T")[0]),u=m({}),$=m([]),M=m([]),P=m([]),V=m([]),j=()=>k(this,null,function*(){const t=yield w("mykartavya.controllers.api.country_data");$.value=t||[]}),T=()=>k(this,null,function*(){if(!o.value.custom_country)return;const t=yield w("mykartavya.controllers.api.state_data",{country:o.value.custom_country});M.value=t||[]}),N=()=>k(this,null,function*(){if(!o.value.custom_state)return;const t=yield w("mykartavya.controllers.api.city_data",{state:o.value.custom_state});P.value=t||[]}),F=()=>k(this,null,function*(){const t=yield w("mykartavya.controllers.api.company_data");V.value=t||[]});B(()=>o.value.custom_country,T),B(()=>o.value.custom_state,N);const A=()=>k(this,null,function*(){let t=yield w("mykartavya.controllers.api.sva_user_data");t&&t.length>0&&(o.value=t[0],o.value.custom_company&&v.value==="company"&&(v.value="personal"))}),S=()=>{var a;u.value={};let t=!0;for(const r in o.value){const i=c.value[r],d=o.value[r];if(i){if(i.required&&!d&&(u.value[r]=`${i.label} is required.`,t=!1,b.value||(b.value=r)),r==="mobile_number"){const C=d==null?void 0:d.trim();(a=i.pattern)!=null&&a.test(C)||((C==null?void 0:C.length)===0?u.value[r]="Phone number is required.":(C==null?void 0:C.length)!==10?u.value[r]="Phone number must be exactly 10 digits.":u.value[r]=i.error_message,t=!1)}console.log(d),r==="first_name"&&i.pattern&&!i.pattern.test(d)&&(u.value[r]=i.error_message,t=!1),r==="last_name"&&i.pattern&&!i.pattern.test(d)&&(u.value[r]=i.error_message,t=!1),r==="custom_date_of_birth"&&(d?new Date(d)>new Date?(u.value[r]="You cannot select a future date.",t=!1):delete u.value[r]:(u.value[r]="Date of birth is required.",t=!1))}}return t},z=()=>k(this,null,function*(){if(!S()){s();return}try{let t=yield w("mykartavya.controllers.api.update_sva_user",{data:{first_name:o.value.first_name,last_name:o.value.last_name||"",mobile_number:o.value.mobile_number,custom_date_of_birth:o.value.custom_date_of_birth,custom_country:o.value.custom_country,custom_state:o.value.custom_state,custom_city:o.value.custom_city,custom_company:o.value.custom_company||""}});t.status==200?(p.success("Profile updated successfully!",{autoClose:3e3}),setTimeout(()=>y.push("/"),3e3)):p.error(t.message||"Failed to update profile.")}catch(t){p.error("An error occurred while updating the profile.")}}),f=t=>{switch(t){case"custom_country":return $.value.map(a=>({name:a.name,label:a.label||a.name}));case"custom_state":return M.value.map(a=>({name:a.name,label:a.state_name||a.name}));case"custom_city":return P.value.map(a=>({name:a.name,label:a.district_name||a.name}));case"custom_company":return V.value.map(a=>({name:a.name,label:a.company_name||a.name}));default:return[]}};O(()=>{j(),F(),A(),localStorage.getItem("updateprofile")=="true"&&(p.error("Please update your profile to continue.",{autoClose:3e3}),localStorage.removeItem("updateprofile"))});const s=()=>k(this,null,function*(){if(b.value){yield X();const t=document.querySelector(`[name="${b.value}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.focus()),b.value=null}});return(t,a)=>(n(),l("div",he,[e("div",xe,[e("div",we,[a[7]||(a[7]=e("div",{class:"w-full h-[152px]"},[e("img",{src:ee,alt:"Banner",class:"w-full h-full object-cover"})],-1)),e("div",ke,[e("div",Ce,[q(_).user_image?(n(),l("img",{key:0,src:q(_).user_image,alt:"Profile",class:"w-full h-full object-cover"},null,8,$e)):(n(),l("div",Pe,x(q(_).cookie.full_name.charAt(0)),1))])])]),e("div",Me,[e("h1",Ve,x(q(_).cookie.full_name),1),e("p",Se,x(q(_).cookie.user_id),1)])]),e("div",qe,[e("div",Te,[e("nav",De,[e("button",{onClick:a[0]||(a[0]=r=>v.value="personal"),class:H([v.value==="personal"?"border-orange-500 text-orange-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300","whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"])}," Personal Info ",2),o.value.custom_company?h("",!0):(n(),l("button",{key:0,onClick:a[1]||(a[1]=r=>v.value="company"),class:H([v.value==="company"?"border-orange-500 text-orange-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300","whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"])}," Company Mapping ",2))])]),e("div",Ie,[v.value==="personal"?(n(),l("div",Ee,[a[15]||(a[15]=e("h2",{class:"text-xl font-semibold text-gray-700 mb-4"},"Personal Info",-1)),e("form",{onSubmit:Z(z,["prevent"])},[e("div",Re,[(n(!0),l(U,null,L(c.value,(r,i)=>(n(),l("div",{key:i},[e("label",je,[I(x(r.label)+" ",1),r.required?(n(),l("span",Ne,"*")):h("",!0)]),i!=="custom_date_of_birth"&&r.type!=="select"?D((n(),l("input",{key:0,"onUpdate:modelValue":d=>o.value[i]=d,type:r.type,name:i,placeholder:r.placeholder,class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,8,Fe)),[[Q,o.value[i]]]):i==="custom_date_of_birth"?D((n(),l("input",{key:1,"onUpdate:modelValue":a[2]||(a[2]=d=>o.value.custom_date_of_birth=d),type:"date",name:"custom_date_of_birth",max:g.value,class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,8,Ae)),[[Y,o.value.custom_date_of_birth]]):h("",!0),r.type==="select"?D((n(),l("select",{key:2,"onUpdate:modelValue":d=>o.value[i]=d,name:i,class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},[e("option",Be,"Select "+x(r.label),1),(n(!0),l(U,null,L(f(i),d=>(n(),l("option",{key:d.name,value:d.name},x(d.label||d.name),9,Ue))),128))],8,ze)),[[W,o.value[i]]]):h("",!0),u.value[i]?(n(),l("p",Le,x(u.value[i]),1)):h("",!0)]))),128)),e("div",null,[a[10]||(a[10]=e("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},"Add CV",-1)),e("div",{class:"flex flex-col items-center justify-center border-2 border-dashed border-orange-300 text-orange-500 p-4 rounded cursor-pointer",onClick:a[4]||(a[4]=r=>t.cvInput.click())},[a[8]||(a[8]=e("svg",{class:"w-10 h-10 mb-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M7 3h10M7 3a2 2 0 00-2 2v2m2-2h10m0 0a2 2 0 012 2v2m-2-2H7m13 8V8H4v8a2 2 0 002 2h12a2 2 0 002-2z"})],-1)),a[9]||(a[9]=e("span",{class:"text-bodyh1"},"Click to upload or drag and drop",-1)),e("input",{ref:"cvInput",type:"file",accept:".pdf,.doc,.docx",class:"hidden",onChange:a[3]||(a[3]=(...r)=>t.onCvSelected&&t.onCvSelected(...r))},null,544)])]),e("div",null,[a[13]||(a[13]=e("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},"Add Portfolio",-1)),e("div",{class:"flex flex-col items-center justify-center border-2 border-dashed border-orange-300 text-orange-500 p-4 rounded cursor-pointer",onClick:a[6]||(a[6]=r=>t.portfolioInput.click())},[a[11]||(a[11]=e("svg",{class:"w-10 h-10 mb-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M7 3h10M7 3a2 2 0 00-2 2v2m2-2h10m0 0a2 2 0 012 2v2m-2-2H7m13 8V8H4v8a2 2 0 002 2h12a2 2 0 002-2z"})],-1)),a[12]||(a[12]=e("span",{class:"text-sm"},"Click to upload or drag and drop",-1)),e("input",{ref:"portfolioInput",type:"file",accept:".pdf,.doc,.docx",class:"hidden",onChange:a[5]||(a[5]=(...r)=>t.onPortfolioSelected&&t.onPortfolioSelected(...r))},null,544)])])]),a[14]||(a[14]=e("div",{class:"mt-6"},[e("button",{type:"submit",class:"bg-orange-500 text-white font-semibold py-2 px-4 rounded-sm hover:bg-orange-600 transition"}," UPDATE ")],-1))],32)])):h("",!0),v.value==="company"&&!o.value.custom_company?(n(),l("div",He,[J(_e)])):h("",!0)])])]))}};export{Ke as default};
