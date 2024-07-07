function exit() {
    if (参数["VE"] == 1) {
        parent.window.exit()
    } else {
        webbox("finish")
    }
}
function exit_clear() {
    dom.ls.set("SAC", "")
    exit()
}
function clear_SAC() {
    dom.ls.set("SAC", "")
    if (参数["VE"] == 1) {
        mdui.snackbar({
            message: "清除成功"
        });
    } else {
        webbox("toast/清除成功")
    }
}
opt = {
    ls: [
        "autologin"
    ],
    set: function(optid, value) {
        if (value == true) {
            dom.ls.set("opt_" + optid, true)
        } else {

            dom.ls.set("opt_" + optid, false)
        }
        //alert(optid+value)
    },
    autologin: true
}
function toBool(value) {
    return (String(value) === '1' || String(value).toLowerCase() === 'true');
}
function 滑动(v) {
    if (v) {
        if (dom.get("rang").value < 图片数量) {
            dom.get("rang").value = parseInt(dom.get("rang").value) + 1
            切换图片(dom.get("rang").value)
        }
    } else {
        if (dom.get("rang").value > 1) {
            dom.get("rang").value = dom.get("rang").value - 1
            切换图片(dom.get("rang").value)
        }
    }
    mdui.updateSliders()
}
function webbox(act) {
    window.location.replace("webbox://" + act)
}


function 检查更新() {
    if (参数["_PluginCode"] < 最新版) {

    } else {
        if (参数["VE"] == 1) {
            alert("浏览器环境无法检测")
        } else {
            webbox("toast/已是最新版")
        }
    }
}

function 随机(min, max) {
    const floatRandom = Math.random()

    const difference = max - min

    // 介于 0 和差值之间的随机数
    const random = Math.round(difference * floatRandom)

    const randomWithinRange = random + min

    return randomWithinRange
}
function 切换图片(i) {
    if (login == true) {
        $("#prog").stop()
        $("#prog").fadeIn(progfade)
        $("#img").stop()
        $("#img").fadeOut(100);
        当前图片 = i
        setTimeout(function() {
            dom.get("img").src = "img/" + 当前图片 + ".jpg"
            dom.get("img").onload = function() {
                $("#prog").stop()
                $("#prog").fadeOut(progfade)
                $("#img").stop()
                $("#img").fadeIn(100);
            }
            dom.get("title").innerHTML = "NropHub - " + i
        }, 100)
    } else {
        login()
    }
}
function init_opt() {
    for (var i = 0; i < opt.ls.length; i++) {
        opt[opt.ls[i]] = toBool(dom.ls.get("opt_" + opt.ls[i]))
    }
    for (var i = 0; i < opt.ls.length; i++) {
        if (opt[opt.ls[i]] == true) {
            dom.get("opt_" + opt.ls[i]).checked = true
        } else {
            dom.get("opt_" + opt.ls[i]).checked = false
        }
    }
}
function init() {
    
    
    dom.get("rang").max = 图片数量
    if (login == true) {
        if (dom.ls.get("图片数量") < 图片数量) {

            mdui.snackbar({
                message: '更新了 ' + (图片数量 - dom.ls.get("图片数量")) + ' 张图片'
            });


        }
        dom.ls.set("图片数量", 图片数量)
        $("#prog").stop()
        $("#prog").fadeIn(progfade)
        当前图片 = 随机(1, 图片数量);
        dom.get("rang").value = 当前图片
        mdui.updateSliders()
        //alert(dom.get("rang").value)
        切换图片(当前图片)
        dom.get("img").onload = function() {
            $("#prog").stop()
            $("#prog").fadeOut(progfade)
            $("#img").stop()
            $("#img").fadeIn(100);
        }
    }
}
window.onload = function() {
    $("#prog").stop()
    $("#prog").fadeOut(progfade)
}
function getVKey(va) {
    var vs = va.split("-")
    var vs1 = parseInt(vs[0])
    var vs2 = parseInt(vs[1])
    return (Math.round((vs1 * vs2 + vs1 + vs2) / vs1 * vs2))
}
function login() {
    if (参数["VE"] != "1") {
        mdui.prompt("输入激活码", "激活",
            function(v) {
                var a = ""
                for (var i = 3; i < v.length; i++) {
                    a = a + "*"
                }
                if (keys.indexOf(v) != -1 || parseInt(v.split("-")[2]) == getVKey(v)) {
                    login = true
                    dom.get("jhm").style.display = "inline-block"
                    dom.get("jhm").innerHTML = "激活码:" + v.substring(0, 3) + a
                    dom.get("login").style.display = "none"
                    webbox("toast/激活成功")
                    dom.ls.set("SAC", v)
                } else {
                    webbox("toast/激活码错误")
                }
                dom.ls.set("SAC", v)
                init()
            },
            function(v) {
                dom.ls.setItem("SAC", v)
                init()
            },
            {
                defaultValue: dom.ls.get("SAC"),
                cancelText: "",
                confirmText: "激活"
            })
    } else {
        var v = prompt("输入激活码", dom.ls.get("SAC"))
        var a = ""
        for (var i = 3; i < v.length; i++) {
            a = a + "*"
        }
        if (keys.indexOf(v) != -1 || parseInt(v.split("-")[2]) == getVKey(v)) {
            login = true
            dom.get("jhm").style.display = "inline-block"
            dom.get("jhm").innerHTML = "激活码:" + v.substring(0, 3) + a
            dom.get("login").style.display = "none"
            mdui.snackbar({
                message: "激活成功"
            });
            dom.ls.set("SAC", v)
        } else {
            mdui.snackbar({
                message: "激活码错误"
            });
        }
        dom.ls.set("SAC", v)
        init()
    }
}
init_opt()
if (opt.autologin == true) {
    var va = dom.ls.get("SAC")
    var a = ""
    for (var i = 3; i < va.length; i++) {
        a = a + "*"
    }
    if (keys.indexOf(va) != -1 || parseInt(va.split("-")[2]) == getVKey(va)) {
        login = true
        dom.get("jhm").style.display = "inline-block"
        dom.get("jhm").innerHTML = "激活码:" + va.substring(0, 3) + a
        dom.get("login").style.display = "none"
        init()
    } else {
        login()
    }
} else {
    login()
}