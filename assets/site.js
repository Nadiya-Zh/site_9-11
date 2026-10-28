(function(){
  var b=document.body,id=b.getAttribute('data-mo-id'),site=b.getAttribute('data-mo-site'),kind=b.getAttribute('data-mo-kind'),sens=b.getAttribute('data-mo-sens')==='1';
  var key='mo:'+site;
  function get(){try{return JSON.parse(localStorage.getItem(key)||'{}')}catch(e){return {}}}
  function set(v){try{localStorage.setItem(key,JSON.stringify(v))}catch(e){}}
  function open(){var v=get();v[id]=v[id]||1;v._last=id;set(v)}
  function done(){var v=get();v[id]=2;v._last=id;set(v)}
  var cfg=window.MO||{};
  function start(){
    open();
    var f=document.querySelector('.mo-foot');
    if(f&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){done();io.disconnect()}});io.observe(f)}
  }
  if(sens&&kind==='student'&&!cfg.unlockSensitive){
    var ok=false;try{ok=sessionStorage.getItem('mo-gate-'+id)==='1'}catch(e){}
    if(!ok){
      b.style.overflow='hidden';
      var g=document.createElement('div');g.id='mo-gate';
      g.innerHTML='<div class="box"><h2>Ця тема чутлива</h2><p>Її краще проходити разом із психологом або дорослим, якому ти довіряєш. Ти можеш пропускати будь-яке завдання й виходити в будь-який момент.</p><p>Якщо тобі зараз дуже важко, розкажи дорослому або зателефонуй на <b>116 111</b> (безкоштовно, анонімно, цілодобово). При небезпеці — <b>103 / 102</b>.</p><div class="btns"><button id="mo-ok">Продовжити разом із психологом чи дорослим</button><a class="b" href="../index.html">Повернутись до тем</a></div></div>';
      document.body.appendChild(g);
      document.getElementById('mo-ok').onclick=function(){try{sessionStorage.setItem('mo-gate-'+id,'1')}catch(e){}g.remove();b.style.overflow='';start()};
      return;
    }
  }
  start();
})();