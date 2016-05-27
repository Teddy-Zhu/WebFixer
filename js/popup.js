$(function() {
    var editorJavascript = ace.edit("edJS");
    editorJavascript.setTheme("ace/theme/eclipse");
    editorJavascript.getSession().setMode("ace/mode/javascript");
    var editorCSS = ace.edit("edCSS");
    editorCSS.setTheme("ace/theme/eclipse");
    editorCSS.getSession().setMode("ace/mode/css");
})
