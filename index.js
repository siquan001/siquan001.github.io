function resizeWindow() {
    function resize() {
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        document.body.style.height = windowHeight + "px";
        document.body.style.width = windowWidth + "px";
    }
    resize();
    window.onresize = function () {
        resize();
    }
}

/**
 * @return {HTMLElement}
 */
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}

function initRouter() {
    $$(".right>.menu .item").forEach(function (item) {
        item.addEventListener("click", function () {
            if (item.getAttribute("data-to"))
                window.location.hash = item.getAttribute("data-to");
            else if (item.getAttribute("data-link"))
                window.open(item.getAttribute("data-link"));
        });
    })

    window.onhashchange = clhash;
    function clhash() {
        var hash = window.location.hash.substring(1);
        var page = $(".right .content .page[data-page='" + hash + "']");
        if (page) {
            $$(".right .content .page").forEach(function (item) {
                item.classList.remove("act");
            });
            page.classList.add("act");
        } else {
            window.location.hash = "#index";
            return;
        }

        $('.right>.content').scrollTo({
            top: 0,
            behavior: "smooth"
        })

        $$(".right>.menu .item").forEach(function (item) {
            if (item.getAttribute("data-to") == hash) {
                item.classList.add("act");
            } else {
                item.classList.remove("act");
            }
        });

        if (hash == 'intro') {
            initSkills();
        }

        if(hash=='contact'&&!window.loadedComments){
            window.loadedComments = true;
            (function(d, s) {
                var j, e = d.getElementsByTagName(s)[0];
         
                if (typeof LivereTower === 'function') { return; }
         
                j = d.createElement(s);
                j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
                j.async = true;
         
                e.parentNode.insertBefore(j, e);
            })(document, 'script');
        }
    }
    clhash();
}

