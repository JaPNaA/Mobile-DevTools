var vars = {
    refreshed: false,
    frame: false,
    consoleHistory: [],
    consoleHistoryIx: -1,
    activeFrame: undefined,
    theme: true
};
(function() {
    document.body.innerHTML =
        "<iframe class=main name=main></iframe> <div id=console><div id=ClogC style='background-color:white'><div id=cLog></div></div><div id=cIn><textarea></textarea> </div></div>";
    vars.activeFrame = window.frames[$('iframe.main').name];
    onresize = function() {
        var a = $('iframe.main'),
            b = $('#ClogC');
        c = $('#console')
        if (vars.frame) {
            a.width = innerWidth - 302;
            a.height = innerHeight;
            b.style.height = innerHeight - 83 + "px";
            c.style.width = "300px";
        } else {
            a.width = 0;
            a.height = innerHeight;
            b.style.height = innerHeight - 83 + "px";
            c.style.width = innerWidth + "px";
        }
    }
    onresize();
}());

function aConsole(e, f) {
    var z = $('#cLog'),
        a = "<div></div>",
        s, f, zs = $('#ClogC'),
        ea = (function() {
            return (!(f == 2) && e && (typeof e == "string")) ? (function() {
                var d = e.split('<'),
                    f = "";
                d.forEach(function(ob) {
                    f += ob + "&lt;";
                });
                return f.substring(0, f.length - 4);
            }()) : e;
        }());
    if (typeof e == "function") {
        ea = e.toString();
    };
    if (e && e.outerHTML) {
        var d = e.outerHTML.split('<'),
            f = "";
        d.forEach(function(ob) {
            f += ob + "&lt;";
        });
        ea = f.substring(0, f.length - 4);
    }
    switch (typeof e) {
        case "string":
            if (f == 1) ea = '"' + ea + '"';
            break;
        case "number":
            ea = '<span class=__number>' + e + '</span>'
            break;
        case "boolean":
            ea = '<span class=__bool>' + e + "</span>";
        default:
            ea = ea;
            break;
    }
    switch (f) {
        case 0:
            a = "<div class=_log> " + ea + "</div>";
            break;
        case 1:
            a = "<div class=_return> " + ea + "</div>";
            break;
        case 2:
            a = "<div class=_error> " + ea + "</div>";
            break;
        case 3:
            a = "<div class=_warn> " + ea + "</div>";
            break;
        case 4:
            z.innerHTML = "";
            a = "<div class=_info> Console cleared</div>";
            break;
        case 5:
            a = "<div class=_command> " + ea + "</div>";
            break;
        default:
            a = "<div class=_unknown> " + ea + "</div>";
    }
    if (zs.scrollHeight - zs.scrollTop - zs.clientHeight < 1) {
        s = true;
    }
    f = $(a);
    z.appendChild(f);
    if (s) {
        f.scrollIntoView();
    }
}

function install(e) {
    var b = vars.activeFrame,
        f;
    var client = new XMLHttpRequest();
    client.open('GET', e);
    client.onreadystatechange = function() {
        clearTimeout(f);
        b.eval(client.responseText);
        f = setTimeout(function() {
            aConsole('Finished of failed installing');
        }, 1000);
    }
    client.send();
}

