var songlist=null;

function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        // IE
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        // Others
        script.onload = function() {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
document.querySelector('.qp').innerHTML='正在加载MusicAPI...';
loadScript('./assets/musicapi-min.js', function() {
  document.querySelector('.qp').innerHTML='正在加载QPlayer...';
  loadScript('./assets/qplayer.min.js', function() {
    document.querySelector('.qp').innerHTML='正在加载歌单...';
    fetch('./assets/musiclist-min.json').then(res => res.json()).then(data => {
      songlist=data;
      var qp = new QPlayer({
          container: document.querySelector('.qp'), // 嵌入QPlayer的容器，应该为一个div
          color:'light', // 主题颜色，可填'light'、'dark'或'auto'，auto即为根据歌曲封面而定，默认light
          colorfulBg:false, // 是否将封面主题色设为背景
          start:'random', // 最开始播放的歌曲序号，默认为0，从0开始，填'random'则随机播放
          sort:'normal', // 默认播放顺序，'random'随机，'normal'顺序，'repeat'单曲循环
          autoplay:true, // 自动播放
          canChangeSort:true, // 是否可以改变播放顺序
          canShowSongList:true, // 是否显示歌单
          songList:songlist,
          audioBack:function(index,toRes){
              var r=musicapi.get(songlist[index],function(data){
                  if(data.error){
                      toRes.err();
                  }else{
                      toRes.audio(data.url);
                      toRes.cover(data.img);
                      toRes.lyric(data.lrcstr);
                  }
                  
              })
              
      
              // 失败则调用
              return {
                  abort:function(){
                      r.abort();
                  }
              }
          }
      });
  });
  });
});



window.onhashchange=function(){
    clhash();
}


function clhash(){
    var hash=location.hash.slice(1);
    if(!hash){
        hash='index'
    }
    var target=document.querySelector('.page.'+hash);
    if(target){
        try {
            document.querySelector('.page.act').classList.remove('act');
        } catch (error) {}
        target.classList.add('act');
    }else{
        location.hash='#';
    }
    document.querySelector('.right').scrollTop=0;
    if(hash=='about'){
        km();
    }
}
clhash();

function km(){
    var kd=[90,70,65,30,40,60,10]
    document.querySelectorAll('.skills .item .r div').forEach(function(d){
        d.style.transition='none';
        d.style.width='';
    })
    setTimeout(function(){
        document.querySelectorAll('.skills .item .r div').forEach(function(d,i){
            d.style.transition='all 0.5s';
            d.style.width=kd[i]+'%'; 
        })
    },300)
}

document.querySelector('.back').onclick=function(){
    location.hash='#';
    document.querySelector('.left').classList.remove('on');
    document.querySelector('.menu').classList.remove('on');
}
document.querySelector('.menu').onclick=function(){
    if(this.classList.contains('on')){
        document.querySelector('.left').classList.remove('on');
        this.classList.remove('on');
    }else{
        document.querySelector('.left').classList.add('on');
        this.classList.add('on');
    }
}

var says=[
    "海内存知己，天涯若比邻。",
    "慢慢来，别着急。",
    "己所不欲，勿施于人",
    "保持健康和开心才是最重要的",
    "我已经完全爱上沃玛啦！！！"
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
        },2000)
      });
    }
    dos();
  }
  g();

  document.querySelector('.warma-back-top').onclick=function(){
    // 平滑滚动到顶部
    var scrollTop=document.querySelector('.right').scrollTop;
    var speed=scrollTop/10;
    var timer=setInterval(function(){
      if(scrollTop<=0){
        clearInterval(timer);
      }else{
        document.querySelector('.right').scrollTop=scrollTop-speed;
        scrollTop=document.querySelector('.right').scrollTop;
      }
    },10)
  }