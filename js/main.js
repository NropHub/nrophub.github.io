function exit(){
    if(参数["VE"]==1){
        dom.get("exit").click()
    }
    else{
        webbox("finish")
    }
}
        function 滑动(v){
            if(v){
                if(dom.get("rang").value<图片数量){
                    dom.get("rang").value=parseInt(dom.get("rang").value) + 1
                    切换图片(dom.get("rang").value)
                }
            }
            else{
                if(dom.get("rang").value>1){
                    dom.get("rang").value=dom.get("rang").value - 1
                    切换图片(dom.get("rang").value)
                }
            }
            mdui.updateSliders()
        }
        function webbox(act){
            window.location.replace("webbox://"+act)
        }
        
        
        function 检查更新(){
            if(参数["_PluginCode"]<最新版){
                
            }
            else{
                if(参数["VE"]==1){
                    alert("浏览器环境无法检测")
                }
                else{
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
        function 切换图片(i){
            if(login==true){
            $("#prog").stop()
            $("#prog").fadeIn(progfade)
            $("#img").stop()
            $("#img").fadeOut(100);
            当前图片=i
            setTimeout(function(){
                dom.get("img").src="img/"+当前图片+".png"
                dom.get("img").onload=function(){
                $("#prog").stop()
                $("#prog").fadeOut(progfade)
                $("#img").stop()
                $("#img").fadeIn(100);
                }
                dom.get("title").innerHTML="NropHub - "+i
            },100)
            }
            else{
                login()
            }
        }
        function init(){
            dom.get("rang").max=图片数量
            if(login==true){
                if(dom.ls.get("图片数量")<图片数量){
                    
                    mdui.snackbar({
  message: '更新了 '+(图片数量-dom.ls.get("图片数量"))+' 张图片'
});
                
                    
                }
                dom.ls.set("图片数量",图片数量)
                $("#prog").stop()
                $("#prog").fadeIn(progfade)
            当前图片=随机(1,图片数量);
            dom.get("rang").value=当前图片
            mdui.updateSliders()
            //alert(dom.get("rang").value)
            切换图片(当前图片)
            dom.get("img").onload=function(){
                $("#prog").stop()
                $("#prog").fadeOut(progfade)
                $("#img").stop()
                $("#img").fadeIn(100);
            }
            }
        }
        window.onload=function(){
            $("#prog").stop()
            $("#prog").fadeOut(progfade)
        }
        function getVKey(va){
            var vs=va.split("-")
            var vs1=parseInt(vs[0])
            var vs2=parseInt(vs[1])
            return (Math.round((vs1*vs2+vs1+vs2)/vs1*vs2))
        }
        function login(){
            if(参数["VE"]!="1"){
        mdui.prompt("输入激活码","激活",
            function(v){
                var a=""
                for (var i=3;i<v.length;i++){
                    a=a+"*"
                }
                if(keys.indexOf(v)!=-1||parseInt(v.split("-")[2])==getVKey(v)){
                login=true
                dom.get("jhm").style.display="inline-block"
                dom.get("jhm").innerHTML="激活码:"+v.substring(0,3)+a
                dom.get("login").style.display="none"
                webbox("toast/激活成功")
                dom.ls.set("SAC",v)
                }
                else{
                    webbox("toast/激活码错误")
                }
                dom.ls.set("SAC",v)
                init()
            },
            function(v){
                dom.ls.setItem("SAC",v)
                init()
            },
            {
                defaultValue:dom.ls.get("SAC"),
                cancelText:"",
                confirmText:"激活"
            })
            }
            else{
                var v=prompt("输入激活码",dom.ls.get("SAC"))
                var a=""
                for (var i=3;i<v.length;i++){
                    a=a+"*"
                }
                if(keys.indexOf(v)!=-1||parseInt(v.split("-")[2])==getVKey(v)){
                login=true
                dom.get("jhm").style.display="inline-block"
                dom.get("jhm").innerHTML="激活码:"+v.substring(0,3)+a
                dom.get("login").style.display="none"
                mdui.snackbar({message: "激活成功"});
                dom.ls.set("SAC",v)
                }
                else{
                    mdui.snackbar({message: "激活码错误"});
                }
                dom.ls.set("SAC",v)
                init()
            }
        }
        login()
    