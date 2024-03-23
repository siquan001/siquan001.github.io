var l=window.location.href;
setInterval(function(){
  if(window.location.href!=l){
    l=window.location.href;
    ge(l);
    gnav(l);
  }
},50)

gnav(l);
function gnav(l){
  try{document.querySelector(".leftnav li.act").classList.remove('act');}catch(e){}
  document.querySelectorAll(".leftnav li a").forEach(function(a){
    if(a.href==l.replace(/#.*/,"").replace(/\?.*/,"")){
      a.parentNode.classList.add("act");
    }
  })
}

function resize(){
  document.body.style.width=window.innerWidth+'px';
  document.body.style.height=window.innerHeight+'px';
}
resize();
window.addEventListener('resize',resize);

var says=[
  "海内存知己，天涯若比邻。",
  "慢慢来，别着急。",
  "己所不欲，勿施于人",
  "保持健康和开心才是最重要的",
  "做自己喜欢的事，做快乐的事",
]

var sayi=-1;
function g(){
  var sayii=0;
  function domore(cb){
    var inter=setInterval(function(){
      sayii++;
      if(sayii>says[sayi].length){
        clearInterval(inter);
        cb();
      }else{
        document.querySelector('.says').innerHTML=says[sayi].substring(0,sayii);
      }
    },80)
  }
  function doless(cb){
    var inter=setInterval(function(){
      sayii--;
      if(sayii<0){
        clearInterval(inter);
        cb();
      }else{
        document.querySelector('.says').innerHTML=says[sayi].substring(0,sayii);
      }
    },80)
  }
  
  function dos(){
    if(sayi==says.length-1){
      sayi=0;
    }else{
      sayi++;
    }
    domore(function(){
      setTimeout(function(){
        doless(dos);
      },1000)
    });
  }
  dos();
}
g();

var u=new URL(window.location.href);
if(u.pathname=='/'){
  if(window.innerWidth>=700)golink('./about');
  else{
    document.querySelector(".rightcontent").classList.remove('show');
    document.querySelector(".leftnav").classList.remove('hide');
  }
}else{
  document.querySelector(".rightcontent").classList.add('show');
  document.querySelector(".leftnav").classList.add('hide');
}

function golink(url){
  history.pushState(null,null,url);
}

var reqc=null;
function ge(url){
  var u=new URL(url);
  if(reqc){reqc.abort();reqc=null;}
  document.querySelector(".loadprogress").classList.remove('loaded');
  document.querySelector(".loadprogress").classList.add('loading');
  if(u.pathname=='/'){
    if(window.innerWidth>=700)golink('./about');
    else{
      document.querySelector(".rightcontent").classList.remove('show');
      document.querySelector(".leftnav").classList.remove('hide');
    }
    document.querySelector(".loadprogress").classList.remove('loading');
      document.querySelector(".loadprogress").classList.add('loaded');
  }else{
    get(url,function(res){
      var r=res.match(/<!--content start-->[\s\S]*<!--content end-->/);
      document.querySelector('.rightcontent').innerHTML=r[0];
      var t=res.match(/<title>[\s\S]*<\/title>/);
      t=t[0].replace('<title>','').replace('</title>','');
      document.querySelector('title').innerHTML=t;
      document.querySelector(".rightcontent").classList.add('show');
      document.querySelector(".leftnav").classList.add('hide');
      document.querySelector(".loadprogress").classList.remove('loading');
      document.querySelector(".loadprogress").classList.add('loaded');
    })
    
  }

}
function get(url,cb){
  var xhr=new XMLHttpRequest();
  xhr.open('get',url,true);
  xhr.send();
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
      cb(xhr.responseText);
    }
  }
  return {
    abort:function(){
      xhr.abort();
    }
  }
}

document.querySelectorAll("a[nocross]").forEach(function(e){
  e.onclick=function(e){
    e.preventDefault();
    golink(this.href);
  }
})


