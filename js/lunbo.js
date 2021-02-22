function data(imgs,btns){
var index=0
//自动播放
var timer
move(imgs[index],100)
var time2
auto()
function auto() {
    time2=setInterval(function(){
        fn1()
        index++
        if(index>2){
            index=0
        }
        fn2()
        move(imgs[index],100)
    },7000)
}
//鼠标移入按钮时触发
for(let i=0;i<btns.length;i++){
    btns[i].n=i
    btns[i].onmouseover=function(){
        clearInterval(auto)
        fn1()
        index=this.n
        fn2()
        move(imgs[index],100)
        auto
    }
}
function fn1(){
    imgs[index].style.zIndex=9
    imgs[index].style.opacity=0.1
    btns[index].className=''
}
function fn2(){
    btns[index].className='show'
    imgs[index].style.zIndex=10
}
function move(dom,target){
    //透明度初始值
    var opa=10
    clearInterval(timer)
    timer=setInterval(function(){
        if(opa>target){ //每次走的步数
            var speed=-5
        }else{
            var speed=5
        }
        //剩余运动量 <= 每次运动量
        if(Math.abs(opa-target)<=Math.abs(speed)){
            clearInterval(timer)
            dom.style.opacity=target/100
        }else{
            opa+=speed
            dom.style.opacity=opa/100
        }
    },20)
}
}