function consoleTools(e) {
    var x = e.split(' '),
        b = vars.activeFrame;
    switch (x[0].toLowerCase()) {
        case "version":
            aConsole('Version 0.3!# Beta');
            break;
        case "about":
            aConsole('(C) Copyright 2017, created by JaPNaA');
            break;
        case "help":
            aConsole("Learn JavaScript.");
            aConsole("Unless you want to know about these commands.");
            aConsole(
                "~#about ~#clear ~#debug ~#frame ~#help ~#insert ~#install ~#refresh ~#theme ~#version"
            );
            break;
        case "install":
            if (x[1]) {
                var b = vars.activeFrame;
                aConsole('Installing from: ' + x[1]);
                b.eval(install(x[1]));
            } else {
                aConsole('Syntax: ~#install [fileAdress].js/txt/com');
            }
            break;
        case "clear":
            if (x[1]) {
                switch (x[1]) {
                    case "console":
                    case "1":
                        aConsole('', 4);
                        break;
                    case "history":
                    case "2":
                        vars.consoleHistory = [];
                        break;
                    default:

                }
            } else {
                aConsole('Syntax: ~#clear [1-console/2-history]');
            }
            break;
        case "refresh":
            b.location.reload();
            if (vars.refreshed) location.reload();
            aConsole('Refreshed Frame, type again for full refresh');
            vars.refreshed = 2;
            break;
        case "debug":
            aConsole('Debug mode on.');
            debugger;
            aConsole('Debug closed. Nothing happend? Make sure DevTools is on');
            break;
        case "frame":
            if (!(x[1] == "on" || x[1] == "true" || x[1] == "off" || x[1] ==
                    "false")) {
                vars.frame = !vars.frame;
                if (vars.frame) {
                    aConsole('Frame on');
                } else {
                    aConsole('Frame off');
                }
            } else {
                if (x[1] == "on" || x[1] == "true")
                    vars.frame = true;
                if (x[1] == "off" || x[1] == "false")
                    vars.frame = false;
            }
            window.onresize();
            break;
        case "pop":
            consoleTools('frame off');
            vars.activeFrame = open('', '', 'width=' + x[1] || 100 + ',height=' +
                x[2] || 100);
            aConsole('Poped.');
            aConsole(
                'Btw if you didn\'t know, you can specify width and height in syntax.'
            );
            break;
        case "insert":
            $('#cLog').appendChild($('<div>' + (function() {
                var f = "";
                x.shift();
                x.forEach(function(ob) {
                    f += ob + " ";
                });
                return f.substring(0, f.length - 1);
            }()) + '</div>'))
            break;
        case "theme":
            if (x[1]) {
                if (x[1] == "0" || x[1] == "dark" || x[1] == "false") {
                    vars.theme = 0;
                }
                if (x[1] == "1" || x[1] == "light" || x[1] == "true") {
                    vars.theme = 1;
                }
            } else {
                vars.theme = !vars.theme;
            }
            if (vars.theme) {
                $('#console').style.filter = "none";
                $('#ClogC').style.background = "white";
                $('#cLog').style.fontWeight = "100";
            } else {
                $('#console').style.filter = "invert()";
                $('#cLog').style.fontWeight = "800";
            }
            break;
        default:
            aConsole('Unknown Command', 3);
            break;
    }
}
(function() {
    var b = vars.activeFrame,
        a = {
            log: function(e) {
                aConsole(e, 0);
            },
            clear: function() {
                aConsole(0, 4);
            },
            warn: function(e){
                aConsole(e,3);
            },
            error:function(e){
                aConsole(e,2);
            },
            info:function(e){
                aConsole(e,0);
            }
        }
    b.console = a;
}());
(function() {
    var a = $('#console'),
        x = [$('#cLog'), $('#cIn')];
    $('textarea', 1).addEventListener('keydown', function(e) {
        if (e.keyCode == 13 && !e.shiftKey) {
            vars.consoleHistoryIx = -1;
            var b = vars.activeFrame,
                c;
            if (vars.consoleHistory[vars.consoleHistory.length - 1] !=
                this.value)
                vars.consoleHistory.unshift(this.value);
            if (this.value.substring(0, 2) != "~#") {
                try {
                    aConsole(this.value, 5);
                    c = b.eval(this.value);
                } catch (er) {
                    aConsole(er, 2);
                } finally {
                    aConsole(c, 1);
                }
                this.value = "";
                e.preventDefault();
            } else {
                aConsole(this.value, 5);
                consoleTools(this.value.substring(2, this.value.length));
                this.value = "";
                e.preventDefault();
            }
            if (vars.refreshed) vars.refreshed -= 1;
        }
        if (e.keyCode == 38 || e.keyCode == 40) {
            if (e.keyCode == 38) {
                if (vars.consoleHistoryIx < vars.consoleHistory.length -
                    1)
                    vars.consoleHistoryIx += 1;
            }
            if (e.keyCode == 40) {
                if (vars.consoleHistoryIx > 0)
                    vars.consoleHistoryIx -= 1;
            }
            this.value = vars.consoleHistory[vars.consoleHistoryIx]
        }
    }, false);
}());
(function() {
    aConsole('Mobile DevTools, created by JaPNaA;');
    aConsole('Type ~#help for help.');
    $('textarea', 1).focus();
}());
