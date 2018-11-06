let calcTime = (time, size = 'big') => {
  var str = String(time).replace(/-/g,"/");

  var newSS = new Date(str);

  var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if(size == 'big') {
    var res = month[newSS.getMonth()] + " " + newSS.getDate() + "，" + newSS.getFullYear() + "\t" + getMoon(newSS.getHours());
  } else {
    var res = month[newSS.getMonth()] + " " + newSS.getDate() + " " + getMoon(newSS.getHours());
  }

  return res;
}

let getMoon = (hour) => {
  var res;
  if(hour >= 0 && hour < 6) {
    res = "凌晨";
  } else if(hour < 9) {
    res = "早晨";
  } else if(hour < 11) {
    res = "上午";
  } else if(hour < 15) {
    res = "中午";
  } else if(hour < 19) {
    res = "下午";
  } else {
    res = "晚上";
  }

  return res;
}

let htmlDecode = (str) => {  
  var s = "";
  str = String(str);
  if(str.length == 0) return "";
  s = str.replace(/&amp;/g,"&");
  s = s.replace(/&lt;/g,"<");
  s = s.replace(/&gt;/g,">");
  s = s.replace(/&nbsp;/g," ");
  s = s.replace(/&#39;/g,"\'");
  s = s.replace(/&quot;/g,"\"");
  return s;  
}

let htmlEncode = (str) => {
  var s = "";
  if(str.length == 0) return "";
  s = str.replace(/&/g,"&amp;");
  s = s.replace(/</g,"&lt;");
  s = s.replace(/>/g,"&gt;");
  s = s.replace(/ /g,"&nbsp;");
  s = s.replace(/\'/g,"&#39;");
  s = s.replace(/\"/g,"&quot;");
  return s;
}

let setLazyLoadImg = () => {
  let windowHeight = window.innerHeight;
  let i, scroll, imgs, imgHeight;

  let load = () => {
    scroll = document.documentElement.scrollTop || document.body.scrollTop;
    imgs = document.getElementsByClassName('lazyload');

    for (i = 0; i < imgs.length; i++) {
      imgHeight = imgs[i].offsetTop;

      if (imgHeight < windowHeight + scroll) {
        // "https://sansiro.me" + 
        imgs[i].src = imgs[i].getAttribute('data-src');
        imgs[i].className = imgs[i].className.replace('lazyload','lazyloaded')
      }
    }
  }

  load();

  window.addEventListener('scroll', load);      
}

let posTop = () => {
  document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop = 0;
}

let trim = str => {
  return str.replace(/(^\s+)|(\s+$)/g, '');
}

module.exports = {calcTime, htmlDecode, setLazyLoadImg, posTop, trim, htmlEncode};

