(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sel='.block > h1, .block > h2, .block > p, .block > .says, .block > .note, .block > dl, .block > form, .ledger .row';
  var io=null;
  if(!reduce&&'IntersectionObserver' in window){
    io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
      });
    },{rootMargin:'0px 0px -12% 0px',threshold:.15});
  }
  var els=document.querySelectorAll(sel);
  els.forEach(function(el){
    if(!io){el.classList.add('in');return;}
    el.classList.add('rv');
    var group=el.closest('.block');
    var idx=group?Array.prototype.indexOf.call(group.querySelectorAll(sel),el):0;
    el.style.transitionDelay=Math.min(idx,6)*60+'ms';
    io.observe(el);
  });
  requestAnimationFrame(function(){
    els.forEach(function(el){
      var r=el.getBoundingClientRect();
      if(r.top<window.innerHeight*.9){el.classList.add('in');if(io)io.unobserve(el);}
    });
  });
  var hdr=document.querySelector('header.site');
  window.addEventListener('scroll',function(){
    hdr.classList.toggle('condensed',window.scrollY>40);
  },{passive:true});
})();