function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        // IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        // Others
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function loadStyle(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

function initPlayer() {
    var songlist = null;
    $('.qp').innerHTML = '正在加载MusicAPI...';
    loadStyle('./assets/qplayer-base.min.css');
    loadScript('./assets/musicapi-min.js', function () {
        $('.qp').innerHTML = '正在加载QPlayer...';
        loadScript('./assets/qplayer.min.js', function () {
            $('.qp').innerHTML = '正在加载歌单...';
            fetch('./assets/musiclist-min.json').then(res => res.json()).then(data => {
                songlist = data;
                var qp = new QPlayer({
                    container: $('.qp'), // 嵌入QPlayer的容器，应该为一个div
                    color: 'light', // 主题颜色，可填'light'、'dark'或'auto'，auto即为根据歌曲封面而定，默认light
                    colorfulBg: false, // 是否将封面主题色设为背景
                    start: 'random', // 最开始播放的歌曲序号，默认为0，从0开始，填'random'则随机播放
                    sort: 'normal', // 默认播放顺序，'random'随机，'normal'顺序，'repeat'单曲循环
                    autoplay: true, // 自动播放
                    canChangeSort: true, // 是否可以改变播放顺序
                    canShowSongList: true, // 是否显示歌单
                    songList: songlist,
                    audioBack: function (index, toRes) {
                        var r = musicapi.get(songlist[index], function (data) {
                            if (data.error) {
                                toRes.err();
                            } else {
                                toRes.audio(data.url);
                                toRes.cover(data.img);
                                toRes.lyric(data.lrcstr);
                            }

                        })


                        // 失败则调用
                        return {
                            abort: function () {
                                r.abort();
                            }
                        }
                    }
                });
            });
        });
    });
}


function initSays() {
    var says = [
        "海内存知己，天涯若比邻。",
        "慢慢来，别着急。",
        "己所不欲，勿施于人。",
        "我创造，所以我生存。",
        "世界上只有一种真正的英雄主义，那就是在认清生活的真相后依然热爱生活。",
        "我已经完全爱上沃玛啦！！！"
    ]

    var sayi = -1, sayf = $('.says');
    function g() {
        var sayii = 0;
        function domore(cb) {
            var inter = setInterval(function () {
                sayii++;
                if (sayii > says[sayi].length) {
                    clearInterval(inter);
                    cb();
                } else {
                    sayf.innerHTML = says[sayi].substring(0, sayii);
                }
            }, 80)
        }
        function doless(cb) {
            var inter = setInterval(function () {
                sayii--;
                if (sayii < 0) {
                    clearInterval(inter);
                    cb();
                } else {
                    sayf.innerHTML = says[sayi].substring(0, sayii);
                }
            }, 80)
        }

        function dos() {
            if (sayi == says.length - 1) {
                sayi = 0;
            } else {
                sayi++;
            }
            domore(function () {
                setTimeout(function () {
                    doless(dos);
                }, 2000)
            });
        }
        dos();
    }
    g();
}

function initStars() {
    var cover = $(".starscover");
    function drawStars() {
        cover.innerHTML = '';
        var num = window.innerWidth * window.innerHeight * 0.00006
        console.log(num);
        for (var i = 0; i < num; i++) {
            var star = document.createElement("div");
            star.className = "star";
            cover.append(star);
            var l = Math.random() * 100;
            var t = Math.random() * 100;
            var f = parseInt(Math.random() * 360);
            star.style.left = l + '%';
            star.style.top = t + '%';
            star.style.animationDelay = -Math.random() * 4 + 's';
            readyStar.push([star, l, t, f]);
        }
    }

    document.addEventListener("click", function (e) {
       gstar(e);
       gstar(e);
       gstar(e);
    })
    function gstar(e){
        var star = document.createElement("div");
        star.className = "star";
        cover.append(star);
        var l = (e.pageX - 10) / window.innerWidth * 100;
        var t = (e.pageY - 10) / window.innerHeight * 100;
        var f = parseInt(Math.random() * 360);
        star.style.left = l + '%';
        star.style.top = t + '%';
        star.style.backgroundColor = ['#f006', '#ff06', '#0f06', '#0ff6', '#00f6'][Math.floor(Math.random() * 5)];
        star.style.animationDelay = -Math.random() * 4 + 's';
        bindStar(star, l, t, f);
    }

    var readyStar = [];
    function bindStar(star, l, t, f) {
        readyStar.push([star, l, t, f]);
        var st = readyStar.shift();
        st[0].remove();
    }

    var now = window.performance.now();
    function animateStar() {
        var speed = 2, T = (window.performance.now() - now) / 1000;
        for (var i = 0; i < readyStar.length; i++) {
            var star = readyStar[i][0];
            var l = readyStar[i][1];
            var t = readyStar[i][2];
            var f = readyStar[i][3];
            l = l + speed * T * Math.cos(f * Math.PI / 180);
            if (l < 0) {
                f = f + 180;
                l = 0;
            } else if (l > 100) {
                f = f + 180;
                l = 100;
            }
            t = t + speed * T * Math.sin(f * Math.PI / 180);
            if (t < 0) {
                f = f + 180;
                t = 0;
            } else if (t > 100) {
                f = f + 180;
                t = 100;
            }
            star.style.left = l + '%';
            star.style.top = t + '%';
            readyStar[i][1] = l;
            readyStar[i][2] = t;
            readyStar[i][3] = f;
        }
        now = window.performance.now();
        requestAnimationFrame(animateStar);
    }
    drawStars();
    animateStar();
    now = window.performance.now();
}

function initSkills() {
    var kd = [90, 70, 65, 30, 40, 60, 10]
    $$('.skills .item .r div').forEach(function (d) {
        d.style.transition = 'none';
        d.style.width = '';
    })
    setTimeout(function () {
        $$('.skills .item .r div').forEach(function (d, i) {
            d.style.transition = 'all 0.5s';
            d.style.width = kd[i] + '%';
        })
    }, 300)
}

function initMenuBtn() {
    $('.menubtn').onclick = function () {
        $('.leftbar').classList.add('on');
    }
    $('.closebtn').onclick = function () {
        $('.leftbar').classList.remove('on');
    }
}

function initWarmaStyle() {
    document.querySelector('.warma-back-top').onclick = function () {
        if (document.body.classList.contains('warma')) {
            delete localStorage.iswarma;
            document.body.classList.remove('warma');
        } else {
            localStorage.iswarma = 1;
            document.body.classList.add('warma');
        }
    }


    if (localStorage.iswarma) {
        document.body.classList.add('warma');
    }
}

initRouter();
resizeWindow();
initPlayer();
initSays();
initStars();
initMenuBtn();
initWarmaStyle();