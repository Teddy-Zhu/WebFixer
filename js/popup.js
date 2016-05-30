$(function() {
    var editorJavascript = ace.edit("edJS"),
        editorCSS = ace.edit("edCSS"),
        editUrl = $('#url'),
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
            editUrl.val(originUrl);
        }
    );
    $('#save').on('click', function() {
        console.log(editorJavascript.getValue());
        console.log(editorCSS.getValue());
    })

    $('#reset').on('click', function() {
        editorJavascript.setValue("");
        editorCSS.setValue("");
        editUrl.val(originUrl);
    })

})
