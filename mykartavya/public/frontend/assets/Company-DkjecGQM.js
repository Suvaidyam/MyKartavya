var w=(X,_,k)=>new Promise((g,p)=>{var n=c=>{try{h(k.next(c))}catch(r){p(r)}},o=c=>{try{h(k.throw(c))}catch(r){p(r)}},h=c=>c.done?g(c.value):Promise.resolve(c.value).then(n,o);h((k=k.apply(X,_)).next())});import{_ as M,r as x,o as q,c as s,a as t,n as D,C as T,v as u,m as b,f as d,x as v,t as m,ae as P,F as $,h as V,i as Y,B as j,j as i}from"./index-fz3I3MIT.js";import{l as f}from"./index-BmE5YNHk.js";/* empty css              */const L={class:"max-w-[1920px] mx-auto pt-[82px] pb-4 bg-gray-50"},A={class:"px-10"},z={class:"bg-white rounded-sm shadow mt-4"},H={class:"p-6"},G={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},J={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},K={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},O={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},Q={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},W={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},Z={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},ee={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},te={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},oe={class:"md:col-span-2"},le={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},ne=["value"],ae={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},re=["value"],se=["value"],ie={key:0,class:"text-red-500 text-[10px] pt-1 pl-1"},ue={class:"mt-6"},de=["disabled"],pe={__name:"Company",setup(X){const _=Y("call"),k=j(),g=x(!1),p=x(null),n=x({}),o=x({registration_type:"Self Registration",registration_date:"",company_name:"",first_name:"",last_name:"",email:"",designation:"",phone:"",mobile_number:"",address:"",country:"India",state:"",city:"",pincode:"",number_of_employees:"",clear_vision:"Yes",volunteering_csr_activities:"",employee_engagement:"",company_logo:null}),h=/^\d{10}$/,c=()=>{p.value=null;const a=["company_name","registration_date","email","first_name","last_name","designation","mobile_number","address","country","state","city","pincode","number_of_employees","clear_vision","volunteering_csr_activities","employee_engagement","company_logo"];let e=x(null);for(const y of a)o.value[y]||(p.value=`Please fill in ${y.replace(/_/g," ")}.`,n.value[y]=` ${y.replace(/_/g," ")} is required!`,e.value===null&&(e.value=y));if(e.value){const y=document.querySelector(`[name="${e.value}"]`);if(y){const C=y.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:C-200,behavior:"smooth"}),setTimeout(()=>{y.focus()},200)}return!1}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.value.email))return p.value="Please enter a valid email address.",f.error(p.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;if(!/^\d{10}$/.test(o.value.mobile_number))return this.error="Mobile number must be exactly 10 digits.",this.toast.error(this.error,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;if(o.value.phone&&!h.test(o.value.phone))return p.value="Phone number must be exactly 10 digits.",f.error(p.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;if(!/^\d{6}$/.test(o.value.pincode))return p.value="Pincode must be exactly 6 digits.",f.error(p.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;if(parseInt(o.value.number_of_employees)<1)return p.value="Number of employees must be at least 1.",f.error(p.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;const R=["volunteering_csr_activities","employee_engagement"];for(const y of R){const C=parseFloat(o.value[y]);if(isNaN(C)||C<0||C>100)return p.value=`${y.replace(/_/g," ")} must be between 0 and 100.`,f.error(p.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1}return!0},r=a=>{o.value[a].trim()?delete n.value[a]:n.value[a]=` ${a.replace(/_/g," ")} is required!`},E=()=>w(this,null,function*(){try{if(!c())return;g.value=!0;const a=yield _("mykartavya.mykartavya.api.register_company",{registration_type:o.value.registration_type,registration_date:o.value.registration_date,company_name:o.value.company_name,first_name:o.value.first_name,last_name:o.value.last_name,email:o.value.email,designation:o.value.designation,phone:o.value.phone,mobile_number:o.value.mobile_number,address:o.value.address,country:o.value.country,state:o.value.state,city:o.value.city,pincode:o.value.pincode,number_of_employees:o.value.number_of_employees,clear_vision:o.value.clear_vision,volunteering_csr_activities:o.value.volunteering_csr_activities,employee_engagement:o.value.employee_engagement});if(a.status==="error")throw new Error(a.message);f.success("Company Registration Successful! Please check your email for login credentials.",{position:"top-right",autoClose:5e3,hideProgressBar:!1}),setTimeout(()=>{k.push("/")},2e3)}catch(a){console.error("Error submitting form:",a),f.error(a.message||"Failed to register company. Please try again.",{position:"top-right",autoClose:5e3,hideProgressBar:!1})}finally{g.value=!1}}),I=x([]),N=x([]),U=x([]),F=()=>w(this,null,function*(){try{g.value=!0;const a=yield _("mykartavya.controllers.api.country_data");I.value=a||[]}catch(a){console.error("Error fetching countries:",a),f.error("Failed to load countries. Please try again.",{position:"top-right",autoClose:3e3,hideProgressBar:!1})}finally{g.value=!1}}),B=()=>w(this,null,function*(){try{if(!o.value.country)return;g.value=!0;const a=yield _("mykartavya.controllers.api.state_data",{country:o.value.country});N.value=a||[],o.value.state="",o.value.city=""}catch(a){console.error("Error fetching states:",a),f.error("Failed to load states. Please try again.",{position:"top-right",autoClose:3e3,hideProgressBar:!1})}finally{g.value=!1}}),S=()=>w(this,null,function*(){try{if(!o.value.state)return;g.value=!0;const a=yield _("mykartavya.controllers.api.city_data",{state:o.value.state});U.value=a||[],o.value.city=""}catch(a){console.error("Error fetching cities:",a),f.error("Failed to load cities. Please try again.",{position:"top-right",autoClose:3e3,hideProgressBar:!1})}finally{g.value=!1}});return q(()=>w(this,null,function*(){yield F(),o.value.country&&(yield B())})),(a,e)=>(i(),s("div",L,[e[53]||(e[53]=t("section",{class:"relative w-full h-[250px] md:h-[300px] lg:h-[247px] bg-cover bg-center bg-no-repeat banner"},[t("div",{class:"absolute inset-0 flex items-center justify-start px-6 md:px-12 lg:px-16"},[t("h1",{class:"text-white font-semibold text-heading2"}," Register For Company ")])],-1)),t("div",A,[t("div",z,[t("div",H,[e[52]||(e[52]=t("h2",{class:"text-xl font-semibold text-gray-700 mb-4"},null,-1)),t("form",{onSubmit:T(E,["prevent"]),class:D(["space-y-8",{loading:g.value}])},[t("div",G,[t("div",null,[e[31]||(e[31]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Company Name "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("input",{"onUpdate:modelValue":e[0]||(e[0]=l=>o.value.company_name=l),type:"text",name:"company_name",onInput:e[1]||(e[1]=l=>r("company_name")),placeholder:"Enter Company Name",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.company_name]]),n.value.company_name?(i(),s("p",J,m(n.value.company_name),1)):b("",!0)]),t("div",null,[e[32]||(e[32]=t("label",{for:"registration_date",class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Registration Date "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("input",{"onUpdate:modelValue":e[2]||(e[2]=l=>o.value.registration_date=l),id:"registration_date",type:"date",name:"registration_date",onInput:e[3]||(e[3]=l=>r("registration_date")),class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.registration_date]]),n.value.registration_date?(i(),s("p",K,m(n.value.registration_date),1)):b("",!0)]),t("div",null,[e[33]||(e[33]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Email "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("input",{"onUpdate:modelValue":e[4]||(e[4]=l=>o.value.email=l),name:"email",type:"email",onInput:e[5]||(e[5]=l=>r("email")),placeholder:"company@example.com",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.email]]),n.value.email?(i(),s("p",O,m(n.value.email),1)):b("",!0)]),t("div",null,[e[34]||(e[34]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" First Name "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("input",{"onUpdate:modelValue":e[6]||(e[6]=l=>o.value.first_name=l),type:"text",name:"first_name",onInput:e[7]||(e[7]=l=>r("first_name")),placeholder:"First Name",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.first_name]]),n.value.first_name?(i(),s("p",Q,m(n.value.first_name),1)):b("",!0)]),t("div",null,[e[35]||(e[35]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Last Name "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("input",{"onUpdate:modelValue":e[8]||(e[8]=l=>o.value.last_name=l),type:"text",name:"last_name",onInput:e[9]||(e[9]=l=>r("last_name")),placeholder:"Last Name",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.last_name]]),n.value.last_name?(i(),s("p",W,m(n.value.last_name),1)):b("",!0)]),t("div",null,[e[36]||(e[36]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Designation "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("input",{"onUpdate:modelValue":e[10]||(e[10]=l=>o.value.designation=l),type:"text",name:"designation",onInput:e[11]||(e[11]=l=>r("designation")),placeholder:"e.g., Director, Manager",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.designation]]),n.value.designation?(i(),s("p",Z,m(n.value.designation),1)):b("",!0)]),t("div",null,[e[37]||(e[37]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Mobile Number "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("input",{"onUpdate:modelValue":e[12]||(e[12]=l=>o.value.mobile_number=l),type:"tel",name:"mobile_number",onInput:e[13]||(e[13]=l=>r("mobile_number")),placeholder:"+91 XXXXX XXXXXr",maxlength:"10",pattern:"\\d{10}",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.mobile_number]]),n.value.mobile_number?(i(),s("p",ee,m(n.value.mobile_number),1)):b("",!0)]),t("div",null,[e[38]||(e[38]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"}," Phone ",-1)),u(t("input",{"onUpdate:modelValue":e[14]||(e[14]=l=>o.value.phone=l),type:"tel",name:"phone",placeholder:"+91 XXXXX XXXXX",maxlength:"10",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[v,o.value.phone]]),n.value.phone?(i(),s("p",te,m(n.value.phone),1)):b("",!0)]),t("div",oe,[e[39]||(e[39]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" India Headquarters Address "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("textarea",{"onUpdate:modelValue":e[15]||(e[15]=l=>o.value.address=l),onInput:e[16]||(e[16]=l=>r("address")),name:"address",rows:"3",placeholder:"Enter complete address with landmarks",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.address]]),n.value.address?(i(),s("p",le,m(n.value.address),1)):b("",!0)]),t("div",null,[e[41]||(e[41]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Country "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("select",{"onUpdate:modelValue":e[17]||(e[17]=l=>o.value.country=l),onChange:B,name:"country",onInput:e[18]||(e[18]=l=>r("country")),class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},[e[40]||(e[40]=t("option",{value:"",disabled:""},"Select Country",-1)),(i(!0),s($,null,V(I.value,l=>(i(),s("option",{key:l.name,value:l.name},m(l.label||l.name),9,ne))),128))],544),[[P,o.value.country]]),n.value.country?(i(),s("p",ae,m(n.value.country),1)):b("",!0)]),t("div",null,[e[43]||(e[43]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" State "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("select",{"onUpdate:modelValue":e[19]||(e[19]=l=>o.value.state=l),onChange:S,onInput:e[20]||(e[20]=l=>r("state")),name:"state",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},[e[42]||(e[42]=t("option",{value:"",disabled:""},"Select State",-1)),(i(!0),s($,null,V(N.value,l=>(i(),s("option",{key:l.name,value:l.name},m(l.state_name||l.name),9,re))),128))],544),[[P,o.value.state]])]),t("div",null,[e[45]||(e[45]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" City "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("select",{"onUpdate:modelValue":e[21]||(e[21]=l=>o.value.city=l),name:"city",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},[e[44]||(e[44]=t("option",{value:"",disabled:""},"Select City",-1)),(i(!0),s($,null,V(U.value,l=>(i(),s("option",{key:l.name,value:l.name},m(l.district_name||l.name),9,se))),128))],512),[[P,o.value.city]])]),t("div",null,[e[46]||(e[46]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Pincode "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("input",{"onUpdate:modelValue":e[22]||(e[22]=l=>o.value.pincode=l),type:"text",name:"pincode",onInput:e[23]||(e[23]=l=>r("pincode")),placeholder:"Enter PIN code",maxlength:"6",pattern:"\\d{6}",oninput:"this.value=this.value.replace(/[^0-9]/g,'').slice(0,6)",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.pincode]]),n.value.pincode?(i(),s("p",ie,m(n.value.pincode),1)):b("",!0)]),t("div",null,[e[47]||(e[47]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Number of Employees "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("input",{"onUpdate:modelValue":e[24]||(e[24]=l=>o.value.number_of_employees=l),name:"number_of_employees",type:"text",onInput:e[25]||(e[25]=l=>r("number_of_employees")),min:"1",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.number_of_employees]])]),t("div",null,[e[49]||(e[49]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Clear Vision "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("select",{"onUpdate:modelValue":e[26]||(e[26]=l=>o.value.clear_vision=l),class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},e[48]||(e[48]=[t("option",{value:"Yes"},"Yes",-1),t("option",{value:"No"},"No",-1)]),512),[[P,o.value.clear_vision]])]),t("div",null,[e[50]||(e[50]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Volunteering CSR Activities Cost (%) "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("input",{"onUpdate:modelValue":e[27]||(e[27]=l=>o.value.volunteering_csr_activities=l),name:"volunteering_csr_activities",type:"text",onInput:e[28]||(e[28]=l=>r("volunteering_csr_activities")),min:"0",max:"100",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.volunteering_csr_activities]])]),t("div",null,[e[51]||(e[51]=t("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[d(" Employee Engagement Coverage (%) "),t("span",{class:"text-red-500 pt-2"},"*")],-1)),u(t("input",{"onUpdate:modelValue":e[29]||(e[29]=l=>o.value.employee_engagement=l),name:"employee_engagement",type:"text",onInput:e[30]||(e[30]=l=>r("employee_engagement")),min:"0",max:"100",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,544),[[v,o.value.employee_engagement]])])]),t("div",ue,[t("button",{type:"submit",class:"bg-orange-500 text-white font-semibold py-2 px-4 rounded-sm hover:bg-orange-600 transition",disabled:g.value},m(g.value?"Registering...":"Register Company"),9,de)])],34)])])])]))}},be=M(pe,[["__scopeId","data-v-3631bfc8"]]);export{be as default};
