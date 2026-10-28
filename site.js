(function(){
  var c=document.getElementById('ceu'); if(!c||!c.getContext) return;
  var x=c.getContext('2d'), est=[], w=0, h=0, dpr=Math.min(window.devicePixelRatio||1,2);
  var calmo=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function montar(){
    var r=c.getBoundingClientRect(); w=r.width; h=r.height;
    c.width=w*dpr; c.height=h*dpr; x.setTransform(dpr,0,0,dpr,0,0);
    est=[]; var n=Math.round(w*h/5200);
    for(var i=0;i<n;i++) est.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.3+.2,f:Math.random()*6.28,v:Math.random()*.02+.004,o:Math.random()<.12});
  }
  function pintar0(t){
    x.clearRect(0,0,w,h);
    for(var i=0;i<est.length;i++){var s=est[i]; var a=.35+.65*Math.abs(Math.sin(s.f+t*s.v*.06));
      x.globalAlpha=a; x.fillStyle=s.o?'#f2b705':'#e8dcff'; x.beginPath(); x.arc(s.x,s.y,s.r,0,6.283); x.fill();}
    x.globalAlpha=1;
  }
  var rodando=false, visivel=true;
  function loop(t){ if(!rodando) return; pintar0(t); requestAnimationFrame(loop); }
  function ligar(){ if(calmo||rodando||!visivel||document.hidden) return; rodando=true; requestAnimationFrame(loop); }
  function desligar(){ rodando=false; }
  montar(); pintar0(0);
  if('IntersectionObserver' in window){ new IntersectionObserver(function(e){ visivel=e[0].isIntersecting; visivel?ligar():desligar(); }).observe(c); }
  document.addEventListener('visibilitychange',function(){ document.hidden?desligar():ligar(); });
  ligar();
  window.addEventListener('resize',function(){montar(); pintar0(0);});
})();

(function(){
  var topo=document.querySelector('.topo'); if(!topo) return;
  var ultimo=window.scrollY, celular=window.matchMedia('(max-width:860px)');
  window.addEventListener('scroll',function(){
    var y=window.scrollY;
    if(!celular.matches||y<120){ topo.classList.remove('escondido'); }
    else if(y>ultimo+6){ topo.classList.add('escondido'); }
    else if(y<ultimo-6){ topo.classList.remove('escondido'); }
    ultimo=y;
  },{passive:true});
  topo.addEventListener('focusin',function(){ topo.classList.remove('escondido'); });
  document.querySelectorAll('[data-abrir-priv]').forEach(function(a){a.addEventListener('click',function(){var d=document.getElementById('privacidade'); if(d) d.open=true;});});
})();
