var F=(M,f,C)=>new Promise((k,i)=>{var $=g=>{try{c(C.next(g))}catch(L){i(L)}},A=g=>{try{c(C.throw(g))}catch(L){i(L)}},c=g=>g.done?k(g.value):Promise.resolve(g.value).then($,A);c((C=C.apply(M,f)).next())});import{i as H,r as u,l as z,p as Z,j as o,w as X,a as e,c as l,f as G,u as w,g as U,t as v,b as B,_ as ee,m as p,F as D,h as N,n as I,v as Y,x as W,e as te,A as se,s as K,o as J,k as ae,C as le,z as re,E as ie}from"./index-vnxk1rEP.js";import{l as E}from"./index-QRYEKIkq.js";/* empty css              */import{D as ne}from"./Dialog-Kftj5QIl.js";import{c as oe,F as ce,T as de,L as ue,M as me,S as pe}from"./twitter-kXQofbf_.js";import{_ as ve,C as fe}from"./NotFound-HlmDokf1.js";const ge="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD4SURBVHgBvZThEYIwDIWDxwBsICOwgSuwAXUCzwl0AzqCToIbyAZ0A9ggpmd6xFpr+0Pf3bsmtP1o2gLAP4SILflArjmvyCeyghxZAHnCVQN55ti2VSrIrqDHuPookMuaME93WfZG8Gp2jhpyFYItkKYreS9yE4JtIQFUFIWidhQv372MoLq7hP258NgG15N16iTM79S8uSkgq1nClOzA5z2rGPgNZKX8UrXonBwwAXQOHcBNxDV5INvVNS6GsIwLSg8AISB8BgFE7tkYAMZABsTK3sQbrzEujZkfu/xLDP7hhOaVoYd0yxeacOQyNec2bm1ZlBv4tR6cZ+qoej++mwAAAABJRU5ErkJggg==",he="/assets/mykartavya/frontend/assets/certificate-DlJf-9iL.png";/**
 * @license lucide-vue-next v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=oe("CheckIcon",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=oe("RefreshCwIcon",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]),we={class:"flex items-center gap-2"},Ce={class:"flex justify-end gap-3"},xe=["disabled"],_e={key:1,class:"size-4 border-2 border-white border-t-transparent rounded-full animate-spin"},ke={__name:"ReqForApproval",props:{modelValue:{type:Boolean,required:!0}},emits:["update:modelValue"],setup(M,{emit:f}){const C=M,k=f,i=H("auth"),$=H("call"),A=u(C.modelValue),c=u(!1);z(()=>C.modelValue,x=>{A.value=x}),z(()=>A.value,x=>{k("update:modelValue",x)});const g=()=>{A.value=!1},L=()=>F(this,null,function*(){try{c.value=!0;const x=yield $("mykartavya.controllers.api.notify_admin_approval",{volunteer:i.cookie.user_id});if(x.status==="success")E.success("Admin has been notified about your approval request",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0}),g();else throw new Error(x.message||"Failed to notify admin")}catch(x){E.error(x.message||"Something went wrong",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0})}finally{c.value=!1}});return(x,h)=>(o(),Z(w(ne),{modelValue:A.value,"onUpdate:modelValue":h[0]||(h[0]=m=>A.value=m)},{"body-title":X(()=>[e("div",we,[B(w(U),{name:"alert-circle",class:"text-orange-500 size-5"}),h[1]||(h[1]=e("h3",{class:"text-lg font-medium"},"Account Status",-1))])]),"body-content":X(()=>h[2]||(h[2]=[e("div",{class:"py-4"},[e("div",{class:"flex items-center gap-2 mb-3"},[e("span",{class:"bg-[#f4d6cd] px-3 py-1.5 rounded text-sm font-medium text-[#FF5722]"}," Pending by Admin ")]),e("p",{class:"text-gray-600 text-sm"}," Your account is currently pending approval from the administrator. You'll be notified once your account is approved. ")],-1)])),actions:X(()=>[e("div",Ce,[e("button",{onClick:g,class:"px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"}," Close "),e("button",{onClick:L,disabled:c.value,class:"px-4 py-2 rounded-md bg-[#FF5722] text-white text-sm font-medium hover:bg-[#FF5722]/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"},[c.value?(o(),l("div",_e)):(o(),Z(w(U),{key:0,name:"bell",class:"size-4"})),G(" "+v(c.value?"Notifying...":"Notify Admin"),1)],8,xe)])]),_:1},8,["modelValue"]))}},Ae={class:"bg-white rounded-lg"},Le={class:"bg-white p-6 rounded-lg w-full relative"},$e={class:"flex justify-between items-center mb-4"},Me={class:"relative border-gray-300 pl-3"},Se={key:1},Fe={key:0,class:"w-4 h-4 flex items-center justify-center"},Be={key:1,class:"w-4 h-4 flex items-center justify-center"},je={key:2,class:"w-4 h-4 flex items-center justify-center"},He={key:3,class:"w-4 h-4 flex items-center justify-center"},Re=["onClick"],Ee={class:"text-[19px] font-medium px-6 py-2"},Ie={class:"text-gray-600 text-xs font-normal ml-6 mt-0"},Ue=["onClick"],Oe=["onClick"],Pe=["onClick"],Ve={key:0,class:"fixed inset-0 flex items-center justify-center z-[100]"},ze={key:1,class:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"},Te={class:"bg-white rounded-lg shadow-lg w-full max-w-md"},Ze={class:"flex justify-between items-center border-b p-4"},De={class:"p-4"},Ne={class:"flex justify-center gap-6 my-3"},qe=["onClick"],Ge={key:2,class:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"},Ye={class:"bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center"},We={class:"mb-6"},Ke={class:"text-gray-600"},Qe={class:"flex justify-center"},Xe=["disabled"],Je={key:0,class:"w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"},et={key:3,class:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"},tt={class:"bg-white rounded-lg shadow-lg p-6 w-[500px]"},st={class:"flex justify-between items-center border-b pb-2 mb-4"},ot={class:"mb-6"},at={class:"relative"},lt={class:"flex gap-2"},rt={class:"flex gap-2 items-center relative"},it={class:"flex gap-2 items-center relative"},nt={key:0,class:"text-red-500 absolute text-xs -bottom-5"},ct={class:"mb-4 relative"},dt={class:"flex items-center gap-2"},ut={class:"h-8 w-16 flex items-center justify-center border rounded-sm text-base font-normal text-center"},mt={key:0,class:"text-red-500 absolute text-xs -bottom-2"},pt={class:"mb-4 relative"},vt={class:"border-dashed border-2 border-gray-300 p-6 rounded-lg text-center relative"},ft={key:0,class:"text-red-500 absolute text-xs -bottom-2"},gt={class:"flex gap-2 mt-3"},ht=["src"],bt={class:"flex justify-end"},yt={key:0,class:"h-5 w-5"},wt={__name:"Stepper",props:{activity:{type:Object,required:!1,default:()=>({})}},setup(M){const f=u(0),C=u(!1),k=u(!1),i=u(!1),$=u(!1),A=u(!1),c=H("call"),g=H("auth"),L=H("store");H("socket");const x=se(),h=u({rating:null,comments:""});let m=M;const d=u({hours:0,minutes:0,progress:0}),j=u({time:!1,progress:!1,image:!1}),O=u([]),T=u(!1);u(!1);const b=u([{title:"Activity Approval",description:"Is your application to volunteer for the activity approved?",button:"Request for Approval",completed:!1},{title:"Get Started",description:"Click the button below once you are ready to start the activity",button:"Start Activity",completed:!1},{title:"Activity Report",description:"Click the button below once you have finished the activity & submit a small report",button:"Submit Report",completed:!1},{title:"Feedback & Karma Points",description:"Click the button to register the feedback & collect your karma points",button:"Submit Feedback",completed:!1}]),P=a=>F(this,null,function*(){if(a>f.value){$.value=!0;return}try{if(a==0){let t=yield c("mykartavya.controllers.api.act_now",{activity:x.params.name,volunteer:g.cookie.user_id});if(t&&t.status==200)m.activity.workflow_state="Applied",b.value[a].completed=!0,f.value++;else if(t&&t.status==201){A.value=!0;return}else if(t&&t.status==400)E.error(t.msg||"Something went wrong",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0});else{E.error("Something went wrong",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0});return}}a==3&&(C.value=!0),a==2&&(i.value=!0)}catch(t){console.error(t),E.error("Something went wrong",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0})}}),Q=()=>{let a=!1;return j.value={time:!1,progress:!1,image:!1},d.value.hours===0&&d.value.minutes===0&&(j.value.time=!0,a=!0),d.value.progress==m.activity.com_percent&&(j.value.progress=!0,a=!0),O.value.length===0&&m.activity.require_feedback_images&&(j.value.image=!0,a=!0),a},r=()=>F(this,null,function*(){if(!Q()){i.value=!1,T.value=!0,m.activity.completion_wf_state=="Submitted"&&(b.value[2].completed=!0,f.value++);try{let a=yield c("mykartavya.controllers.api.submit_activity_report",{name:m.activity.name,data:{duration:d.value.hours*3600+d.value.minutes*60,percent:d.value.progress-m.activity.com_percent,images:O.value}});a&&(d.value.progress=a.com_percent,E.success("Activity report submitted successfully",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0}),T.value=!1,d.value={hours:0,minutes:0,progress:0},L.refresh_step=!0)}catch(a){T.value=!1,E.error("Something went wrong",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0})}}}),n=()=>F(this,null,function*(){(yield c("mykartavya.controllers.api.submit_feedback",{name:m.activity.name,volunteer:g.cookie.user_id,rating:h.value.rating,comments:h.value.comments})).rating&&(C.value=!1,k.value=!0,b.value[3].completed=!0,m.activity.need_certificate!=="Yes"&&setTimeout(()=>{k.value=!1},3e3))}),_=u(!1),S=()=>F(this,null,function*(){_.value=!0,(yield c("mykartavya.controllers.api.view_certificate",{activity:m.activity.activity}))&&(_.value=!1,E.success("Certificate visible in your profile after few minutes",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0}),k.value=!1,setTimeout(()=>{k.value=!1,router.push("/profile")},3e3))}),R=a=>{const t=a.target.files;if(t.length)for(let s of t){const y=new FileReader;y.onload=q=>{O.value.push({file:s,preview:y.result})},y.readAsDataURL(s)}},V=u([{icon:"😞",label:.2},{icon:"😐",label:.4},{icon:"😊",label:.6},{icon:"🙂",label:.8},{icon:"🙂",label:1}]);return z(()=>m.activity,(a,t)=>{a.com_percent&&(d.value.progress=a.com_percent),a.is_assigned&&(a.workflow_state=="Applied"?(b.value[0].completed=!0,f.value=1):a.workflow_state=="Approved"&&a.completion_wf_state=="Pending"?(b.value[0].completed=!0,b.value[1].completed=!0,f.value=2):a.workflow_state=="Approved"&&["Submitted","Approved"].includes(a.completion_wf_state)&&!(a.rating!=null&&a.rating!=0)?(b.value[0].completed=!0,a.completion_wf_state=="Submitted"?(b.value[1].completed=!0,f.value=2):(b.value[1].completed=!0,b.value[2].completed=!0,f.value=3)):a.rating!=null&&a.rating!=0&&a.completion_wf_state=="Approved"&&(b.value[0].completed=!0,b.value[1].completed=!0,b.value[2].completed=!0,b.value[3].completed=!0,f.value=4))},{immediate:!0,deep:!0}),z(()=>d.value.progress,(a,t)=>{m.activity.com_percent<=a||(d.value.progress=m.activity.com_percent)}),z(()=>k,a=>{a&&m.activity.need_certificate==="No"&&setTimeout(()=>{k.value=!1},3e3)}),(a,t)=>(o(),l("div",null,[e("div",Ae,[e("div",Le,[e("div",$e,[t[12]||(t[12]=e("h2",{class:"text-heading4 font-medium"},"Timeline",-1)),e("button",{onClick:t[0]||(t[0]=s=>w(L).refresh_step=!0),class:"text-pink-500 flex items-center text-base font-normal w-[107px] justify-center h-8 rounded-sm border refresh-button"},[t[11]||(t[11]=G(" Refresh ")),B(w(ye),{class:"w-4 h-4 ml-1"})])]),e("div",Me,[(o(!0),l(D,null,N(b.value,(s,y)=>(o(),l("div",{key:y,class:"mb-6 relative"},[e("div",{class:I(["absolute left-0 top-0 h-full w-[1px]",[s.completed?"bg-[#22C55E]":"bg-[#E5E7EB]",y>f.value?"blur-sm opacity-50":""]])},null,2),e("div",{class:I(["absolute -left-4 w-7 h-7 min-w-7 max-h-7 rounded-full flex items-center justify-center",[s.completed?"border-green-500 bg-white border-2 text-green-600":"bg-[#FF5722] text-white",y>f.value?"blur-sm opacity-50":""]])},[s.completed?(o(),Z(w(be),{key:0,class:"w-4 h-4"})):(o(),l("div",Se,[s.title=="Activity Approval"?(o(),l("div",Fe,t[13]||(t[13]=[e("img",{src:ge,alt:"",class:"w-4 h-4"},null,-1)]))):p("",!0),s.title=="Get Started"?(o(),l("div",Be,t[14]||(t[14]=[e("svg",{width:"19",height:"19",viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M12.4688 10.292C12.4688 10.1345 12.4062 9.9835 12.2948 9.87215C12.1835 9.7608 12.0325 9.69824 11.875 9.69824H7.125C6.96753 9.69824 6.81651 9.7608 6.70516 9.87215C6.59381 9.9835 6.53125 10.1345 6.53125 10.292C6.53125 10.4495 6.59381 10.6005 6.70516 10.7118C6.81651 10.8232 6.96753 10.8857 7.125 10.8857H11.875C12.0325 10.8857 12.1835 10.8232 12.2948 10.7118C12.4062 10.6005 12.4688 10.4495 12.4688 10.292ZM12.4688 13.4587C12.4688 13.3012 12.4062 13.1502 12.2948 13.0388C12.1835 12.9275 12.0325 12.8649 11.875 12.8649H7.125C6.96753 12.8649 6.81651 12.9275 6.70516 13.0388C6.59381 13.1502 6.53125 13.3012 6.53125 13.4587C6.53125 13.6161 6.59381 13.7672 6.70516 13.8785C6.81651 13.9899 6.96753 14.0524 7.125 14.0524H11.875C12.0325 14.0524 12.1835 13.9899 12.2948 13.8785C12.4062 13.7672 12.4688 13.6161 12.4688 13.4587Z",fill:"white"}),e("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.54183 1.78125C4.96443 1.78125 4.41068 2.01062 4.0024 2.4189C3.59412 2.82719 3.36475 3.38093 3.36475 3.95833V15.0417C3.36475 15.6191 3.59412 16.1728 4.0024 16.5811C4.41068 16.9894 4.96443 17.2188 5.54183 17.2188H13.4585C14.0359 17.2188 14.5896 16.9894 14.9979 16.5811C15.4062 16.1728 15.6356 15.6191 15.6356 15.0417V6.308C15.6356 6.00637 15.5374 5.71346 15.3553 5.47279L12.9819 2.33146C12.8528 2.16055 12.6858 2.02192 12.494 1.92645C12.3022 1.83098 12.091 1.78128 11.8767 1.78125H5.54183ZM4.55225 3.95833C4.55225 3.41208 4.99558 2.96875 5.54183 2.96875H11.2814V6.44971C11.2814 6.77746 11.5474 7.04346 11.8752 7.04346H14.4481V15.0417C14.4481 15.5879 14.0047 16.0312 13.4585 16.0312H5.54183C4.99558 16.0312 4.55225 15.5879 4.55225 15.0417V3.95833Z",fill:"white"})],-1)]))):p("",!0),s.title=="Activity Report"?(o(),l("div",je,t[15]||(t[15]=[e("svg",{width:"19",height:"19",viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M14.3927 6.36444L14.7592 5.9971C15.0511 5.70515 15.4469 5.54109 15.8598 5.54102C16.2726 5.54094 16.6685 5.70486 16.9605 5.99671C17.2524 6.28856 17.4165 6.68443 17.4165 7.09724C17.4166 7.51005 17.2527 7.90598 16.9608 8.19794L16.5943 8.56527M14.3927 6.36444C14.3927 6.36444 14.4386 7.14344 15.1266 7.83139C15.8145 8.51935 16.5943 8.56527 16.5943 8.56527M14.3927 6.36444L11.0202 9.73694C10.7906 9.96494 10.6766 10.0797 10.5784 10.2056C10.4623 10.3544 10.3636 10.5144 10.2823 10.6854C10.2135 10.8294 10.1628 10.9822 10.0607 11.2886L9.73372 12.2703L9.62764 12.5877M16.5943 8.56527L13.2218 11.9378C12.9922 12.1674 12.8782 12.2814 12.7523 12.3795C12.6035 12.4956 12.4436 12.5943 12.2726 12.6756C12.1285 12.7445 11.9757 12.7951 11.6693 12.8973L10.6877 13.2242L10.3702 13.3303M9.62764 12.5877L9.52235 12.906C9.49782 12.9798 9.49433 13.0591 9.51226 13.1348C9.53019 13.2106 9.56883 13.2798 9.62387 13.3349C9.67891 13.3899 9.74817 13.4286 9.82391 13.4465C9.89966 13.4644 9.97889 13.4609 10.0528 13.4364L10.3702 13.3303M9.62764 12.5877L10.3702 13.3303",stroke:"white"}),e("path",{d:"M6.33333 10.2913H8.3125M6.33333 7.12467H11.4792M6.33333 13.458H7.52083M15.6972 2.51084C14.7701 1.58301 13.277 1.58301 10.2917 1.58301H8.70833C5.72296 1.58301 4.22987 1.58301 3.30283 2.51084C2.37579 3.43867 2.375 4.93097 2.375 7.91634V11.083C2.375 14.0684 2.375 15.5615 3.30283 16.4885C4.23067 17.4155 5.72296 17.4163 8.70833 17.4163H10.2917C13.277 17.4163 14.7701 17.4163 15.6972 16.4885C16.4445 15.742 16.5894 14.6297 16.6179 12.6663",stroke:"white","stroke-linecap":"round"})],-1)]))):p("",!0),s.title=="Feedback & Karma Points"?(o(),l("div",He,t[16]||(t[16]=[e("svg",{width:"19",height:"19",viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M6.21125 6.98373C6.54929 6.17069 7.70037 6.17069 8.03842 6.98373L8.9995 9.29461L11.494 9.49411C12.3712 9.56536 12.7275 10.6594 12.0585 11.2318L10.1585 12.8603L10.7388 15.2947C10.943 16.1504 10.012 16.8273 9.26075 16.3689L7.12483 15.0643L4.98892 16.3689C4.23762 16.8281 3.30662 16.1504 3.51087 15.2947L4.09117 12.8603L2.19117 11.2318C1.52221 10.6594 1.87846 9.56457 2.75562 9.49411L5.24937 9.29461L6.21125 6.98373ZM7.12483 7.87911L6.29992 9.86223C6.23004 10.0303 6.11518 10.1758 5.96797 10.2828C5.82076 10.3897 5.64689 10.4541 5.4655 10.4687L3.32483 10.6397L4.95567 12.0369C5.2375 12.2784 5.361 12.6576 5.27471 13.0186L4.77596 15.107L6.60866 13.9876C6.76407 13.8926 6.94268 13.8423 7.12483 13.8423C7.30698 13.8423 7.48559 13.8926 7.641 13.9876L9.47371 15.107L8.97496 13.0186C8.93265 12.8415 8.94005 12.6561 8.99635 12.4829C9.05264 12.3097 9.15564 12.1554 9.294 12.0369L10.9248 10.6397L8.78417 10.4687C8.60277 10.4541 8.42891 10.3897 8.2817 10.2828C8.13449 10.1758 8.01963 10.0303 7.94975 9.86223L7.12483 7.87911ZM10.3525 2.30973C10.6224 1.65978 11.5439 1.65978 11.8139 2.30973L12.1939 3.22173L13.1779 3.3009C13.8793 3.35632 14.1643 4.23269 13.6292 4.69107L12.8795 5.33311L13.109 6.29419C13.2721 6.97898 12.5272 7.52048 11.9263 7.15315L11.0832 6.63857L10.24 7.15315C9.63917 7.52048 8.89421 6.97898 9.05729 6.29419L9.28687 5.33311L8.53717 4.69107C8.002 4.23269 8.28621 3.35711 8.98842 3.30011L9.97325 3.22094L10.3525 2.30973ZM11.4624 3.52573L11.0832 2.61373L10.7032 3.52573C10.6474 3.66005 10.5556 3.7764 10.438 3.86201C10.3204 3.94762 10.1816 3.99918 10.0366 4.01103L9.05175 4.09019L9.80146 4.73144C9.91223 4.82613 9.99472 4.94955 10.0398 5.08812C10.085 5.22669 10.091 5.37502 10.0572 5.51678L9.82758 6.47786L10.6707 5.96328C10.7949 5.88746 10.9376 5.84734 11.0832 5.84734C11.2287 5.84734 11.3714 5.88746 11.4956 5.96328L12.3387 6.47786L12.1092 5.51678C12.0755 5.37514 12.0816 5.22697 12.1267 5.08856C12.1718 4.95014 12.2542 4.82685 12.3649 4.73223L13.1146 4.0894L12.1305 4.01023C11.9854 3.99874 11.8462 3.94742 11.7283 3.86195C11.6104 3.77647 11.5184 3.66013 11.4624 3.52573ZM14.6829 7.89257C14.7147 7.82435 14.7654 7.76663 14.8289 7.7262C14.8925 7.68576 14.9662 7.66428 15.0415 7.66428C15.1168 7.66428 15.1905 7.68576 15.2541 7.7262C15.3176 7.76663 15.3683 7.82435 15.4001 7.89257L15.7366 8.61298C15.7757 8.69726 15.8433 8.76508 15.9274 8.80457L16.6478 9.14103C16.716 9.1729 16.7737 9.22357 16.8142 9.28709C16.8546 9.35061 16.8761 9.42435 16.8761 9.49965C16.8761 9.57495 16.8546 9.64869 16.8142 9.71221C16.7737 9.77573 16.716 9.8264 16.6478 9.85828L15.9274 10.1947C15.8434 10.234 15.7759 10.3015 15.7366 10.3855L15.4001 11.1059C15.3683 11.1742 15.3176 11.2319 15.2541 11.2723C15.1905 11.3128 15.1168 11.3342 15.0415 11.3342C14.9662 11.3342 14.8925 11.3128 14.8289 11.2723C14.7654 11.2319 14.7147 11.1742 14.6829 11.1059L14.3464 10.3855C14.3071 10.3015 14.2396 10.234 14.1556 10.1947L13.4352 9.85828C13.367 9.8264 13.3093 9.77573 13.2688 9.71221C13.2284 9.64869 13.2069 9.57495 13.2069 9.49965C13.2069 9.42435 13.2284 9.35061 13.2688 9.28709C13.3093 9.22357 13.367 9.1729 13.4352 9.14103L14.1556 8.80457C14.2396 8.76528 14.3071 8.69775 14.3464 8.61378L14.6829 7.89257Z",fill:"white"})],-1)]))):p("",!0)]))],2),e("div",{class:I(y>f.value?"blur-sm opacity-50 pointer-events-auto relative":"relative"),onClick:q=>y>f.value&&($.value=!0)},[e("p",{class:I(["text-[10px] font-normal px-6",s.completed?"text-[#FF5722]":"text-[#999999]"])}," STEP "+v(y+1),3),e("h3",Ee,v(s.title),1),e("p",Ie,v(s.description),1),!s.completed&&!(["Get Started","Activity Report"].includes(s.title)&&(M.activity.workflow_state=="Applied"||M.activity.completion_wf_state=="Submitted"))?(o(),l("button",{key:0,onClick:q=>P(y),class:"mt-3 h-[28px] px-3 uppercase rounded-sm text-caption font-medium text-white ml-6 bg-[#FF5722] button-animation"},v(s.button),9,Ue)):p("",!0),!s.completed&&["Get Started"].includes(s.title)&&["Applied"].includes(M.activity.workflow_state)?(o(),l("button",{key:1,disabled:"",onClick:q=>P(y),class:"mt-3 h-[28px] uppercase cursor-not-allowed px-3 rounded-sm text-caption font-medium text-white ml-6 bg-[#FF5722] button-animation"},v(s.title=="Get Started"?"Pending by Admin":"Review under Admin"),9,Oe)):p("",!0),!s.completed&&["Activity Report"].includes(s.title)&&["Approved"].includes(M.activity.workflow_state)&&M.activity.completion_wf_state=="Submitted"?(o(),l("button",{key:2,disabled:"",onClick:q=>P(y),class:"mt-2 h-[28px] uppercase cursor-not-allowed px-3 rounded-sm text-caption font-medium text-white ml-2 bg-[#FF5722] button-animation"},v(s.title=="Get Started"?"Pending by Admin":"Review under Admin"),9,Pe)):p("",!0)],10,Re)]))),128))]),$.value?(o(),l("div",Ve,[e("div",{class:"fixed inset-0 bg-black/50",onClick:t[1]||(t[1]=s=>$.value=!1)}),t[17]||(t[17]=e("div",{class:"bg-white rounded-lg p-4 relative z-[101] flex items-center gap-3 shadow-lg max-w-md mx-4"},[e("img",{src:"",alt:"chat star",class:"w-6 h-6"}),e("p",{class:"text-base text-[#111111] font-normal"},"Finish the current step to move forward!")],-1))])):p("",!0),C.value?(o(),l("div",ze,[e("div",Te,[e("div",Ze,[t[18]||(t[18]=e("h2",{class:"text-lg font-semibold"},"Share Feedback",-1)),e("button",{onClick:t[2]||(t[2]=s=>C.value=!1),class:"text-gray-500 hover:text-gray-700 text-xl button-animation"}," × ")]),e("div",De,[t[19]||(t[19]=e("label",{class:"block font-normal text-lg mb-2 text-[#0B0B0B]"},"How would you rate your experience with the activity?",-1)),e("div",Ne,[(o(!0),l(D,null,N(V.value,(s,y)=>(o(),l("button",{key:y,onClick:q=>h.value.rating=s.label,class:I(["text-3xl focus:outline-none transition duration-200",h.value.rating===s.label?"text-orange-500":"text-gray-400 opacity-30"])},v(s.icon),11,qe))),128))]),t[20]||(t[20]=e("label",{class:"block font-normal text-lg mb-2 text-[#0B0B0B]"},"Comments (Optional)",-1)),Y(e("textarea",{"onUpdate:modelValue":t[3]||(t[3]=s=>h.value.comments=s),class:"w-full border rounded p-2 h-20 resize-none"},null,512),[[W,h.value.comments]])]),e("div",{class:"p-4"},[e("button",{onClick:n,class:"w-full bg-[#FF5722] text-white py-2 rounded font-semibold hover:bg-orange-600 button-animation"}," SUBMIT FEEDBACK ")])])])):p("",!0),k.value?(o(),l("div",Ge,[e("div",Ye,[e("div",We,[t[21]||(t[21]=e("div",{class:"w-48 h-36 mx-auto text-[#FF5722]"},[e("img",{src:he,alt:"karma points"})],-1)),t[22]||(t[22]=e("h2",{class:"text-2xl font-semibold mb-2"},"Congratulations!",-1)),e("p",Ke,"You've earned "+v(w(m).activity.karma_points)+" karma points",1)]),e("div",Qe,[w(m).activity.need_certificate==="Yes"?(o(),l("button",{key:0,onClick:S,class:"bg-[#FF5722] text-white py-2 px-6 rounded font-semibold hover:bg-orange-600 flex items-center gap-2 button-animation",disabled:_.value},[_.value?(o(),l("span",Je)):p("",!0),G(" "+v(_.value?"GENERATING...":"VIEW CERTIFICATE"),1)],8,Xe)):p("",!0)])])])):p("",!0),i.value?(o(),l("div",et,[e("div",tt,[e("div",st,[t[23]||(t[23]=e("h2",{class:"text-lg font-semibold"},"Activity Completion",-1)),e("button",{onClick:t[4]||(t[4]=s=>i.value=!1),class:"text-gray-500 hover:text-gray-700 button-animation"}," × ")]),e("div",ot,[t[26]||(t[26]=e("label",{class:"block font-normal text-lg text-[#0B0B0B] pb-3"},"How much time you donated while working on the activity?",-1)),e("div",at,[e("div",lt,[e("div",rt,[t[24]||(t[24]=e("label",{class:"text-base font-normal"},"Hours",-1)),Y(e("input",{type:"number","onUpdate:modelValue":t[5]||(t[5]=s=>d.value.hours=s),class:"w-24 border rounded-sm px-2 h-8",onInput:t[6]||(t[6]=s=>d.value.hours=Math.max(0,d.value.hours))},null,544),[[W,d.value.hours]]),B(w(U),{class:"absolute right-2 top-2 size-4",name:"clock"})]),e("div",it,[t[25]||(t[25]=e("label",{class:"text-base font-normal"},"Minutes",-1)),Y(e("input",{type:"number","onUpdate:modelValue":t[7]||(t[7]=s=>d.value.minutes=s),onInput:t[8]||(t[8]=s=>d.value.minutes=Math.max(0,d.value.minutes)),class:"w-24 border rounded-sm px-2 h-8"},null,544),[[W,d.value.minutes]]),B(w(U),{class:"absolute right-2 top-2 size-4",name:"clock"})])]),j.value.time?(o(),l("p",nt,"Donation time cannot be 0. ")):p("",!0)])]),e("div",ct,[t[27]||(t[27]=e("label",{class:"block text-lg font-normal mb-1"},"How much percent work has completed?",-1)),e("div",dt,[Y(e("input",{type:"range",min:"0",max:"100","onUpdate:modelValue":t[9]||(t[9]=s=>d.value.progress=s),class:"w-full h-[6px] accent-green-500"},null,512),[[W,d.value.progress]]),e("span",ut,v(d.value.progress)+"% ",1)]),j.value.progress?(o(),l("p",mt," Please update the current progress before proceeding. ")):p("",!0)]),e("div",pt,[t[29]||(t[29]=e("label",{class:"block font-medium mb-2"},"Upload Media",-1)),e("div",vt,[e("input",{type:"file",multiple:"",onChange:R,class:"absolute inset-0 w-full h-full opacity-0 cursor-pointer"},null,32),t[28]||(t[28]=te('<div class="flex flex-col items-center text-gray-500" data-v-5c9f769e><svg width="70" height="60" viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5c9f769e></svg><p class="mt-2 text-lg font-normal" data-v-5c9f769e> Drag &amp; drop files or <span class="text-[#FF5722] cursor-pointer" data-v-5c9f769e>Browse</span></p><p class="text-xs font-normal pt-2 text-[#999999]" data-v-5c9f769e>Supported formats: JPEG, PNG</p></div>',1))]),j.value.image?(o(),l("p",ft," Image upload is required. Please upload an image to continue. ")):p("",!0),e("div",gt,[(o(!0),l(D,null,N(O.value,(s,y)=>(o(),l("img",{key:y,src:s.preview,alt:"img",class:"w-16 h-16 rounded object-cover"},null,8,ht))),128))])]),e("div",bt,[e("button",{onClick:r,class:"bg-[#FF5722] flex items-center justify-center text-white h-[38px] text-base w-48 rounded-sm text-center font-medium hover:bg-orange-600 button-animation"},[t[31]||(t[31]=e("p",null,"MARK AS COMPLETE",-1)),T.value?(o(),l("div",yt,t[30]||(t[30]=[e("div",{class:"animate-spin h-full w-full rounded-full border-[2px] flex justify-center items-center border-dotted border-[#fff]"},[e("div",{class:"w-3 h-3 rounded-full border-dashed border-[1px] border-[#fff]"})],-1)]))):p("",!0)])])])])):p("",!0),B(ke,{modelValue:A.value,"onUpdate:modelValue":t[10]||(t[10]=s=>A.value=s)},null,8,["modelValue"])])])]))}},Ct=ee(wt,[["__scopeId","data-v-5c9f769e"]]),xt={class:"h-screen w-full"},_t={key:0,class:"w-full mt-16 bg-yellow-50 border-b border-yellow-200"},kt={key:0,class:"w-full relative h-[456px] md:h-[456px] back-img flex items-center mt-[60px]"},At=["src"],Lt={class:"absolute top-20 left-5 sm:left-10 max-w-sm w-[448px] h-[312px] bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-4 justify-center"},$t={class:"border-b pb-2"},Mt={class:"text-heading3 font-normal font-poppins mt-1"},St={class:"text-secondary font-medium text-caption"},Ft={class:"flex gap-1 items-center",style:{color:"#666666"}},Bt={class:"flex items-center text-bodyh2 font-normal mr-4",style:{color:"#0b0b0b"}},jt={class:"flex items-center text-gray-600 text-bodyh2 font-normal justify-between border-b pb-2"},Ht={class:"flex justify-center items-center gap-1",style:{color:"#0b0b0b"}},Rt={class:"flex items-center gap-2 justify-center",style:{color:"#0b0b0b"}},Et={class:"text-bodyh2 font-normal"},It={class:"flex space-x-2 border-b pb-2"},Ut=["src"],Ot={key:1,class:"w-8 h-8 flex items-center justify-center bg-gray-50"},Pt={class:""},Vt={class:"w-full bg-gray-200 rounded-full h-[5px]"},zt={class:"flex items-center justify-between gap-2"},Tt={class:"text-caption font-normal mt-1",style:{color:"#0b0b0b"}},Zt={class:"flex items-center gap-2 text-xs font-normal"},Dt={class:"w-full bg-gray-700"},Nt={class:"p-6 md:p-10 bg-gray-100"},qt={class:"grid gap-6 lg:grid-cols-3"},Gt={class:"lg:col-span-2 flex flex-col justify-between items-start"},Yt=["innerHTML"],Wt={class:"flex items-center gap-[12px] flex-col justify-self-start mt-[220px]"},Kt={class:"text-gray-700 font-medium flex items-center space-x-2"},Qt={class:"flex items-center gap-3 justify-start w-[230px]"},Xt=["aria-label","onClick"],Jt={class:"mt-10"},e1={class:"flex justify-between"},t1={class:"flex items-center"},s1={key:0,class:"flex items-center gap-4"},o1={key:1,class:"w-full h-[330px]"},a1=320,l1={__name:"Empower",setup(M){const f=[{name:"Facebook",svg:ce,shareUrl:K(()=>{var r;return`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent((r=i.value)==null?void 0:r.title)}`})},{name:"X",svg:de,shareUrl:K(()=>{var _,S;const r=`Check out ${(_=i.value)==null?void 0:_.title}`,n=(S=i.value)!=null&&S.sdgs?JSON.parse(i.value.sdgs).map(R=>{var V;return(V=R.sdgs_name)==null?void 0:V.replace(/\s+/g,"")}).join(","):"";return`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(r)}&hashtags=${n}`})},{name:"LinkedIn",svg:ue,shareUrl:K(()=>`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`)},{name:"WhatsApp",svg:me,shareUrl:K(()=>{var n;const r=`${(n=i.value)==null?void 0:n.title}
${window.location.href}`;return`https://wa.me/?text=${encodeURIComponent(r)}`})}],C=H("call"),k=H("store"),i=u([]),$=se(),A=H("formatDate"),c=u(null),g=u(!0),L=u(!1),x=u(!1),h=()=>F(this,null,function*(){try{const r=yield C("mykartavya.controllers.api.activity_details",{name:$.params.name});r&&(i.value=r)}catch(r){console.error("Error fetching activity data:",r)}}),m=u([]),d=()=>F(this,null,function*(){try{const r=yield C("mykartavya.controllers.api.related_opportunities",{name:$.params.name,sdgs:i.value.sdgs});r&&(m.value=r)}catch(r){console.error("Error fetching activity data:",r)}}),j=()=>F(this,null,function*(){var r;try{const n=yield C("mykartavya.controllers.api.sva_user_data");n&&n.length>0&&(x.value=((r=n[0])==null?void 0:r.workflow_state)==="Approved")}catch(n){console.error("Error checking user approval status:",n)}});J(()=>F(this,null,function*(){yield j(),yield h(),yield d()})),z(()=>k.refresh_step,r=>{r&&(h(),k.refresh_step=!1)},{immediate:!0,deep:!0}),z(()=>$.params.name,(r,n)=>F(this,null,function*(){r!=n&&(yield h(),yield d())}),{immediate:!0,deep:!0});const O=a1,T=()=>{c.value&&c.value.scrollTo({left:Math.max(0,c.value.scrollLeft-O),behavior:"smooth"})},b=()=>{if(c.value){const r=c.value.scrollWidth-c.value.clientWidth;c.value.scrollTo({left:Math.min(r,c.value.scrollLeft+O),behavior:"smooth"})}},P=()=>{if(!c.value)return;const{scrollLeft:r,scrollWidth:n,clientWidth:_}=c.value;g.value=r<=0;const S=n>_;L.value=!S||r+_>=n};ae(()=>{c.value&&(c.value.addEventListener("scroll",P),P())}),J(()=>{const r=new ResizeObserver(()=>{P()});c.value&&r.observe(c.value),le(()=>{r.disconnect()})}),window.addEventListener("resize",()=>{});const Q=r=>{const S=(window.innerWidth-600)/2,R=(window.innerHeight-400)/2;window.open(r.shareUrl.value,"social-share",`width=600,height=400,left=${S},top=${R}`)};return(r,n)=>{var _,S,R,V,a;return o(),l("div",xt,[x.value?p("",!0):(o(),l("div",_t,n[2]||(n[2]=[te('<div class="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8" data-v-898ce6a5><div class="flex items-center justify-between flex-wrap" data-v-898ce6a5><div class="w-0 flex-1 flex items-center" data-v-898ce6a5><span class="flex p-2 rounded-lg bg-yellow-100" data-v-898ce6a5><svg class="h-6 w-6 text-yellow-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-898ce6a5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-898ce6a5></path></svg></span><p class="ml-3 font-medium text-yellow-800" data-v-898ce6a5><span class="md:hidden" data-v-898ce6a5>Your account is pending approval</span><span class="hidden md:inline" data-v-898ce6a5>Your account is currently pending approval. Some features may be limited until your account is approved.</span></p></div><div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto" data-v-898ce6a5><a href="/profile" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-700 bg-yellow-100 hover:bg-yellow-200" data-v-898ce6a5> View Profile </a></div></div></div>',1)]))),e("section",{class:I({"mt-[52px]":!x.value})},[i.value?(o(),l("div",kt,[e("img",{src:i.value.activity_image,class:"w-full h-full",alt:""},null,8,At),e("div",Lt,[e("div",$t,[e("h2",Mt,v(i.value.title),1),e("span",St,v(i.value.activity_type),1)]),e("div",Ft,[n[3]||(n[3]=e("svg",{width:"16",height:"15",viewBox:"0 0 16 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M1.33331 7.00033C1.33331 4.48633 1.33331 3.22899 2.11465 2.44833C2.89598 1.66766 4.15265 1.66699 6.66665 1.66699H9.33331C11.8473 1.66699 13.1046 1.66699 13.8853 2.44833C14.666 3.22966 14.6666 4.48633 14.6666 7.00033V8.33366C14.6666 10.8477 14.6666 12.105 13.8853 12.8857C13.104 13.6663 11.8473 13.667 9.33331 13.667H6.66665C4.15265 13.667 2.89531 13.667 2.11465 12.8857C1.33398 12.1043 1.33331 10.8477 1.33331 8.33366V7.00033Z",stroke:"#666666","stroke-width":"0.75"}),e("path",{d:"M4.66666 1.66699V0.666992M11.3333 1.66699V0.666992M1.66666 5.00033H14.3333",stroke:"#666666","stroke-width":"0.75","stroke-linecap":"round"}),e("path",{d:"M12 10.3333C12 10.5101 11.9298 10.6797 11.8047 10.8047C11.6797 10.9298 11.5101 11 11.3333 11C11.1565 11 10.987 10.9298 10.8619 10.8047C10.7369 10.6797 10.6667 10.5101 10.6667 10.3333C10.6667 10.1565 10.7369 9.98695 10.8619 9.86193C10.987 9.7369 11.1565 9.66667 11.3333 9.66667C11.5101 9.66667 11.6797 9.7369 11.8047 9.86193C11.9298 9.98695 12 10.1565 12 10.3333ZM12 7.66667C12 7.84348 11.9298 8.01305 11.8047 8.13807C11.6797 8.2631 11.5101 8.33333 11.3333 8.33333C11.1565 8.33333 10.987 8.2631 10.8619 8.13807C10.7369 8.01305 10.6667 7.84348 10.6667 7.66667C10.6667 7.48986 10.7369 7.32029 10.8619 7.19526C10.987 7.07024 11.1565 7 11.3333 7C11.5101 7 11.6797 7.07024 11.8047 7.19526C11.9298 7.32029 12 7.48986 12 7.66667ZM8.66667 10.3333C8.66667 10.5101 8.59643 10.6797 8.4714 10.8047C8.34638 10.9298 8.17681 11 8 11C7.82319 11 7.65362 10.9298 7.5286 10.8047C7.40357 10.6797 7.33333 10.5101 7.33333 10.3333C7.33333 10.1565 7.40357 9.98695 7.5286 9.86193C7.65362 9.7369 7.82319 9.66667 8 9.66667C8.17681 9.66667 8.34638 9.7369 8.4714 9.86193C8.59643 9.98695 8.66667 10.1565 8.66667 10.3333ZM8.66667 7.66667C8.66667 7.84348 8.59643 8.01305 8.4714 8.13807C8.34638 8.2631 8.17681 8.33333 8 8.33333C7.82319 8.33333 7.65362 8.2631 7.5286 8.13807C7.40357 8.01305 7.33333 7.84348 7.33333 7.66667C7.33333 7.48986 7.40357 7.32029 7.5286 7.19526C7.65362 7.07024 7.82319 7 8 7C8.17681 7 8.34638 7.07024 8.4714 7.19526C8.59643 7.32029 8.66667 7.48986 8.66667 7.66667ZM5.33333 10.3333C5.33333 10.5101 5.2631 10.6797 5.13807 10.8047C5.01305 10.9298 4.84348 11 4.66667 11C4.48986 11 4.32029 10.9298 4.19526 10.8047C4.07024 10.6797 4 10.5101 4 10.3333C4 10.1565 4.07024 9.98695 4.19526 9.86193C4.32029 9.7369 4.48986 9.66667 4.66667 9.66667C4.84348 9.66667 5.01305 9.7369 5.13807 9.86193C5.2631 9.98695 5.33333 10.1565 5.33333 10.3333ZM5.33333 7.66667C5.33333 7.84348 5.2631 8.01305 5.13807 8.13807C5.01305 8.2631 4.84348 8.33333 4.66667 8.33333C4.48986 8.33333 4.32029 8.2631 4.19526 8.13807C4.07024 8.01305 4 7.84348 4 7.66667C4 7.48986 4.07024 7.32029 4.19526 7.19526C4.32029 7.07024 4.48986 7 4.66667 7C4.84348 7 5.01305 7.07024 5.13807 7.19526C5.2631 7.32029 5.33333 7.48986 5.33333 7.66667Z",fill:"#666666"})],-1)),e("span",Bt,v(w(A)(i.value.start_date))+" - "+v(w(A)(i.value.end_date)),1)]),e("div",jt,[e("span",Ht,[B(w(U),{name:"clock",class:"size-4 text-[#666666]"}),G(" "+v((_=i.value.hours)!=null?_:"0")+" hr ",1)]),e("span",Rt,[n[4]||(n[4]=e("svg",{width:"16",height:"14",viewBox:"0 0 16 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M15.5002 3.66602C15.5002 2.28518 12.8885 1.16602 9.66683 1.16602C6.44516 1.16602 3.8335 2.28518 3.8335 3.66602M15.5002 3.66602V6.99935C15.5002 7.84935 14.5118 8.59935 13.0002 9.05102C12.0552 9.33435 10.906 9.49935 9.66683 9.49935C8.42766 9.49935 7.2785 9.33352 6.3335 9.05102C4.82266 8.59935 3.8335 7.84935 3.8335 6.99935V3.66602M15.5002 3.66602C15.5002 4.51602 14.5118 5.26602 13.0002 5.71768C12.0552 6.00102 10.906 6.16602 9.66683 6.16602C8.42766 6.16602 7.2785 6.00018 6.3335 5.71768C4.82266 5.26602 3.8335 4.51602 3.8335 3.66602",stroke:"#FF5722","stroke-linecap":"round","stroke-linejoin":"round"}),e("path",{d:"M0.5 6.9994V10.3327C0.5 11.1827 1.48917 11.9327 3 12.3844C3.945 12.6677 5.09417 12.8327 6.33333 12.8327C7.5725 12.8327 8.72167 12.6669 9.66667 12.3844C11.1775 11.9327 12.1667 11.1827 12.1667 10.3327V9.4994M0.5 6.9994C0.5 6.0019 1.8625 5.14107 3.83333 4.74023M0.5 6.9994C0.5 7.8494 1.48917 8.5994 3 9.05107C3.945 9.3344 5.09417 9.4994 6.33333 9.4994C6.9125 9.4994 7.47167 9.46357 8 9.39607",stroke:"#FF5722","stroke-linecap":"round","stroke-linejoin":"round"})],-1)),e("span",Et,v((S=i.value.karma_points)==null?void 0:S.toLocaleString())+" Points",1)])]),e("div",It,[i.value.sdgs?(o(!0),l(D,{key:0},N(JSON.parse(i.value.sdgs),t=>{var s;return o(),l("div",null,[t.image?(o(),l("img",{key:0,src:t.image,class:"w-8 h-8"},null,8,Ut)):(o(),l("span",Ot,v((s=t.sdgs_name)==null?void 0:s.charAt(0)),1))])}),256)):p("",!0)]),e("div",Pt,[e("div",Vt,[e("div",{class:"bg-green-500 h-[5px] rounded-full",style:re(`width:${(R=i.value.com_percent)!=null?R:0}%`)},null,4)]),e("div",zt,[e("p",Tt,v((V=i.value.com_percent)!=null?V:0)+" % completed ",1),e("div",Zt,[B(w(U),{name:"clock",class:"size-4 text-[#666666]"}),G(" "+v(i.value.donet_hours?(i.value.donet_hours/60/60).toFixed(2):"0")+" hr ",1)])])])])])):p("",!0)],2),e("section",Dt,[e("div",Nt,[e("div",qt,[e("div",Gt,[e("div",{class:"text-[14px] text-[#666666] text-justify font-normal",innerHTML:i.value.activity_description},null,8,Yt),e("div",Wt,[e("span",Kt,[B(w(pe),{class:"w-4 h-4 text-[#666666]"}),n[5]||(n[5]=e("span",{class:"text-bodyh1 font-medium font-poppins",style:{color:"#0b0b0b"}},"Share activity with others",-1))]),e("div",Qt,[(o(),l(D,null,N(f,t=>e("button",{key:t.name,"aria-label":t.name,onClick:s=>Q(t),class:"p-1.5 bg-white rounded-full hover:bg-gray-300"},[(o(),Z(ie(t.svg),{class:"w-5 h-5 text-gray-600"}))],8,Xt)),64))])])]),e("div",null,[(o(),Z(Ct,{activity:i.value,key:i.value.activity},null,8,["activity"]))])]),e("div",Jt,[e("div",e1,[n[6]||(n[6]=e("h2",{class:"text-heading4 font-medium font-poppins",style:{color:"#0b0b0b"}}," Related Opportunities ",-1)),e("div",t1,[B(w(U),{onClick:n[0]||(n[0]=t=>!g.value&&T),class:I(["size-5",g.value?"text-gray-500 cursor-not-allowed opacity-50":"text-gray-700 cursor-pointer"]),name:"chevron-left",disabled:g.value},null,8,["class","disabled"]),B(w(U),{onClick:n[1]||(n[1]=t=>!L.value&&b),class:I(["size-5",L.value?"text-gray-500 cursor-not-allowed opacity-50":"text-gray-700 cursor-pointer"]),name:"chevron-right",disabled:L.value},null,8,["class","disabled"])])]),e("div",{ref_key:"scrollContainer",ref:c,class:"py-4 w-full overflow-x-scroll"},[((a=m.value)==null?void 0:a.length)>0?(o(),l("div",s1,[(o(!0),l(D,null,N(m.value,(t,s)=>(o(),Z(fe,{key:s,item:t,class:"w-[320px] min-w-[320px] max-w-[320px]"},null,8,["item"]))),128))])):(o(),l("div",o1,[B(ve)]))],512)])])])])}}},p1=ee(l1,[["__scopeId","data-v-898ce6a5"]]);export{p1 as default};
