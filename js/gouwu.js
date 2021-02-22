// 用户登录
var box=document.querySelector('#box') //获取大盒子
var cartbox=document.querySelector('.cartbox') //获取商品盒子盒子
var url=location.href //获取地址栏的地址
var cartList=localStorage.getItem("cartList") //获取localstorage中的参数
//把当前cartList字符串转为数组对象
cartList=JSON.parse(cartList)||[]
cookies()
function cookies(){
var cookie=document.cookie.split('=')[1]
if(document.cookie!=''){
    $('.head_a').css('display','none')
    $('.user_tui').css('display','block').prev().css('display','block').find('span').html(`${cookie}`)
    show()
}else{
    alert('请先登陆账号')
    location.href="denglu.html?pathUrl="+url
    // $('.head_a').css('display','block')
    // $('.user_tui').css('display','none').prev().css('display','none')
}

$('.user_tui').on('click',function(){
    document.cookie =`name=${cookie};expires=Thu, 18 Dec 2018 12:00:00 GMT'';`
    cookies()
})
}

// 购物车列表
function show(){
    // 判断当前localstorage中是否有内容
    if(cartList.length>0){
        //判断全选框是否被选中
        var aa=cartList.every(item=>{
            return item.is_select==1
        })
        //获取当前被选中商品价格
        var sum=total()
        var str2=`
        <h3>我的购物车</h3>
        <div class="boxtop">
                <div class="col col1">
                    <input type="checkbox" value="aa" class="inp_chk"  ${aa?"checked":''}>
                    <span>全选</span>
                </div>
                <div class="col col2">商品信息</div>
                <div class="col col3">单价(元)</div>
                <div class="col col4">数量</div>
                <div class="col col5">金额(元)</div>
                <div class="col col6">操作</div>
            </div>
            <div class="goods">
                <ul class="m_goods">
        `

        //遍历数组中所有商品
        cartList.forEach(item=>{
            str2+=`
            <li class="actitm">
                <input type="checkbox" value="a1" class="inp_chk"  ${item.is_select==1?"checked":''}  data-id="${item.id}">
                <a href="javascript:;" class="goods_img">
                    <img src="${item.img}" alt="">
                </a>
                <p class="goods_txt goods_all">${item.name}</p>
                <p class="newprice goods_all"><span>${item.price}</span></p>
                <div class="goods_all goods_btn">
                    <input type="button" class="btn" value="-" data-id="${item.id}" ${item.numbar<=1?"disabled":''}>
                    <input type="text" class="btn btncen" value="${item.numbar}" style="width: 40px;">
                    <input type="button" class="btn" value="+" data-id="${item.id}">
                </div>
                <p class="money goods_all"><span>${(item.numbar*item.price).toFixed(2)}</span></p>
                <p class="shan goods_all" data-id="${item.id}">删除</p>
            </li>
            `
        })
        //给当前字符串拼接结尾
        str2+=`
        </ul>
        <div class="ttbar">
                <input type="checkbox" value="aa" class="inp_chk"  ${aa?"checked":''}>
                <span>全选</span>
                <span class="quan">删除选中商品</span>
                <p class="zong">
                    总价：<u>￥</u><span>${sum}</span>
                </p>
                <p class="jiesuan">去结算</p>
        </div>
        </div>
        `
        cartbox.innerHTML=str2

    }else{
        var str1=`
        <div class="nocart">
            <p>购物车里空空如也，赶紧去&nbsp;<a href="list.html">逛逛吧></a></p>
        </div>
        `
        box.innerHTML=str1
    }
}

//给box绑定点击事件
box.onclick=function(e){
    var e = e || window.event
    var target=e.target || e.srcElement
    //判断当前点击的是+
    if(target.value=="+"){
        //获取当前对象的id属性
        var id=target.getAttribute('data-id')
        //遍历cartList
        cartList.forEach(item=>{
            if(item.id==id){
                item.numbar++
            }
        })
        //重新把当前操作完毕的数组添加到localstorage中
        localStorage.setItem("cartList",JSON.stringify(cartList))
        //调用show方法重新把页面渲染
        show()
    }
    
    if(target.value=="-"){
        //获取当前对象的id属性
        var id=target.getAttribute('data-id')
        //遍历cartList
        cartList.forEach(item=>{
            if(item.id==id){
                item.numbar--
            }
        })
        //重新把当前操作完毕的数组添加到localstorage中
        localStorage.setItem("cartList",JSON.stringify(cartList))
        //调用show方法重现渲染
        show()
    }

    if(target.innerHTML=="删除"){
        //获取当前对象的id属性
        var id=target.getAttribute('data-id')
        cartList=cartList.filter(item=>{
            //过滤被删除的商品
            return item.id!=id
        })
        //重新把当前操作完毕的数组添加到localstorage中
        localStorage.setItem("cartList",JSON.stringify(cartList))
        //调用show方法重现渲染
        show()
    }
    //全选
    if(target.value=="aa"){
        //遍历所有商品
        cartList.forEach(item=>{
            //判断当前全选框是否被选中
            if(target.checked){
                item.is_select=1
            }else{
                item.is_select=0
            }
        })
        //重新把当前操作完毕的数组添加到localstorage中
        localStorage.setItem("cartList",JSON.stringify(cartList))
        //调用show方法重现渲染
        show()
    }
    //选中框
    if(target.value=="a1"){
        //获取当前商品对应的id 
        var id=target.getAttribute("data-id")
        cartList.forEach(item=>{
            if(item.id==id){
                item.is_select=item.is_select==1?"0":"1"
            }
        })
        //重新把当前操作完毕的数组添加到localstorage中
        localStorage.setItem("cartList",JSON.stringify(cartList))
        //调用show方法重现渲染
        show()
    }

    //删除选中商品
    if(target.innerHTML=="删除选中商品"){
        cartList=cartList.filter(item=>{
            // 过滤被选中的商品
            return item.is_select!=1
        })
        //重新把当前操作完毕的数组添加到localstorage中
        localStorage.setItem("cartList",JSON.stringify(cartList))
        //调用show方法重现渲染
        show()
    }
    // 结算
    if(target.innerHTML=="去结算"){
        if(confirm("确定购买吗？")){
            alert('你需要支付：￥'+total())
            cartList=cartList.filter(item=>{
                return item.is_select!=1
            })
            //重新把当前操作完毕的数组添加到localstorage中
            localStorage.setItem("cartList",JSON.stringify(cartList))
            //调用show方法重现渲染
            show()
        }
    }
}
//统计所选商品的价格
function total(){
    var price=0 
    cartList.forEach(item=>{
        // 判断当前商品是否被选中
        if(item.is_select==1){
            price+=item.numbar*item.price
        }
    })
    price=price.toFixed(2)
    return price
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