$(function() {
    var editorJavascript = ace.edit("edJS"),
        editorCSS = ace.edit("edCSS"),
        editUrls = $('.val'),
        originUrl;
    editorJavascript.setTheme("ace/theme/eclipse");
    editorJavascript.getSession().setMode("ace/mode/javascript");
    editorJavascript.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true
    });
    editorCSS.setTheme("ace/theme/eclipse");
    editorCSS.getSession().setMode("ace/mode/css");
    chrome.tabs.query({
            'active': true,
            'windowId': chrome.windows.WINDOW_ID_CURRENT
        },
        function(tabs) {
            originUrl = tabs[0].url;
            editUrls[0].val(originUrl);
        }
    );
    $('#save').on('click', function() {
        var urlArray = [],
            js = editorJavascript.getValue(),
            css = editorCSS.getValue();
        editUrls.each(function(index, item) {
            urlArray.push($(item).val());
        })
        if ((!js && !css) || urlArray.length == 0) {
            return;
        }
        chrome.storage.local.get(['sequence', 'rules', 'urlRegex'], function(result) {
            var se = typeof result['sequence'] === 'number' ? result['sequence'] : 0,
                rules = typeof result['rules'] === 'object' ? result['rules'] : {},
                urls = typeof result['urlRegex'] === 'object' ? result['urlRegex'] : {};
            se++;
            rules[se] = {
                js: js,
                css: css
            };

            urls[se] = {
                urls: urlArray
            };

            chrome.storage.local.set({
                'sequence': se,
                'rules': rules,
                'urlRegex': urls
            });

        })

    })

    $('#reset').on('click', function() {
        editorJavascript.setValue("");
        editorCSS.setValue("");
        editUrls[0].val(originUrl);
    })

    function deferInit() {
        var deferred = {};
        var promise = new Promise(function(resolve, reject) {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
        deferred.promise = promise;
        return deferred;
    }

})
