(function() {

    var rules, sequence, urlRegex,
        prop = {
            getRules: function() {
                return rules;
            },
            getSequence: function() {
                return sequence;
            },
            getUrlRegex: function() {
                return urlRegex;
            },
        };

    //initial
    chrome.storage.local.get(['sequence', 'rules', 'urlRegex'], function(result) {
        sequence = typeof result['sequence'] === 'number' ? result['sequence'] : 0;

        rules = typeof result['rules'] === 'object' ? result['rules'] : {};

        urlRegex = typeof result['urlRegex'] === 'object' ? result['urlRegex'] : {};
        /*
        for (var se in urlRegex) {
            if (urlRegex.hasOwnProperty(se)) {
                buildRegex(urlRegex, se);
            }
        }
        */
    })

    /*
    //update listenner
    chrome.storage.onChanged.addListener(function(changeValue, areaName) {
        if (areaName === 'local') {
            if (typeof changeValue['sequence'] === 'object') {
                sequence = changeValue['sequence']['newValue'];
            }
            if (typeof changeValue['rules'] === 'object') {
                rules = changeValue['rules']['newValue'];
            }
            if (typeof changeValue['urlRegex'] === 'object') {
                newRegex = changeValue['urlRegex']['newValue'];
                oldRegex = changeValue['urlRegex']['oldValue'];
                //diff
                for (var regex in newRegex) {
                    if (newRegex.hasOwnProperty(regex)) {
                        var nRegex = newRegex[regex];
                        if (regex in oldRegex) {
                            if (oldRegex.hasOwnProperty(regex)) {
                                if (oldRegex[regex].urls.sort().toString() !== nRegex.urls.sort().toString()) {
                                    buildRegex(newRegex, regex)
                                } else {
                                    newRegex[nRegex] = urlRegex[regex]
                                }
                            }
                        } else {
                            buildRegex(newRegex, regex);
                        }
                    }
                }
            }
        }
    })
    */

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (typeof message !== 'object') return;
        var result = null;
        if (message.method === 'get') {
            if (message.func instanceof Array) {
                result = {};
                for (var index in message.func) {
                    if (message.func.hasOwnProperty(index)) {
                        var functionName = message.func[index];
                        result[functionName] = prop[functionName].call();
                    }
                }
            } else {
                result = prop[message.func].call();
            }
            sendResponse(result)
        }
    })

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

}());
