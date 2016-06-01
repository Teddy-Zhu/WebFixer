(function() {

    var rules, sequence, urlRegex;

    //initial
    chrome.storage.local.get(['sequence', 'rules', 'urlRegex'], function(result) {
        sequence = typeof result['sequence'] === 'number' ? result['sequence'] : 0;

        rules = typeof result['rules'] === 'object' ? result['rules'] : {};

        urlRegex = typeof result['urlRegex'] === 'object' ? result['urlRegex'] : {};

    })

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
                newRegex = changeValue['rules']['newValue'];
                oldRegex = changeValue['rules']['oldValue'];
                //diff
                for (var regex in newRegex) {
                    var nRegex = newRegex[nRegex];
                    if (regex in oldRegex) {
                        var oRegex = oldRegex[regex]
                        if (oRegex.urls.sort().toString() !== nRegex.urls.sort().toString()) {
                            urlRegex[regex] = nRegex;
                            buildRegex(urlRegex, regex)
                        }
                    } else {
                        urlRegex[regex] = nRegex;
                        buildRegex(urlRegex)
                    }
                }
            }
        }
    })

    function buildRegex(originRegex, se) {
        if (originRegex[se].urls instanceof Array) {
            for (var url in originRegex[se].urls) {
                originRegex[se][url] = new RegExp(url);
            }
        }
    }

    window.webfixer = {
        rules: rules,
        sequence: sequence,
        urlRegex: urlRegex
    }
}());
