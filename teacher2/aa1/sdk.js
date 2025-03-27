/**
 * v1.3
 */
var __w_lang__ = "";
try{
    __w_lang__ = navigator.language||navigator.userLanguage;
}catch (e) {}
var __w_timezone__ = "";
try{
    __w_timezone__ = Intl.DateTimeFormat().resolvedOptions().timeZone;
}catch (e) {}

try{
    window.onbeforeunload = function () {
        __miaosdk.report_event(__miaosdk.p.k_close)
    }
}catch (e) {
}

var __miaosdk = {
    p : {
        hbt: 240000,
        k_init: "__init__",
        k_hb : "__heartbeat__",
        k_close : "__close__",
        h_1:"https://p2.miaosdk.com",
        h_2:"https://p4.miaosdk.com",
        h_3:"",
        h_4:"",
        sk:"__sk__",
        pid:"",
    },
    init: function () {

        if(__miaosdk.isCrawler()){return;}

        try{
            if(_ms_[0][0] == "config") {
                __miaosdk.p.pid = _ms_[0][1]
                __miaosdk.p.sk = "__sk_"+__miaosdk.p.pid+"__"
                _ms_.splice(0, 1);
            }
        }catch (e) {
            setTimeout(__miaosdk.init, 50);
            return;
        }

        if(!__miaosdk.p.pid){return;}

        var sk = __miaosdk.cookie_get(__miaosdk.p.sk);
        if (!sk || sk == "null") {
            __miaosdk.init_session();
        } else {
            __miaosdk.report_event(__miaosdk.p.k_init);
            // setTimeout(__miaosdk.heartbeat, __miaosdk.p.hbt);
            __miaosdk.cookie_set(__miaosdk.p.sk, sk);
        }

        __miaosdk.events();

        setInterval(__miaosdk.events, 2000);
    },
    isCrawler : function(){
        const botPatterns = [
            /bot/i,
            /crawl/i,
            /slurp/i,
            /spider/i,
            /googlebot/i,
            /bingbot/i,
            /yahoobot/i,
            /duckduckbot/i,
            /baiduspider/i,
            /yandexbot/i,
            /sogou/i,
            /exabot/i,
            /facebot/i,
            /ia_archiver/i
        ];

        const userAgent = navigator.userAgent.toLowerCase();
        return botPatterns.some(pattern => pattern.test(userAgent));
    },
    events: function(){
        try{
            var event = _ms_[0];
            if(event){
                _ms_.splice(0, 1);
            }else{
                return;
            }
            var es = Array.from(event);
            var ek = es[0]

            es.splice(0, 1);
            __miaosdk.report_event(ek, es.join(","))
        }catch (e) {
        }
    },
    randomWord : function(length){
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            result += charset[randomIndex];
        }
        return result;
    },
    cookie_set: function (name, value) {
        try {
            var cookieText = name + "=" + value;
            var expires = new Date(new Date().getTime() + 31536000000); // 1年
            cookieText += "; expires=" + expires.toGMTString();
            cookieText += "; path=/; SameSite=None; Secure";
            document.cookie = cookieText;
        } catch (e) {
        }
        var value = __miaosdk.cookie_get(name);
        if (!value) {
            localStorage.setItem(name, value);
        }
    },
    cookie_get: function (name) {
        try {
            var cookieValue = null;
            var cookieName = name + "=",
                cookieStart = document.cookie.indexOf(cookieName);

            if (cookieStart > -1) {
                var cookieEnd = document.cookie.indexOf(";", cookieStart);
                if (cookieEnd == -1) {
                    cookieEnd = document.cookie.length;
                }
                cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
            }

            if (cookieValue) {
                return cookieValue;
            } else {
                return localStorage.getItem(name);
            }

        } catch (e) {
        }
    },
    ajax: function (host, url, params, callback) {
        params = __miaosdk.common_params(params)
        console.log(host+url, params)
        var xhr = new XMLHttpRequest();
        xhr.timeout = 3000;
        xhr.open('POST', host+url+"?k=" + __miaosdk.p.pid +"&v=" + params.key, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        var data = ''
        for (var key in params) {
            var s = key + '=' + params[key] + '&'
            data += s
        }

        xhr.onerror = function () {
            __miaosdk.ajax_error(host, url, params, callback)
        };

        xhr.ontimeout = function () {
            __miaosdk.ajax_error(host, url, params, callback)
        };

        xhr.send(data);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText)
                if (callback) {
                    callback(xhr.responseText)
                }
            }
        }
    },

    next_host: function(chost){
        if(chost == __miaosdk.p.h_1){
            return __miaosdk.p.h_2;
        }else if(chost == __miaosdk.p.h_2){
            return __miaosdk.p.h_3;
        }else if(chost == __miaosdk.p.h_3){
            return __miaosdk.p.h_4;
        }else if(chost == __miaosdk.p.h_4){
            return "";
        }
        return "";
    },

    ajax_error : function(host, url, params, callback){
        var newHost = __miaosdk.next_host(host);
        if(newHost == ""){return}
        __miaosdk.ajax(newHost, url, params, callback)
    },

    common_params: function (params) {
        if (params == undefined) params = {}
        if (!params.wsk) params.wsk = __miaosdk.cookie_get(__miaosdk.p.sk)
        if (!params.wsk || params.wsk == "null") {
            params.wsk = __miaosdk.randomWord(32);
            __miaosdk.cookie_set(__miaosdk.p.sk, params.wsk);
        }
        if (!params.pid) params.pid = __miaosdk.p.pid;
        // if (!params.curl) params.curl = window.location.href;
        if (!params.curl) params.curl = window.location.pathname;
        if (!params.rurl) params.rurl = __miaosdk.getQueryVariable("","referrer") || document.referrer;

        params.lang = __w_lang__;
        params.timezone = __w_timezone__;

        return params
    },
    getQueryVariable: function (query, key, fallback) {
        if (!query) {
            query = window.location.search.substring(1);
        }
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == key) {
                return pair[1];
            }
        }
        return fallback;
    },
    report_event: function (key, tags) {
        var params = {key: key, tk: __miaosdk.randomWord(6), tags: tags}
        __miaosdk.ajax(__miaosdk.p.h_1 , '/sdk/event', params);
    },
    report_data: function (key, value) {
        var params = {key: key, value: value, tk: __miaosdk.randomWord(6)}
        __miaosdk.ajax(__miaosdk.p.h_1 , '/sdk/data', params);
    },

    init_session: function () {
        const p = {
            userAgent: navigator.userAgent,
            language: __w_lang__,
            screenResolution: `${screen.width}x${screen.height}`,
            colorDepth: screen.colorDepth,
            timezone: __w_timezone__,
            platform: navigator.platform,
            plugins: Array.from(navigator.plugins).map(plugin => plugin.name).join(', '),
            cookiesEnabled: navigator.cookieEnabled,
            touchSupport: 'ontouchstart' in window ? 'Yes' : 'No',
        };

        const params = {
            tk: __miaosdk.randomWord(6),
            kk: p.userAgent+"_"+p.language+"_"+p.screenResolution+"_"+ p.colorDepth+"_"+p.timezone+"_"+p.platform+"_"+p.plugins+"_"+p.cookiesEnabled+"_"+ p.touchSupport
        };

        __miaosdk.ajax(__miaosdk.p.h_1 , '/sdk/init', params, function (sk) {
            console.log(sk);
            __miaosdk.cookie_set(__miaosdk.p.sk, sk);

        });
    },
    heartbeat: function () {
        __miaosdk.report_event(__miaosdk.p.k_hb)
        // setTimeout(__miaosdk.heartbeat, __HBT);
    }
}

__miaosdk.init();
