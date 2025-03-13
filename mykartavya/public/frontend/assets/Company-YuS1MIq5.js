var y=(B,v,c)=>new Promise((n,l)=>{var o=m=>{try{x(c.next(m))}catch(f){l(f)}},_=m=>{try{x(c.throw(m))}catch(f){l(f)}},x=m=>m.done?n(m.value):Promise.resolve(m.value).then(o,_);x((c=c.apply(B,v)).next())});import{j as F,r as b,o as E,c as g,d as e,n as S,z,m as R,t as h,f as r,s as i,v as d,E as k,F as P,h as V,i as j,y as I,b as p}from"./index-Cu6nMMA3.js";import{l as u}from"./index-F-WGRG4t.js";const D={class:"min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10"},H={class:"max-w-[1920px] mt-[20px] mx-auto p-8 bg-white rounded-xl shadow-xl"},L={key:0,class:"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative",role:"alert"},$={class:"block sm:inline"},A={class:"bg-indigo-50 p-6 rounded-lg"},T={class:"grid grid-cols-1 md:grid-cols-3 gap-6"},Y={class:"bg-indigo-50 p-6 rounded-lg"},O={class:"grid grid-cols-1 md:grid-cols-3 gap-6"},G={class:"bg-indigo-50 p-6 rounded-lg"},J={class:"grid grid-cols-1 md:grid-cols-3 gap-6"},K={class:"md:col-span-3"},Q=["value"],W=["value"],Z=["value"],ee={class:"bg-indigo-50 p-6 rounded-lg"},te={class:"grid grid-cols-1 md:grid-cols-3 gap-6"},oe={class:"bg-indigo-50 p-6 rounded-lg"},se={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},re={class:"mt-6"},le=["disabled"],ae={__name:"Company",setup(B){const v=j("call"),c=I(),n=b(!1),l=b(null),o=b({registration_type:"Self Registration",registration_date:"",company_name:"",first_name:"",last_name:"",email:"",designation:"",phone:"",mobile_number:"",address:"",country:"India",state:"",city:"",pincode:"",number_of_employees:"",clear_vision:"Yes",volunteering_csr_activities:"",employee_engagement:""}),_=()=>{l.value=null;const a=["company_name","registration_date","first_name","last_name","email","designation","mobile_number","address","country","state","city","pincode","number_of_employees","clear_vision","volunteering_csr_activities","employee_engagement"];for(const w of a)if(!o.value[w])return l.value=`Please fill in ${w.replace(/_/g," ")}.`,u.error(l.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.value.email))return l.value="Please enter a valid email address.",u.error(l.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;const s=/^\d{10}$/;if(!s.test(o.value.mobile_number))return l.value="Mobile number must be exactly 10 digits.",u.error(l.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;if(o.value.phone&&!s.test(o.value.phone))return l.value="Phone number must be exactly 10 digits.",u.error(l.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;if(!/^\d{6}$/.test(o.value.pincode))return l.value="Pincode must be exactly 6 digits.",u.error(l.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;if(parseInt(o.value.number_of_employees)<1)return l.value="Number of employees must be at least 1.",u.error(l.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1;const U=["volunteering_csr_activities","employee_engagement"];for(const w of U){const C=parseFloat(o.value[w]);if(isNaN(C)||C<0||C>100)return l.value=`${w.replace(/_/g," ")} must be between 0 and 100.`,u.error(l.value,{position:"top-right",autoClose:3e3,hideProgressBar:!1}),!1}return!0},x=()=>y(this,null,function*(){try{if(!_())return;n.value=!0;const a=yield v("mykartavya.mykartavya.api.register_company",{registration_type:o.value.registration_type,registration_date:o.value.registration_date,company_name:o.value.company_name,first_name:o.value.first_name,last_name:o.value.last_name,email:o.value.email,designation:o.value.designation,phone:o.value.phone,mobile_number:o.value.mobile_number,address:o.value.address,country:o.value.country,state:o.value.state,city:o.value.city,pincode:o.value.pincode,number_of_employees:o.value.number_of_employees,clear_vision:o.value.clear_vision,volunteering_csr_activities:o.value.volunteering_csr_activities,employee_engagement:o.value.employee_engagement});if(a.status==="error")throw new Error(a.message);u.success("Company Registration Successful! Please check your email for login credentials.",{position:"top-right",autoClose:5e3,hideProgressBar:!1}),setTimeout(()=>{c.push("/")},2e3)}catch(a){console.error("Error submitting form:",a),u.error(a.message||"Failed to register company. Please try again.",{position:"top-right",autoClose:5e3,hideProgressBar:!1})}finally{n.value=!1}}),m=b([]),f=b([]),M=b([]),q=()=>y(this,null,function*(){try{n.value=!0;const a=yield v("mykartavya.controllers.api.country_data");m.value=a||[]}catch(a){console.error("Error fetching countries:",a),u.error("Failed to load countries. Please try again.",{position:"top-right",autoClose:3e3,hideProgressBar:!1})}finally{n.value=!1}}),X=()=>y(this,null,function*(){try{if(!o.value.country)return;n.value=!0;const a=yield v("mykartavya.controllers.api.state_data",{country:o.value.country});f.value=a||[],o.value.state="",o.value.city=""}catch(a){console.error("Error fetching states:",a),u.error("Failed to load states. Please try again.",{position:"top-right",autoClose:3e3,hideProgressBar:!1})}finally{n.value=!1}}),N=()=>y(this,null,function*(){try{if(!o.value.state)return;n.value=!0;const a=yield v("mykartavya.controllers.api.city_data",{state:o.value.state});M.value=a||[],o.value.city=""}catch(a){console.error("Error fetching cities:",a),u.error("Failed to load cities. Please try again.",{position:"top-right",autoClose:3e3,hideProgressBar:!1})}finally{n.value=!1}});return E(()=>y(this,null,function*(){yield q(),o.value.country&&(yield X())})),(a,t)=>(p(),g("div",D,[e("div",H,[e("form",{onSubmit:z(x,["prevent"]),class:S(["space-y-8",{loading:n.value}])},[l.value?(p(),g("div",L,[e("span",$,h(l.value),1)])):R("",!0),e("div",A,[t[20]||(t[20]=e("h2",{class:"text-xl font-semibold text-indigo-800 mb-4 flex items-center"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})]),r(" Basic Information ")],-1)),e("div",T,[e("div",null,[t[17]||(t[17]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("Company Name "),e("span",{class:"text-red-500"},"*")],-1)),i(e("input",{"onUpdate:modelValue":t[0]||(t[0]=s=>o.value.company_name=s),type:"text",placeholder:"Enter Company Name",required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.company_name]])]),e("div",null,[t[18]||(t[18]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("Registration Date "),e("span",{class:"text-red-500"},"*")],-1)),i(e("input",{"onUpdate:modelValue":t[1]||(t[1]=s=>o.value.registration_date=s),type:"date",required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.registration_date]])]),e("div",null,[t[19]||(t[19]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("Email "),e("span",{class:"text-red-500"},"*")],-1)),i(e("input",{"onUpdate:modelValue":t[2]||(t[2]=s=>o.value.email=s),type:"email",placeholder:"company@example.com",required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.email]])])])]),e("div",Y,[t[26]||(t[26]=e("h2",{class:"text-xl font-semibold text-indigo-800 mb-4 flex items-center"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})]),r(" Contact Information ")],-1)),e("div",O,[e("div",null,[t[21]||(t[21]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("First Name "),e("span",{class:"text-red-500"},"*")],-1)),i(e("input",{"onUpdate:modelValue":t[3]||(t[3]=s=>o.value.first_name=s),type:"text",placeholder:"First Name",required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.first_name]])]),e("div",null,[t[22]||(t[22]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("Last Name "),e("span",{class:"text-red-500"},"*")],-1)),i(e("input",{"onUpdate:modelValue":t[4]||(t[4]=s=>o.value.last_name=s),type:"text",placeholder:"Last Name",required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.last_name]])]),e("div",null,[t[23]||(t[23]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("Designation "),e("span",{class:"text-red-500"},"*")],-1)),i(e("input",{"onUpdate:modelValue":t[5]||(t[5]=s=>o.value.designation=s),type:"text",placeholder:"e.g., Director, Manager",required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.designation]])]),e("div",null,[t[24]||(t[24]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("Mobile Number "),e("span",{class:"text-red-500"},"*")],-1)),i(e("input",{"onUpdate:modelValue":t[6]||(t[6]=s=>o.value.mobile_number=s),type:"tel",placeholder:"+91 XXXXX XXXXX",required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.mobile_number]])]),e("div",null,[t[25]||(t[25]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"Phone",-1)),i(e("input",{"onUpdate:modelValue":t[7]||(t[7]=s=>o.value.phone=s),type:"tel",placeholder:"+91 XXXXX XXXXX",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.phone]])])])]),e("div",G,[t[35]||(t[35]=e("h2",{class:"text-xl font-semibold text-indigo-800 mb-4 flex items-center"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]),r(" Address Information ")],-1)),e("div",J,[e("div",K,[t[27]||(t[27]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("India Headquarters Address "),e("span",{class:"text-red-500"},"*")],-1)),i(e("textarea",{"onUpdate:modelValue":t[8]||(t[8]=s=>o.value.address=s),rows:"3",placeholder:"Enter complete address with landmarks",required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.address]])]),e("div",null,[t[29]||(t[29]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("Country "),e("span",{class:"text-red-500"},"*")],-1)),i(e("select",{"onUpdate:modelValue":t[9]||(t[9]=s=>o.value.country=s),onChange:X,required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},[t[28]||(t[28]=e("option",{value:"",disabled:""},"Select Country",-1)),(p(!0),g(P,null,V(m.value,s=>(p(),g("option",{key:s.name,value:s.name},h(s.label||s.name),9,Q))),128))],544),[[k,o.value.country]])]),e("div",null,[t[31]||(t[31]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("State "),e("span",{class:"text-red-500"},"*")],-1)),i(e("select",{"onUpdate:modelValue":t[10]||(t[10]=s=>o.value.state=s),onChange:N,required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},[t[30]||(t[30]=e("option",{value:"",disabled:""},"Select State",-1)),(p(!0),g(P,null,V(f.value,s=>(p(),g("option",{key:s.name,value:s.name},h(s.state_name||s.name),9,W))),128))],544),[[k,o.value.state]])]),e("div",null,[t[33]||(t[33]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("City "),e("span",{class:"text-red-500"},"*")],-1)),i(e("select",{"onUpdate:modelValue":t[11]||(t[11]=s=>o.value.city=s),required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},[t[32]||(t[32]=e("option",{value:"",disabled:""},"Select City",-1)),(p(!0),g(P,null,V(M.value,s=>(p(),g("option",{key:s.name,value:s.name},h(s.district_name||s.name),9,Z))),128))],512),[[k,o.value.city]])]),e("div",null,[t[34]||(t[34]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("Pincode "),e("span",{class:"text-red-500"},"*")],-1)),i(e("input",{"onUpdate:modelValue":t[12]||(t[12]=s=>o.value.pincode=s),type:"text",placeholder:"Enter PIN code",required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.pincode]])])])]),e("div",ee,[t[39]||(t[39]=e("h2",{class:"text-xl font-semibold text-indigo-800 mb-4 flex items-center"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})]),r(" Organization Details ")],-1)),e("div",te,[e("div",null,[t[36]||(t[36]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("Number of Employees "),e("span",{class:"text-red-500"},"*")],-1)),i(e("input",{"onUpdate:modelValue":t[13]||(t[13]=s=>o.value.number_of_employees=s),type:"number",min:"1",required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.number_of_employees]])]),e("div",null,[t[38]||(t[38]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("Clear Vision "),e("span",{class:"text-red-500"},"*")],-1)),i(e("select",{"onUpdate:modelValue":t[14]||(t[14]=s=>o.value.clear_vision=s),required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},t[37]||(t[37]=[e("option",{value:"Yes"},"Yes",-1),e("option",{value:"No"},"No",-1)]),512),[[k,o.value.clear_vision]])])])]),e("div",oe,[t[42]||(t[42]=e("h2",{class:"text-xl font-semibold text-indigo-800 mb-4 flex items-center"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})]),r(" Volunteering Program Details ")],-1)),e("div",se,[e("div",null,[t[40]||(t[40]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("Volunteering CSR Activities Cost (%) "),e("span",{class:"text-red-500"},"*")],-1)),i(e("input",{"onUpdate:modelValue":t[15]||(t[15]=s=>o.value.volunteering_csr_activities=s),type:"number",min:"0",max:"100",required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.volunteering_csr_activities]])]),e("div",null,[t[41]||(t[41]=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},[r("Employee Engagement Coverage (%) "),e("span",{class:"text-red-500"},"*")],-1)),i(e("input",{"onUpdate:modelValue":t[16]||(t[16]=s=>o.value.employee_engagement=s),type:"number",min:"0",max:"100",required:"",class:"w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"},null,512),[[d,o.value.employee_engagement]])])])]),e("div",re,[e("button",{type:"submit",class:"w-[600px] flex justify-center mx-auto items-center text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-md transition duration-300 transform hover:-translate-y-1",disabled:n.value,style:{background:"#FF5722"}},h(n.value?"Registering...":"Register Company"),9,le)])],34)])]))}},ue=F(ae,[["__scopeId","data-v-cf87ca30"]]);export{ue as default};
