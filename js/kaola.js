window.onload=function(){
    data(mains,spans)
    data(mains2,spans2)
    data(mains3,spans3)
    
    
    cookies()
    function cookies(){
    var cookie=document.cookie.split('=')[1]
    if(document.cookie!=''){
        $('.head_a').css('display','none')
        $('.user_tui').css('display','block').prev().css('display','block').find('span').html(`${cookie}`)
        console.log(1)
    }else{
        $('.head_a').css('display','block')
        $('.user_tui').css('display','none').prev().css('display','none')
        console.log(0)
    }
    
    $('.user_tui').on('click',function(){
        document.cookie =`name=${cookie};expires=Thu, 18 Dec 2018 12:00:00 GMT'';`
        cookies()
    })
    }
    


    //浏览器滚动事件
if(40<window.pageYOffset){
    $('.inp_none').css('display','block')
    $('#inp').removeClass('inp').addClass('inp_fix')
    $('.inp_box').css("height","50px")
    $('.inp_logo').css('display','none').next().css('display','block').next().css('top','7px').next().css('display','none')
}
window.onscroll=function(){
    var sum=window.pageYOffset //屏幕Y轴距离
    if(sum>40){
        $('.inp_none').css('display','block')
        $('#inp').removeClass('inp').addClass('inp_fix')
        $('.inp_box').css("height","50px")
        $('.inp_logo').css('display','none').next().css('display','block').next().css('top','7px').next().css('display','none')
    }else{
        $('.inp_none').css('display','none')
        $('#inp').removeClass('inp_fix').addClass('inp')
        $('.inp_box').css("height","100px")
        $('.inp_logo').css('display','block').next().css('display','none').next().css('top','33px').next().css('display','block')
    }
    //判断网页距离顶部大于500
    if(sum>625){
        $('.fix_style').css({
            position:'fixed',
            top:'66px'
        })
    }else{
        $('.fix_style').css({
            position:'absolute',
            top:'525px'
        })
    }
}
}





var wid=document.body.clientWidth //当前屏幕宽度
var body1=document.querySelector('body') //body标签
    body1.style.overflowX='hidden'
window.onresize=function(){
    if(wid>document.body.clientWidth){
        body1.style.overflowX=''
    }else{
        body1.style.overflowX='hidden'
}
}




var num=0 //第一张图片显示
var time //定时器
fn()
function fn() {
    clearInterval(time)
    time=setInterval(function(){
        num++
        if(num==$('.logo_btn span').length){
            num=0
        }
        yuandian(num)
        
    },5000)
}
//点击左边按钮时
$('.logo_left').click(function(){
    num--
    if(num<0){
        num=2
    }
    yuandian(num)
})
//点击右边按钮时
$('.logo_rig').click(function(){
    num++
        if(num==$('.logo_btn span').length){
            num=0
        }
        yuandian(num)
})
// 鼠标划入图片上时
$('.logo_a').mouseover(function(){
    clearInterval(time)
})
// 鼠标划出图片上时
$('.logo_a').mouseout(function(){
    fn()
})
//鼠标划入小圆点
$('.logo_btn span').mouseover(function(){
    clearInterval(time)
    num=$(this).index()
    yuandian(num)
})
//根据索引点亮小圆点
function yuandian(num){
    $('.logo_img').eq(num).fadeIn(250).siblings().fadeOut(200);
    $('.logo_btn').find('span').removeClass('logo_btn_col').eq(num).addClass('logo_btn_col')
}

// 小轮播
var mains=document.querySelectorAll('.lunbo_one')//轮播
var spans=document.querySelectorAll('.btn_one span') //按钮
var mains2=document.querySelectorAll('.lunbo_two')//轮播
var spans2=document.querySelectorAll('.btn_two span') //按钮
var mains3=document.querySelectorAll('.lunbo_three')//轮播
var spans3=document.querySelectorAll('.btn_three span') //按钮
