var h=(X,k,C)=>new Promise((y,c)=>{var n=_=>{try{V(C.next(_))}catch(P){c(P)}},o=_=>{try{V(C.throw(_))}catch(P){c(P)}},V=_=>_.done?y(_.value):Promise.resolve(_.value).then(n,o);V((C=C.apply(X,k)).next())});import{_ as Z,r as x,s as j,l as z,o as ee,c as r,a as t,n as A,D as B,v as g,m as p,f as d,x as v,t as s,F as te,h as oe,b as N,i as le,B as ae,j as i}from"./index-Dyir72Cu.js";import{l as m}from"./index-BEzQ2TQ6.js";/* empty css              */import{S as U,c as ne}from"./SearchableSelect-CwAhnPpH.js";const se={class:"max-w-[1920px] mx-auto pt-[82px] pb-4 bg-gray-50"},re={class:"px-10"},ie={class:"bg-white rounded-sm shadow mt-4"},ue={class:"p-6"},de={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},pe={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},me={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},ce={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},ge={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},ve={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},ye={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},be={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},fe={class:"flex"},xe={class:"relative country-code-wrapper"},_e={class:"flex items-center gap-2 flex-1"},he={key:0,class:"absolute left-0 z-50 w-[280px] max-h-60 bg-white border border-gray-200 rounded-md shadow-lg mt-1"},we={class:"p-2 border-b"},ke={class:"overflow-y-auto max-h-[188px] country-dropdown"},Ce=["onClick"],Ve={class:"w-6"},Pe={class:"text-gray-600"},Fe={class:"text-gray-500 ml-auto"},$e={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},Be={class:"md:col-span-2"},Ne={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},Ue={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},Ie={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},Se={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},Xe={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},Ee={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},Le={class:"flex items-center px-4 py-3 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition"},Me={key:0,class:"mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200"},Re={class:"flex items-center justify-between"},qe={class:"flex items-center space-x-3"},De={class:"text-sm text-gray-600"},je={key:1,class:"text-red-500 text-[10px] pt-1 pl-1"},ze={class:"mt-6"},Ae=["disabled"],Te={__name:"Company",setup(X){const k=le("call"),C=ae(),y=x(!1),c=x(null),n=x({}),o=x({registration_type:"Self Registration",registration_date:"",company_name:"",first_name:"",last_name:"",email:"",designation:"",phone:"",phone_country_code:"+91",mobile_number:"",address:"",country:"India",state:"",city:"",pincode:"",number_of_employees:"",clear_vision:"Yes",volunteering_csr_activities:"",employee_engagement:"",company_logo:null}),V=a=>a?a.startsWith("data:")?"Image File":"Uploaded File":"",_=x([{name:"Yes",label:"Yes"},{name:"No",label:"No"}]),P=/^\d{10}$/,T=a=>h(this,null,function*(){const e=a.target.files[0];if(!e){m.error("Please select a file.");return}const l=["image/jpeg","image/png","image/webp"],w=5*1024*1024;if(!l.includes(e.type)){m.error("Invalid file type. Only JPG, PNG, and WEBP are allowed.");return}if(e.size>w){m.error("File size exceeds 5 MB limit.");return}const u=new FileReader;u.readAsDataURL(e),u.onload=()=>h(this,null,function*(){try{const f=u.result.split(",")[1];o.value.company_logo=f,m.success("File uploaded successfully!",{autoClose:1e3})}catch(f){console.error("Error uploading file:",f),m.error("Failed to upload logo. Please try again.")}})}),G=()=>{o.value.company_logo=null,m.info("File removed.",{autoClose:2e3})},O=()=>{c.value=null;const a=["company_name","registration_date","email","first_name","last_name","designation","mobile_number","address","country","state","city","pincode","number_of_employees","clear_vision","volunteering_csr_activities","employee_engagement","company_logo"];let e=x(null);for(const u of a)o.value[u]||(c.value=`Please fill in ${u.replace(/_/g," ")}.`,n.value[u]=` ${u.replace(/_/g," ")} is required!`,e.value===null&&(e.value=u));if(e.value){const u=document.querySelector(`[name="${e.value}"]`);if(u){const f=u.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:f-200,behavior:"smooth"}),setTimeout(()=>{u.focus()},200)}return!1}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.value.email))return c.value="Please enter a valid email address.",m.error(c.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;if(!/^\d{10}$/.test(o.value.mobile_number))return this.error="Mobile number must be exactly 10 digits.",this.toast.error(this.error,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;if(o.value.phone&&!P.test(o.value.phone))return c.value="Phone number must be exactly 10 digits.",m.error(c.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;if(!/^\d{6}$/.test(o.value.pincode))return c.value="Pincode must be exactly 6 digits.",m.error(c.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;if(parseInt(o.value.number_of_employees)<1)return c.value="Number of employees must be at least 1.",m.error(c.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;const w=["volunteering_csr_activities","employee_engagement"];for(const u of w){const f=parseFloat(o.value[u]);if(isNaN(f)||f<0||f>100)return c.value=`${u.replace(/_/g," ")} must be between 0 and 100.`,m.error(c.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1}return!0},b=a=>{o.value[a].trim()?delete n.value[a]:n.value[a]=` ${a.replace(/_/g," ")} is required!`},E=x(ne),F=x(""),$=x(!1),I=j(()=>E.value.find(a=>a.dial_code===o.value.phone_country_code)||{flag:"🇮🇳",dial_code:"+91",name:"India"}),Y=j(()=>{const a=F.value.toLowerCase();return E.value.filter(e=>e.dial_code.toLowerCase().includes(a)||e.name.toLowerCase().includes(a)||e.flag.toLowerCase().includes(a)).sort((e,l)=>{const w=e.name.toLowerCase().includes(a),u=l.name.toLowerCase().includes(a),f=e.dial_code.toLowerCase().includes(a),D=l.dial_code.toLowerCase().includes(a);return w&&!u?-1:!w&&u?1:f&&!D?-1:!f&&D?1:e.name.localeCompare(l.name)})}),H=a=>{o.value.phone_country_code=a.dial_code,F.value="",$.value=!1},J=()=>{$.value=!$.value},W=()=>h(this,null,function*(){try{if(!O())return;y.value=!0;const a=o.value.phone?`${o.value.phone_country_code}-${o.value.phone}`:"",e=yield k("mykartavya.mykartavya.api.register_company",{registration_type:o.value.registration_type,registration_date:o.value.registration_date,company_name:o.value.company_name,first_name:o.value.first_name,last_name:o.value.last_name,email:o.value.email,designation:o.value.designation,phone:a,mobile_number:o.value.mobile_number,address:o.value.address,country:o.value.country,state:o.value.state,city:o.value.city,pincode:o.value.pincode,number_of_employees:o.value.number_of_employees,clear_vision:o.value.clear_vision,volunteering_csr_activities:o.value.volunteering_csr_activities,employee_engagement:o.value.employee_engagement,company_logo:o.value.company_logo});if(e.status==="error")throw new Error(e.message);m.success("Company Registration Successful! Please check your email for login credentials.",{position:"top-right",autoClose:5e3,hideProgressBar:!1}),setTimeout(()=>{C.push("/")},2e3)}catch(a){console.error("Error submitting form:",a),m.error(a.message||"Failed to register company. Please try again.",{position:"top-right",autoClose:5e3,hideProgressBar:!1})}finally{y.value=!1}}),L=x([]),M=x([]),R=x([]),K=()=>h(this,null,function*(){try{y.value=!0;const a=yield k("mykartavya.controllers.api.country_data");L.value=a||[]}catch(a){console.error("Error fetching countries:",a),m.error("Failed to load countries. Please try again.",{position:"top-right",autoClose:3e3,hideProgressBar:!1})}finally{y.value=!1}}),q=()=>h(this,null,function*(){try{if(!o.value.country)return;y.value=!0;const a=yield k("mykartavya.controllers.api.state_data",{country:o.value.country});M.value=a||[],o.value.state="",o.value.city=""}catch(a){console.error("Error fetching states:",a),m.error("Failed to load states. Please try again.",{position:"top-right",autoClose:3e3,hideProgressBar:!1})}finally{y.value=!1}}),Q=()=>h(this,null,function*(){try{if(!o.value.state)return;y.value=!0;const a=yield k("mykartavya.controllers.api.city_data",{state:o.value.state});R.value=a||[],o.value.city=""}catch(a){console.error("Error fetching cities:",a),m.error("Failed to load cities. Please try again.",{position:"top-right",autoClose:3e3,hideProgressBar:!1})}finally{y.value=!1}}),S=a=>{switch(a){case"country":return L.value.map(e=>({name:e.name,label:e.label||e.name}));case"state":return M.value.map(e=>({name:e.name,label:e.state_name||e.name}));case"city":return R.value.map(e=>({name:e.name,label:e.district_name||e.name}));default:return[]}};return z(()=>o.value.country,a=>{a&&q()}),z(()=>o.value.state,a=>{a&&Q()}),ee(()=>h(this,null,function*(){yield K(),o.value.country&&(yield q()),document.addEventListener("click",a=>{const e=document.querySelector(".country-code-wrapper");e!=null&&e.contains(a.target)||($.value=!1,F.value="")})})),(a,e)=>(i(),r("div",se,[e[55]||(e[55]=t("section",{class:"relative w-full h-[250px] md:h-[300px] lg:h-[247px] bg-cover bg-center bg-no-repeat banner"},[t("div",{class:"absolute inset-0 flex items-center justify-start px-6 md:px-12 lg:px-16"},[t("h1",{class:"text-white font-semibold text-heading2"}," Register For Company ")])],-1)),t("div",re,[t("div",ie,[t("div",ue,[e[54]||(e[54]=t("h2",{class:"text-xl font-semibold text-gray-700 mb-4"},null,-1)),t("form",{onSubmit:B(W,["prevent"]),class:A(["space-y-8",{loading:y.value}])},[t("div",de,[t("div",null,[e[31]||(e[31]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Company Name "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),g(t("input",{"onUpdate:modelValue":e[0]||(e[0]=l=>o.value.company_name=l),type:"text",name:"company_name",onInput:e[1]||(e[1]=l=>b("company_name")),placeholder:"Enter Company Name",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.company_name]]),n.value.company_name?(i(),r("p",pe,s(n.value.company_name),1)):p("",!0)]),t("div",null,[e[32]||(e[32]=t("label",{for:"registration_date",class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Registration Date "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),g(t("input",{"onUpdate:modelValue":e[2]||(e[2]=l=>o.value.registration_date=l),id:"registration_date",type:"date",name:"registration_date",onInput:e[3]||(e[3]=l=>b("registration_date")),class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.registration_date]]),n.value.registration_date?(i(),r("p",me,s(n.value.registration_date),1)):p("",!0)]),t("div",null,[e[33]||(e[33]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Email "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),g(t("input",{"onUpdate:modelValue":e[4]||(e[4]=l=>o.value.email=l),name:"email",type:"email",onInput:e[5]||(e[5]=l=>b("email")),placeholder:"company@example.com",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.email]]),n.value.email?(i(),r("p",ce,s(n.value.email),1)):p("",!0)]),t("div",null,[e[34]||(e[34]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" First Name "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),g(t("input",{"onUpdate:modelValue":e[6]||(e[6]=l=>o.value.first_name=l),type:"text",name:"first_name",onInput:e[7]||(e[7]=l=>b("first_name")),placeholder:"First Name",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.first_name]]),n.value.first_name?(i(),r("p",ge,s(n.value.first_name),1)):p("",!0)]),t("div",null,[e[35]||(e[35]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Last Name "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),g(t("input",{"onUpdate:modelValue":e[8]||(e[8]=l=>o.value.last_name=l),type:"text",name:"last_name",onInput:e[9]||(e[9]=l=>b("last_name")),placeholder:"Last Name",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.last_name]]),n.value.last_name?(i(),r("p",ve,s(n.value.last_name),1)):p("",!0)]),t("div",null,[e[36]||(e[36]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Designation "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),g(t("input",{"onUpdate:modelValue":e[10]||(e[10]=l=>o.value.designation=l),type:"text",name:"designation",onInput:e[11]||(e[11]=l=>b("designation")),placeholder:"e.g., Director, Manager",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.designation]]),n.value.designation?(i(),r("p",ye,s(n.value.designation),1)):p("",!0)]),t("div",null,[e[37]||(e[37]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Mobile Number "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),g(t("input",{"onUpdate:modelValue":e[12]||(e[12]=l=>o.value.mobile_number=l),type:"tel",name:"mobile_number",onInput:e[13]||(e[13]=l=>b("mobile_number")),placeholder:"+91 XXXXX XXXXXr",maxlength:"10",pattern:"\\d{10}",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.mobile_number]]),n.value.mobile_number?(i(),r("p",be,s(n.value.mobile_number),1)):p("",!0)]),t("div",null,[e[39]||(e[39]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"}," Phone ",-1)),t("div",fe,[t("div",xe,[t("div",{class:"flex items-center h-[42px] border border-gray-300 rounded-l px-3 min-w-[120px] cursor-pointer",onClick:B(J,["stop"])},[t("div",_e,[t("span",null,s(I.value.flag),1),t("span",null,s(I.value.dial_code),1)]),e[38]||(e[38]=t("svg",{class:"w-4 h-4 text-gray-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 9l-7 7-7-7"})],-1))]),$.value?(i(),r("div",he,[t("div",we,[g(t("input",{type:"text","onUpdate:modelValue":e[14]||(e[14]=l=>F.value=l),placeholder:"Search country...",class:"w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-200",onClick:e[15]||(e[15]=B(()=>{},["stop"]))},null,512),[[v,F.value]])]),t("div",ke,[(i(!0),r(te,null,oe(Y.value,l=>(i(),r("div",{key:I.value.dial_code,onClick:B(w=>H(l),["stop"]),class:A(["flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer",{"bg-orange-50":l.dial_code===o.value.phone_country_code}])},[t("span",Ve,s(l.flag),1),t("span",Pe,s(l.name),1),t("span",Fe,s(l.dial_code),1)],10,Ce))),128))])])):p("",!0)]),g(t("input",{"onUpdate:modelValue":e[16]||(e[16]=l=>o.value.phone=l),type:"tel",name:"phone",placeholder:"XXXXX XXXXX",maxlength:"10",class:"block w-full border border-gray-300 text-bodyh2 rounded-r py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200 border-l-0"},null,512),[[v,o.value.phone]])]),n.value.phone?(i(),r("p",$e,s(n.value.phone),1)):p("",!0)]),t("div",Be,[e[40]||(e[40]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" India Headquarters Address "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),g(t("textarea",{"onUpdate:modelValue":e[17]||(e[17]=l=>o.value.address=l),onInput:e[18]||(e[18]=l=>b("address")),name:"address",rows:"3",placeholder:"Enter complete address with landmarks",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.address]]),n.value.address?(i(),r("p",Ne,s(n.value.address),1)):p("",!0)]),t("div",null,[e[41]||(e[41]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Country "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),N(U,{modelValue:o.value.country,"onUpdate:modelValue":e[19]||(e[19]=l=>o.value.country=l),options:S("country"),label:"Country",placeholder:"Select Country",required:!0},null,8,["modelValue","options"]),n.value.country?(i(),r("p",Ue,s(n.value.country),1)):p("",!0)]),t("div",null,[e[42]||(e[42]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" State "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),N(U,{modelValue:o.value.state,"onUpdate:modelValue":e[20]||(e[20]=l=>o.value.state=l),options:S("state"),label:"State",placeholder:"Select State",required:!0},null,8,["modelValue","options"]),n.value.state?(i(),r("p",Ie,s(n.value.state),1)):p("",!0)]),t("div",null,[e[43]||(e[43]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" City "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),N(U,{modelValue:o.value.city,"onUpdate:modelValue":e[21]||(e[21]=l=>o.value.city=l),options:S("city"),label:"City",placeholder:"Select City",required:!0},null,8,["modelValue","options"]),n.value.city?(i(),r("p",Se,s(n.value.city),1)):p("",!0)]),t("div",null,[e[44]||(e[44]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Pincode "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),g(t("input",{"onUpdate:modelValue":e[22]||(e[22]=l=>o.value.pincode=l),type:"text",name:"pincode",onInput:e[23]||(e[23]=l=>b("pincode")),placeholder:"Enter PIN code",maxlength:"6",pattern:"\\d{6}",oninput:"this.value=this.value.replace(/[^0-9]/g,'').slice(0,6)",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.pincode]]),n.value.pincode?(i(),r("p",Xe,s(n.value.pincode),1)):p("",!0)]),t("div",null,[e[45]||(e[45]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Number of Employees "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),g(t("input",{"onUpdate:modelValue":e[24]||(e[24]=l=>o.value.number_of_employees=l),name:"number_of_employees",type:"text",onInput:e[25]||(e[25]=l=>b("number_of_employees")),min:"1",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.number_of_employees]])]),t("div",null,[e[46]||(e[46]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Clear Vision "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),N(U,{modelValue:o.value.clear_vision,"onUpdate:modelValue":e[26]||(e[26]=l=>o.value.clear_vision=l),options:_.value,label:"Clear Vision",placeholder:"Select Option",required:!0},null,8,["modelValue","options"]),n.value.clear_vision?(i(),r("p",Ee,s(n.value.clear_vision),1)):p("",!0)]),t("div",null,[e[47]||(e[47]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Volunteering CSR Activities Cost (%) "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),g(t("input",{"onUpdate:modelValue":e[27]||(e[27]=l=>o.value.volunteering_csr_activities=l),name:"volunteering_csr_activities",type:"text",onInput:e[28]||(e[28]=l=>b("volunteering_csr_activities")),min:"0",max:"100",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.volunteering_csr_activities]])]),t("div",null,[e[48]||(e[48]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Employee Engagement Coverage (%) "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),g(t("input",{"onUpdate:modelValue":e[29]||(e[29]=l=>o.value.employee_engagement=l),name:"employee_engagement",type:"text",onInput:e[30]||(e[30]=l=>b("employee_engagement")),min:"0",max:"100",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.employee_engagement]])]),t("div",null,[e[53]||(e[53]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Company Logo "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),t("label",Le,[e[49]||(e[49]=t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 text-indigo-500 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})],-1)),e[50]||(e[50]=t("span",{class:"text-sm text-gray-600"},"Upload Company Logo (PNG, JPG up to 2MB)",-1)),t("input",{type:"file",class:"hidden",onChange:T,accept:"image/*"},null,32)]),o.value.company_logo?(i(),r("div",Me,[t("div",Re,[t("div",qe,[e[51]||(e[51]=t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 text-gray-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})],-1)),t("span",De,s(V(o.value.company_logo)),1)]),t("button",{onClick:G,class:"inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200"},e[52]||(e[52]=[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-4 w-4 mr-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})],-1),d(" Remove ")]))])])):p("",!0),n.value.company_logo?(i(),r("p",je,s(n.value.company_logo),1)):p("",!0)])]),t("div",ze,[t("button",{type:"submit",class:"bg-orange-500 text-white font-semibold py-2 px-4 rounded-sm hover:bg-orange-600 transition",disabled:y.value},s(y.value?"Registering...":"Register Company"),9,Ae)])],34)])])])]))}},We=Z(Te,[["__scopeId","data-v-ead4be57"]]);export{We as default};
