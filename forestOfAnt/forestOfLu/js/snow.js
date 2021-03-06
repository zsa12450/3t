//停止下雪的记录器
var stopSnow;
var wind_time;
//先找到下雪的盒子
var box = document.getElementById("box");
//风力等级
var windGrade = 0;
//每一个雪花的唯一标识
var index = 0;
//为按钮绑定事件
var event = document.getElementById("raiders");
event.onclick = function (ev) {
    makeSnow();
}
event.ondblclick = function (ev) {
    windGrade ++;
    if(windGrade > 10){
        windGrade = 0;
    }
    wind_run(windGrade);
}
//停止按钮
document.getElementById("stopButton").ondblclick = function (ev) {
    clearTimeout(stopSnow);
}
//开始制造雪花
function makeSnow() {
    //制造雪花的div
    var snow = document.createElement("div");
    //给雪花添加一系列的控制属性
    snow.id = "snow" + index++;
    snow.innerHTML = "*";
    snow.className = "snow";
    //雪花的散落高度
    snow.style.top = box.offsetHeight * (Math.random() > 0.3 ? Math.random(): 0) + "px";
    //控制雪花的左右
    var snowLeft;
    if(windGrade != 0){
        snowLeft = Math.random()>Math.abs(windGrade * 0.025)?Math.random():(windGrade > 0 ? 0:1);
    }else{
        snowLeft = Math.random();
    }
    snow.style.left = box.offsetWidth * snowLeft+"px";
    //将雪花添加进去
    box.appendChild(snow);
    goDown(snow.id,snow.id,8*Math.random());
    //控制制造雪花的时间
    var makeTime = 2000 * Math.random() * Math.random();
    stopSnow = setTimeout(makeSnow,makeTime);
}
//移除标签的函数
function removeElement(element) {
    var elementParent = element.parentNode;
    if(elementParent){
        elementParent.removeChild(element);
    }
}
//开始让雪花动起来
function goDown(index,timer,speed) {
    if(speed < 3){
        speed = 3;
    };
    var snow = document.getElementById(index);
    snow.style.top = parseInt(snow.style.top) + speed + "px";
    //判断雪花的高度是否是小于盒子高度的
    if(parseInt(snow.style.top) < box.offsetHeight){
        //    如果小于则继续改变雪花的高度
        timer = setTimeout("goDown(\""+index+"\",\""+timer+"\","+speed+")",20);
    }else{
        //    否则让雪花消失
        clearTimeout(timer);
        removeElement(snow);
        speed = null;
    }
}
//控制风速
function wind_run(wind) {
    var snow = document.getElementById("box").getElementsByTagName("div");
    for (var i = 0; i < snow.length; i ++){
        snow[i].style.left = parseInt(snow[i].style.left) + wind + "px";
    }
    if(Math.abs(wind) > 0.1){
        wind_time = setTimeout("wind_run("+wind+")",20);
    }else {
        clearTimeout(wind_time);
        wind = 0;
    };
};