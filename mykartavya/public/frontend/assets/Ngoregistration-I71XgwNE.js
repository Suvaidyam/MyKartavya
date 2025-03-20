var L=Object.defineProperty;var V=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var O=(b,s,i)=>s in b?L(b,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):b[s]=i,G=(b,s)=>{for(var i in s||(s={}))j.call(s,i)&&O(b,i,s[i]);if(V)for(var i of V(s))z.call(s,i)&&O(b,i,s[i]);return b};var y=(b,s,i)=>new Promise((t,d)=>{var g=m=>{try{x(i.next(m))}catch(w){d(w)}},h=m=>{try{x(i.throw(m))}catch(w){d(w)}},x=m=>m.done?t(m.value):Promise.resolve(m.value).then(g,h);x((i=i.apply(b,s)).next())});import{_ as H,r as v,l as R,o as T,c as p,a as o,n as W,z as $,m as q,t as _,s as r,f as n,v as u,ad as k,F as X,h as C,i as J,y as Y,j as c}from"./index-B4Hi1_eH.js";import{l as f}from"./index-CEYmIg3e.js";/* empty css              */const K={class:"max-w-[1920px] mx-auto px-10 pt-[82px] pb-4 bg-gray-50"},Q={class:"bg-white rounded-lg shadow mt-4"},Z={class:"p-6"},ee={key:0,class:"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative",role:"alert"},oe={class:"block sm:inline"},te={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},le=["value"],ae=["value"],re=["value"],ne=["value"],se={class:"md:col-span-2"},ie={class:"md:col-span-2"},de={class:"flex items-center px-4 py-3 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition"},ue={key:0,class:"py-3 flex px-4 border-2 border-dashed border-gray-300 rounded-lg justify-end"},ge={class:""},pe=["src"],ce={class:"mt-6"},be=["disabled"],me={__name:"Ngoregistration",setup(b){const s=J("call"),i=Y(),t=v({registration_type:"Self Registration",ngo_name:"",website:"",official_contact_number:"",email:"",designation:"",state:"",city:"",description:"",license_type:"FCRA",contact_person_name:"",ngo_head_name:"",ngo_head_email:"",ngo_head_mobile:"",ngo_head_office_number:"",area_of_work:"",address:"",pincode:"",registered_with_bigtech:"No",ngo_logo:null,country:"India"}),d=v(!1),g=v(null),h=v([]),x=v([]),m=v([]),w=v(["Education","Skills","Environment","Financial Inclusion","Accessibility and Inclusion","Disaster Management","Healthcare"]),S=()=>y(this,null,function*(){try{d.value=!0;const a=yield s("mykartavya.controllers.api.country_data");h.value=a||[]}catch(a){console.error("Error fetching countries:",a),g.value="Failed to load countries. Please try again."}finally{d.value=!1}}),U=()=>y(this,null,function*(){try{if(!t.value.country)return;d.value=!0;const a=yield s("mykartavya.controllers.api.state_data",{country:t.value.country});x.value=a||[],t.value.state="",t.value.city=""}catch(a){console.error("Error fetching states:",a),g.value="Failed to load states. Please try again."}finally{d.value=!1}}),E=()=>y(this,null,function*(){try{if(!t.value.state)return;d.value=!0;const a=yield s("mykartavya.controllers.api.city_data",{state:t.value.state});m.value=a||[],t.value.city=""}catch(a){console.error("Error fetching cities:",a),g.value="Failed to load cities. Please try again."}finally{d.value=!1}});R(()=>t.value.country,a=>{a&&U()}),R(()=>t.value.state,a=>{a&&E()}),T(()=>y(this,null,function*(){yield S(),t.value.country&&(yield U())}));const A=a=>y(this,null,function*(){const e=a.target.files[0];if(!e){f.error("Please select a file.");return}const l=["image/jpeg","image/png","image/webp"],N=5*1024*1024;if(!l.includes(e.type)){f.error("Invalid file type. Only JPG, PNG, and WEBP are allowed.");return}if(e.size>N){f.error("File size exceeds 5 MB limit.");return}const F=new FileReader;F.readAsDataURL(e),F.onload=()=>y(this,null,function*(){try{const P=F.result.split(",")[1];t.value.ngo_logo=P,f.success("Image uploaded successfully!")}catch(P){console.error("Error uploading file:",P),f.error("Failed to upload logo. Please try again.")}})}),B=()=>{t.value.ngo_logo=null,f.info("Image removed.")},M=()=>{const a=["ngo_name","email","official_contact_number","designation","country","state","city","description","contact_person_name","ngo_head_name","ngo_head_email","ngo_head_mobile","area_of_work","address","pincode"];for(const N of a)if(!t.value[N])return g.value=`Please fill in ${N.replace(/_/g," ")}.`,!1;const e=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;if(!e.test(t.value.email)||!e.test(t.value.ngo_head_email))return g.value="Please enter valid email addresses.",!1;const l=/^\d{10}$/;return!l.test(t.value.official_contact_number)||!l.test(t.value.ngo_head_mobile)||t.value.ngo_head_office_number&&!l.test(t.value.ngo_head_office_number)?(g.value="Please enter valid 10-digit phone numbers.",!1):/^\d{6}$/.test(t.value.pincode)?!0:(g.value="Please enter a valid 6-digit pincode.",!1)},D=()=>{t.value={registration_type:"Self Registration",ngo_name:"",website:"",official_contact_number:"",email:"",designation:"",state:"",city:"",description:"",license_type:"FCRA",contact_person_name:"",ngo_head_name:"",ngo_head_email:"",ngo_head_mobile:"",ngo_head_office_number:"",area_of_work:"",address:"",pincode:"",registered_with_bigtech:"No",ngo_logo:null,country:"India"}},I=()=>y(this,null,function*(){try{if(g.value=null,!M())return;if(!t.value.ngo_logo){f.error("NGO Logo is required before registration.");return}d.value=!0;const a=yield s("mykartavya.mykartavya.api.register_ngo",G({},t.value));a.status==="success"?(f.success("NGO Registration Successful! Check your email for login credentials.",{position:"top-right",autoClose:5e3,hideProgressBar:!1}),D(),setTimeout(()=>{i.push("/")},500)):f.error(a.message||"Failed to register NGO. Please try again.",{position:"top-right",autoClose:5e3,hideProgressBar:!1})}catch(a){console.error("Error submitting form:",a),f.error(a.message||"Failed to register NGO. Please try again.",{position:"top-right",autoClose:5e3,hideProgressBar:!1})}finally{d.value=!1}});return(a,e)=>(c(),p("div",K,[o("div",Q,[o("div",Z,[e[47]||(e[47]=o("h2",{class:"text-xl font-semibold text-gray-700 mb-4"},"NGO Registration",-1)),o("form",{onSubmit:$(I,["prevent"]),class:W(["space-y-8",{loading:d.value}])},[g.value?(c(),p("div",ee,[o("span",oe,_(g.value),1)])):q("",!0),o("div",te,[o("div",null,[e[19]||(e[19]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" NGO Name "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("input",{"onUpdate:modelValue":e[0]||(e[0]=l=>t.value.ngo_name=l),type:"text",placeholder:"Enter NGO Name",required:"",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.ngo_name]])]),o("div",null,[e[20]||(e[20]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" Website "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("input",{"onUpdate:modelValue":e[1]||(e[1]=l=>t.value.website=l),type:"url",placeholder:"https://example.org",required:"",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.website]])]),o("div",null,[e[21]||(e[21]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" Official Contact Number "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("input",{"onUpdate:modelValue":e[2]||(e[2]=l=>t.value.official_contact_number=l),type:"tel",placeholder:"+91 XXXXX XXXXX",required:"",maxlength:"10",pattern:"\\d{10}",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.official_contact_number]])]),o("div",null,[e[22]||(e[22]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" Email "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("input",{"onUpdate:modelValue":e[3]||(e[3]=l=>t.value.email=l),type:"email",placeholder:"ngo@example.com",required:"",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.email]])]),o("div",null,[e[23]||(e[23]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" Designation "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("input",{"onUpdate:modelValue":e[4]||(e[4]=l=>t.value.designation=l),type:"text",placeholder:"e.g., Director, Secretary",required:"",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.designation]])]),o("div",null,[e[25]||(e[25]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" License Type "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("select",{"onUpdate:modelValue":e[5]||(e[5]=l=>t.value.license_type=l),required:"",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},e[24]||(e[24]=[o("option",{value:"FCRA"},"FCRA",-1),o("option",{value:"12A"},"Non-FCRA",-1)]),512),[[k,t.value.license_type]])]),o("div",null,[e[27]||(e[27]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" Country "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("select",{"onUpdate:modelValue":e[6]||(e[6]=l=>t.value.country=l),class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},[e[26]||(e[26]=o("option",{value:"",disabled:""},"Select Country",-1)),(c(!0),p(X,null,C(h.value,l=>(c(),p("option",{key:l.name,value:l.name},_(l.label||l.name),9,le))),128))],512),[[k,t.value.country]])]),o("div",null,[e[29]||(e[29]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" State "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("select",{"onUpdate:modelValue":e[7]||(e[7]=l=>t.value.state=l),class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},[e[28]||(e[28]=o("option",{value:"",disabled:""},"Select State",-1)),(c(!0),p(X,null,C(x.value,l=>(c(),p("option",{key:l.name,value:l.name},_(l.state_name||l.name),9,ae))),128))],512),[[k,t.value.state]])]),o("div",null,[e[31]||(e[31]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" City "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("select",{"onUpdate:modelValue":e[8]||(e[8]=l=>t.value.city=l),class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},[e[30]||(e[30]=o("option",{value:"",disabled:""},"Select City",-1)),(c(!0),p(X,null,C(m.value,l=>(c(),p("option",{key:l.name,value:l.name},_(l.district_name||l.name),9,re))),128))],512),[[k,t.value.city]])]),o("div",null,[e[33]||(e[33]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" Area of Work "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("select",{"onUpdate:modelValue":e[9]||(e[9]=l=>t.value.area_of_work=l),class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},[e[32]||(e[32]=o("option",{value:"",disabled:""},"Select Area of Work",-1)),(c(!0),p(X,null,C(w.value,l=>(c(),p("option",{key:l,value:l},_(l),9,ne))),128))],512),[[k,t.value.area_of_work]])]),o("div",null,[e[34]||(e[34]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" Contact Person Name "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("input",{"onUpdate:modelValue":e[10]||(e[10]=l=>t.value.contact_person_name=l),type:"text",placeholder:"Full Name",required:"",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.contact_person_name]])]),o("div",null,[e[35]||(e[35]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" NGO Head Name "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("input",{"onUpdate:modelValue":e[11]||(e[11]=l=>t.value.ngo_head_name=l),type:"text",placeholder:"Full Name",required:"",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.ngo_head_name]])]),o("div",null,[e[36]||(e[36]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" NGO Head Email "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("input",{"onUpdate:modelValue":e[12]||(e[12]=l=>t.value.ngo_head_email=l),type:"email",placeholder:"head@example.com",required:"",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.ngo_head_email]])]),o("div",null,[e[37]||(e[37]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" NGO Head Mobile "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("input",{"onUpdate:modelValue":e[13]||(e[13]=l=>t.value.ngo_head_mobile=l),type:"tel",placeholder:"+91 XXXXX XXXXXr",required:"",maxlength:"10",pattern:"\\d{10}",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.ngo_head_mobile]])]),o("div",null,[e[38]||(e[38]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"}," NGO Head Office Number ",-1)),r(o("input",{"onUpdate:modelValue":e[14]||(e[14]=l=>t.value.ngo_head_office_number=l),type:"tel",placeholder:"+91 XXXXX XXXXXr",maxlength:"10",pattern:"\\d{10}",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.ngo_head_office_number]])]),o("div",null,[e[39]||(e[39]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" Postal Code "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("input",{"onUpdate:modelValue":e[15]||(e[15]=l=>t.value.pincode=l),type:"text",placeholder:"Enter PIN code",maxlength:"6",pattern:"\\d{6}",required:"",oninput:"this.value=this.value.replace(/[^0-9]/g,'').slice(0,6)",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.pincode]])]),o("div",se,[e[40]||(e[40]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" Address "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("textarea",{"onUpdate:modelValue":e[16]||(e[16]=l=>t.value.address=l),rows:"3",placeholder:"Enter address with landmarks",required:"",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.address]])]),o("div",ie,[e[41]||(e[41]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" Description "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("textarea",{"onUpdate:modelValue":e[17]||(e[17]=l=>t.value.description=l),rows:"4",placeholder:"Describe your NGO's mission and activities",required:"",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},null,512),[[u,t.value.description]])]),o("div",null,[e[43]||(e[43]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"},[n(" Registered with BigTech "),o("span",{class:"text-red-500 pt-2"},"*")],-1)),r(o("select",{"onUpdate:modelValue":e[18]||(e[18]=l=>t.value.registered_with_bigtech=l),required:"",class:"block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"},e[42]||(e[42]=[o("option",{value:"Yes"},"Yes",-1),o("option",{value:"No"},"No",-1)]),512),[[k,t.value.registered_with_bigtech]])]),o("div",null,[e[46]||(e[46]=o("label",{class:"block text-bodyh1 font-normal text-gray-700 mb-1"}," NGO Logo ",-1)),o("label",de,[e[44]||(e[44]=o("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 text-indigo-500 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})],-1)),e[45]||(e[45]=o("span",{class:"text-sm text-gray-600"},"Upload NGO Logo (PNG, JPG up to 2MB)",-1)),o("input",{type:"file",class:"hidden",onChange:A,accept:"image/*"},null,32)]),t.value.ngo_logo?(c(),p("div",ue,[o("div",ge,[o("img",{src:"data:image/png;base64,"+t.value.ngo_logo,alt:"Preview",class:"w-32 h-32 object-cover rounded-lg border border-gray-300"},null,8,pe),o("button",{onClick:B,class:"mt-2 px-8 py-1 text-white bg-red-500 rounded-lg text-sm hover:bg-red-600 transition"}," Remove ")])])):q("",!0)])]),o("div",ce,[o("button",{type:"submit",class:"bg-orange-500 text-white font-semibold py-2 px-4 rounded-sm hover:bg-orange-600 transition",disabled:d.value},_(d.value?"Registering...":"Register NGO"),9,be)])],34)])])]))}},_e=H(me,[["__scopeId","data-v-35ee4b70"]]);export{_e as default};
