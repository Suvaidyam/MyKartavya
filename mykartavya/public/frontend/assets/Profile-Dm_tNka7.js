var M=(R,g,y)=>new Promise((n,r)=>{var h=d=>{try{o(y.next(d))}catch(i){r(i)}},_=d=>{try{o(y.throw(d))}catch(i){r(i)}},o=d=>d.done?n(d.value):Promise.resolve(d.value).then(h,_);o((y=y.apply(R,g)).next())});import{_ as H}from"./Rectangle-Cxb5RPqE.js";import{i as E,r as p,C as L,l as I,o as S,c,b as u,e as N,m as b,w as P,f as B,u as k,D as q,d as e,t as l,s as Y,v as U,F as T,a as K,g as A,h as F}from"./index-CeIEzR2z.js";import{l as v}from"./index-tfe0ER04.js";import{D as O}from"./Dialog-DyGsYKjZ.js";const G={key:0,class:"max-w-md"},J={class:"mb-4 relative"},Q=["disabled"],W={key:0,class:"text-red-500 absolute -bottom-10 text-[11px] mt-1"},X={key:0,class:"mb-4 p-4 bg-green-50 border border-green-200 rounded-md"},Z=["disabled"],ee=["disabled"],te={key:0,class:"inline-block animate-spin w-4 h-4"},se={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},ae={class:"bg-white rounded-lg p-6 max-w-sm w-full mx-4"},oe={class:"flex justify-end gap-3"},ie={__name:"Company",setup(R){const g=E("call"),y=E("auth"),n=p(!1),r=p(""),h=p(!1),_=p(!1),o=p(""),d=p(0),i=p([]),t=p(!1),x=p(!1),w=p(null),f=L(()=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.value)),V=()=>M(this,null,function*(){var a;if(z())try{if(t.value=!0,o.value="",!f.value){o.value="Please enter a valid email address";return}(yield g("frappe.client.insert",{doc:{doctype:"Volunteer Company Mapper",volunteer_email:r.value,volunteer:y.cookie.name}}))&&(h.value=!0,j(),v.success("Verification email sent! Please check your inbox."))}catch(s){const m=((a=s==null?void 0:s.message)==null?void 0:a.toLowerCase())||"";m.includes("email not found in sva user")?(o.value="This email is not registered in our system. Please use your company email address.",v.error("Invalid company email address")):m.includes("no company associated")?(o.value="No company is associated with this email. Please contact your company administrator.",v.error("No company association found")):m.includes("already exists")?(o.value="This email is already mapped to a company. Please use a different email.",v.error("Email already mapped")):m.includes("verification required")?(h.value=!0,j(),v.info("A verification email has already been sent. Please check your inbox.")):m.includes("rate limit")?(o.value="Please wait a few minutes before requesting another verification email.",v.warning("Too many attempts. Please wait.")):(o.value="An error occurred while processing your request. Please try again later.",v.error("Failed to process request"),console.error("Company mapping error:",s))}finally{t.value=!1}}),D=()=>{d.value===0&&V()},j=()=>{d.value=300;const a=setInterval(()=>{d.value>0?d.value--:clearInterval(a)},1e3)},$=()=>M(this,null,function*(){var a;try{yield g("frappe.client.delete",{doctype:"Volunteer Company Mapper",name:w.value}),v.success("Company mapping removed successfully!"),yield C()}catch(s){const m=((a=s==null?void 0:s.message)==null?void 0:a.toLowerCase())||"";m.includes("permission")?v.error("You do not have permission to remove this mapping"):m.includes("not found")?(v.error("This mapping no longer exists"),yield C()):(v.error("Failed to remove company mapping"),console.error("Remove mapping error:",s))}finally{x.value=!1,w.value=null}}),C=()=>M(this,null,function*(){var a;try{const s=yield g("frappe.client.get_list",{doctype:"Volunteer Company Mapper",fields:["name","volunteer_email","company_name","role_profile"],filters:{volunteer:y.cookie.name,is_email_verified:1}});i.value=s||[],_.value=i.value.length>0}catch(s){(((a=s==null?void 0:s.message)==null?void 0:a.toLowerCase())||"").includes("permission")?v.error("You do not have permission to view company mappings"):(v.error("Failed to fetch company mappings"),console.error("Fetch mappings error:",s)),i.value=[],_.value=!1}}),z=()=>(o.value="",r.value?f.value?r.value.includes("@gmail.com")||r.value.includes("@yahoo.com")||r.value.includes("@hotmail.com")?(o.value="Please use your company email address",!1):!0:(o.value="Please enter a valid email address",!1):(o.value="Email address is required",!1));return I(r,()=>{r.value&&!f.value?o.value="Please enter a valid email address":o.value=""}),S(()=>{C()}),(a,s)=>(u(),c(T,null,[N(k(q),{class:"text-orange-500 hover:text-orange-600 text-sm bg-white hover:bg-white",onClick:s[0]||(s[0]=m=>n.value=!0)},{default:P(()=>s[4]||(s[4]=[B(" + Map New Company ")])),_:1}),N(k(O),{modelValue:n.value,"onUpdate:modelValue":s[2]||(s[2]=m=>n.value=m)},{"body-title":P(()=>s[5]||(s[5]=[e("h3",null,"Company Mapping",-1)])),"body-content":P(()=>[_.value?b("",!0):(u(),c("div",G,[e("div",J,[s[6]||(s[6]=e("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[B(" Company Email "),e("span",{class:"text-red-500"},"*")],-1)),Y(e("input",{"onUpdate:modelValue":s[1]||(s[1]=m=>r.value=m),type:"email",placeholder:"Enter your company email",disabled:h.value,class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,8,Q),[[U,r.value]]),o.value?(u(),c("p",W,l(o.value),1)):b("",!0)]),h.value?(u(),c("div",X,[s[7]||(s[7]=e("p",{class:"text-green-700 text-sm"},[e("span",{class:"font-medium"},"Verification email sent!"),e("br"),B(" Please check your email inbox and click the verification link to complete the company mapping process. ")],-1)),e("button",{onClick:D,class:"mt-2 text-orange-600 text-sm hover:text-orange-700",disabled:d.value>0},l(d.value>0?`Resend in ${d.value}s`:"Resend verification email"),9,Z)])):b("",!0)]))]),actions:P(()=>[e("div",null,[h.value?b("",!0):(u(),c("button",{key:0,onClick:V,disabled:!f.value||t.value,class:"bg-orange-500 text-white font-medium py-2 w-60 justify-center rounded-sm hover:bg-orange-600 transition disabled:opacity-50 flex items-center gap-2"},[t.value?(u(),c("span",te,s[8]||(s[8]=[e("svg",{class:"w-4 h-4",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),e("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})],-1)]))):b("",!0),B(" "+l(t.value?"Sending...":"Send Verification Email"),1)],8,ee))])]),_:1},8,["modelValue"]),x.value?(u(),c("div",se,[e("div",ae,[s[9]||(s[9]=e("h3",{class:"text-lg font-medium text-gray-900 mb-3"},"Confirm Removal",-1)),s[10]||(s[10]=e("p",{class:"text-gray-600 mb-6"},"Are you sure you want to remove this company mapping?",-1)),e("div",oe,[e("button",{onClick:s[3]||(s[3]=m=>x.value=!1),class:"px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-300 rounded-sm"}," Cancel "),e("button",{onClick:$,class:"px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600"}," Remove ")])])])):b("",!0)],64))}},le={class:"max-w-[1920px] pt-[82px] pb-8 px-10 mx-auto bg-gray-50 min-h-screen"},ne={class:"h-[291px] rounded-b-md bg-white"},re={class:"relative"},de={class:"absolute left-8 -bottom-8"},ce={class:"w-32 h-32 rounded-full border-4 border-white overflow-hidden"},ue=["src"],me={key:1,class:"w-full h-full bg-gray-200 flex items-center justify-center text-[40px] text-gray-600"},ve={class:"pt-10 px-4"},pe={class:"text-3xl font-medium"},ge={class:"text-bodyh1 text-gray-600 mt-1"},ye={class:"pt-4"},fe={class:"grid grid-cols-1 lg:grid-cols-2 gap-6"},he={class:"bg-white rounded-lg p-6 shadow-sm"},xe={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},we={class:"flex items-start gap-3"},be={class:"text-bodyh2 text-gray-900"},_e={class:"flex items-start gap-3"},ke={class:"text-bodyh2 text-gray-900"},Ce={class:"flex items-start gap-3"},Me={class:"text-bodyh2 text-gray-900"},Ve={class:"flex items-start gap-3"},je={class:"text-bodyh2 text-gray-900"},Pe={class:"flex items-start gap-3"},Be={class:"text-bodyh2 text-gray-900"},De={class:"flex items-start gap-3"},$e={class:"text-bodyh2 text-gray-900"},ze={class:"bg-white rounded-lg p-6 shadow-sm"},Ee={class:"grid grid-cols-1 sm:grid-cols-2 gap-4"},Ne=["src","alt"],Re={class:"font-medium text-gray-900"},Ae={class:"text-sm text-gray-500"},Te={key:0,class:"bg-white rounded-lg p-6 shadow-sm mt-6"},Fe={class:"flex justify-between items-center mb-6"},Le={class:"space-y-4"},Se={key:0,class:"text-gray-500 text-center py-8"},He={class:"font-medium"},Ie={class:"text-sm text-gray-600"},qe={class:"text-xs text-gray-500"},Je={__name:"Profile",setup(R){const g=E("auth"),y=E("call"),n=p(null),r=p([]),h=p([{id:1,title:"Empower the needy",date:"12 Nov, 2024",image:"/cert1.jpg"},{id:2,title:"Beat the sugar",date:"14 Nov, 2024",image:"/cert2.jpg"},{id:3,title:"Bright Bites",date:"14 Nov, 2024",image:"/cert3.jpg"},{id:4,title:"Creation of a digital interface",date:"16 Nov, 2024",image:"/placeholder4.jpg"},{id:5,title:"Data Management System",date:"18 Nov, 2024",image:"/placeholder5.jpg"}]),_=()=>M(this,null,function*(){var i;try{const t=yield y("mykartavya.controllers.api.sva_user_data");n.value=t[0],(i=n.value)!=null&&i.custom_company||(yield d())}catch(t){console.error("Error fetching data:",t)}}),o=L(()=>{var f;if(!((f=n.value)!=null&&f.custom_date_of_birth))return"---";const i=new Date(n.value.custom_date_of_birth),t=new Date;let x=t.getFullYear()-i.getFullYear();const w=t.getMonth()-i.getMonth();return(w<0||w===0&&t.getDate()<i.getDate())&&x--,x}),d=()=>M(this,null,function*(){try{const i=yield y("frappe.client.get_list",{doctype:"Volunteer Company Mapper",fields:["name","volunteer_email","company_name","role_profile"],filters:{volunteer:g.cookie.name,is_email_verified:1}});r.value=i||[]}catch(i){console.error("Error fetching mapped companies:",i),r.value=[]}});return S(()=>{_()}),(i,t)=>{var w,f,V,D,j,$,C,z;const x=K("router-link");return u(),c("div",le,[e("div",ne,[e("div",re,[t[0]||(t[0]=e("div",{class:"w-full h-[152px]"},[e("img",{src:H,alt:"Banner",class:"w-full h-full object-cover"})],-1)),e("div",de,[e("div",ce,[k(g).user_image?(u(),c("img",{key:0,src:k(g).user_image,alt:"Profile",class:"w-full h-full object-cover"},null,8,ue)):(u(),c("div",me,l(k(g).cookie.full_name.charAt(0)),1))])])]),e("div",ve,[e("h1",pe,l(k(g).cookie.full_name),1),e("p",ge,l(k(g).cookie.user_id),1),N(x,{to:"/updateprofile",class:"text-lg text-orange-500 font-normal mt-2"},{default:P(()=>t[1]||(t[1]=[B("EDIT PROFILE")])),_:1})])]),e("div",ye,[e("div",fe,[e("div",he,[t[16]||(t[16]=e("h2",{class:"text-xl font-semibold mb-6"},"Personal Info",-1)),e("div",xe,[e("div",we,[t[3]||(t[3]=e("div",{class:"w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center"},[e("svg",{class:"w-5 h-5 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"})])],-1)),e("div",null,[e("div",be,l(((w=n.value)==null?void 0:w.mobile_number)||"---"),1),t[2]||(t[2]=e("div",{class:"text-caption text-gray-500"},"Phone No.",-1))])]),e("div",_e,[t[5]||(t[5]=e("div",{class:"w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center"},[e("svg",{class:"w-5 h-5 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"})])],-1)),e("div",null,[e("div",ke,l(((f=n.value)==null?void 0:f.state)||"---")+","+l(((V=n.value)==null?void 0:V.city)||"---")+", "+l((D=n.value)==null?void 0:D.custom_country),1),t[4]||(t[4]=e("div",{class:"text-caption text-gray-500"},"Location",-1))])]),e("div",Ce,[t[7]||(t[7]=e("div",{class:"w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center"},[e("svg",{class:"w-5 h-5 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})])],-1)),e("div",null,[e("div",Me,l(((j=n.value)==null?void 0:j.custom_date_of_birth)||"---"),1),t[6]||(t[6]=e("div",{class:"text-caption text-gray-500"},"Date of Birth",-1))])]),e("div",Ve,[t[9]||(t[9]=e("div",{class:"w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center"},[e("svg",{class:"w-5 h-5 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})])],-1)),e("div",null,[e("div",je,l(o.value)+" years",1),t[8]||(t[8]=e("div",{class:"text-caption text-gray-500"},"Age",-1))])]),t[14]||(t[14]=A('<div class="flex items-start gap-3"><div class="w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center"><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div><div><div class="text-bodyh2 text-gray-900">Dhwani RIS</div><div class="text-caption text-gray-500">Organisation</div></div></div>',1)),e("div",Pe,[t[11]||(t[11]=e("div",{class:"w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center"},[e("svg",{class:"w-5 h-5 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"})])],-1)),e("div",null,[e("div",Be,l((($=n.value)==null?void 0:$.custom_employee_id)||"---"),1),t[10]||(t[10]=e("div",{class:"text-caption text-gray-500"},"Employee ID",-1))])]),e("div",De,[t[13]||(t[13]=e("div",{class:"w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center"},[e("svg",{class:"w-5 h-5 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})])],-1)),e("div",null,[e("div",$e,l(((C=n.value)==null?void 0:C.custom_ngo)||"---"),1),t[12]||(t[12]=e("div",{class:"text-caption text-gray-500"},"Title",-1))])]),t[15]||(t[15]=A('<div class="flex items-start gap-3"><div class="w-10 h-10 min-w-10 min-h-10 bg-gray-100 rounded-lg flex items-center justify-center"><svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></div><div><div class="text-bodyh2 text-gray-900 break-all">https://www.linkedin.com/in/username/ </div><div class="text-caption text-gray-500">Linkedin</div></div></div>',1))]),t[17]||(t[17]=A('<div class="mt-8"><h3 class="text-sm font-medium mb-3">Skills</h3><div class="flex flex-wrap gap-2"><span class="px-4 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">Communication</span><span class="px-4 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">Teamwork</span><span class="px-4 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">Problem - Solving</span></div></div><div class="mt-8"><h3 class="text-sm font-medium mb-3">Attachments</h3><div class="space-y-2"><div class="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg"><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg><span class="text-gray-700">Portfolio_Aayush Kumar.pdf</span></div><div class="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg"><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg><span class="text-gray-700">CV_Aayush Kumar.pdf</span></div></div></div>',2))]),e("div",ze,[t[18]||(t[18]=e("h2",{class:"text-xl font-semibold mb-6"},"My Certificates",-1)),e("div",Ee,[(u(!0),c(T,null,F(h.value,a=>(u(),c("div",{key:a.id,class:"bg-gray-50 rounded-lg p-3"},[e("img",{src:a.image,alt:a.title,class:"w-full h-40 object-cover rounded-lg mb-3"},null,8,Ne),e("h3",Re,l(a.title),1),e("p",Ae,l(a.date),1)]))),128))])]),(z=n.value)!=null&&z.custom_company?b("",!0):(u(),c("div",Te,[e("div",Fe,[t[19]||(t[19]=e("h2",{class:"text-xl font-semibold"},"My Companies",-1)),N(ie)]),e("div",Le,[r.value.length===0?(u(),c("div",Se," No companies mapped yet ")):b("",!0),(u(!0),c(T,null,F(r.value,a=>(u(),c("div",{key:a.name,class:"flex justify-between items-center p-4 bg-gray-50 rounded-lg"},[e("div",null,[e("p",He,l(a.company_name),1),e("p",Ie,l(a.volunteer_email),1),e("p",qe,"Role: "+l(a.role_profile),1)])]))),128))])]))])])])}}};export{Je as default};
