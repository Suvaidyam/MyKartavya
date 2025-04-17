import{_ as B,i as b,s as S,d as $,c as l,j as o,b as r,w as d,a as t,t as s,m as f,F as j,h as V,u as i,al as g,g as C,p as F,z,f as A}from"./index-DzrN3Ag6.js";const H={key:0,class:"card bg-white overflow-hidden"},N={class:"w-full flex flex-col justify-between h-40 rounded-md relative"},q=["src"],L={class:"bg-[#FF7C3A] activity-type absolute top-2 text-white font-medium text-xs flex items-center pl-3 pr-5 h-6"},D={class:"absolute right-[5px] top-2 bg-white text-gray-800 text-xs px-2 h-6 rounded-2xl shadow flex items-center gap-1"},O={class:"font-medium text-xs"},P={class:"absolute bottom-2 flex items-center gap-2 px-2 overflow-auto"},I=["src"],J={key:1,class:"w-8 h-8 flex items-center justify-center bg-gray-50"},E={class:"flex flex-col gap-2 pt-2"},Q={class:"text-bodyh1 font-medium truncate"},R={class:"flex gap-2 items-center"},T={class:"text-xs font-normal"},U={class:"flex gap-2 items-center justify-between"},G={class:"flex gap-2 items-center"},K={class:"text-xs font-normal"},W={class:"mt-3"},X={class:"w-full bg-gray-200 rounded-full h-[5px]"},Y={class:"flex items-center justify-between pt-2"},t6={class:"text-xs font-normal text-[#0B0B0B]"},e6={class:"text-xs font-normal flex items-center gap-1"},s6={key:1,class:"flex flex-col card w-full py-2 overflow-hidden"},i6={class:"w-full flex flex-col justify-between h-40 rounded-md relative"},o6=["src"],n6={class:"bg-[#FF7C3A] activity-type absolute top-2 text-white font-medium text-xs flex items-center pl-3 pr-5 h-6"},a6={class:"absolute right-[5px] top-2 bg-white text-gray-800 text-xs px-2 h-6 rounded-2xl shadow flex items-center gap-1"},l6={class:"font-medium text-xs"},c6={class:"absolute bottom-2 flex items-center gap-2 px-2 overflow-auto"},r6=["src"],d6={key:1,class:"w-8 h-8 flex items-center justify-center bg-gray-50"},C6={class:"self-start truncate mt-3 text-base font-medium tracking-normal text-neutral-950"},m6={class:"mt-2 text-xs tracking-normal leading-3 text-justify text-[#666666]"},u6={class:"flex flex-col gap-3 justify-between mt-2"},h6={class:"flex gap-1 items-center text-xs tracking-normal text-neutral-950"},x6={class:"self-stretch my-auto"},f6={class:"flex gap-2 items-center"},g6={class:"text-xs font-normal"},p6={class:"flex items-center justify-end"},y6={class:"flex gap-1 items-center text-sm font-medium tracking-normal text-right text-[#FF5722] uppercase hover:text-orange-700"},_6={__name:"Card",props:{type:{type:String,required:!1,default:"group"},item:{type:Object,required:!0},mode:{type:String,required:!1}},setup(e){const m=b("auth"),u=b("formatDate"),n=e,Z=S(()=>{if(m!=null&&m.isLoggedIn){if(n.item&&n.mode==="activity")return`/activity/${n.item.activity}`;if(n.item&&n.mode==="opportunity")return console.log("Opportunity",n),`/opportunity/${n.item.name}`;console.log("Unknown type",n)}else return`/kindness-volunteering/${n.item.activity}`});return(M6,c)=>{const y=$("router-link");return e.type!="group"?(o(),l("div",H,[r(y,{to:`/activity/${e.item.activity}`},{default:d(()=>{var h,a,x,_,v,w,k;return[t("div",N,[t("img",{src:e.item.activity_image||"https://res.cloudinary.com/dyt5jqnax/image/upload/v1742968038/mykartavya-logo_jptv31.png",alt:"",class:"h-full rounded-md"},null,8,q),t("div",L,s(e.item.activity_type),1),t("div",D,[c[0]||(c[0]=t("svg",{width:"16",height:"14",viewBox:"0 0 16 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M15.5002 3.66602C15.5002 2.28518 12.8885 1.16602 9.66683 1.16602C6.44516 1.16602 3.8335 2.28518 3.8335 3.66602M15.5002 3.66602V6.99935C15.5002 7.84935 14.5118 8.59935 13.0002 9.05102C12.0552 9.33435 10.906 9.49935 9.66683 9.49935C8.42766 9.49935 7.2785 9.33352 6.3335 9.05102C4.82266 8.59935 3.8335 7.84935 3.8335 6.99935V3.66602M15.5002 3.66602C15.5002 4.51602 14.5118 5.26602 13.0002 5.71768C12.0552 6.00102 10.906 6.16602 9.66683 6.16602C8.42766 6.16602 7.2785 6.00018 6.3335 5.71768C4.82266 5.26602 3.8335 4.51602 3.8335 3.66602",stroke:"#FF5722","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M0.5 6.9994V10.3327C0.5 11.1827 1.48917 11.9327 3 12.3844C3.945 12.6677 5.09417 12.8327 6.33333 12.8327C7.5725 12.8327 8.72167 12.6669 9.66667 12.3844C11.1775 11.9327 12.1667 11.1827 12.1667 10.3327V9.4994M0.5 6.9994C0.5 6.0019 1.8625 5.14107 3.83333 4.74023M0.5 6.9994C0.5 7.8494 1.48917 8.5994 3 9.05107C3.945 9.3344 5.09417 9.4994 6.33333 9.4994C6.9125 9.4994 7.47167 9.46357 8 9.39607",stroke:"#FF5722","stroke-linecap":"round","stroke-linejoin":"round"})],-1)),t("span",O,s((h=e.item.karma_points)==null?void 0:h.toLocaleString())+" Points",1)]),t("div",P,[e.item.sdgs?(o(!0),l(j,{key:0},V(JSON.parse(e.item.sdgs),p=>{var M;return o(),l("div",null,[p.image?(o(),l("img",{key:0,src:p.image,class:"w-8 h-8"},null,8,I)):(o(),l("span",J,s((M=p.sdgs_name)==null?void 0:M.charAt(0)),1))])}),256)):f("",!0)])]),t("div",E,[t("h3",Q,s(e.item.title),1),t("div",R,[c[1]||(c[1]=t("svg",{width:"16",height:"15",viewBox:"0 0 16 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M1.33331 7.00033C1.33331 4.48633 1.33331 3.22899 2.11465 2.44833C2.89598 1.66766 4.15265 1.66699 6.66665 1.66699H9.33331C11.8473 1.66699 13.1046 1.66699 13.8853 2.44833C14.666 3.22966 14.6666 4.48633 14.6666 7.00033V8.33366C14.6666 10.8477 14.6666 12.105 13.8853 12.8857C13.104 13.6663 11.8473 13.667 9.33331 13.667H6.66665C4.15265 13.667 2.89531 13.667 2.11465 12.8857C1.33398 12.1043 1.33331 10.8477 1.33331 8.33366V7.00033Z",stroke:"#666666","stroke-width":"0.75"}),t("path",{d:"M4.66666 1.66699V0.666992M11.3333 1.66699V0.666992M1.66666 5.00033H14.3333",stroke:"#666666","stroke-width":"0.75","stroke-linecap":"round"}),t("path",{d:"M12 10.3333C12 10.5101 11.9298 10.6797 11.8047 10.8047C11.6797 10.9298 11.5101 11 11.3333 11C11.1565 11 10.987 10.9298 10.8619 10.8047C10.7369 10.6797 10.6667 10.5101 10.6667 10.3333C10.6667 10.1565 10.7369 9.98695 10.8619 9.86193C10.987 9.7369 11.1565 9.66667 11.3333 9.66667C11.5101 9.66667 11.6797 9.7369 11.8047 9.86193C11.9298 9.98695 12 10.1565 12 10.3333ZM12 7.66667C12 7.84348 11.9298 8.01305 11.8047 8.13807C11.6797 8.2631 11.5101 8.33333 11.3333 8.33333C11.1565 8.33333 10.987 8.2631 10.8619 8.13807C10.7369 8.01305 10.6667 7.84348 10.6667 7.66667C10.6667 7.48986 10.7369 7.32029 10.8619 7.19526C10.987 7.07024 11.1565 7 11.3333 7C11.5101 7 11.6797 7.07024 11.8047 7.19526C11.9298 7.32029 12 7.48986 12 7.66667ZM8.66667 10.3333C8.66667 10.5101 8.59643 10.6797 8.4714 10.8047C8.34638 10.9298 8.17681 11 8 11C7.82319 11 7.65362 10.9298 7.5286 10.8047C7.40357 10.6797 7.33333 10.5101 7.33333 10.3333C7.33333 10.1565 7.40357 9.98695 7.5286 9.86193C7.65362 9.7369 7.82319 9.66667 8 9.66667C8.17681 9.66667 8.34638 9.7369 8.4714 9.86193C8.59643 9.98695 8.66667 10.1565 8.66667 10.3333ZM8.66667 7.66667C8.66667 7.84348 8.59643 8.01305 8.4714 8.13807C8.34638 8.2631 8.17681 8.33333 8 8.33333C7.82319 8.33333 7.65362 8.2631 7.5286 8.13807C7.40357 8.01305 7.33333 7.84348 7.33333 7.66667C7.33333 7.48986 7.40357 7.32029 7.5286 7.19526C7.65362 7.07024 7.82319 7 8 7C8.17681 7 8.34638 7.07024 8.4714 7.19526C8.59643 7.32029 8.66667 7.48986 8.66667 7.66667ZM5.33333 10.3333C5.33333 10.5101 5.2631 10.6797 5.13807 10.8047C5.01305 10.9298 4.84348 11 4.66667 11C4.48986 11 4.32029 10.9298 4.19526 10.8047C4.07024 10.6797 4 10.5101 4 10.3333C4 10.1565 4.07024 9.98695 4.19526 9.86193C4.32029 9.7369 4.48986 9.66667 4.66667 9.66667C4.84348 9.66667 5.01305 9.7369 5.13807 9.86193C5.2631 9.98695 5.33333 10.1565 5.33333 10.3333ZM5.33333 7.66667C5.33333 7.84348 5.2631 8.01305 5.13807 8.13807C5.01305 8.2631 4.84348 8.33333 4.66667 8.33333C4.48986 8.33333 4.32029 8.2631 4.19526 8.13807C4.07024 8.01305 4 7.84348 4 7.66667C4 7.48986 4.07024 7.32029 4.19526 7.19526C4.32029 7.07024 4.48986 7 4.66667 7C4.84348 7 5.01305 7.07024 5.13807 7.19526C5.2631 7.32029 5.33333 7.48986 5.33333 7.66667Z",fill:"#666666"})],-1)),t("p",T,s(i(u)(e.item.start_date))+" - "+s(i(u)(e.item.end_date)),1)]),t("div",U,[t("div",G,[r(i(g),{text:"Activity Hours"},{default:d(()=>[r(i(C),{name:"clock",class:"size-4"}),t("p",K,s(e.item.hours)+" hr",1)]),_:1})]),r(i(g),{text:"Review under proccess"},{default:d(()=>[e.item.completion_wf_state=="Submitted"?(o(),F(i(C),{key:0,name:"clock",class:"size-4 text-yellow-500"})):f("",!0)]),_:1}),r(i(g),{text:"Completed"},{default:d(()=>[e.item.completion_wf_state=="Approved"?(o(),F(i(C),{key:0,name:"check-circle",class:"size-4 text-green-500"})):f("",!0)]),_:1})])]),t("div",W,[t("div",X,[t("div",{class:"bg-[#4CAF50] h-[5px] rounded-full",style:z({width:`${(x=(a=e.item)==null?void 0:a.com_percent)!=null?x:0}%`})},null,4)]),t("div",Y,[t("p",t6,s((v=(_=e.item)==null?void 0:_.com_percent)!=null?v:0)+"% completed ",1),t("p",e6,[r(i(C),{name:"clock",class:"size-3"}),A(" "+s((w=e.item)!=null&&w.donet_hours?(((k=e.item)==null?void 0:k.donet_hours)/60/60).toFixed(2):"0")+" hr ",1)])])])]}),_:1},8,["to"])])):(o(),l("article",s6,[r(y,{to:Z.value},{default:d(()=>{var h;return[t("div",i6,[t("img",{src:e.item.activity_image||"https://res.cloudinary.com/dyt5jqnax/image/upload/v1742968038/mykartavya-logo_jptv31.png",alt:"",class:"h-full rounded-md"},null,8,o6),t("div",n6,s(e.item.activity_type),1),t("div",a6,[c[2]||(c[2]=t("svg",{width:"16",height:"14",viewBox:"0 0 16 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M15.5002 3.66602C15.5002 2.28518 12.8885 1.16602 9.66683 1.16602C6.44516 1.16602 3.8335 2.28518 3.8335 3.66602M15.5002 3.66602V6.99935C15.5002 7.84935 14.5118 8.59935 13.0002 9.05102C12.0552 9.33435 10.906 9.49935 9.66683 9.49935C8.42766 9.49935 7.2785 9.33352 6.3335 9.05102C4.82266 8.59935 3.8335 7.84935 3.8335 6.99935V3.66602M15.5002 3.66602C15.5002 4.51602 14.5118 5.26602 13.0002 5.71768C12.0552 6.00102 10.906 6.16602 9.66683 6.16602C8.42766 6.16602 7.2785 6.00018 6.3335 5.71768C4.82266 5.26602 3.8335 4.51602 3.8335 3.66602",stroke:"#FF5722","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{d:"M0.5 6.9994V10.3327C0.5 11.1827 1.48917 11.9327 3 12.3844C3.945 12.6677 5.09417 12.8327 6.33333 12.8327C7.5725 12.8327 8.72167 12.6669 9.66667 12.3844C11.1775 11.9327 12.1667 11.1827 12.1667 10.3327V9.4994M0.5 6.9994C0.5 6.0019 1.8625 5.14107 3.83333 4.74023M0.5 6.9994C0.5 7.8494 1.48917 8.5994 3 9.05107C3.945 9.3344 5.09417 9.4994 6.33333 9.4994C6.9125 9.4994 7.47167 9.46357 8 9.39607",stroke:"#FF5722","stroke-linecap":"round","stroke-linejoin":"round"})],-1)),t("span",l6,s((h=e.item.karma_points)==null?void 0:h.toLocaleString())+" Points",1)]),t("div",c6,[e.item.sdgs?(o(!0),l(j,{key:0},V(JSON.parse(e.item.sdgs),a=>{var x;return o(),l("div",null,[a!=null&&a.image?(o(),l("img",{key:0,src:a==null?void 0:a.image,class:"w-8 h-8"},null,8,r6)):(o(),l("span",d6,s((x=a==null?void 0:a.sdgs_name)==null?void 0:x.charAt(0)),1))])}),256)):f("",!0)])]),t("h3",C6,s(e.item.activity_name),1),t("p",m6,s(e.item.opportunity_description),1),t("div",u6,[t("div",h6,[c[3]||(c[3]=t("svg",{width:"16",height:"15",viewBox:"0 0 16 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M1.33331 7.00033C1.33331 4.48633 1.33331 3.22899 2.11465 2.44833C2.89598 1.66766 4.15265 1.66699 6.66665 1.66699H9.33331C11.8473 1.66699 13.1046 1.66699 13.8853 2.44833C14.666 3.22966 14.6666 4.48633 14.6666 7.00033V8.33366C14.6666 10.8477 14.6666 12.105 13.8853 12.8857C13.104 13.6663 11.8473 13.667 9.33331 13.667H6.66665C4.15265 13.667 2.89531 13.667 2.11465 12.8857C1.33398 12.1043 1.33331 10.8477 1.33331 8.33366V7.00033Z",stroke:"#666666","stroke-width":"0.75"}),t("path",{d:"M4.66666 1.66699V0.666992M11.3333 1.66699V0.666992M1.66666 5.00033H14.3333",stroke:"#666666","stroke-width":"0.75","stroke-linecap":"round"}),t("path",{d:"M12 10.3333C12 10.5101 11.9298 10.6797 11.8047 10.8047C11.6797 10.9298 11.5101 11 11.3333 11C11.1565 11 10.987 10.9298 10.8619 10.8047C10.7369 10.6797 10.6667 10.5101 10.6667 10.3333C10.6667 10.1565 10.7369 9.98695 10.8619 9.86193C10.987 9.7369 11.1565 9.66667 11.3333 9.66667C11.5101 9.66667 11.6797 9.7369 11.8047 9.86193C11.9298 9.98695 12 10.1565 12 10.3333ZM12 7.66667C12 7.84348 11.9298 8.01305 11.8047 8.13807C11.6797 8.2631 11.5101 8.33333 11.3333 8.33333C11.1565 8.33333 10.987 8.2631 10.8619 8.13807C10.7369 8.01305 10.6667 7.84348 10.6667 7.66667C10.6667 7.48986 10.7369 7.32029 10.8619 7.19526C10.987 7.07024 11.1565 7 11.3333 7C11.5101 7 11.6797 7.07024 11.8047 7.19526C11.9298 7.32029 12 7.48986 12 7.66667ZM8.66667 10.3333C8.66667 10.5101 8.59643 10.6797 8.4714 10.8047C8.34638 10.9298 8.17681 11 8 11C7.82319 11 7.65362 10.9298 7.5286 10.8047C7.40357 10.6797 7.33333 10.5101 7.33333 10.3333C7.33333 10.1565 7.40357 9.98695 7.5286 9.86193C7.65362 9.7369 7.82319 9.66667 8 9.66667C8.17681 9.66667 8.34638 9.7369 8.4714 9.86193C8.59643 9.98695 8.66667 10.1565 8.66667 10.3333ZM8.66667 7.66667C8.66667 7.84348 8.59643 8.01305 8.4714 8.13807C8.34638 8.2631 8.17681 8.33333 8 8.33333C7.82319 8.33333 7.65362 8.2631 7.5286 8.13807C7.40357 8.01305 7.33333 7.84348 7.33333 7.66667C7.33333 7.48986 7.40357 7.32029 7.5286 7.19526C7.65362 7.07024 7.82319 7 8 7C8.17681 7 8.34638 7.07024 8.4714 7.19526C8.59643 7.32029 8.66667 7.48986 8.66667 7.66667ZM5.33333 10.3333C5.33333 10.5101 5.2631 10.6797 5.13807 10.8047C5.01305 10.9298 4.84348 11 4.66667 11C4.48986 11 4.32029 10.9298 4.19526 10.8047C4.07024 10.6797 4 10.5101 4 10.3333C4 10.1565 4.07024 9.98695 4.19526 9.86193C4.32029 9.7369 4.48986 9.66667 4.66667 9.66667C4.84348 9.66667 5.01305 9.7369 5.13807 9.86193C5.2631 9.98695 5.33333 10.1565 5.33333 10.3333ZM5.33333 7.66667C5.33333 7.84348 5.2631 8.01305 5.13807 8.13807C5.01305 8.2631 4.84348 8.33333 4.66667 8.33333C4.48986 8.33333 4.32029 8.2631 4.19526 8.13807C4.07024 8.01305 4 7.84348 4 7.66667C4 7.48986 4.07024 7.32029 4.19526 7.19526C4.32029 7.07024 4.48986 7 4.66667 7C4.84348 7 5.01305 7.07024 5.13807 7.19526C5.2631 7.32029 5.33333 7.48986 5.33333 7.66667Z",fill:"#666666"})],-1)),t("time",x6,s(i(u)(e.item.start_date))+" - "+s(i(u)(e.item.end_date)),1)]),t("div",f6,[r(i(g),{text:"Hours"},{default:d(()=>[r(i(C),{name:"clock",class:"size-4"}),t("p",g6,s(e.item.hours)+" hr",1)]),_:1})]),t("div",p6,[t("div",y6,[c[4]||(c[4]=t("p",null,"Act now",-1)),r(i(C),{name:"arrow-up-right",class:"size-4"})])])])]}),_:1},8,["to"])]))}}},j6=B(_6,[["__scopeId","data-v-9f4773f2"]]),v6="/assets/mykartavya/frontend/assets/empty-CZQz4oPV.png",w6={class:"w-full h-full flex flex-col justify-center items-center"},k6={class:"text-2xl text-gray-600"},V6={__name:"NotFound",props:{message:{type:String,default:"Data Not Found!"}},setup(e){const m=e;return(u,n)=>(o(),l("div",w6,[n[0]||(n[0]=t("img",{src:v6,alt:""},null,-1)),t("p",k6,s(m.message),1)]))}};export{j6 as C,V6 as _};
