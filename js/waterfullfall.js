/**
 * Created by liujiabin on 2017/10/12.
 */
window.onload=function(){
    waterfall('main', 'box');

    var dataInt={'data':[{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'}]};
    window.onscroll=function(){
        if(scrollchange()){
            var oParent = document.getElementById('main');
            for (var i=0;i<dataInt.data.length;i++){
                var oBox=document.createElement('div');
                oBox.className='box';
                oParent.appendChild(oBox);
                var oPic=document.createElement('div');
                oPic.className='pic';
                oBox.appendChild(oPic);
                var oImg=document.createElement('img');
                oImg.src="images/"+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
        }
        waterfall('main', 'box');
    }
};
function waterfall(parent, box) {
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);

    var oBoxw = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / oBoxw);

    oParent.style.cssText = 'width:' + cols * oBoxw + 'px;margin:0 auto';

    var hArr=[];
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight)
        }else{
            var minH=Math.min.apply(null,hArr);
            var index=getIndex(hArr,minH);
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top=minH+'px';
            oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
}
function getByClass(parent, clsName) {
    var boxArr = [];
    var oElemnts =parent.getElementsByTagName('*');
    for (var i = 0; i < oElemnts.length; i++) {
        if (oElemnts[i].className == clsName) {
            boxArr.push(oElemnts[i]);
        }
    }
    return boxArr;
}
function getIndex(arr,val) {
    for(var i in arr){
        if (arr[i]==val){
            return i;
        }
    }
}
function scrollchange() {
    var oParent = document.getElementById('main');
    var oBoxs = getByClass(oParent, 'box');
    var boxT=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    var sceenH=document.body.clientHeight||document.documentElement.clientHeight;
    return (boxT<=scrollTop+sceenH)?true:false;
};