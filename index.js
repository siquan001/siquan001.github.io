function resize(){
  document.body.style.width=window.innerWidth+'px';
  document.body.style.height=window.innerHeight+'px';
}
resize();
window.addEventListener('resize',resize);

var says=[
  "海内存知己，天涯若比邻。",
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

document.querySelectorAll('.leftnav ul li[data-class]').forEach(function(li){
  li.onclick=function(){
    document.querySelectorAll('.leftnav ul li[data-class]').forEach(function(li){li.classList.remove('act')});
    this.classList.add('act');
    var c=this.getAttribute('data-class');
    window.location.hash=c;
  }
})

var xhr=new XMLHttpRequest();
xhr.open('get','./friendlink.json');
xhr.onreadystatechange=function(){
  if(xhr.readyState==4&&xhr.status==200){
    var data=JSON.parse(xhr.responseText);
    var str='';
    data.forEach(function(item){
      str+='<li><a href="'+item.url+'" target="_blank"><img src="'+item.icon+'"/><div class="m"><div class="title">'+item.title+'</div><div class="desc">'+item.desc+'</div></div></a></li>';
    });
    document.querySelector('.friendlist').innerHTML=str;
  }
}
xhr.send();

window.onhashchange=function(){
  console.log('change');
  chuli()
}

function chuli(){
  var hash=location.hash;
  console.log(hash);
  if(hash){
    document.querySelector(".rightcontent").classList.add('show');
    document.querySelector(".leftnav").classList.add('hide');
    document.querySelectorAll('.page').forEach(function(p){p.style.display=""});
    try{
      document.querySelector(".page."+hash.slice(1)).style.display='block';
    }catch(e){

    }
  }else{
    document.querySelector(".rightcontent").classList.remove('show');
    document.querySelector(".leftnav").classList.remove('hide');
    if(window.innerWidth>=700){
      setTimeout(function(){
        document.querySelector('.leftnav ul li[data-class="about"]').click();
      },100)
    }
  }
}
chuli();