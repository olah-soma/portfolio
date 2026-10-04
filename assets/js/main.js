const events={
  2026:[
    {type:'Poster',title:'European Nowcasting and Weather Forecasting Conference',meta:'Copenhagen, Denmark · Deep-learning based solar nowcasting at HungaroMet'},
	{type:'Presentation',title:'Hungarian Meteorological Society Annual Meeting',meta:'Pécs, Hungary · Machine-learning based solar nowcasting at HungaroMet'},
    {type:'Award',title:'Róna Zsigmond Foundation Award',meta:'Hungarian Meteorological Society · Recognition for the solar nowcasting ML development at HungaroMet'},
	{type:'Conference',title:'IAH World Groundwater Congress',meta:'Budapest, Hungary'},
    {type:'Conference',title:'EGU General Assembly',meta:'Vienna, Austria'},
    {type:'Poster',title:'EUMETNET Environmental AI Workshop',meta:'Zagreb, Croatia · Deep-learning based solar nowcasting at HungaroMet'},
    {type:'Poster',title:'ECMWF & ESA Machine Learning Workshop',meta:'Bologna, Italy · Deep-learning based solar nowcasting at HungaroMet'}
  ],
  2025:[
    {type:'Presentation',title:'Conference on Modelling Fluid Flow',meta:'Budapest, Hungary · Deep-learning based solar nowcasting at HungaroMet'},
    {type:'Conference',title:'EGU General Assembly',meta:'Vienna, Austria'},
    {type:'Conference',title:'ACCORD All Staff Working Week',meta:'European NWP community'},
    {type:'Workshop',title:'EUMETNET Environmental AI Workshop',meta:'DWD · Offenbach am Main, Germany'}
  ],
  2024:[
    {type:'Conference',title:'European Nowcasting and Weather Forecasting Conference',meta:'Oslo, Norway'},
    {type:'Conference',title:'Hungarian Meteorological Society Annual Meeting',meta:'Debrecen, Hungary'},
    {type:'Conference',title:'European Urban Resilience Forum',meta:'Valencia, Spain · Hydrogeology / climate resilience'}
  ],
  2023:[
    {type:'Poster',title:'EGU General Assembly',meta:'Vienna, Austria · DC geophysical measurements for a managed aquifer recharge feasibility study'},
    {type:'Award',title:'National Scientific Students’ Associations Conference — Special Prize',meta:'Research on geophysical measurements for managed aquifer recharge'}
  ]
};

const eventList=document.querySelector('.event-list');
function renderEvents(year){eventList.innerHTML=events[year].map(e=>`<article class="event-card"><span class="type">${e.type}</span><h3>${e.title}</h3><p>${e.meta}</p></article>`).join('')}
renderEvents(2026);
document.querySelectorAll('.year-tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.year-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderEvents(btn.dataset.year)}));

const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

document.querySelectorAll('[data-modal-open]').forEach(btn=>btn.addEventListener('click',()=>document.getElementById(btn.dataset.modalOpen).showModal()));
document.querySelectorAll('[data-modal-close]').forEach(btn=>btn.addEventListener('click',()=>btn.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));

const cv=document.querySelector('[data-cv-link]');cv.addEventListener('click',async e=>{try{const r=await fetch(cv.href,{method:'HEAD'});if(!r.ok)throw 0}catch{e.preventDefault();alert('Add your CV as assets/docs/Soma_Olah_CV.pdf to enable this button.')}});

document.getElementById('year').textContent=new Date().getFullYear();
const backToTop=document.querySelector('[data-back-to-top]');if(backToTop){backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));


// Lightweight animated meteorological grid for the hero/background.
const canvas=document.getElementById('weather-canvas'),ctx=canvas.getContext('2d');let w,h,dpr,points=[];
function resize(){dpr=Math.min(window.devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);points=Array.from({length:Math.max(24,Math.floor(w/38))},(_,i)=>({x:(i*97)%w,y:(i*61)%h,r:1+(i%3)*.45,s:.08+(i%5)*.018,p:i*.7}))}
function draw(t){ctx.clearRect(0,0,w,h);ctx.strokeStyle='rgba(0,121,111,.07)';ctx.lineWidth=1;const grid=56;for(let x=(t*.004)%grid-grid;x<w;x+=grid){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=grid){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}points.forEach(p=>{const yy=p.y+Math.sin(t*.0007+p.p)*18;const xx=(p.x+t*p.s)% (w+30)-15;ctx.beginPath();ctx.fillStyle='rgba(0,121,111,.20)';ctx.arc(xx,yy,p.r,0,Math.PI*2);ctx.fill()});requestAnimationFrame(draw)}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){resize();addEventListener('resize',resize);requestAnimationFrame(draw)}
