$(function() {
    var nowUrl = window.location.href,
        rules, sequence, urlRegex;

    function buildRegex(originRegex, se) {
        if (originRegex[se].urls instanceof Array) {
            for (var index in originRegex[se].urls) {
                if (originRegex[se].urls.hasOwnProperty(index)) {
                    var url = originRegex[se].urls[index];
                    originRegex[se][url] = new RegExp(url);
                }
            }
        }
    }
    chrome.runtime.sendMessage(null, {
        method: 'get',
        func: ['getRules', 'getSequence', 'getUrlRegex']
    }, null, function(response) {
        console.log('action');
        rules = response['getRules'];
        sequence = response['getSequence'];
        urlRegex = response['getUrlRegex'];
        var excute = [];
        for (var se in urlRegex) {
            if (urlRegex.hasOwnProperty(se)) {
                var cur = urlRegex[se];
                for (var url in cur['urls']) {
                    if (cur['urls'].hasOwnProperty(url)) {
                        if (new RegExp(cur['urls'][url]).test(nowUrl)) {
                            excute.push(se);
                            break;
                        }
                    }
                }
            }
        }
        var jsString = [],
            cssString = [];

        for (var index in excute) {
            if (excute.hasOwnProperty(index)) {
                var rule = rules[excute[index]];
                jsString.push(rule.js);
                cssString.push(rule.css);
            }
        }
        $('body').before('<style type="text/css">' + cssString.join(' ') + '</style>');
        $('body').append('<script type="text/javascript">' + jsString.join(' ') + '</script>')
    })
})
