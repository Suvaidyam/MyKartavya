var Z=(w,p,v)=>new Promise((r,g)=>{var A=d=>{try{h(v.next(d))}catch(n){g(n)}},k=d=>{try{h(v.throw(d))}catch(n){g(n)}},h=d=>d.done?r(d.value):Promise.resolve(d.value).then(A,k);h((v=v.apply(w,p)).next())});import{_ as L,r as u,k as Y,c as i,d as e,m as y,g as K,f as x,u as f,F as j,h as z,n as B,p as W,t as m,e as U,q as _,v as D,i as F,s as G,b as o,o as X,l as H,A as q,B as $}from"./index-B8k8yuhv.js";import{c as N,S as ee,F as te,T as se,L as ae,M as oe}from"./twitter-Ct29UZn3.js";import{C as le}from"./Card-DDeLYPK1.js";const ie="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD4SURBVHgBvZThEYIwDIWDxwBsICOwgSuwAXUCzwl0AzqCToIbyAZ0A9ggpmd6xFpr+0Pf3bsmtP1o2gLAP4SILflArjmvyCeyghxZAHnCVQN55ti2VSrIrqDHuPookMuaME93WfZG8Gp2jhpyFYItkKYreS9yE4JtIQFUFIWidhQv372MoLq7hP258NgG15N16iTM79S8uSkgq1nClOzA5z2rGPgNZKX8UrXonBwwAXQOHcBNxDV5INvVNS6GsIwLSg8AISB8BgFE7tkYAMZABsTK3sQbrzEujZkfu/xLDP7hhOaVoYd0yxeacOQyNec2bm1ZlBv4tR6cZ+qoej++mwAAAABJRU5ErkJggg==",ne="data:image/png;base64,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",re="/assets/mykartavya/frontend/assets/karmapoint-D6K2DexK.png";/**
 * @license lucide-vue-next v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=N("CheckIcon",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce=N("RefreshCwIcon",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]),ue={class:"bg-white rounded-lg"},pe={class:"bg-white p-6 rounded-lg w-full relative"},me={class:"flex justify-between items-center mb-4"},ve={class:"relative border-gray-300 pl-6"},ge={key:1,src:ie,alt:"",class:"w-4 h-4"},fe={class:"text-sm font-semibold text-gray-900 m-4"},he={class:"text-lg font-semibold m-4"},be={class:"text-gray-600 text-sm ml-4 mt-0"},ye=["onClick"],xe=["onClick"],we={key:0,class:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"},Ae={class:"w-[384px] h-[296px] bg-white rounded-[12px] flex flex-col justify-end items-center py-[20px] gap-[21px] font-poppins"},ke={key:1,class:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"},Se={class:"bg-white rounded-lg shadow-lg w-full max-w-md"},Ce={class:"flex justify-between items-center border-b p-4"},Ie={class:"p-4"},Be={class:"flex justify-center gap-6 my-3"},je=["onClick"],ze={key:2,class:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"},Ve={class:"bg-white rounded-lg shadow-lg p-6 w-[500px]"},Ee={class:"flex justify-between items-center border-b pb-2 mb-4"},_e={class:"mb-4"},De={class:"flex gap-2"},Ue={class:"flex gap-2 items-center"},Fe={class:"flex gap-2 items-center"},Me={class:"mb-4"},Re={class:"flex items-center gap-2"},Qe={class:"h-8 w-16 flex items-center justify-center border rounded-sm text-base font-normal text-center"},Te={class:"mb-4"},Ze={class:"border-dashed border-2 border-gray-300 p-6 rounded-lg text-center relative"},He={class:"flex gap-2 mt-3"},Ke=["src"],Le={key:3,class:"fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"},We={class:"bg-white p-6 rounded-lg shadow-lg"},Ge={class:"flex justify-end mt-4"},Ne={__name:"Stepper",props:{activity:{type:Object,required:!1,default:()=>({})}},setup(w){const p=u(0),v=u(!1),r=u(!1),g=u(!1),A=u(!1),k=F("call"),h=F("auth"),d=G();let n=w;const l=u([{title:"Activity Approval",description:"Is your application to volunteer for the activity approved?",button:"Request for Approval",completed:!1},{title:"Get Started",description:"Click the button below once you are ready to start the activity",button:"Start Activity",completed:!1},{title:"Activity Report",description:"Click the button below once you have finished the activity & submit a small report",button:"Submit Report",completed:!1},{title:"Feedback & Karma Points",description:"Click the button to register the feedback & collect your karma points",button:"Submit Feedback",completed:!1}]),S=a=>Z(this,null,function*(){if(a===0)if(yield k("mykartavya.controllers.api.act_now",{activity:d.params.name,volunteer:h.cookie.user_id}))n.activity.workflow_state="Applied",l.value[a].completed=!0,p.value++;else return;a===3&&(v.value=!0,console.log("object",l.value[3].completed)),a===2?g.value=!0:a===p.value&&(l.value[a].completed=!0,p.value++)}),b=()=>{g.value=!1,l.value[2].completed=!0,p.value++;let a={hours:C.value,minutes:I.value,progress:V.value,images:R.value};console.log(a)},M=()=>{v.value=!1,r.value=!0,l.value[3].completed=!0,console.log("object",Q,T.value)},O=()=>{l.value.forEach(a=>a.completed=!1),p.value=0},C=u(""),I=u(""),V=u(30),R=u([]),P=a=>{const t=a.target.files;for(let s of t){const c=new FileReader;c.onload=E=>{R.value.push(E.target.result)},c.readAsDataURL(s)}},J=u([{icon:"😞",label:"Bad"},{icon:"😐",label:"Neutral"},{icon:"😊",label:"Good"},{icon:"🙂",label:"Great"}]),Q=u(null),T=u("");return Y(()=>n.activity,(a,t)=>{a.is_assigned&&(a.workflow_state=="Applied"?(l.value[0].completed=!0,p.value++):a.workflow_state=="Approved"&&a.com_percent!=100?(l.value[0].completed=!0,l.value[1].completed=!0,p.value=2):a.com_percent==100&&(l.value[0].completed=!0,l.value[1].completed=!0,l.value[2].completed=!0,p.value=3))}),(a,t)=>(o(),i("div",null,[e("div",ue,[e("div",pe,[e("div",me,[t[11]||(t[11]=e("h2",{class:"text-heading4 font-medium"},"Timeline",-1)),e("button",{onClick:O,class:"text-pink-500 flex items-center text-bodyh2 font-normal px-4 py-1 rounded-sm border"},[t[10]||(t[10]=K(" Refresh ")),x(f(ce),{class:"w-4 h-4 ml-1"})])]),e("div",ve,[(o(!0),i(j,null,z(l.value,(s,c)=>(o(),i("div",{key:c,class:"mb-6 relative border-l"},[e("div",{class:B(["absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center",s.completed?"bg-green-500 text-white":"bg-orange-500 text-white "])},[s.completed?(o(),W(f(de),{key:0,class:"w-4 h-4"})):(o(),i("img",ge))],2),e("div",{class:B(c>p.value?"blur-sm opacity-50 pointer-events-none ":"")},[e("p",fe," STEP "+m(c+1),1),e("h3",he,m(s.title),1),e("p",be,m(s.description),1),!s.completed&&!(s.title=="Get Started"&&w.activity.workflow_state=="Applied")?(o(),i("button",{key:0,onClick:E=>S(c),class:B(["mt-2 h-[28px] w-[147px] rounded-sm text-caption font-medium text-white ml-2",(c===l.value.length-1,"bg-orange-500")])},m(s.button),11,ye)):y("",!0),!s.completed&&s.title=="Get Started"&&w.activity.workflow_state=="Applied"?(o(),i("button",{key:1,disabled:"",onClick:E=>S(c),class:B(["mt-2 h-[28px] cursor-not-allowed w-[147px] rounded-sm text-caption font-medium text-white ml-2",(c===l.value.length-1,"bg-orange-500")])}," Pending by Admin ",10,xe)):y("",!0)],2)]))),128))]),r.value?(o(),i("div",we,[e("div",Ae,[t[12]||(t[12]=U('<div data-v-f953dea9><div class="flex justify-center relative pb-6" data-v-f953dea9><img src="'+ne+'" alt="" data-v-f953dea9><div class="flex justify-center absolute bottom-1.5" data-v-f953dea9><img src="'+re+'" alt="" data-v-f953dea9></div></div><h2 class="font-[500] text-[#0B0B0B] text-[23px]" data-v-f953dea9> You’ve earn 50 karma points </h2></div>',1)),e("button",{onClick:t[0]||(t[0]=s=>r.value=!1),class:"py-[10.5px] px-[22px] rounded-[4px] text-[14px] border border-[#FF5722] text-[#666666]"}," View Certificate ")])])):y("",!0),v.value?(o(),i("div",ke,[e("div",Se,[e("div",Ce,[t[13]||(t[13]=e("h2",{class:"text-lg font-semibold"},"Share Feedback",-1)),e("button",{onClick:t[1]||(t[1]=s=>{(v.value=!1)(l.value[3].completed=!1)}),class:"text-gray-500 hover:text-gray-700 text-xl"}," × ")]),e("div",Ie,[t[14]||(t[14]=e("label",{class:"block font-medium mb-2 text-gray-700"},"How would you rate your experience with the activity?",-1)),e("div",Be,[(o(!0),i(j,null,z(J.value,(s,c)=>(o(),i("button",{key:c,onClick:E=>Q.value=s,class:B(["text-3xl focus:outline-none transition duration-200",Q.value===s?"text-orange-500":"text-gray-400 opacity-30"])},m(s.icon),11,je))),128))]),t[15]||(t[15]=e("label",{class:"block font-medium mb-2 text-gray-700"},"Comments (Optional)",-1)),_(e("textarea",{"onUpdate:modelValue":t[2]||(t[2]=s=>T.value=s),class:"w-full border rounded p-2 h-20 resize-none"},null,512),[[D,T.value]])]),e("div",{class:"p-4"},[e("button",{onClick:M,class:"w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600"}," SUBMIT FEEDBACK ")])])])):y("",!0),g.value?(o(),i("div",ze,[e("div",Ve,[e("div",Ee,[t[16]||(t[16]=e("h2",{class:"text-lg font-semibold"},"Activity Completion",-1)),e("button",{onClick:t[3]||(t[3]=s=>g.value=!1),class:"text-gray-500 hover:text-gray-700"}," × ")]),e("div",_e,[t[19]||(t[19]=e("label",{class:"block font-medium mb-1"},"How much time you donated while working on the activity?",-1)),e("div",De,[e("div",Ue,[t[17]||(t[17]=e("label",{for:"",class:"text-base font-normal"},"Hours",-1)),_(e("input",{type:"number","onUpdate:modelValue":t[4]||(t[4]=s=>C.value=s),class:"w-24 border rounded px-2 h-8",onInput:t[5]||(t[5]=s=>C.value=Math.max(0,C.value))},null,544),[[D,C.value]])]),e("div",Fe,[t[18]||(t[18]=e("label",{for:"",class:"text-base font-normal"},"Minutes",-1)),_(e("input",{type:"number","onUpdate:modelValue":t[6]||(t[6]=s=>I.value=s),onInput:t[7]||(t[7]=s=>I.value=Math.max(0,I.value)),class:"w-24 border rounded px-2 h-8"},null,544),[[D,I.value]])])])]),e("div",Me,[t[20]||(t[20]=e("label",{class:"block text-lg font-normal mb-1"},"How much percent work has completed?",-1)),e("div",Re,[_(e("input",{type:"range",min:"0",max:"100","onUpdate:modelValue":t[8]||(t[8]=s=>V.value=s),class:"w-full h-[6px] accent-green-500"},null,512),[[D,V.value]]),e("span",Qe,m(V.value)+"%",1)])]),e("div",Te,[t[22]||(t[22]=e("label",{class:"block font-medium mb-2"},"Upload Media",-1)),e("div",Ze,[e("input",{type:"file",multiple:"",onChange:P,class:"absolute inset-0 w-full h-full opacity-0 cursor-pointer"},null,32),t[21]||(t[21]=U('<div class="flex flex-col items-center text-gray-500" data-v-f953dea9><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10" data-v-f953dea9><path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V3m0 0l-3.5 3.5M12 3l3.5 3.5" data-v-f953dea9></path><path stroke-linecap="round" stroke-linejoin="round" d="M6 14.25v4.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-4.5" data-v-f953dea9></path></svg><p class="mt-2" data-v-f953dea9> Drag &amp; drop files or <span class="text-orange-500 cursor-pointer" data-v-f953dea9>Browse</span></p><p class="text-sm" data-v-f953dea9>Supported formats: JPEG, PNG</p></div>',1))]),e("div",He,[(o(!0),i(j,null,z(R.value,(s,c)=>(o(),i("img",{key:c,src:s,class:"w-16 h-16 rounded object-cover"},null,8,Ke))),128))])]),e("div",{class:"flex justify-end"},[e("button",{onClick:b,class:"bg-orange-500 text-white h-[38px] text-base w-48 rounded-sm text-center font-medium hover:bg-orange-600"}," MARK AS COMPLETE ")])])])):y("",!0),A.value?(o(),i("div",Le,[e("div",We,[t[23]||(t[23]=e("h3",{class:"text-lg font-semibold mb-4"}," Submit Your Activity Report ",-1)),t[24]||(t[24]=K(" feedbackPointsPopup ")),t[25]||(t[25]=e("p",{class:"text-gray-600"}," Please upload a summary of your activity. ",-1)),t[26]||(t[26]=e("textarea",{class:"border rounded w-full p-2 mt-2",rows:"4",placeholder:"Write your report here..."},null,-1)),e("div",Ge,[e("button",{onClick:t[9]||(t[9]=(...s)=>a.submitFeedback&&a.submitFeedback(...s)),class:"px-4 py-2 bg-orange-500 text-white rounded"}," Submit ")])])])):y("",!0)])])]))}},Oe=L(Ne,[["__scopeId","data-v-f953dea9"]]),Pe={class:"h-screen w-full"},Je={key:0,class:"w-full h-[456px] md:h-[456px] back-img flex items-center mt-10 px-4 md:px-20"},Ye={class:"max-w-sm w-[448px] h-[312px] bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-4 justify-center"},Xe={class:"border-b pb-2"},qe={class:"text-heading3 font-normal font-poppins mt-1"},$e={class:"flex gap-1",style:{color:"#666666"}},et={class:"flex items-center text-bodyh2 font-normal mr-4",style:{color:"#0b0b0b"}},tt={class:"flex items-center text-gray-600 text-bodyh2 font-normal justify-between border-b pb-2"},st={class:"flex justify-center gap-1",style:{color:"#0b0b0b"}},at={class:"flex items-center gap-2 justify-center",style:{color:"#0b0b0b"}},ot={class:"text-bodyh2 font-normal"},lt={class:""},it={class:"w-full bg-gray-200 rounded-full h-[5px]"},nt={class:"text-caption font-normal mt-1",style:{color:"#0b0b0b"}},rt={class:"w-full bg-gray-700"},dt={class:"p-6 md:p-10 bg-gray-100"},ct={class:"grid gap-6 lg:grid-cols-3"},ut={class:"lg:col-span-2"},pt={class:"flex items-center gap-[12px] flex-col justify-self-start mt-[220px]"},mt={class:"text-gray-700 font-medium flex items-center space-x-2"},vt={class:"flex items-center gap-3 justify-start w-[230px]"},gt=["aria-label"],ft={class:"mt-10"},ht={class:"mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center"},bt={__name:"Empower",setup(w){const p=[{name:"Facebook",svg:te},{name:"X",svg:se},{name:"LinkedIn",svg:ae},{name:"WhatsApp",svg:oe}],v=F("call"),r=u([]),g=G(),A=F("formatDate"),k=()=>Z(this,null,function*(){try{const d=yield v("mykartavya.controllers.api.activity_details",{name:g.params.name});r.value=d}catch(d){console.error("Error fetching activity data:",d)}}),h=[{name:"ACT-Bright Bites-0001",status:"Draft",need_certificate:"Yes",title:"Bright Bites",activity_description:`<div class="ql-editor read-mode"><p><span style="background-color: rgb(248, 248, 248); font-size: 12px; color: rgb(102, 102, 102);">This Women's Entrepreneurship Day, let's empower underserved women running small business...</span></p></div>`,activity_image:"/files/1.png",activity_published_date_starts:1,publish_date:"2025-02-25 17:44:38",start_date:"2025-02-25 17:44:38",end_date:"2025-02-27 17:43:21",company:"Suvaidyam",contribution_type:"User Input",karma_points:40,hours:2,max_hours:2,sdgs:"Clean Water and Sanitation",volunteers:'[{"name": "USER-25-0005", "full_name": "Rahul Sah", "email": "rahul.sah@gmail.com", "user_image": null},{"name": "USER-25-0004", "full_name": "Rahul Sah", "email": "rkrahul00011@gmail.com", "user_image": null}]'}];return X(k),(d,n)=>{var l,S;return o(),i("div",Pe,[e("section",null,[r.value?(o(),i("div",Je,[e("div",Ye,[e("div",Xe,[e("h2",qe,m(r.value.title),1),n[0]||(n[0]=e("span",{class:"text-secondary font-medium text-caption"},"Online",-1))]),e("div",$e,[x(f(H),{name:"calendar",class:"size-4 text-[#666666]"}),e("span",et,m(f(A)(r.value.start_date))+" - "+m(f(A)(r.value.end_date)),1)]),e("div",tt,[e("span",st,[x(f(H),{name:"clock",class:"size-4 text-[#666666]"}),K(" "+m(r.value.hours)+" hr ",1)]),e("span",at,[x(f(H),{name:"database",class:"size-4 text-secondary"}),e("span",ot,m(r.value.karma_points),1)])]),n[1]||(n[1]=e("div",{class:"flex space-x-2 border-b pb-2"},[e("img",{src:"https://s3-alpha-sig.figma.com/img/898b/9a5c/5eac9b190fb13207adabb3086b70731b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=k0HgHMabVhEH5zXQfC7Y-T3VRTGLkbVh3CF-7U3dLsdJKHJn7LY~3g9fVJt6~MzCFuUan1rOU2ScbHhIcSVzRW326B-RGG3SjtQdGg0FR4L6Ib8VHyVQlRnXtA025TCVDifmrnVqQBJCTDxZiWdT2V8hGl8PGBpps1vlIWariZI7Dt2zRrxnHRYNwMUmTbGJS-Dt3egr13OP5smtgglO2PTc6oVst4kc2wykva2uIhlrpdQ~xug9VtkmweOtDhz4k10Db65Oc7UqmnlWhy4xNMSDmjk2zjKfTcjsidzI36OwHf-MHhwjz-weJyChhP5CTRiHn3WASMcQqlp35DsgDA__",class:"w-10 h-10",alt:"Goal 10"}),e("img",{src:"https://s3-alpha-sig.figma.com/img/77ec/4184/a463a59fc378c1ee77d824caf08528b3?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j90JYppUcg2cLQ1-BOIm50A5DQ0mJ~82F7-ukZPIPc7CbhyAPySKPqfz~xshvTL2sSPZXiKq6zqifAp94u8GazYKe6Gz2VO1QjoD5EjW7kHNTsLuw1vM7B0we8dv5mUbFgSK9fJ8-D231cnJuBegTC7yzmw-6Ju-5PUkWjkv7RV6MbxTsVyIsgxxKlaTRid21s1LzA6Jgg4fZrSLvzfpbIbWwwateY3jDQM6DEZ7qS9D3JxkXoZ0RkGDVxcZBCiKADeY9GOQnsjR~RmeiVHFsllKCL2c-0fkcSYz9Wv6UhsMXUKiQ6bxiA1EFWnnuyewI1V4rzd-6q8ly~PwfM3Y0Q__",class:"w-10 h-10",alt:"Goal 11"})],-1)),e("div",lt,[e("div",it,[e("div",{class:"bg-green-500 h-[5px] rounded-full",style:q(`width:${(l=r.value.com_percent)!=null?l:0}%`)},null,4)]),e("p",nt,m((S=r.value.com_percent)!=null?S:0)+" % completed ",1)])])])):y("",!0)]),e("section",rt,[e("div",dt,[e("div",ct,[e("div",ut,[n[3]||(n[3]=U('<p class="mb-4 text-bodyh2 font-normal text-justify" style="color:#666666;" data-v-ae2c7a1e><span class="text-[47px] text-black" data-v-ae2c7a1e>T</span>his Women&#39;s Entrepreneurship Day, let&#39;s empower underserved women running small businesses or working in our communities by sharing positive reviews of their businesses on our social media platforms. By highlighting their names and services, we can increase their visibility, boost their confidence, and foster growth.This small act of kindness can have a significant impact, bringing hope and faith to these women as they navigate their entrepreneurial journeys. Together, we can create a supportive network that uplifts and inspires! </p><h2 class="text-heading4 font-medium mt-6" style="color:#0b0b0b;" data-v-ae2c7a1e> Volunteer Role </h2><p class="mt-2 text-bodyh2 font-normal text-justify" style="color:#666666;" data-v-ae2c7a1e> Volunteers are encouraged to identify a small business or an underserved woman in their community and capture a photo or video showcasing her work. Along with the visual, write a positive review that highlights her efforts and talents on your social media platforms. This simple gesture can significantly boost her business, while also encouraging her personally and fostering self-confidence.By sharing these stories, we not only promote their work but also inspire others to recognize the value of supporting women entrepreneurs. Let&#39;s come together to uplift and empower these remarkable women, helping them shine in their communities! </p><div class="mt-4" data-v-ae2c7a1e><p class="text-[14px] font-poppins font-normal leading-[23.8px] tracking-[0.0025em] text-[#666666] text-justify" style="word-spacing:16px;" data-v-ae2c7a1e> Share your experience along with pictures on your social media handles and tag us on social media using <span class="text-secondary hover:cursor-pointer" data-v-ae2c7a1e>@MyKaratvaya @NASSCOMfdn</span></p><p class="mt-2 text-bodyh2 font-normal font-poppins" style="color:#666666;" data-v-ae2c7a1e> Use hashtag #MyKartavya #DoGoodFeelGood #LittleActMatters #womenempowerment#letsgrowtogether </p></div>',4)),e("div",pt,[e("span",mt,[x(f(ee),{class:"w-4 h-4 text-[#666666]"}),n[2]||(n[2]=e("span",{class:"text-bodyh1 font-medium font-poppins",style:{color:"#0b0b0b"}},"Share activity with others",-1))]),e("div",vt,[(o(),i(j,null,z(p,b=>e("button",{key:b.name,"aria-label":b.name,class:"p-1.5 bg-white rounded-full hover:bg-gray-300"},[(o(),W($(b.svg),{class:"w-5 h-5 text-gray-600"}))],8,gt)),64))])])]),e("div",null,[x(Oe,{activity:r.value},null,8,["activity"])])]),e("div",ft,[n[4]||(n[4]=U('<div class="flex justify-between" data-v-ae2c7a1e><h2 class="text-heading4 font-medium font-poppins" style="color:#0b0b0b;" data-v-ae2c7a1e> Related Opportunities </h2><div class="flex gap-3" data-v-ae2c7a1e><i class="fa-solid fa-less-than w-[7px] h-[12px] text-[#999999]" data-v-ae2c7a1e></i><i class="fa-solid fa-greater-than w-[7px] h-[12px] text-[#0B0B0B]" data-v-ae2c7a1e></i></div></div>',1)),e("div",ht,[(o(),i(j,null,z(h,(b,M)=>x(le,{key:M,item:b},null,8,["item"])),64))])])])])])}}},kt=L(bt,[["__scopeId","data-v-ae2c7a1e"]]);export{kt as default};
