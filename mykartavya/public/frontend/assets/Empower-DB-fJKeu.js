var j=(x,p,b)=>new Promise((_,o)=>{var k=f=>{try{u(b.next(f))}catch(L){o(L)}},A=f=>{try{u(b.throw(f))}catch(L){o(L)}},u=f=>f.done?_(f.value):Promise.resolve(f.value).then(k,A);u((b=b.apply(x,p)).next())});import{i as F,l as T,p as D,j as a,w as G,a as e,b as S,f as z,u as g,g as E,_ as W,r as m,c as r,m as y,F as V,h as Z,n as $,t as v,s as N,v as q,e as J,x as O,o as Y,k as X,A as Q,B as e1}from"./index-IKWDsXli.js";import{l as U}from"./index-ByqQj3FG.js";/* empty css              */import{D as t1}from"./Dialog-RbNuAFdO.js";import{c as K,S as s1,F as o1,T as l1,L as a1,M as i1}from"./twitter-DOLHzqP5.js";import{N as r1,C as n1}from"./NotFound-LFuYsCH1.js";/**
 * @license lucide-vue-next v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d1=K("CheckIcon",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c1=K("RefreshCwIcon",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]),u1={__name:"ReqForApproval",setup(x){const p=F("store"),b=()=>{p.req_for_approavl=!1,U.info("Notified to Approval")};return T(()=>p.req_for_approavl,_=>{p.req_for_approavl=_},{immediate:!0}),(_,o)=>(a(),D(g(t1),{modelValue:g(p).req_for_approavl,"onUpdate:modelValue":o[0]||(o[0]=k=>g(p).req_for_approavl=k)},{"body-title":G(()=>o[1]||(o[1]=[e("h3",null,"Your account status",-1)])),"body-content":G(()=>o[2]||(o[2]=[e("span",{class:"bg-[#f4d6cd] px-2 text-red-500 py-1 rounded-sm text-xs"},"Pending by Admin",-1)])),actions:G(()=>[e("button",{onClick:b,class:"px-3 py-2 gap-2 rounded-md bg-secondary text-sm text-white flex items-center justify-center"},[S(g(E),{name:"bell",class:"size-4"}),o[3]||(o[3]=z(" Notified to Approval "))])]),_:1},8,["modelValue"]))}},p1={class:"bg-white rounded-lg"},m1={class:"bg-white p-6 rounded-lg w-full relative"},v1={class:"flex justify-between items-center mb-4"},f1={class:"relative border-gray-300 pl-3"},b1={key:1},C1={key:0,width:"19",height:"19",viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg"},g1={key:1,width:"19",height:"19",viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg"},h1={key:2,width:"19",height:"19",viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg"},y1={class:"text-[19px] font-medium px-6 py-2"},x1={class:"text-gray-600 text-xs font-normal ml-6 mt-0"},w1=["onClick"],_1=["onClick"],k1=["onClick"],L1={key:0,class:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"},M1={class:"bg-white rounded-lg shadow-lg w-full max-w-md"},$1={class:"flex justify-between items-center border-b p-4"},S1={class:"p-4"},A1={class:"flex justify-center gap-6 my-3"},j1=["onClick"],F1={key:1,class:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"},H1={class:"bg-white rounded-lg shadow-lg p-6 w-[500px]"},R1={class:"flex justify-between items-center border-b pb-2 mb-4"},P1={class:"mb-4"},V1={class:"flex gap-2"},Z1={class:"flex gap-2 items-center"},B1={class:"flex gap-2 items-center"},E1={class:"mb-4"},D1={class:"flex items-center gap-2"},T1={class:"h-8 w-16 flex items-center justify-center border rounded-sm text-base font-normal text-center"},z1={class:"mb-4"},I1={class:"border-dashed border-2 border-gray-300 p-6 rounded-lg text-center relative"},N1={class:"flex gap-2 mt-3"},q1=["src"],G1={class:"flex justify-end"},U1={key:0,class:"h-5 w-5"},W1={key:2,class:"fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"},O1={class:"bg-white p-6 rounded-lg shadow-lg"},K1={class:"flex justify-end mt-4"},J1={__name:"Stepper",props:{activity:{type:Object,required:!1,default:()=>({})}},setup(x){const p=m(0),b=m(!1),_=m(!1),o=m(!1),k=m(!1),A=F("call"),u=F("auth"),f=F("store"),L=O(),w=m({rating:null,comments:""});let h=x;const n=m({hours:0,minutes:0,progress:0}),H=m([]),R=m(!1);m(!1);const d=m([{title:"Activity Approval",description:"Is your application to volunteer for the activity approved?",button:"Request for Approval",completed:!1},{title:"Get Started",description:"Click the button below once you are ready to start the activity",button:"Start Activity",completed:!1},{title:"Activity Report",description:"Click the button below once you have finished the activity & submit a small report",button:"Submit Report",completed:!1},{title:"Feedback & Karma Points",description:"Click the button to register the feedback & collect your karma points",button:"Submit Feedback",completed:!1}]),B=l=>j(this,null,function*(){if(l===0){let t=yield A("mykartavya.controllers.api.act_now",{activity:L.params.name,volunteer:u.cookie.user_id});if(t.status==200)h.activity.workflow_state="Applied",d.value[l].completed=!0,p.value++;else if(t.status==201)f.req_for_approavl=!0;else return}l===3&&(b.value=!0),l===2&&(o.value=!0)}),c=()=>j(this,null,function*(){o.value=!1,R.value=!0,h.activity.completion_wf_state=="Submitted"&&(d.value[2].completed=!0,p.value++);try{let l=yield A("mykartavya.controllers.api.submit_activity_report",{name:h.activity.name,data:{duration:n.value.hours*60*60+n.value.minutes*60,percent:n.value.progress-h.activity.com_percent,images:H.value}});l&&(n.value.progress=l.com_percent,U.success("Activity report submitted successfully"),R.value=!1,n.value={hours:0,minutes:0,progress:0},f.refresh_step=!0)}catch(l){R.value=!1,U.error("Something went wrong")}}),C=()=>j(this,null,function*(){(yield A("mykartavya.controllers.api.submit_feedback",{name:h.activity.name,volunteer:u.cookie.user_id,rating:w.value.rating,comments:w.value.comments})).rating&&(b.value=!1,_.value=!0,d.value[3].completed=!0)}),P=l=>{const t=l.target.files;if(t.length)for(let s of t){const i=new FileReader;i.onload=M=>{H.value.push({file:s,preview:i.result})},i.readAsDataURL(s)}},I=m([{icon:"😞",label:.2},{icon:"😐",label:.4},{icon:"😊",label:.6},{icon:"🙂",label:.8},{icon:"🙂",label:1}]);return T(()=>h.activity,(l,t)=>{l.com_percent&&(n.value.progress=l.com_percent),l.is_assigned&&(l.workflow_state=="Applied"?(d.value[0].completed=!0,p.value=1):l.workflow_state=="Approved"&&l.completion_wf_state=="Pending"?(d.value[0].completed=!0,d.value[1].completed=!0,p.value=2):l.workflow_state=="Approved"&&["Submitted","Approved"].includes(l.completion_wf_state)&&!(l.rating!=null&&l.rating!=0)?(d.value[0].completed=!0,l.completion_wf_state=="Submitted"?(d.value[1].completed=!0,p.value=2):(d.value[1].completed=!0,d.value[2].completed=!0,p.value=3)):l.rating!=null&&l.rating!=0&&l.completion_wf_state=="Approved"&&(d.value[0].completed=!0,d.value[1].completed=!0,d.value[2].completed=!0,d.value[3].completed=!0,p.value=4))},{immediate:!0,deep:!0}),T(()=>n.value.progress,(l,t)=>{h.activity.com_percent<=l||(n.value.progress=h.activity.com_percent)}),(l,t)=>(a(),r("div",null,[e("div",p1,[e("div",m1,[e("div",v1,[t[11]||(t[11]=e("h2",{class:"text-heading4 font-medium"},"Timeline",-1)),e("button",{onClick:t[0]||(t[0]=s=>g(f).refresh_step=!0),class:"text-pink-500 flex items-center text-base font-normal w-[107px] justify-center h-8 rounded-sm border"},[t[10]||(t[10]=z(" Refresh ")),S(g(c1),{class:"w-4 h-4 ml-1"})])]),e("div",f1,[(a(!0),r(V,null,Z(d.value,(s,i)=>(a(),r("div",{key:i,class:"mb-6 relative border-l"},[e("div",{class:$(["absolute -left-4 w-7 h-7 min-w-7 max-h-7 rounded-full flex items-center justify-center",s.completed?"border-green-500 bg-white border-2 text-green-600":"bg-orange-500 text-white "])},[s.completed?(a(),D(g(d1),{key:0,class:"w-4 h-4"})):(a(),r("div",b1,[s.title=="Get Started"?(a(),r("svg",C1,t[12]||(t[12]=[e("path",{d:"M12.4688 10.292C12.4688 10.1345 12.4062 9.9835 12.2948 9.87215C12.1835 9.7608 12.0325 9.69824 11.875 9.69824H7.125C6.96753 9.69824 6.81651 9.7608 6.70516 9.87215C6.59381 9.9835 6.53125 10.1345 6.53125 10.292C6.53125 10.4495 6.59381 10.6005 6.70516 10.7118C6.81651 10.8232 6.96753 10.8857 7.125 10.8857H11.875C12.0325 10.8857 12.1835 10.8232 12.2948 10.7118C12.4062 10.6005 12.4688 10.4495 12.4688 10.292ZM12.4688 13.4587C12.4688 13.3012 12.4062 13.1502 12.2948 13.0388C12.1835 12.9275 12.0325 12.8649 11.875 12.8649H7.125C6.96753 12.8649 6.81651 12.9275 6.70516 13.0388C6.59381 13.1502 6.53125 13.3012 6.53125 13.4587C6.53125 13.6161 6.59381 13.7672 6.70516 13.8785C6.81651 13.9899 6.96753 14.0524 7.125 14.0524H11.875C12.0325 14.0524 12.1835 13.9899 12.2948 13.8785C12.4062 13.7672 12.4688 13.6161 12.4688 13.4587Z",fill:"white"},null,-1),e("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.54183 1.78125C4.96443 1.78125 4.41068 2.01062 4.0024 2.4189C3.59412 2.82719 3.36475 3.38093 3.36475 3.95833V15.0417C3.36475 15.6191 3.59412 16.1728 4.0024 16.5811C4.41068 16.9894 4.96443 17.2188 5.54183 17.2188H13.4585C14.0359 17.2188 14.5896 16.9894 14.9979 16.5811C15.4062 16.1728 15.6356 15.6191 15.6356 15.0417V6.308C15.6356 6.00637 15.5374 5.71346 15.3553 5.47279L12.9819 2.33146C12.8528 2.16055 12.6858 2.02192 12.494 1.92645C12.3022 1.83098 12.091 1.78128 11.8767 1.78125H5.54183ZM4.55225 3.95833C4.55225 3.41208 4.99558 2.96875 5.54183 2.96875H11.2814V6.44971C11.2814 6.77746 11.5474 7.04346 11.8752 7.04346H14.4481V15.0417C14.4481 15.5879 14.0047 16.0312 13.4585 16.0312H5.54183C4.99558 16.0312 4.55225 15.5879 4.55225 15.0417V3.95833Z",fill:"white"},null,-1)]))):y("",!0),s.title=="Activity Report"?(a(),r("svg",g1,t[13]||(t[13]=[e("path",{d:"M14.3927 6.36444L14.7592 5.9971C15.0511 5.70515 15.4469 5.54109 15.8598 5.54102C16.2726 5.54094 16.6685 5.70486 16.9605 5.99671C17.2524 6.28856 17.4165 6.68443 17.4165 7.09724C17.4166 7.51005 17.2527 7.90598 16.9608 8.19794L16.5943 8.56527M14.3927 6.36444C14.3927 6.36444 14.4386 7.14344 15.1266 7.83139C15.8145 8.51935 16.5943 8.56527 16.5943 8.56527M14.3927 6.36444L11.0202 9.73694C10.7906 9.96494 10.6766 10.0797 10.5784 10.2056C10.4623 10.3544 10.3636 10.5144 10.2823 10.6854C10.2135 10.8294 10.1628 10.9822 10.0607 11.2886L9.73372 12.2703L9.62764 12.5877M16.5943 8.56527L13.2218 11.9378C12.9922 12.1674 12.8782 12.2814 12.7523 12.3795C12.6035 12.4956 12.4436 12.5943 12.2726 12.6756C12.1285 12.7445 11.9757 12.7951 11.6693 12.8973L10.6877 13.2242L10.3702 13.3303M9.62764 12.5877L9.52235 12.906C9.49782 12.9798 9.49433 13.0591 9.51226 13.1348C9.53019 13.2106 9.56883 13.2798 9.62387 13.3349C9.67891 13.3899 9.74817 13.4286 9.82391 13.4465C9.89966 13.4644 9.97889 13.4609 10.0528 13.4364L10.3702 13.3303M9.62764 12.5877L10.3702 13.3303",stroke:"white"},null,-1),e("path",{d:"M6.33333 10.2913H8.3125M6.33333 7.12467H11.4792M6.33333 13.458H7.52083M15.6972 2.51084C14.7701 1.58301 13.277 1.58301 10.2917 1.58301H8.70833C5.72296 1.58301 4.22987 1.58301 3.30283 2.51084C2.37579 3.43867 2.375 4.93097 2.375 7.91634V11.083C2.375 14.0684 2.375 15.5615 3.30283 16.4885C4.23067 17.4155 5.72296 17.4163 8.70833 17.4163H10.2917C13.277 17.4163 14.7701 17.4163 15.6972 16.4885C16.4445 15.742 16.5894 14.6297 16.6179 12.6663",stroke:"white","stroke-linecap":"round"},null,-1)]))):y("",!0),s.title=="Feedback & Karma Points"?(a(),r("svg",h1,t[14]||(t[14]=[e("path",{d:"M6.21125 6.98373C6.54929 6.17069 7.70037 6.17069 8.03842 6.98373L8.9995 9.29461L11.494 9.49411C12.3712 9.56536 12.7275 10.6594 12.0585 11.2318L10.1585 12.8603L10.7388 15.2947C10.943 16.1504 10.012 16.8273 9.26075 16.3689L7.12483 15.0643L4.98892 16.3689C4.23762 16.8281 3.30662 16.1504 3.51087 15.2947L4.09117 12.8603L2.19117 11.2318C1.52221 10.6594 1.87846 9.56457 2.75562 9.49411L5.24937 9.29461L6.21125 6.98373ZM7.12483 7.87911L6.29992 9.86223C6.23004 10.0303 6.11518 10.1758 5.96797 10.2828C5.82076 10.3897 5.64689 10.4541 5.4655 10.4687L3.32483 10.6397L4.95567 12.0369C5.2375 12.2784 5.361 12.6576 5.27471 13.0186L4.77596 15.107L6.60866 13.9876C6.76407 13.8926 6.94268 13.8423 7.12483 13.8423C7.30698 13.8423 7.48559 13.8926 7.641 13.9876L9.47371 15.107L8.97496 13.0186C8.93265 12.8415 8.94005 12.6561 8.99635 12.4829C9.05264 12.3097 9.15564 12.1554 9.294 12.0369L10.9248 10.6397L8.78417 10.4687C8.60277 10.4541 8.42891 10.3897 8.2817 10.2828C8.13449 10.1758 8.01963 10.0303 7.94975 9.86223L7.12483 7.87911ZM10.3525 2.30973C10.6224 1.65978 11.5439 1.65978 11.8139 2.30973L12.1939 3.22173L13.1779 3.3009C13.8793 3.35632 14.1643 4.23269 13.6292 4.69107L12.8795 5.33311L13.109 6.29419C13.2721 6.97898 12.5272 7.52048 11.9263 7.15315L11.0832 6.63857L10.24 7.15315C9.63917 7.52048 8.89421 6.97898 9.05729 6.29419L9.28687 5.33311L8.53717 4.69107C8.002 4.23269 8.28621 3.35711 8.98842 3.30011L9.97325 3.22094L10.3525 2.30973ZM11.4624 3.52573L11.0832 2.61373L10.7032 3.52573C10.6474 3.66005 10.5556 3.7764 10.438 3.86201C10.3204 3.94762 10.1816 3.99918 10.0366 4.01103L9.05175 4.09019L9.80146 4.73144C9.91223 4.82613 9.99472 4.94955 10.0398 5.08812C10.085 5.22669 10.091 5.37502 10.0572 5.51678L9.82758 6.47786L10.6707 5.96328C10.7949 5.88746 10.9376 5.84734 11.0832 5.84734C11.2287 5.84734 11.3714 5.88746 11.4956 5.96328L12.3387 6.47786L12.1092 5.51678C12.0755 5.37514 12.0816 5.22697 12.1267 5.08856C12.1718 4.95014 12.2542 4.82685 12.3649 4.73223L13.1146 4.0894L12.1305 4.01023C11.9854 3.99874 11.8462 3.94742 11.7283 3.86195C11.6104 3.77647 11.5184 3.66013 11.4624 3.52573ZM14.6829 7.89257C14.7147 7.82435 14.7654 7.76663 14.8289 7.7262C14.8925 7.68576 14.9662 7.66428 15.0415 7.66428C15.1168 7.66428 15.1905 7.68576 15.2541 7.7262C15.3176 7.76663 15.3683 7.82435 15.4001 7.89257L15.7366 8.61298C15.7757 8.69726 15.8433 8.76508 15.9274 8.80457L16.6478 9.14103C16.716 9.1729 16.7737 9.22357 16.8142 9.28709C16.8546 9.35061 16.8761 9.42435 16.8761 9.49965C16.8761 9.57495 16.8546 9.64869 16.8142 9.71221C16.7737 9.77573 16.716 9.8264 16.6478 9.85828L15.9274 10.1947C15.8434 10.234 15.7759 10.3015 15.7366 10.3855L15.4001 11.1059C15.3683 11.1742 15.3176 11.2319 15.2541 11.2723C15.1905 11.3128 15.1168 11.3342 15.0415 11.3342C14.9662 11.3342 14.8925 11.3128 14.8289 11.2723C14.7654 11.2319 14.7147 11.1742 14.6829 11.1059L14.3464 10.3855C14.3071 10.3015 14.2396 10.234 14.1556 10.1947L13.4352 9.85828C13.367 9.8264 13.3093 9.77573 13.2688 9.71221C13.2284 9.64869 13.2069 9.57495 13.2069 9.49965C13.2069 9.42435 13.2284 9.35061 13.2688 9.28709C13.3093 9.22357 13.367 9.1729 13.4352 9.14103L14.1556 8.80457C14.2396 8.76528 14.3071 8.69775 14.3464 8.61378L14.6829 7.89257Z",fill:"white"},null,-1)]))):y("",!0)]))],2),e("div",{class:$(i>p.value?"blur-sm opacity-50 pointer-events-none ":"")},[e("p",{class:$(["text-[10px] font-normal px-6",i===d.value.length-1?"text-[#FF5722]":"text-[#999999]"])}," STEP "+v(i+1),3),e("h3",y1,v(s.title),1),e("p",x1,v(s.description),1),!s.completed&&!(["Get Started","Activity Report"].includes(s.title)&&(x.activity.workflow_state=="Applied"||x.activity.completion_wf_state=="Submitted"))?(a(),r("button",{key:0,onClick:M=>B(i),class:$(["mt-3 h-[28px] w-[147px] rounded-sm text-caption font-medium text-white ml-6",(i===d.value.length-1,"bg-orange-500")])},v(s.button),11,w1)):y("",!0),!s.completed&&["Get Started"].includes(s.title)&&["Applied"].includes(x.activity.workflow_state)?(a(),r("button",{key:1,disabled:"",onClick:M=>B(i),class:$(["mt-3 h-[28px] cursor-not-allowed w-[147px] rounded-sm text-caption font-medium text-white ml-6",(i===d.value.length-1,"bg-orange-500")])},v(s.title=="Get Started"?"Pending by Admin":"Review under Admin"),11,_1)):y("",!0),!s.completed&&["Activity Report"].includes(s.title)&&["Approved"].includes(x.activity.workflow_state)&&x.activity.completion_wf_state=="Submitted"?(a(),r("button",{key:2,disabled:"",onClick:M=>B(i),class:$(["mt-2 h-[28px] cursor-not-allowed w-[147px] rounded-sm text-caption font-medium text-white ml-2",(i===d.value.length-1,"bg-orange-500")])},v(s.title=="Get Started"?"Pending by Admin":"Review under Admin"),11,k1)):y("",!0)],2)]))),128))]),b.value?(a(),r("div",L1,[e("div",M1,[e("div",$1,[t[15]||(t[15]=e("h2",{class:"text-lg font-semibold"},"Share Feedback",-1)),e("button",{onClick:t[1]||(t[1]=s=>{(b.value=!1)(d.value[3].completed=!1)}),class:"text-gray-500 hover:text-gray-700 text-xl"}," × ")]),e("div",S1,[t[16]||(t[16]=e("label",{class:"block font-medium mb-2 text-gray-700"},"How would you rate your experience with the activity?",-1)),e("div",A1,[(a(!0),r(V,null,Z(I.value,(s,i)=>(a(),r("button",{key:i,onClick:M=>w.value.rating=s.label,class:$(["text-3xl focus:outline-none transition duration-200",w.value.rating===s.label?"text-orange-500":"text-gray-400 opacity-30"])},v(s.icon),11,j1))),128))]),t[17]||(t[17]=e("label",{class:"block font-medium mb-2 text-gray-700"},"Comments (Optional)",-1)),N(e("textarea",{"onUpdate:modelValue":t[2]||(t[2]=s=>w.value.comments=s),class:"w-full border rounded p-2 h-20 resize-none"},null,512),[[q,w.value.comments]])]),e("div",{class:"p-4"},[e("button",{onClick:C,class:"w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600"}," SUBMIT FEEDBACK ")])])])):y("",!0),o.value?(a(),r("div",F1,[e("div",H1,[e("div",R1,[t[18]||(t[18]=e("h2",{class:"text-lg font-semibold"},"Activity Completion",-1)),e("button",{onClick:t[3]||(t[3]=s=>o.value=!1),class:"text-gray-500 hover:text-gray-700"}," × ")]),e("div",P1,[t[21]||(t[21]=e("label",{class:"block font-medium mb-1"},"How much time you donated while working on the activity?",-1)),e("div",V1,[e("div",Z1,[t[19]||(t[19]=e("label",{for:"",class:"text-base font-normal"},"Hours",-1)),N(e("input",{type:"number","onUpdate:modelValue":t[4]||(t[4]=s=>n.value.hours=s),class:"w-24 border rounded px-2 h-8",onInput:t[5]||(t[5]=s=>n.value.hours=Math.max(0,n.value.hours))},null,544),[[q,n.value.hours]])]),e("div",B1,[t[20]||(t[20]=e("label",{for:"",class:"text-base font-normal"},"Minutes",-1)),N(e("input",{type:"number","onUpdate:modelValue":t[6]||(t[6]=s=>n.value.minutes=s),onInput:t[7]||(t[7]=s=>n.value.minutes=Math.max(0,n.value.minutes)),class:"w-24 border rounded px-2 h-8"},null,544),[[q,n.value.minutes]])])])]),e("div",E1,[t[22]||(t[22]=e("label",{class:"block text-lg font-normal mb-1"},"How much percent work has completed?",-1)),e("div",D1,[N(e("input",{type:"range",min:"0",max:"100","onUpdate:modelValue":t[8]||(t[8]=s=>n.value.progress=s),class:"w-full h-[6px] accent-green-500"},null,512),[[q,n.value.progress]]),e("span",T1,v(n.value.progress)+"%",1)])]),e("div",z1,[t[24]||(t[24]=e("label",{class:"block font-medium mb-2"},"Upload Media",-1)),e("div",I1,[e("input",{type:"file",multiple:"",onChange:P,class:"absolute inset-0 w-full h-full opacity-0 cursor-pointer"},null,32),t[23]||(t[23]=J('<div class="flex flex-col items-center text-gray-500" data-v-11b942b8><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10" data-v-11b942b8><path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V3m0 0l-3.5 3.5M12 3l3.5 3.5" data-v-11b942b8></path><path stroke-linecap="round" stroke-linejoin="round" d="M6 14.25v4.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-4.5" data-v-11b942b8></path></svg><p class="mt-2" data-v-11b942b8> Drag &amp; drop files or <span class="text-orange-500 cursor-pointer" data-v-11b942b8>Browse</span></p><p class="text-sm" data-v-11b942b8>Supported formats: JPEG, PNG</p></div>',1))]),e("div",N1,[(a(!0),r(V,null,Z(H.value,(s,i)=>(a(),r("img",{key:i,src:s.preview,alt:"img",class:"w-16 h-16 rounded object-cover"},null,8,q1))),128))])]),e("div",G1,[e("button",{onClick:c,class:"bg-orange-500 flex items-center justify-center text-white h-[38px] text-base w-48 rounded-sm text-center font-medium hover:bg-orange-600"},[t[26]||(t[26]=e("p",null," MARK AS COMPLETE",-1)),R.value?(a(),r("div",U1,t[25]||(t[25]=[e("div",{class:"animate-spin h-full w-full rounded-full border-[2px] flex justify-center items-center border-dotted border-[#fff]"},[e("div",{class:"w-3 h-3 rounded-full border-dashed border-[1px] border-[#fff]"})],-1)]))):y("",!0)])])])])):y("",!0),k.value?(a(),r("div",W1,[e("div",O1,[t[27]||(t[27]=e("h3",{class:"text-lg font-semibold mb-4"}," Submit Your Activity Report ",-1)),t[28]||(t[28]=z(" feedbackPointsPopup ")),t[29]||(t[29]=e("p",{class:"text-gray-600"}," Please upload a summary of your activity. ",-1)),t[30]||(t[30]=e("textarea",{class:"border rounded w-full p-2 mt-2",rows:"4",placeholder:"Write your report here..."},null,-1)),e("div",K1,[e("button",{onClick:t[9]||(t[9]=(...s)=>l.submitFeedback&&l.submitFeedback(...s)),class:"px-4 py-2 bg-orange-500 text-white rounded"}," Submit ")])])])):y("",!0),S(u1)])])]))}},Y1=W(J1,[["__scopeId","data-v-11b942b8"]]),X1={class:"h-screen w-full"},Q1={key:0,class:"w-full relative h-[456px] md:h-[456px] back-img flex items-center mt-10"},ee=["src"],te={class:"absolute top-20 left-5 sm:left-10 max-w-sm w-[448px] h-[312px] bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-4 justify-center"},se={class:"border-b pb-2"},oe={class:"text-heading3 font-normal font-poppins mt-1"},le={class:"text-secondary font-medium text-caption"},ae={class:"flex gap-1 items-center",style:{color:"#666666"}},ie={class:"flex items-center text-bodyh2 font-normal mr-4",style:{color:"#0b0b0b"}},re={class:"flex items-center text-gray-600 text-bodyh2 font-normal justify-between border-b pb-2"},ne={class:"flex justify-center items-center gap-1",style:{color:"#0b0b0b"}},de={class:"flex items-center gap-2 justify-center",style:{color:"#0b0b0b"}},ce={class:"text-bodyh2 font-normal"},ue={class:"flex space-x-2 border-b pb-2"},pe=["src"],me={key:1,class:"w-8 h-8 flex items-center justify-center bg-gray-50"},ve={class:""},fe={class:"w-full bg-gray-200 rounded-full h-[5px]"},be={class:"flex items-center justify-between gap-2"},Ce={class:"text-caption font-normal mt-1",style:{color:"#0b0b0b"}},ge={class:"flex items-center gap-2 text-xs font-normal"},he={class:"w-full bg-gray-700"},ye={class:"p-6 md:p-10 bg-gray-100"},xe={class:"grid gap-6 lg:grid-cols-3"},we={class:"lg:col-span-2 flex flex-col justify-between items-start"},_e=["innerHTML"],ke={class:"flex items-center gap-[12px] flex-col justify-self-start mt-[220px]"},Le={class:"text-gray-700 font-medium flex items-center space-x-2"},Me={class:"flex items-center gap-3 justify-start w-[230px]"},$e=["aria-label"],Se={class:"mt-10"},Ae={class:"flex justify-between"},je={class:"flex items-center"},Fe={key:0,class:"flex items-center gap-4"},He={key:1,class:"w-full h-[330px]"},Re=320,Pe={__name:"Empower",setup(x){const p=[{name:"Facebook",svg:o1},{name:"X",svg:l1},{name:"LinkedIn",svg:a1},{name:"WhatsApp",svg:i1}],b=F("call"),_=F("store"),o=m([]),k=O(),A=F("formatDate"),u=m(null),f=m(!0),L=m(!1),w=()=>j(this,null,function*(){try{const c=yield b("mykartavya.controllers.api.activity_details",{name:k.params.name});c&&(o.value=c)}catch(c){console.error("Error fetching activity data:",c)}}),h=m([]),n=()=>j(this,null,function*(){try{const c=yield b("mykartavya.controllers.api.related_opportunities",{name:k.params.name,sdgs:o.value.sdgs});c&&(h.value=c)}catch(c){console.error("Error fetching activity data:",c)}});Y(()=>j(this,null,function*(){yield w(),yield n()})),T(()=>_.refresh_step,c=>{c&&(w(),_.refresh_step=!1)},{immediate:!0,deep:!0}),T(()=>k.params.name,(c,C)=>j(this,null,function*(){c!=C&&(yield w(),yield n())}),{immediate:!0,deep:!0});const H=Re,R=()=>{u.value&&u.value.scrollTo({left:Math.max(0,u.value.scrollLeft-H),behavior:"smooth"})},d=()=>{if(u.value){const c=u.value.scrollWidth-u.value.clientWidth;u.value.scrollTo({left:Math.min(c,u.value.scrollLeft+H),behavior:"smooth"})}},B=()=>{if(!u.value)return;const{scrollLeft:c,scrollWidth:C,clientWidth:P}=u.value;f.value=c<=0,L.value=c+P>=C};return X(()=>{u.value&&u.value.addEventListener("scroll",B)}),window.addEventListener("resize",()=>{}),(c,C)=>{var P,I,l,t,s;return a(),r("div",X1,[e("section",null,[o.value?(a(),r("div",Q1,[e("img",{src:o.value.activity_image,class:"w-full h-full",alt:""},null,8,ee),e("div",te,[e("div",se,[e("h2",oe,v(o.value.title),1),e("span",le,v(o.value.activity_type),1)]),e("div",ae,[C[0]||(C[0]=e("svg",{width:"16",height:"15",viewBox:"0 0 16 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M1.33331 7.00033C1.33331 4.48633 1.33331 3.22899 2.11465 2.44833C2.89598 1.66766 4.15265 1.66699 6.66665 1.66699H9.33331C11.8473 1.66699 13.1046 1.66699 13.8853 2.44833C14.666 3.22966 14.6666 4.48633 14.6666 7.00033V8.33366C14.6666 10.8477 14.6666 12.105 13.8853 12.8857C13.104 13.6663 11.8473 13.667 9.33331 13.667H6.66665C4.15265 13.667 2.89531 13.667 2.11465 12.8857C1.33398 12.1043 1.33331 10.8477 1.33331 8.33366V7.00033Z",stroke:"#666666","stroke-width":"0.75"}),e("path",{d:"M4.66666 1.66699V0.666992M11.3333 1.66699V0.666992M1.66666 5.00033H14.3333",stroke:"#666666","stroke-width":"0.75","stroke-linecap":"round"}),e("path",{d:"M12 10.3333C12 10.5101 11.9298 10.6797 11.8047 10.8047C11.6797 10.9298 11.5101 11 11.3333 11C11.1565 11 10.987 10.9298 10.8619 10.8047C10.7369 10.6797 10.6667 10.5101 10.6667 10.3333C10.6667 10.1565 10.7369 9.98695 10.8619 9.86193C10.987 9.7369 11.1565 9.66667 11.3333 9.66667C11.5101 9.66667 11.6797 9.7369 11.8047 9.86193C11.9298 9.98695 12 10.1565 12 10.3333ZM12 7.66667C12 7.84348 11.9298 8.01305 11.8047 8.13807C11.6797 8.2631 11.5101 8.33333 11.3333 8.33333C11.1565 8.33333 10.987 8.2631 10.8619 8.13807C10.7369 8.01305 10.6667 7.84348 10.6667 7.66667C10.6667 7.48986 10.7369 7.32029 10.8619 7.19526C10.987 7.07024 11.1565 7 11.3333 7C11.5101 7 11.6797 7.07024 11.8047 7.19526C11.9298 7.32029 12 7.48986 12 7.66667ZM8.66667 10.3333C8.66667 10.5101 8.59643 10.6797 8.4714 10.8047C8.34638 10.9298 8.17681 11 8 11C7.82319 11 7.65362 10.9298 7.5286 10.8047C7.40357 10.6797 7.33333 10.5101 7.33333 10.3333C7.33333 10.1565 7.40357 9.98695 7.5286 9.86193C7.65362 9.7369 7.82319 9.66667 8 9.66667C8.17681 9.66667 8.34638 9.7369 8.4714 9.86193C8.59643 9.98695 8.66667 10.1565 8.66667 10.3333ZM8.66667 7.66667C8.66667 7.84348 8.59643 8.01305 8.4714 8.13807C8.34638 8.2631 8.17681 8.33333 8 8.33333C7.82319 8.33333 7.65362 8.2631 7.5286 8.13807C7.40357 8.01305 7.33333 7.84348 7.33333 7.66667C7.33333 7.48986 7.40357 7.32029 7.5286 7.19526C7.65362 7.07024 7.82319 7 8 7C8.17681 7 8.34638 7.07024 8.4714 7.19526C8.59643 7.32029 8.66667 7.48986 8.66667 7.66667ZM5.33333 10.3333C5.33333 10.5101 5.2631 10.6797 5.13807 10.8047C5.01305 10.9298 4.84348 11 4.66667 11C4.48986 11 4.32029 10.9298 4.19526 10.8047C4.07024 10.6797 4 10.5101 4 10.3333C4 10.1565 4.07024 9.98695 4.19526 9.86193C4.32029 9.7369 4.48986 9.66667 4.66667 9.66667C4.84348 9.66667 5.01305 9.7369 5.13807 9.86193C5.2631 9.98695 5.33333 10.1565 5.33333 10.3333ZM5.33333 7.66667C5.33333 7.84348 5.2631 8.01305 5.13807 8.13807C5.01305 8.2631 4.84348 8.33333 4.66667 8.33333C4.48986 8.33333 4.32029 8.2631 4.19526 8.13807C4.07024 8.01305 4 7.84348 4 7.66667C4 7.48986 4.07024 7.32029 4.19526 7.19526C4.32029 7.07024 4.48986 7 4.66667 7C4.84348 7 5.01305 7.07024 5.13807 7.19526C5.2631 7.32029 5.33333 7.48986 5.33333 7.66667Z",fill:"#666666"})],-1)),e("span",ie,v(g(A)(o.value.start_date))+" - "+v(g(A)(o.value.end_date)),1)]),e("div",re,[e("span",ne,[S(g(E),{name:"clock",class:"size-4 text-[#666666]"}),z(" "+v((P=o.value.hours)!=null?P:"0")+" hr ",1)]),e("span",de,[C[1]||(C[1]=e("svg",{width:"16",height:"14",viewBox:"0 0 16 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M15.5002 3.66602C15.5002 2.28518 12.8885 1.16602 9.66683 1.16602C6.44516 1.16602 3.8335 2.28518 3.8335 3.66602M15.5002 3.66602V6.99935C15.5002 7.84935 14.5118 8.59935 13.0002 9.05102C12.0552 9.33435 10.906 9.49935 9.66683 9.49935C8.42766 9.49935 7.2785 9.33352 6.3335 9.05102C4.82266 8.59935 3.8335 7.84935 3.8335 6.99935V3.66602M15.5002 3.66602C15.5002 4.51602 14.5118 5.26602 13.0002 5.71768C12.0552 6.00102 10.906 6.16602 9.66683 6.16602C8.42766 6.16602 7.2785 6.00018 6.3335 5.71768C4.82266 5.26602 3.8335 4.51602 3.8335 3.66602",stroke:"#FF5722","stroke-linecap":"round","stroke-linejoin":"round"}),e("path",{d:"M0.5 6.9994V10.3327C0.5 11.1827 1.48917 11.9327 3 12.3844C3.945 12.6677 5.09417 12.8327 6.33333 12.8327C7.5725 12.8327 8.72167 12.6669 9.66667 12.3844C11.1775 11.9327 12.1667 11.1827 12.1667 10.3327V9.4994M0.5 6.9994C0.5 6.0019 1.8625 5.14107 3.83333 4.74023M0.5 6.9994C0.5 7.8494 1.48917 8.5994 3 9.05107C3.945 9.3344 5.09417 9.4994 6.33333 9.4994C6.9125 9.4994 7.47167 9.46357 8 9.39607",stroke:"#FF5722","stroke-linecap":"round","stroke-linejoin":"round"})],-1)),e("span",ce,v((I=o.value.karma_points)==null?void 0:I.toLocaleString())+" Points",1)])]),e("div",ue,[o.value.sdgs?(a(!0),r(V,{key:0},Z(JSON.parse(o.value.sdgs),i=>{var M;return a(),r("div",null,[i.image?(a(),r("img",{key:0,src:i.image,class:"w-8 h-8"},null,8,pe)):(a(),r("span",me,v((M=i.sdgs_name)==null?void 0:M.charAt(0)),1))])}),256)):y("",!0)]),e("div",ve,[e("div",fe,[e("div",{class:"bg-green-500 h-[5px] rounded-full",style:Q(`width:${(l=o.value.com_percent)!=null?l:0}%`)},null,4)]),e("div",be,[e("p",Ce,v((t=o.value.com_percent)!=null?t:0)+" % completed ",1),e("div",ge,[S(g(E),{name:"clock",class:"size-4 text-[#666666]"}),z(" "+v(o.value.donet_hours?(o.value.donet_hours/60/60).toFixed(2):"0")+" hr ",1)])])])])])):y("",!0)]),e("section",he,[e("div",ye,[e("div",xe,[e("div",we,[e("div",{class:"text-[14px] text-[#666666] text-justify font-normal",innerHTML:o.value.activity_description},null,8,_e),e("div",ke,[e("span",Le,[S(g(s1),{class:"w-4 h-4 text-[#666666]"}),C[2]||(C[2]=e("span",{class:"text-bodyh1 font-medium font-poppins",style:{color:"#0b0b0b"}},"Share activity with others",-1))]),e("div",Me,[(a(),r(V,null,Z(p,i=>e("button",{key:i.name,"aria-label":i.name,class:"p-1.5 bg-white rounded-full hover:bg-gray-300"},[(a(),D(e1(i.svg),{class:"w-5 h-5 text-gray-600"}))],8,$e)),64))])])]),e("div",null,[(a(),D(Y1,{activity:o.value,key:o.value.activity},null,8,["activity"]))])]),e("div",Se,[e("div",Ae,[C[3]||(C[3]=e("h2",{class:"text-heading4 font-medium font-poppins",style:{color:"#0b0b0b"}}," Related Opportunities ",-1)),e("div",je,[S(g(E),{onClick:R,class:$(["size-5 cursor-pointer",f.value?"text-gray-500 disabled":"text-gray-700"]),name:"chevron-left",disabled:f.value},null,8,["class","disabled"]),S(g(E),{onClick:d,class:$(["size-5 cursor-pointer",L.value?"text-gray-500 disabled":"text-gray-700"]),name:"chevron-right",disabled:L.value},null,8,["class","disabled"])])]),e("div",{ref_key:"scrollContainer",ref:u,class:"py-4 w-full overflow-x-scroll"},[((s=h.value)==null?void 0:s.length)>0?(a(),r("div",Fe,[(a(!0),r(V,null,Z(h.value,(i,M)=>(a(),D(n1,{key:M,item:i,class:"w-[320px] min-w-[320px] max-w-[320px]"},null,8,["item"]))),128))])):(a(),r("div",He,[S(r1)]))],512)])])])])}}},Ie=W(Pe,[["__scopeId","data-v-7f08f5e8"]]);export{Ie as default};
