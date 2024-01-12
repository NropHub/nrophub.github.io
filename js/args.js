图片数量 = 28
最新版=1
progfade=200
    function 获取参数() {  

   var url = location.search;
   
   //获取url中"?"符后的字串  
   
   var theRequest = new Object(); 
   
   if (url.indexOf("?") != -1) { 
   
      var str = url.substr(1); 
      
      strs = str.split("&");  
      
      for(var i = 0; i < strs.length; i ++) {  
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
         
      }  
   }  
   return theRequest;  
   
}  
    参数=获取参数()
    if(navigator.userAgent!="HTML/WebView app/webbox webbox/1.1"&&参数["dev"]!=1&&参数["VE"]!=1){
        dom.get("nobox").style.display="block"
        nobox=true
    }