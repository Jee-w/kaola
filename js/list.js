window.onload=function(){
    //获取localstorage中的cartlist
    var cartList=localStorage.getItem('cartList')
    //把当前cartList字符串转为数组对象
    cartList=JSON.parse(cartList)
    gowu()
    //获取当前购物车有多少商品
    function gowu(){
        var cart_num=document.querySelector('.cart_num') //数量显示
        var cartnum=0 //购物车商品数量
        //遍历数组中所有元素
        cartList.forEach(item=>{
            cartnum+=item.numbar
        })
        cart_num.innerHTML=cartnum
    }


    // 分页器
    var cle=document.querySelector('.clearfix');
    var pagination1=document.querySelector('.pagination');
    (async function(){
        var dt=await promiseAjax({
            url:'./php/list.php',
            datatype:'json'
        })
        //创建分页器对象
        new Pagination(pagination1,{
            pageInfo:{
                pagenum:1, //当前页
                pagesize:16, //一页显示多少条
                totalsize:dt.length, //总条数
                totalpage:Math.ceil(dt.length/16) //总页数
            },
            textInfo:{
                first:'首页',
                prev:"上一页",
                next:"下一页",
                last:"尾页"
            },cb(m){
                //获取当前页需要显示的数据
                var ar1=dt.slice((m-1)*16,m*16)
                //创建拼接所有数据的字符串
                var str=''
                //遍历当前ar1数组中所有的数据
                ar1.forEach(item=>{
                    str+=`
                    <li class="goods">
                        <div class="goodswrap">
                            <a href="./xiangqing.html?id=${item.id}">
                                <img src="${item.img}" alt="">
                            </a>
                            <div class="desc">
                                <p class="price">
                                    <i class="price_i">￥</i>
                                    <span class="price_sp">${item.price}</span>
                                </p>
                                <div class="titlewrap">
                                    <a href="javascript:;" class="title">${item.name}</a>
                                </div>
                                <p class="saelsinfo">
                                    <span class="activity z-self">${item.activity}</span>
                                    <span class="activity z-benefit">${item.activity2}</span>
                                    <span class="activity z-benefit">${item.activity3}</span>
                                    <span class="activity z-benefit">${item.activity4}</span>
                                </p>
                                <p class="info">
                                    <a href="javascript:;" class="comments">
                                        <span class="icon"></span>
                                        <span>${item.comment}</span>
                                    </a>
                                    <span class="ell">${item.site}</span>
                                </p>
                                <p class="sel">
                                    <span>${item.sel}</span>
                                </p>
                            </div>
                        </div>
                    </li>
                    `
                })
                //把当前拼接好的字符串添加到cle盒子中
                cle.innerHTML=str
            }
        })
    })()




    // 用户登录
    cookies()
    function cookies(){
    var cookie=document.cookie.split('=')[1]
    if(document.cookie!=''){
        $('.head_a').css('display','none')
        $('.user_tui').css('display','block').prev().css('display','block').find('span').html(`${cookie}`)
    }else{
        $('.head_a').css('display','block')
        $('.user_tui').css('display','none').prev().css('display','none')
    }
    
    $('.user_tui').on('click',function(){
        document.cookie =`name=${cookie};expires=Thu, 18 Dec 2018 12:00:00 GMT'';`
        cookies()
    })
    }


    var sum=window.pageYOffset //屏幕Y轴距离
    if(sum>130){
        $('.fix_style').css({
            position:'fixed',
            top:'80px'
        })
    }else{
        $('.fix_style').css({
            position:'absolute',
            top:'211px'
        })
    }
    window.onscroll=function(){
        var sum=window.pageYOffset //屏幕Y轴距离
        //判断网页距离顶部大于500
        if(sum>130){
            $('.fix_style').css({
                position:'fixed',
                top:'80px'
            })
        }else{
            $('.fix_style').css({
                position:'absolute',
                top:'211px'
            })
        }
    }



}