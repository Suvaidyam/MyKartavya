import{r as d,c as n,o as l,b as e,s as x,f as y,e as p,u,F as b,g as h,q as k,y as V,t as i,k as A,v as _,d as S,_ as F,h as g,z as L}from"./index-Bz-WKddl.js";import{c as E,S as W,F as D,T as Q,L as U,M as N}from"./twitter-B59fbgrI.js";const $="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD4SURBVHgBvZThEYIwDIWDxwBsICOwgSuwAXUCzwl0AzqCToIbyAZ0A9ggpmd6xFpr+0Pf3bsmtP1o2gLAP4SILflArjmvyCeyghxZAHnCVQN55ti2VSrIrqDHuPookMuaME93WfZG8Gp2jhpyFYItkKYreS9yE4JtIQFUFIWidhQv372MoLq7hP258NgG15N16iTM79S8uSkgq1nClOzA5z2rGPgNZKX8UrXonBwwAXQOHcBNxDV5INvVNS6GsIwLSg8AISB8BgFE7tkYAMZABsTK3sQbrzEujZkfu/xLDP7hhOaVoYd0yxeacOQyNec2bm1ZlBv4tR6cZ+qoej++mwAAAABJRU5ErkJggg==";/**
 * @license lucide-vue-next v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=E("CheckIcon",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=E("RefreshCwIcon",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]),X={class:"bg-white rounded-lg"},Y={class:"bg-white p-6 rounded-lg w-full relative"},H={class:"flex justify-between items-center mb-4"},J={class:"relative border-gray-300 pl-6"},ee={key:1,src:$,alt:"",class:"w-4 h-4"},te={class:"text-sm font-semibold text-gray-900 m-4"},se={class:"text-lg font-semibold m-4"},oe={class:"text-gray-600 text-sm ml-4 mt-0"},ae=["onClick"],le={key:0,class:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"},ne={class:"bg-white rounded-lg shadow-lg p-6 w-[500px]"},ie={class:"flex justify-between items-center border-b pb-2 mb-4"},re={class:"mb-4"},de={class:"flex gap-2"},ce={class:"mb-4"},pe={class:"flex items-center gap-2"},ue={class:"w-12 text-center"},me={class:"mb-4"},ge={class:"border-dashed border-2 border-gray-300 p-6 rounded-lg text-center relative"},be={class:"flex gap-2 mt-3"},he=["src"],ve={key:1,class:"fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"},fe={class:"bg-white p-6 rounded-lg shadow-lg"},xe={class:"flex justify-end mt-4"},ye={key:2,class:"absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"},we={class:"bg-white rounded-lg shadow-lg w-full max-w-md"},ke={class:"flex justify-between items-center border-b p-4"},Ae={class:"p-4"},_e={class:"flex justify-center gap-6 my-3"},Se=["onClick"],je={class:"p-4"},Ce={__name:"Stepper",setup(T){const m=d(0),v=d(!1),f=d(!1),a=d(!1),o=d([{title:"Activity Approval",description:"Is your application to volunteer for the activity approved?",button:"Request for Approval",completed:!1},{title:"Get Started",description:"Click the button below once you are ready to start the activity",button:"Start Activity",completed:!1},{title:"Activity Report",description:"Click the button below once you have finished the activity & submit a small report",button:"Submit Report",completed:!1},{title:"Feedback & Karma Points",description:"Click the button to register the feedback & collect your karma points",button:"Submit Feedback",completed:!1}]),j=c=>{c===2?f.value=!0:c===m.value?(o.value[c].completed=!0,m.value++):v.value=!0},w=()=>{f.value=!1,o.value[2].completed=!0,m.value++},G=()=>{o.value.forEach(c=>c.completed=!1),m.value=0},I=d(""),R=d(""),C=d(30),O=d([]),K=c=>{const t=c.target.files;for(let s of t){const r=new FileReader;r.onload=B=>{O.value.push(B.target.result)},r.readAsDataURL(s)}},P=d([{icon:"😞",label:"Bad"},{icon:"😐",label:"Neutral"},{icon:"😊",label:"Good"},{icon:"🙂",label:"Great"}]),M=d(null),z=d("");return(c,t)=>(l(),n("div",null,[e("div",X,[e("div",Y,[e("div",H,[t[9]||(t[9]=e("h2",{class:"text-heading4 font-medium"},"Timeline",-1)),e("button",{onClick:G,class:"text-pink-500 flex items-center text-bodyh2 font-normal px-4 py-1 rounded-sm border"},[t[8]||(t[8]=y(" Refresh ")),p(u(Z),{class:"w-4 h-4 ml-1"})])]),e("div",J,[(l(!0),n(b,null,h(o.value,(s,r)=>(l(),n("div",{key:r,class:"mb-6 relative border-l"},[e("div",{class:k(["absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center",s.completed?"bg-green-500 text-white":"bg-orange-500 text-white "])},[s.completed?(l(),V(u(q),{key:0,class:"w-4 h-4"})):(l(),n("img",ee))],2),e("div",{class:k(r>m.value?"blur-sm opacity-50 pointer-events-none ":"")},[e("p",te," STEP "+i(r+1),1),e("h3",se,i(s.title),1),e("p",oe,i(s.description),1),s.button?(l(),n("button",{key:0,onClick:B=>j(r),class:k(["mt-2 h-[28px] w-[147px] rounded-sm text-caption font-medium text-white ml-2",(r===o.value.length-1,"bg-orange-500")])},i(s.button),11,ae)):x("",!0)],2)]))),128))]),f.value?(l(),n("div",le,[e("div",ne,[e("div",ie,[t[10]||(t[10]=e("h2",{class:"text-lg font-semibold"},"Activity Completion",-1)),e("button",{onClick:t[0]||(t[0]=s=>f.value=!1),class:"text-gray-500 hover:text-gray-700"}," × ")]),e("div",re,[t[11]||(t[11]=e("label",{class:"block font-medium mb-1"},"How much time you donated while working on the activity?",-1)),e("div",de,[A(e("input",{type:"number","onUpdate:modelValue":t[1]||(t[1]=s=>I.value=s),placeholder:"Hours",class:"w-20 border rounded p-2"},null,512),[[_,I.value]]),A(e("input",{type:"number","onUpdate:modelValue":t[2]||(t[2]=s=>R.value=s),placeholder:"Minutes",class:"w-20 border rounded p-2"},null,512),[[_,R.value]])])]),e("div",ce,[t[12]||(t[12]=e("label",{class:"block font-medium mb-1"},"How much percent work has completed?",-1)),e("div",pe,[A(e("input",{type:"range",min:"0",max:"100","onUpdate:modelValue":t[3]||(t[3]=s=>C.value=s),class:"w-full accent-green-500"},null,512),[[_,C.value]]),e("span",ue,i(C.value)+"%",1)])]),e("div",me,[t[14]||(t[14]=e("label",{class:"block font-medium mb-2"},"Upload Media",-1)),e("div",ge,[e("input",{type:"file",multiple:"",onChange:K,class:"absolute inset-0 w-full h-full opacity-0 cursor-pointer"},null,32),t[13]||(t[13]=S('<div class="flex flex-col items-center text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V3m0 0l-3.5 3.5M12 3l3.5 3.5"></path><path stroke-linecap="round" stroke-linejoin="round" d="M6 14.25v4.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-4.5"></path></svg><p class="mt-2"> Drag &amp; drop files or <span class="text-orange-500 cursor-pointer">Browse</span></p><p class="text-sm">Supported formats: JPEG, PNG</p></div>',1))]),e("div",be,[(l(!0),n(b,null,h(O.value,(s,r)=>(l(),n("img",{key:r,src:s,class:"w-16 h-16 rounded object-cover"},null,8,he))),128))])]),e("button",{onClick:w,class:"w-full bg-orange-500 text-white py-2 rounded text-center font-semibold hover:bg-orange-600"}," MARK AS COMPLETE ")])])):x("",!0),a.value?(l(),n("div",ve,[e("div",fe,[t[15]||(t[15]=e("h3",{class:"text-lg font-semibold mb-4"}," Submit Your Activity Report ",-1)),t[16]||(t[16]=e("p",{class:"text-gray-600"}," Please upload a summary of your activity. ",-1)),t[17]||(t[17]=e("textarea",{class:"border rounded w-full p-2 mt-2",rows:"4",placeholder:"Write your report here..."},null,-1)),e("div",xe,[e("button",{onClick:t[4]||(t[4]=(...s)=>c.submitFeedback&&c.submitFeedback(...s)),class:"px-4 py-2 bg-orange-500 text-white rounded"}," Submit ")])])])):x("",!0),v.value?(l(),n("div",ye,[e("div",we,[e("div",ke,[t[18]||(t[18]=e("h2",{class:"text-lg font-semibold"},"Share Feedback",-1)),e("button",{onClick:t[5]||(t[5]=s=>c.isOpen=!1),class:"text-gray-500 hover:text-gray-700 text-xl"}," × ")]),e("div",Ae,[t[19]||(t[19]=e("label",{class:"block font-medium mb-2 text-gray-700"},"How would you rate your experience with the activity?",-1)),e("div",_e,[(l(!0),n(b,null,h(P.value,(s,r)=>(l(),n("button",{key:r,onClick:B=>M.value=s,class:k(["text-3xl focus:outline-none transition duration-200",M.value===s?"text-orange-500":"text-gray-400"])},i(s.icon),11,Se))),128))]),t[20]||(t[20]=e("label",{class:"block font-medium mb-2 text-gray-700"},"Comments (Optional)",-1)),A(e("textarea",{"onUpdate:modelValue":t[6]||(t[6]=s=>z.value=s),class:"w-full border rounded p-2 h-20 resize-none"},null,512),[[_,z.value]])]),e("div",je,[e("button",{onClick:t[7]||(t[7]=s=>v.value=!1),class:"w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600"}," SUBMIT FEEDBACK ")])])])):x("",!0)])])]))}},Be={class:"h-screen w-full"},Ie={class:"w-full h-[456px] md:h-[456px] back-img flex items-center mt-10 px-4 md:px-20"},Re={class:"max-w-sm w-[448px] h-[312px] bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-4 justify-center"},Oe={class:"flex gap-1",style:{color:"#666666"}},Me={class:"flex items-center text-gray-600 text-bodyh2 font-normal justify-between border-b pb-2"},ze={class:"flex justify-center gap-1",style:{color:"#0b0b0b"}},Ve={class:"flex items-center gap-2 justify-center",style:{color:"#0b0b0b"}},Ee={class:"w-full bg-gray-700"},Te={class:"p-6 md:p-10 bg-gray-100"},Ge={class:"grid gap-6 lg:grid-cols-3"},Ke={class:"lg:col-span-2"},Pe={class:"flex items-center gap-[12px] flex-col justify-self-start mt-[220px]"},Fe={class:"text-gray-700 font-medium flex items-center space-x-2"},Le={class:"flex items-center gap-3 justify-start w-[230px]"},We=["aria-label"],De={class:"mt-10"},Qe={class:"mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center"},Ue={class:"relative"},Ne=["src","alt"],$e={class:"absolute top-2 left-2 bg-orange-500 text-white text-xs px-3 py-1 rounded-br-lg"},qe={class:"absolute top-2 right-2 bg-white text-[#0B0B0B] text-xs px-2 py-1 rounded-full shadow"},Ze={class:"font-semibold"},Xe={class:"absolute left-2 bottom-2 flex items-center space-x-2 text-sm text-gray-700 font-medium mb-2"},Ye={class:"bg-white text-black px-2 py-1 rounded text-xs"},He={class:"p-4"},Je={class:"text-bodyh1 font-medium",style:{color:"#0b0b0b"}},et={class:"text-caption font-normal mt-1 font-poppins",style:{color:"#666666"}},tt={class:"flex items-center text-sm text-gray-500 mt-3"},st={class:"flex items-center gap-1 text-caption font-normal",style:{color:"#0b0b0b"}},ot={class:"ml-auto gap-1 flex items-center text-caption font-normal",style:{color:"#0b0b0b"}},at={class:"flex items-center mt-3"},lt={class:"flex -space-x-2"},nt=["src","alt"],it={key:0,class:"w-8 h-8 bg-gray-200 text-gray-600 flex items-center justify-center rounded-full text-sm font-medium border-2 border-white"},rt={class:"ml-auto text-orange-600 font-semibold text-sm flex gap-1"},dt={__name:"Empower",setup(T){const m=[{name:"Facebook",svg:D},{name:"X",svg:Q},{name:"LinkedIn",svg:U},{name:"WhatsApp",svg:N}],v=[{id:1,title:"Empower the needy",description:"This Women's Entrepreneurship Day, let's empower underserved women running small business...",image:"https://s3-alpha-sig.figma.com/img/2878/a4c5/9c959de9c3b9d28a480e8fc8a4b1bd81?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=deepSM9~pkpevq~2swFyA4g0zXUcOIZPg5bJaXVkcmNHwIVlwtQXJawLkEvr0pX3TeNueL4NtGlBtDG~zjxi8~C3mdRVPemZZudl8iw762tyT0kEi9Bk~9VwXQL299RLLLCnWeZYJo2pjXO-LuRi5aIUSu6rLnhmt3tjg7~pk5d8ICtHc2dOAKj~y80StIzWEII1KaRnoaoIQ8tDNap8Irp-3yBAItf~HCCc16FR8mdsShP0NlfshhwZxB6tEXVhfTPVj5bqC358wSr1CXqzQjbEfFqOTyETJm9zxc7OV6si2QRhJgtEzlXmgjtRGYUUy4~tv4w7SiEbkpBKNyQ0Wg__",type:"On-Ground",points:40,sdg:"SDG 10 : Reduced Inequalities",dateRange:"01 Oct, 2024 - 30 Nov, 2024",hours:"50 hr",users:[{avatar:"../assets/download (3).jpeg"},{avatar:"../assets/download (2).jpeg"},{avatar:"../assets/download (2).jpeg"},{avatar:"../assets/download (3).jpeg"},{avatar:"../assets/download (2).jpeg"}]},{id:2,title:"Bright Bites",description:"This Women's Entrepreneurship Day, let's empower underserved women running small business...",image:"https://s3-alpha-sig.figma.com/img/4925/6686/2536992c32f72f58b66a7769a6226fd1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=a67iRkNKrfuO9FTJtxqySKsKg5XqiMxUz1NxW8eM5WfcZVDQT8QkUooHVg1CSh78LVVcG10OAmc-t2OIopz4itRPsaOYaYfvfebE0Ry30XoFWYamZZvFhpaeEW5vNaaf63K1bWbYtve9-3TOHs~5sl8vbA0ZEQxUn0sLDpGWgHkVloOodLSsRoMYFWdiq83kUNufCZeuByWzxJwewyIbkG~N~B5Z844DNOvbTdlZau~nJOb3qlqbRGYMvE~o0-FZfbLnvJ4w6npXKXS7I--Wd-~d4S7c1yAs73wi2UnUX4UjkBTsSyyNE-zj20h~vk9AvWr~sO61Ulh57uWYG~RmFQ__",type:"On-Ground",points:40,sdg:"SDG 10 : Reduced Inequalities",dateRange:"01 Oct, 2024 - 30 Nov, 2024",hours:"50 hr",users:[{avatar:"../assets/download (3).jpeg"},{avatar:"../assets/download (2).jpeg"},{avatar:"../assets/download (2).jpeg"},{avatar:"../assets/download (3).jpeg"},{avatar:"../assets/download (2).jpeg"}]},{id:3,title:"Beat the sugar",description:"This Women's Entrepreneurship Day, let's empower underserved women running small business...",image:"https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__",type:"On-Ground",points:40,sdg:"SDG 10 : Reduced Inequalities",dateRange:"01 Oct, 2024 - 30 Nov, 2024",hours:"50 hr",users:[{avatar:"../assets/download (3).jpeg"},{avatar:"../assets/download (2).jpeg"},{avatar:"../assets/download (2).jpeg"},{avatar:"../assets/download (3).jpeg"},{avatar:"../assets/download (2).jpeg"}]}];return(f,a)=>(l(),n("div",Be,[e("section",null,[e("div",Ie,[e("div",Re,[a[3]||(a[3]=e("div",{class:"border-b pb-2"},[e("div",{class:"text-gray-500 text-caption font-normal"}," My Karma / Kindness & Volunteering / Empower the needy "),e("h2",{class:"text-heading3 font-normal font-poppins mt-1"}," Empower the needy "),e("span",{class:"text-secondary font-medium text-caption"},"Online")],-1)),e("div",Oe,[p(u(g),{name:"calendar",class:"size-4 text-[#666666]"}),a[0]||(a[0]=e("span",{class:"flex items-center text-bodyh2 font-normal mr-4",style:{color:"#0b0b0b"}}," 01 Oct, 2024 - 30 Nov, 2024 ",-1))]),e("div",Me,[e("span",ze,[p(u(g),{name:"clock",class:"size-4 text-[#666666]"}),a[1]||(a[1]=y(" 50 hr "))]),e("span",Ve,[p(u(g),{name:"database",class:"size-4 text-secondary"}),a[2]||(a[2]=e("span",{class:"text-bodyh2 font-normal"}," 40 Points",-1))])]),a[4]||(a[4]=S('<div class="flex space-x-2 border-b pb-2" data-v-e6d68545><img src="https://s3-alpha-sig.figma.com/img/898b/9a5c/5eac9b190fb13207adabb3086b70731b?Expires=1740960000&amp;Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&amp;Signature=k0HgHMabVhEH5zXQfC7Y-T3VRTGLkbVh3CF-7U3dLsdJKHJn7LY~3g9fVJt6~MzCFuUan1rOU2ScbHhIcSVzRW326B-RGG3SjtQdGg0FR4L6Ib8VHyVQlRnXtA025TCVDifmrnVqQBJCTDxZiWdT2V8hGl8PGBpps1vlIWariZI7Dt2zRrxnHRYNwMUmTbGJS-Dt3egr13OP5smtgglO2PTc6oVst4kc2wykva2uIhlrpdQ~xug9VtkmweOtDhz4k10Db65Oc7UqmnlWhy4xNMSDmjk2zjKfTcjsidzI36OwHf-MHhwjz-weJyChhP5CTRiHn3WASMcQqlp35DsgDA__" class="w-10 h-10" alt="Goal 10" data-v-e6d68545><img src="https://s3-alpha-sig.figma.com/img/77ec/4184/a463a59fc378c1ee77d824caf08528b3?Expires=1740960000&amp;Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&amp;Signature=j90JYppUcg2cLQ1-BOIm50A5DQ0mJ~82F7-ukZPIPc7CbhyAPySKPqfz~xshvTL2sSPZXiKq6zqifAp94u8GazYKe6Gz2VO1QjoD5EjW7kHNTsLuw1vM7B0we8dv5mUbFgSK9fJ8-D231cnJuBegTC7yzmw-6Ju-5PUkWjkv7RV6MbxTsVyIsgxxKlaTRid21s1LzA6Jgg4fZrSLvzfpbIbWwwateY3jDQM6DEZ7qS9D3JxkXoZ0RkGDVxcZBCiKADeY9GOQnsjR~RmeiVHFsllKCL2c-0fkcSYz9Wv6UhsMXUKiQ6bxiA1EFWnnuyewI1V4rzd-6q8ly~PwfM3Y0Q__" class="w-10 h-10" alt="Goal 11" data-v-e6d68545></div><div class="" data-v-e6d68545><div class="w-full bg-gray-200 rounded-full h-[5px]" data-v-e6d68545><div class="bg-green-500 h-[5px] rounded-full" style="width:60%;" data-v-e6d68545></div></div><p class="text-caption font-normal mt-1" style="color:#0b0b0b;" data-v-e6d68545> 60% completed </p></div>',2))])])]),e("section",Ee,[e("div",Te,[e("div",Ge,[e("div",Ke,[a[6]||(a[6]=S('<p class="mb-4 text-bodyh2 font-normal text-justify" style="color:#666666;" data-v-e6d68545><span class="text-[47px] text-black" data-v-e6d68545>T</span>his Women&#39;s Entrepreneurship Day, let&#39;s empower underserved women running small businesses or working in our communities by sharing positive reviews of their businesses on our social media platforms. By highlighting their names and services, we can increase their visibility, boost their confidence, and foster growth.This small act of kindness can have a significant impact, bringing hope and faith to these women as they navigate their entrepreneurial journeys. Together, we can create a supportive network that uplifts and inspires! </p><h2 class="text-heading4 font-medium mt-6" style="color:#0b0b0b;" data-v-e6d68545> Volunteer Role </h2><p class="mt-2 text-bodyh2 font-normal text-justify" style="color:#666666;" data-v-e6d68545> Volunteers are encouraged to identify a small business or an underserved woman in their community and capture a photo or video showcasing her work. Along with the visual, write a positive review that highlights her efforts and talents on your social media platforms. This simple gesture can significantly boost her business, while also encouraging her personally and fostering self-confidence.By sharing these stories, we not only promote their work but also inspire others to recognize the value of supporting women entrepreneurs. Let&#39;s come together to uplift and empower these remarkable women, helping them shine in their communities! </p><div class="mt-4" data-v-e6d68545><p class="text-[14px] font-poppins font-normal leading-[23.8px] tracking-[0.0025em] text-[#666666] text-justify" style="word-spacing:16px;" data-v-e6d68545> Share your experience along with pictures on your social media handles and tag us on social media using <span class="text-secondary hover:cursor-pointer" data-v-e6d68545>@MyKaratvaya @NASSCOMfdn</span></p><p class="mt-2 text-bodyh2 font-normal font-poppins" style="color:#666666;" data-v-e6d68545> Use hashtag #MyKartavya #DoGoodFeelGood #LittleActMatters #womenempowerment#letsgrowtogether </p></div>',4)),e("div",Pe,[e("span",Fe,[p(u(W),{class:"w-4 h-4 text-[#666666]"}),a[5]||(a[5]=e("span",{class:"text-bodyh1 font-medium font-poppins",style:{color:"#0b0b0b"}},"Share activity with others",-1))]),e("div",Le,[(l(),n(b,null,h(m,o=>e("button",{key:o.name,"aria-label":o.name,class:"p-1.5 bg-white rounded-full hover:bg-gray-300"},[(l(),V(L(o.svg),{class:"w-5 h-5 text-gray-600"}))],8,We)),64))])])]),e("div",null,[p(Ce)])]),e("div",De,[a[8]||(a[8]=S('<div class="flex justify-between" data-v-e6d68545><h2 class="text-heading4 font-medium font-poppins" style="color:#0b0b0b;" data-v-e6d68545> Related Opportunities </h2><div class="flex gap-3" data-v-e6d68545><i class="fa-solid fa-less-than w-[7px] h-[12px] text-[#999999]" data-v-e6d68545></i><i class="fa-solid fa-greater-than w-[7px] h-[12px] text-[#0B0B0B]" data-v-e6d68545></i></div></div>',1)),e("div",Qe,[(l(),n(b,null,h(v,o=>e("div",{key:o.id,class:"bg-white rounded-lg shadow-lg overflow-hidden"},[e("div",Ue,[e("img",{src:o.image,alt:o.title,class:"object-cover"},null,8,Ne),e("div",$e,i(o.type),1),e("div",qe,[e("span",Ze,i(o.points)+" Points",1)]),e("div",Xe,[e("span",Ye,i(o.sdg),1)])]),e("div",He,[e("h3",Je,i(o.title),1),e("p",et,i(o.description),1),e("div",tt,[e("span",st,[p(u(g),{name:"calendar",class:"size-4 text-[#666666]"}),y(" "+i(o.dateRange),1)]),e("p",ot,[p(u(g),{name:"clock",class:"size-4 text-[#666666]"}),y(" "+i(o.hours),1)])]),e("div",at,[e("div",lt,[(l(!0),n(b,null,h(o.users.slice(0,3),(j,w)=>(l(),n("img",{key:w,src:j.avatar,alt:`User ${w+1}`,class:"w-8 h-8 rounded-full border-2 border-white"},null,8,nt))),128)),o.users.length>3?(l(),n("div",it," +"+i(o.users.length-3),1)):x("",!0)]),e("button",rt,[a[7]||(a[7]=y(" ACT NOW ")),p(u(g),{name:"arrow-up-right",class:"size-4 text-secondary"})])])])])),64))])])])])]))}},ut=F(dt,[["__scopeId","data-v-e6d68545"]]);export{ut as default};
