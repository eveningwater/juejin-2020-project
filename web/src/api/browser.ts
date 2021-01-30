
const ua = window.navigator.userAgent;
const isIE = "ActiveXObject" in window;
const isChrome = ua.match(/Chrome/i);
const isMobile = (ua.match(/iPhone|iPad|iPod/i) || ua.match(/Android/i) || ua.match(/Windows Phone/i) || ua.match(/IEMobile/i));
let IEVersion = null;
let isIE8,isIE9,isIE10,isIE11;
isIE8 = isIE9 = isIE10 = isIE11;

const appName = navigator.appName;
if(appName === "Microsoft Internet Explorer" || isIE){
    const matchStr = ua.match(/MSIE (\d+[.\d]*)/);
    if(matchStr){
        IEVersion = matchStr[1];
        const num = parseInt(IEVersion,10);
        isIE8 =  num === 8;
        isIE9 =  num === 9;
        isIE10 =  num === 10;
        isIE11 =  num === 11;
    }
}

export default {
    isChrome,
    isIE,
    isMobile,
    IEVersion,
    isIE8,
    isIE9,
    isIE10,
    isIE11
}