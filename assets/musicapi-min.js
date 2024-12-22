var musicapi={cl:function(e){var a=new URL(e);return a.protocol="https:",a.host="ws.stream.qqmusic.qq.com",a.href},get:function(e,a){var t,r=0,n={qq:{error:null},kugou:{error:null},netease:{error:null}};e.def=e.def?e.def:{},e.name&&(e.def.title=e.def.title?e.def.title:e.artist+"-"+e.name,e.def.songname=e.def.songname?e.def.songname:e.name,e.def.artist=e.def.artist?e.def.artist:e.artist),e.def.lrcstr&&(e.def.lrc=this.parseLrc(e.def.lrcstr));var i={qq:[e.qq&&e.qq.mid,function(){t=musicapi._qq(e.qq.mid,(function(t){if(t.error)return n.qq=t,r++,void s();a(musicapi._compareDef(t,e.def))}))}],netease:[e.netease&&e.netease.id,function(){t=musicapi._netease(e.netease.id,(function(t){if(t.error)return n.netease=t,r++,void s();var i,o,c;i=t.url,o=function(i){i?a(musicapi._compareDef(t,e.def)):(n.netease=t,r++,s())},(c=document.createElement("audio")).src=i,c.onloadedmetadata=function(){o(!0)},c.onerror=function(){o(!1)}}))}],kugou:[e.kugou&&e.kugou.hash,function(){t=musicapi._kugou(e.kugou.hash,e.kugou.album_id,(function(t){if(t.error||!t.url)return n.kugou=t,r++,void s();a(musicapi._compareDef(t,e.def))}))}],none:[!0,function(){a(0==r?e.def:{error:"QQ:"+n.qq.error+"\nKugou:"+n.kugou.error+"\nNetease:"+n.netease.error,errs:n})}]},o=["netease","qq","kugou"];function s(){for(var e=r;e<3;e++)if(i[o[e]][0]){i[o[e]][1]();break}}return e.firstReq&&-1!=o.indexOf(e.firstReq)&&(o.splice(o.indexOf(e.firstReq),1),o.unshift(e.firstReq)),s(),t},search:function(e,a,t={}){return"object"==typeof t&&t||(t={}),"qq"==t.type?musicapi._qq_search(e,a,t):"netease"==t.type?musicapi._netease_search(e,a,t):musicapi._kugou_search(e,a,t)},_kugou:function(e,a,t){var r="https://api.gumengya.com/Api/KuGou?appkey=b7a782741f667201b54880c925faec4b&format=json&id="+e.toUpperCase();return musicapi._request(r,(function(e){200==e.code?t({title:e.data.author+" - "+e.data.title,songname:e.data.title,artist:e.data.author,lrc:musicapi.parseLrc(e.data.lrc),url:e.data.url,album:"",img:e.data.pic.replace("/150",""),lrcstr:e.data.lrc,minipic:e.data.pic}):t({error:"获取歌曲失败",code:e.err_code})}))},_qq:function(e,a){var t,r=0,n={},i=musicapi._request("https://api.gumengya.com/Api/Tencent?appkey=b7a782741f667201b54880c925faec4b&format=json&id="+e,(function(o){if(0!=o&&o.data)a({title:o.data.author+" - "+o.data.title,songname:o.data.title,artist:o.data.author,lrc:musicapi.parseLrc(o.data.lrc),url:musicapi.cl(o.data.url),album:"",img:o.data.pic,lrcstr:o.data.lrc});else{i=musicapi._request("https://api.vkeys.cn/v2/music/tencent?quality=8&mid="+e,(function(e){0==e||200!=e.code?(a({error:"获取歌曲失败",code:1e4}),t.abort()):function(e){var t={title:e.data.singer+" - "+e.data.song,songname:e.data.song,artist:e.data.singer,url:musicapi.cl(e.data.url),album:e.data.album,img:e.data.cover};for(var i in t)n[i]=t[i];2==++r&&a(n)}(e)})),t=musicapi._request("https://api.vkeys.cn/v2/music/tencent/lyric?mid="+e,(function(e){clearTimeout(s),0==e||200!=e.code?(n.nolrc=!0,n.lrc={0:"歌词获取失败"},n.lrcstr="[00:00.00] 歌词获取失败"):(n.lrc=musicapi.parseLrc(e.data.lrc),n.lrcstr=e.data.lrc);2==++r&&a(n)}));var s=setTimeout((function(){n(!1)}),5e3)}}));return{abort:function(){i.abort(),t&&t.abort()}}},_netease:function(e,a){var t,r=0,n={},i=musicapi._request("https://api.gumengya.com/Api/Netease?appkey=b7a782741f667201b54880c925faec4b&format=json&id="+e,(function(o){if(0!=o&&o.data)a({title:o.data.author+" - "+o.data.title,songname:o.data.title,artist:o.data.author,lrc:musicapi.parseLrc(o.data.lrc),url:o.data.url,album:"",img:o.data.pic,lrcstr:o.data.lrc});else{i=musicapi._request("https://api.vkeys.cn/v2/music/netease?quality=4&id="+e,(function(e){0==e||200!=e.code?(a({error:"获取歌曲失败",code:1e4}),t.abort()):function(e){var t={title:e.data.singer+" - "+e.data.song,songname:e.data.song,artist:e.data.singer,url:e.data.url,album:e.data.album,img:e.data.cover};for(var i in t)n[i]=t[i];2==++r&&a(n)}(e)})),t=musicapi._request("https://api.vkeys.cn/v2/music/netease/lyric?id="+e,(function(e){clearTimeout(s),0==e||200!=e.code?(n.nolrc=!0,n.lrc={0:"歌词获取失败"},n.lrcstr="[00:00.00] 歌词获取失败"):(n.lrc=musicapi.parseLrc(e.data.lrc),n.lrcstr=e.data.lrc);2==++r&&a(n)}));var s=setTimeout((function(){n(!1)}),5e3)}}));return{abort:function(){i.abort(),t&&t.abort()}}},_request:function(e,a,t=-1){var r,n=new XMLHttpRequest;n.open("GET",e,!0),t>0&&(r=setTimeout((function(){n.abort(),a(!1)}),t)),n.onreadystatechange=function(){if(4===n.readyState&&200===n.status){k=n.responseText;try{k=JSON.parse(k)}catch(e){}clearTimeout(r),a(k)}else n.status>400&&(clearTimeout(r),a(!1))},n.onerror=function(){clearTimeout(r),a(!1)};try{n.send()}catch(e){}return{abort:function(){n.abort()}}},_jsonpdl:[],_jsonpsc:null,_jsonp:function(e,a,t,r){var n=Math.random();if(r=t||"callback",this._jsonpdl.push([e,a,t,r,n]),!(this._jsonpdl.length>1))return function e(a,t,r,n){var i=document.createElement("script"),o=a+(a.indexOf("?")>=0?"&":"?")+(r||"callback")+"="+n;i.src=o,window[n]=function(){delete window[n],t.apply(null,arguments),musicapi._jsonpdl.shift(),musicapi._jsonpdl.length>0&&e.apply(null,musicapi._jsonpdl[0])},document.body.appendChild(i),i.onload=function(){document.body.removeChild(i)},i.onerror=function(){t(!1),document.body.removeChild(i)},musicapi._jsonpsc=i}(e,a,t,r),{abort:function(){if(musicapi._jsonpdl[0]==n)try{delete window[r];var e=musicapi._jsonpsc;e.remove(),e=null}catch(e){}else for(var a=0;a<musicapi._jsonpdl.length;a++)musicapi._jsonpdl[a][4]==n&&musicapi._jsonpdl.splice(a,1)}}},_kugou_search:function(e,a,t){var r="https://mobiles.kugou.com/api/v3/search/song?format=jsonp&keyword="+encodeURI(e)+"&page="+(t.page||1)+"&pagesize="+(t.pagesize||30)+"&showtype=1";return musicapi._jsonp(r,(function(e){var r={total:e.data.total,page:t.page||1,songs:[]};e.data.info.forEach((function(e){var a={name:e.songname,artist:e.singername,kugou:{hash:e.hash,album_id:e.album_id,ispriviage:e.privilege>=10}};if(e.filename.match(/【歌词 : .*】/)){var t=e.filename.match(/【歌词 : .*】/);a.title=e.filename.replace(t[0],""),a.matchLyric=t[0].replace("【歌词 : ","").replace("】","")}else a.title=e.filename;r.songs.push(a)})),a(r)}))},_qq_search:function(e,a,t){var r="https://api.vkeys.cn/v2/music/tencent?word="+encodeURIComponent(e)+"&num="+(t.pagesize||30)+"&page="+(t.page||1);return musicapi._request(r,(function(e){var r={total:1/0,page:t.page||1,songs:[]};e.data.forEach((function(e){var a={name:e.song,artist:e.singer,qq:{mid:e.mid}};a.title=e.singer+" - "+e.song,r.songs.push(a)})),a(r)}))},_netease_search:function(e,a,t){var r="https://api.gumengya.com/Api/Music?appkey=b7a782741f667201b54880c925faec4b&format=json&site=netease&text="+encodeURIComponent(e)+"&num="+(t.pagesize||30)+"&page="+(t.page||1);return musicapi._request(r,(function(e){var r={total:1/0,page:t.page||1,songs:[]};e.data.forEach((function(e){var a={name:e.title,artist:e.author,netease:{id:e.songid}};a.title=e.author+" - "+e.title,r.songs.push(a)})),a(r)}))},parseLrc:function(e){var a=[];if(0!=(e=e||"[00:00.00] 暂无歌词").length){var t=e.split("\n");for(var r in t){t[r]=t[r].replace(/(^\s*)|(\s*$)/g,"");var n=t[r].substring(t[r].indexOf("[")+1,t[r].indexOf("]")).split(":");if(!isNaN(parseInt(n[0]))){var i=t[r].match(/\[(\d+:.+?)\]/g),o=0;for(var s in i)o+=i[s].length;var c=t[r].substring(o);for(var s in i){n=i[s].substring(1,i[s].length-1).split(":");a.push({t:(60*parseFloat(n[0])+parseFloat(n[1])).toFixed(3),c:c})}}}a.sort((function(e,a){return e.t-a.t}));var u={};return a.forEach((function(e){u[e.t]=e.c})),u}},_compareDef:function(e,a){if(!a)return e;for(var t in a)e[t]=a[t];return e}};