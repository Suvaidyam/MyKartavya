var b=(x,c,n)=>new Promise((s,l)=>{var a=t=>{try{o(n.next(t))}catch(e){l(e)}},i=t=>{try{o(n.throw(t))}catch(e){l(e)}},o=t=>t.done?s(t.value):Promise.resolve(t.value).then(a,i);o((n=n.apply(x,c)).next())});import{r as m,s as _,c as p,a as r,e as k,v as g,x as v,y,z as C,f as h,b as O,w as B,d as P,i as V,B as H,j as f}from"./index-vnxk1rEP.js";import{_ as j,a as S,b as T}from"./Frame (1)-BNHRP8Uf.js";import{l as u}from"./index-QRYEKIkq.js";/* empty css              */const K={class:"flex pt-[62px] flex-col items-center min-h-screen bg-secondary",style:{background:"#f5f5f5"}},N={class:"flex flex-col items-center text-center w-full px-4 min-h-[calc(100vh-64px)] justify-center"},R={class:"mt-8 bg-white p-6 rounded-sm w-full max-w-[443px] shadow-md"},q=["disabled"],A={key:0,class:"h-5 w-5"},E={key:1},J={class:"text-sm mt-4 text-gray-600"},$={__name:"Register",setup(x){const c=V("call"),n=H(),s=m(""),l=m(""),a=m(!1),i=_(()=>{const t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return l.value.trim()!==""&&t.test(s.value)}),o=()=>b(this,null,function*(){if(!i.value){l.value.trim()===""&&u.error("Full name is required",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0}),s.value?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.value)||u.error("Please enter a valid email address",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0}):u.error("Email is required",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0});return}try{a.value=!0;const t=yield c("mykartavya.controllers.email.register_send_otp",{email:s.value});t.status==="success"?(a.value=!1,u.success("OTP sent successfully",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0}),n.push({name:"Verify",query:{email:s.value,full_name:l.value}})):(a.value=!1,u.error(t.message,{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0}))}catch(t){u.error("Something went wrong",{autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0}),a.value=!1}});return(t,e)=>{const w=P("router-link");return f(),p("div",K,[r("main",N,[e[6]||(e[6]=k('<h1 class="text-[28px] md:text-[33px] font-medium font-poppins"> Your Journey of Kindness Starts Here </h1><div class="text-center mt-2"><div class="flex flex-wrap justify-center gap-2 md:gap-4"><button class="border px-4 h-8 items-center bg-white rounded-full text-black border-orange-500 flex gap-1"><img src="'+j+'" alt="" class="w-4"><p class="text-[14px] font-normal">Track Your Impact</p></button><button class="border px-4 h-8 items-center bg-white rounded-full text-black border-orange-500 flex gap-1"><img src="'+S+'" alt="" class="w-4"><p class="text-[14px] font-normal">Join Activities Anywhere</p></button><button class="border px-4 h-8 items-center bg-white rounded-full text-black flex gap-1" style="border-color:#f185bb;"><img src="'+T+'" alt="" class="w-4"><p class="text-[14px] font-normal">Connect with a Community</p></button></div></div>',2)),r("div",R,[e[5]||(e[5]=r("h2",{class:"text-[20px] font-medium mb-4"},"Register to your account",-1)),g(r("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=d=>l.value=d),placeholder:"John Doe",class:"w-full p-2 border rounded-sm mb-4 text-[14px]",style:{color:"#6e7073"},onKeyup:y(o,["enter"])},null,544),[[v,l.value]]),g(r("input",{type:"email","onUpdate:modelValue":e[1]||(e[1]=d=>s.value=d),placeholder:"sample@example.com",class:"w-full p-2 border rounded-sm mb-4 text-[14px]",style:{color:"#6e7073"},onKeyup:y(o,["enter"])},null,544),[[v,s.value]]),r("button",{disabled:a.value||!i.value,onClick:o,class:"w-full flex items-center justify-center text-white py-2 rounded-sm text-[14px]",style:C({background:i.value?"#ff5722":"#cccccc"})},[a.value?(f(),p("div",A,e[2]||(e[2]=[r("div",{class:"animate-spin h-full w-full rounded-full border-[2px] flex justify-center items-center border-dotted border-[#fff]"},[r("div",{class:"w-3 h-3 rounded-full border-dashed border-[1px] border-[#fff]"})],-1)]))):(f(),p("p",E,"GET OTP"))],12,q),r("p",J,[e[4]||(e[4]=h(" Already have an account? ")),O(w,{to:"/login",class:"text-orange-500"},{default:B(()=>e[3]||(e[3]=[h("Sign in")])),_:1})])])])])}}};export{$ as default};
