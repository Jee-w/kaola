
    //获取当前地址栏属性
    var search=location.search
    var mai_title=document.querySelector('.mai_title') //大标题
    var txt_rig=document.querySelector('.txt_rig') //小标题
    var price_r=document.querySelector('.price_r') //金额
    var dt
    //判断当前search对象中是否有值
    if(search){
        //分割search字符串
        var id=search.split('=')[1];

        (async function(){
            dt=await promiseAjax({
                url:'./php/xiangqing.php',
                data:'id='+id,
                datatype:'json'
            })
            // 创建拼接字符串
            //拼接小标题
            str=`${dt.name}`
            txt_rig.innerHTML=str;
            //拼接大标题
            str2=`<span>${dt.name}</span>`
            mai_title.innerHTML=str2;
            //拼接jine
            str3=`￥<span>${dt.price}</span>`
            price_r.innerHTML=str3
        })()
    }else{
        alert("请选择商品")
        location="./list.html"
    }

    //给加入购物车绑定点击对象
    var btn2=document.querySelector('.btn2')
    //获取localstorage中的cartlist
    var cartList=localStorage.getItem('cartList')
    //把当前cartList字符串转为数组对象
    cartList=JSON.parse(cartList)
    btn2.onclick=function(){
        // 判断当前的cartlist是否存在
        if(cartList){
            var a=0 //判断当前添加的商品是否在localstorage中存在
            //遍历数组中所有元素
            cartList.forEach(item=>{
                //判断当前遍历的商品是否等于要添加的商品
                if(item.id==dt.id){
                    a++
                    item.numbar++
                }
            })
            //判断变量a是否等于0
            if(a==0){
                //修改商品数量
                dt.numbar=1
                //把当前对象追加到数组中
                cartList.push(dt)
            }
            //把当前商品添加到localStorage中
            localStorage.setItem("cartList",JSON.stringify(cartList))
        }else{
            //修改当前商品数量
            dt['numbar']=1
            //把当前商品添加到localstorage
            localStorage.setItem("cartList",JSON.stringify([dt]))
        }
        gowu()
    }
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



    // 放大镜
    var imgs=document.querySelector('.showimg') //正图盒子
    var img2=imgs.querySelector('img') //正图盒子
    var show=document.querySelector('.showB') //阴影
    var liimg=document.querySelectorAll('.lisimg>a') //小图盒子
    var liimg2=document.querySelectorAll('.lisimg2')
    var box=document.querySelector('#box') //大盒子
    var min=document.querySelector('.box_min') //中盒子
    var noimg=document.querySelector('.noimg>img')//大图
    var noimgs=document.querySelector('.noimg')
    imgs.onmouseover=function(e){ //移入事件
        show.style.display='block'
        noimgs.style.display='block'
    }
    imgs.onmousemove=function(e){ //移动事件
        var e = e || window.event
        move(e)
    }
    imgs.onmouseout=function(){ //移出事件
        show.style.display='none'
        noimgs.style.display='none'
    }
    //移动函数
    function move(e){
        //获取阴影中心位置
        var x1=e.pageX-imgs.offsetLeft-box.offsetLeft-min.offsetLeft-parseInt((show.offsetWidth)/2)
        var y1=e.pageY-imgs.offsetTop-box.offsetTop-min.offsetTop-parseInt((show.offsetHeight)/2)
        //设置移动范围
        var maxX=imgs.offsetWidth-show.offsetWidth
        var maxY=imgs.offsetHeight-show.offsetHeight
        //设置遮挡层内边距
        if(x1>=maxX){
            x1=maxX
        }
        if(x1<=0){
            x1=0
        }
        if(y1>=maxY){
            y1=maxY
        }
        if(y1<=0){
            y1=0
        }
        show.style.left=x1+'px'
        show.style.top=y1+'px'
        noimg.style.left=-x1*2+'px'
        noimg.style.top=-y1*2+'px'
    }
    //给小图绑定点击事件
    for(var i=0;i<liimg.length;i++){
        liimg2[i].onclick=function(){
            //先把所有的图片边框去掉
            for(var j=0;j<liimg.length;j++){
                liimg[j].style.border='#ededed 1px solid'
                liimg[j].style.margin='2px 15px 2px 2px'
            }
            //给当前选中的对象添加边框
            this.parentNode.style.border='3px solid #e31436'
            this.parentNode.style.margin='0px 13px 0px 0px'
            //获取当前点击的图片地址
            var url1=this.getAttribute('src')
            img2.setAttribute('src',url1)
            noimg.setAttribute('src',url1)
            //分别修改左右两个盒子中的图片路径

        }
    }


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


    // 三级联动
    const city=[
        {
            "name":"广东省",
            "child":[
                {
                    "name":"广州市",
                    "child":[
                        {
                            "name":"白云区"
                        },
                        {
                            "name":"黄埔区"
                        },
                        {
                            "name":"海珠区"
                        }
                    ]
                },
                {
                    "name":"深圳市",
                    "child":[
                        {
                            "name":"宝安区"
                        },
                        {
                            "name":"南山区"
                        },
                        {
                            "name":"福田区"
                        }
                    ]
                }
            ]
        },{
            "name":"河南省",
            "child":[
                {
                    "name":"郑州市",
                    "child":[
                        {
                            "name":"高新区"
                        },
                        {
                            "name":"管城区"
                        },
                        {
                            "name":"官渡区"
                        }
                    ]
                },
                {
                    "name":"信阳市",
                    "child":[
                        {
                            "name":"浉河区"
                        },
                        {
                            "name":"平桥区"
                        },
                        {
                            "name":"羊山新区"
                        }
                    ]
                }
            ]
        },{
            "name":"江苏省",
            "child":[
                {
                    "name":"南京市",
                    "child":[
                        {
                            "name":"秦淮区"
                        },
                        {
                            "name":"建邺区"
                        },
                        {
                            "name":"江宁区"
                        }
                    ]
                },
                {
                    "name":"苏州市",
                    "child":[
                        {
                            "name":"姑苏区"
                        },
                        {
                            "name":"吴中区"
                        },
                        {
                            "name":"相城区"
                        }
                    ]
                }
            ]
        }
    ]
    var sheng=document.querySelector('.sheng')
    var shi=document.querySelector('.shi')
    var qu=document.querySelector('.qu')
    //遍历数组
    for(var i=0;i<city.length;i++){
        //获取省级元素索引
        var op=new Option(city[i].name,i)
        // 将元素添加进省级列表
        sheng.appendChild(op)
    }
    //sheng绑定onchange事件
    sheng.onchange=function(){
        shi.length=1;
        qu.length=1;
        //用this.value获取当前索引的值
        for(var i=0;i<city[this.value].child.length;i++){
            // 获取市级元素索引
            var op=new Option(city[this.value].child[i].name,i)
            //将市级元素添加进市级列表
            shi.appendChild(op)
        }
        // 获取当前元素的下标
        shengval=this.value
        console.log(shengval)
    }
    //给shi绑定onchange事件
    shi.onchange=function(){
        qu.length=1;
        for(var i=0;i<city[shengval].child[this.value].child.length;i++){
            console.log(city[shengval].child[this.value].child[i])
            var op=new Option(city[shengval].child[this.value].child[i].name,i)
            qu.appendChild(op)
        }
    }


    var buy=document.querySelectorAll('.buyvla')
    for(let i=0;i<buy.length;i++){
        buy[i].onclick=function(){
            if(buy[i].style.margin=='1px'){
                buy[i].style.margin='0px'
                buy[i].style.border='2px solid #d41c44'
                buy[i].style.color='#d41c44'
            }else{
                buy[i].style.margin='1px'
                buy[i].style.border='1px solid #ccc'
                buy[i].style.color='#333'
            }
        }
    }