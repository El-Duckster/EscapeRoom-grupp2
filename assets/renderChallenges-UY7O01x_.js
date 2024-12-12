(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const q=[{name:"Play online",href:"challenges.html?type=online"},{name:"Play on-site",href:"challenges.html?type=onsite"},{name:"The story",href:"#story"},{name:"Contact us",href:"#contact"}],V=document.querySelector(".nav__hamburger"),C=document.querySelector(".nav__menu"),N=document.querySelector(".nav__background"),O=()=>{q.forEach(t=>{const e=document.createElement("li");e.classList.add("nav__menuItem");const n=document.createElement("a");n.href=t.href,n.textContent=t.name,n.classList.add("nav__menuLink"),e.appendChild(n),C.appendChild(e)})},H=()=>{const t=document.createElement("button");t.classList.add("nav__menu__closeBtn");const e=document.createElement("span");e.classList.add("closeSpan1");const n=document.createElement("span");return n.classList.add("closeSpan2"),t.appendChild(e),t.appendChild(n),C.appendChild(t),t},R=H();O();const F=()=>{setTimeout(()=>{C.classList.toggle("nav__menu--active")},200),N.classList.toggle("nav__background--active")},L=()=>{C.classList.remove("nav__menu--active"),N.classList.remove("nav__background--active")};V.addEventListener("click",F);C.addEventListener("click",t=>{t.target.classList.contains("nav__menuLink")&&L()});R.addEventListener("click",L);window.addEventListener("scroll",L);document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector(".main__btn.online"),e=document.querySelector(".main__btn.onsite");t.addEventListener("click",()=>{window.location.href="challenges.html?type=online"}),e.addEventListener("click",()=>{window.location.href="challenges.html?type=onsite"})});const x="https://lernia-sjj-assignments.vercel.app/api",z=t=>{if(!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(t))return!1;const n=new Date(t);return n instanceof Date&&!isNaN(n)},Z=t=>/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(t),j=t=>{const e=new Date;e.setUTCHours(0,0,0,0);const n=new Date(e);return n.setUTCDate(e.getUTCDate()+1),new Date(t)>=n},U=({challengeId:t,name:e,email:n,date:s,time:a,participants:o})=>typeof t!="number"||typeof e!="string"||typeof n!="string"||typeof s!="string"||typeof a!="string"||typeof o!="number"?(console.log("Invalid parameter/s: ",{challengeId:t,name:e,email:n,date:s,time:a,participants:o}),!1):z(s)?j(s)?Z(a)?!0:(console.log("Invalid 'time': Must be in HH:mm format."),!1):(console.log("Invalid 'date': Booking must be at least tomorrow or later."),!1):(console.log("Invalid 'date': Must be in YYYY-MM-DD format."),!1),k=async(t,e={})=>{try{const n=await fetch(t,e);if(!n.ok){const s=await n.text();throw console.log(`Error response from ${t}:`,s),new Error(`HTTP error! status: ${n.status}, message: ${s}`)}return await n.json()}catch(n){throw console.log(`Error fetching data from ${t}:`,n),n}},T=async()=>{try{const{challenges:t}=await k(`${x}/challenges`);return console.log("Challenges:",t),{success:!0,data:t??[]}}catch(t){return{success:!1,data:[],error:t.message}}},P=async(t,e)=>{if(typeof t!="number"||typeof e!="string")return console.log("Invalid parameters:",{challengeId:t,date:e}),{success:!1,data:[],error:"Invalid parameters"};try{const{slots:n}=await k(`${x}/booking/available-times?date=${e}&challenge=${t}`);return console.log("Available slots:",n),{success:!0,data:n??[]}}catch(n){return{success:!1,data:[],error:n.message}}},v=async t=>{try{const{success:e,data:n,error:s}=await T();if(!e)return console.error("Failed to fetch challenges:",s),{success:!1,data:null,error:s};const a=n.find(o=>o.id===t);return a?(console.log("Found challenge details:",a),{success:!0,data:a}):(console.error(`Challenge with ID ${t} not found.`),{success:!1,data:null,error:"Challenge not found"})}catch(e){return console.error("Error finding challenge details:",e),{success:!1,data:null,error:e.message}}},M=async t=>{if(!U(t))return{success:!1,error:"Invalid input data"};try{const e=await k(`${x}/booking/reservations`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({challenge:t.challengeId,name:t.name,email:t.email,date:t.date,time:t.time,participants:t.participants})});return(e==null?void 0:e.status)==="ok"?(console.log("Booking successful:",e),{success:!0,data:e.booking}):{success:!1,error:"Reservation failed"}}catch(e){return console.log("Error in creating reservation:",e),{success:!1,error:e.message}}};T();P(3,"2024-12-12");v(3);v(3);M({challengeId:3,name:"Elena",email:"elena@elena.com",date:"2025-12-12",time:"15:30",participants:2});const u=document.querySelector("#booking-email"),p=document.querySelector("#booking-name"),$=document.querySelector("#booking-time"),D=document.querySelector("#booking-participants"),y=document.querySelector("#user-booking");let i,d;const b=t=>{alert(t)},Y=(t,e)=>{for(;t.options.length>1;)t.remove(1);e.forEach(({value:n,label:s})=>{const a=document.createElement("option");a.value=n,a.textContent=s,t.appendChild(a)})},A=t=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t),J=async(t,e)=>{if(i=t,d=e,console.log(`Initializing Step 2 with challengeId: ${i}, date: ${d}`),!i||!d){console.error("Missing challengeId or selectedDate in Step 2 initialization");return}try{const n=document.querySelector("#step2 .modal__content-loading"),{success:s,data:a}=await v(i);s&&a.title?n.textContent=a.title:n.textContent="Room Title Not Found",await K(i),await Q(i,d),S(2)}catch(n){console.error("Error initializing Step 2:",n)}},K=async t=>{try{const{success:e,data:n,error:s}=await v(t);if(e){const{minParticipants:a,maxParticipants:o}=n;console.log("minParticipants:",a,"maxParticipants:",o),G(a,o)}else console.error("Failed to load participants:",s)}catch(e){console.error("Error loading participants:",e)}},G=(t,e)=>{if(!t||!e){console.error("Invalid participant range");return}for(let n=t;n<=e;n++){const s=document.createElement("option");s.value=n.toString(),s.textContent=`${n} participant${n>1?"s":""}`,D.appendChild(s)}console.log("type of participants:",typeof t)},Q=async(t,e)=>{try{const{success:n,data:s,error:a}=await P(t,e);if(n){const o=s.map(l=>{const[c,g]=l.split(":").map(Number),r=new Date;r.setHours(c),r.setMinutes(g+90);const f=String(r.getHours()).padStart(2,"0"),m=String(r.getMinutes()).padStart(2,"0"),_=`${f}:${m}`;return{value:l,label:`${l} - ${_}`}});Y($,o)}else console.error("Failed to load available times:",a)}catch(n){console.error("Error loading available times:",n)}},W=t=>{const e=A(t.target.value);t.target.setCustomValidity(e?"":"Please enter a valid email address.")},X=t=>{const e=t.target.value.trim();e.length===0?t.target.setCustomValidity("Name should not be empty or contain only spaces."):/^[a-zA-Z\s]{2,}$/.test(e)?t.target.setCustomValidity(""):t.target.setCustomValidity("Please enter a valid name (letters only, at least 2 characters).")},ee=async t=>{t.preventDefault(),console.log("Selected Date:",d),console.log("Challenge ID:",i);const e=p.value.trim();if(e.length===0){p.setCustomValidity("Name should not be empty."),p.reportValidity();return}else p.setCustomValidity("");const n=u.value.trim();if(A(n))u.setCustomValidity("");else{u.setCustomValidity("Please enter a valid email address."),u.reportValidity();return}if(!d||!i){b("Missing challenge ID or selected date.");return}const s={challengeId:i,name:e,email:n,date:d,time:y.selected_time.value,participants:parseInt(y.selected_participants.value,10)};try{const{success:a,data:o,error:l}=await M(s);a?(console.log("Reservation created successfully:",o),p.value="",u.value="",$.selectedIndex=0,D.selectedIndex=0,S(3)):(console.error("Failed to create reservation:",l),b("Failed to create reservation. Please try again."))}catch(a){console.error("Error creating reservation:",a),b("An unexpected error occurred. Please try again.")}};document.addEventListener("DOMContentLoaded",()=>{u.addEventListener("input",W),p.addEventListener("input",X)});y._hasSubmitListener||(y.addEventListener("submit",ee),y._hasSubmitListener=!0);const B=document.querySelector(".booking-modal");document.querySelectorAll(".booking-modal__step");const E=document.querySelector(".custom__date"),w=document.querySelector(".modal__content-loading"),te=document.querySelector(".booking__search-btn"),ne=document.querySelectorAll(".close");let h;const se=()=>{const t=new Date;t.setDate(t.getDate()+1);const e=t.toISOString().split("T")[0];E.setAttribute("min",e)},S=t=>{document.querySelectorAll(".booking-modal__step").forEach((n,s)=>{s+1===t?(n.style.display="block",n.classList.add("booking-modal__step--active")):(n.style.display="none",n.classList.remove("booking-modal__step--active"))})},ae=async t=>{try{const{success:e,data:n}=await v(t);e&&n.title?w.textContent=n.title:w.textContent="Room Title Not Found"}catch(e){w.textContent="Error Loading Room Title",console.error("Error loading room title:",e)}};te.addEventListener("click",async t=>{t.preventDefault();const e=E.value;if(!e){alert("Please select a valid date."),E.focus();return}if(!h){console.error("Error: challengeId is undefined.");return}await J(h,e)});const I=t=>{if(h=t,!h){console.error("No challengeId provided to openBookingModal");return}B.style.display="block",console.log(`Modal is displayed for challengeId: ${h}`),ae(h),S(1)};document.addEventListener("DOMContentLoaded",()=>{B.style.display="none",console.log("Modal is hidden when the page is loaded"),se()});ne.forEach(t=>{t.addEventListener("click",()=>{const e=t.closest(".booking-modal");e.style.display="none"})});const oe=(t,e)=>{if(t.length<=e)return t;const n=t.slice(0,e).trimEnd(),s=n.lastIndexOf(" ");return s>0?n.slice(0,s)+"...":n+"..."},le="data:image/svg+xml,%3csvg%20width='23'%20height='23'%20viewBox='0%200%2023%2023'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5.40931%202.38128C6.02509%200.24596%209.05071%200.24596%209.66648%202.38128C9.93999%203.32972%2010.808%203.98278%2011.7951%203.98278H11.9036C14.1208%203.98278%2015.1139%206.76375%2013.3983%208.1682L12.9618%208.5255C12.214%209.13762%2011.9029%2010.1364%2012.1706%2011.0649L12.3847%2011.8073C12.9762%2013.8584%2010.5678%2015.4459%208.91606%2014.0937C8.11445%2013.4375%206.96134%2013.4375%206.15973%2014.0937C4.50795%2015.4459%202.09958%2013.8584%202.69106%2011.8074L2.90517%2011.0649C3.17293%2010.1364%202.86176%209.13762%202.114%208.5255L1.67753%208.1682C-0.0381234%206.76374%200.954986%203.98278%203.17219%203.98278H3.28072C4.2678%203.98278%205.13581%203.32972%205.40931%202.38128Z'%20fill='%23E3170A'/%3e%3cclipPath%20id='half-mask'%3e%3crect%20x='11.5'%20y='0'%20width='11.5'%20height='23'%20/%3e%3c/clipPath%3e%3c/svg%3e",re="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20width='23'%20height='23'%20viewBox='0%200%2023%2023'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cclipPath%20id='half-mask'%3e%3crect%20x='8'%20y='0'%20width='11.5'%20height='23'%20/%3e%3c/clipPath%3e%3c/defs%3e%3cpath%20d='M%205.409%2012.994%20C%206.025%2015.13%209.051%2015.13%209.666%2012.994%20C%209.94%2012.046%2010.808%2011.393%2011.795%2011.393%20L%2011.904%2011.393%20C%2014.121%2011.393%2015.114%208.612%2013.398%207.207%20L%2012.962%206.85%20C%2012.214%206.238%2011.903%205.239%2012.171%204.311%20L%2012.385%203.568%20C%2012.976%201.517%2010.568%20-0.07%208.916%201.282%20C%208.114%201.938%206.961%201.938%206.16%201.282%20C%204.508%20-0.07%202.099%201.517%202.691%203.568%20L%202.905%204.311%20C%203.173%205.239%202.862%206.238%202.114%206.85%20L%201.677%207.207%20C%20-0.038%208.612%200.955%2011.393%203.172%2011.393%20L%203.281%2011.393%20C%204.268%2011.393%205.136%2012.046%205.409%2012.994%20Z'%20clip-path='url(%23half-mask)'%20style='fill:%20rgb(227,%2023,%2010);%20transform-origin:%2011.134px%207.68797px;'%20transform='matrix(-1,%200,%200,%20-1,%20-7.192186824964,%20-0.000001432395)'/%3e%3c/svg%3e",ie="data:image/svg+xml,%3csvg%20width='23'%20height='23'%20viewBox='0%200%2023%2023'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M6.22343%202.65837C6.56124%201.48693%208.2211%201.48693%208.55891%202.65837C8.95588%204.03492%2010.2157%204.98278%2011.6483%204.98278H11.7569C13.0344%204.98278%2013.6066%206.58516%2012.6181%207.39441L12.1816%207.7517C11.1244%208.61714%2010.6845%2010.0292%2011.0631%2011.342L11.2772%2012.0844C11.5968%2013.1928%2010.2954%2014.0506%209.40277%2013.3199C8.23273%2012.3621%206.54961%2012.3621%205.37957%2013.3199C4.48698%2014.0506%203.18555%2013.1928%203.50518%2012.0844L3.71928%2011.342C4.09785%2010.0292%203.65791%208.61714%202.60071%207.7517L2.16424%207.3944C1.17569%206.58516%201.74791%204.98278%203.02546%204.98278H3.13399C4.56664%204.98278%205.82646%204.03492%206.22343%202.65837Z'%20stroke='%23E3170A'%20stroke-width='2'/%3e%3c/svg%3e";class ce{constructor(e,n,s,a,o,l,c,g,r){this.id=e,this.title=n,this.description=s,this.type=a,this.minParticipants=o,this.maxParticipants=l,this.rating=c,this.image=g,this.labels=r}createChallengeStars(){const e=this.rating,n=document.createElement("div");n.className="challenge__ratings";for(let s=1;s<=5;s++){const a=new Image;if(s<=Math.floor(e))a.src=le,a.className="star filled";else if(s===Math.ceil(e)&&e%1!==0)a.src=re,a.className="star half";else if(e===0)return a.src=ie,a.className="star unfilled",n.appendChild(a),n;n.appendChild(a)}return n}createBookChallengeBtn(){const e=document.createElement("button");return e.className="challenge__btn",this.type==="onsite"?(e.textContent="Book this room",e.addEventListener("click",()=>I(this.id))):this.type==="online"&&(e.textContent="Take challenge online",e.addEventListener("click",()=>I(this.id))),e}createChallengeCard(e){const n=document.createElement("li");n.id="challenges__carousel__slide"+this.id,n.setAttribute("tabindex",0),n.className="challenge__slide challengey challenges";const s=document.createElement("div");s.className="challenge__image-container";const a=document.createElement("img");a.className="challenge__img",a.src=this.image,a.alt=this.description,a.loading="lazy",s.appendChild(a);const o=document.createElement("div");o.className="challenge__details";const l=document.createElement("h2");l.className="challenge__details__title_temporary",l.textContent=this.title+(this.type==="onsite"?" (onsite)":"");const c=document.createElement("div");c.className="challenge__details-info";const g=this.createChallengeStars(),r=document.createElement("div");r.className="challenge__participants",r.textContent=`${this.minParticipants} - ${this.maxParticipants} participants`,this.type==="online"&&(r.textContent+=" (networked)"),s.appendChild(g),c.appendChild(r);const f=document.createElement("p");if(f.className="challenge__description",f.textContent=oe(this.description,50),o.appendChild(l),this.labels&&this.labels.length>0){const _=this.createLabels();o.appendChild(_)}o.appendChild(c),o.appendChild(f),e&&o.appendChild(this.createBookChallengeBtn());const m=document.createElement("span");return m.className="challenge__type-icon",this.type==="online"?m.textContent="💻":this.type==="onsite"&&(m.textContent="🏠"),s.appendChild(m),n.appendChild(s),n.appendChild(o),n}createLabels(){const e=document.createElement("div");return e.className="challenge__labels",this.labels.forEach(n=>{const s=document.createElement("span");s.className="challenge__label",s.textContent=`*${n} `,e.appendChild(s)}),e}}const de=(t,e,n=!0)=>{e.innerHTML="",t.forEach(s=>{const o=new ce(s.id,s.title,s.description,s.type,s.minParticipants,s.maxParticipants,s.rating,s.image,s.labels).createChallengeCard(n);e.appendChild(o)})};export{T as f,de as r};
//# sourceMappingURL=renderChallenges-UY7O01x_.js.map
