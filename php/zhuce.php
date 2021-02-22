<?php
    header("content-type:text/html;charset=utf-8");
    //获取传入数据
    $u=$_POST['username'];
    $p=$_POST['password'];
    $m=$_POST['email'];
    //连接数据库
    $link=mysqli_connect("localhost",'root','','qqq');
    //设置编码
    mysqli_set_charset($link,'utf8');
    //sql语句
    $sql="insert into user (name,pass,email) values('$u','$p','$m')";
    //执行sql语句
    $result=mysqli_query($link,$sql);
    //判断数据是否添加成功
    if($result){
        echo '1';
    }else{
        echo '0';
    }
    //关闭链接
    mysqli_close($link);
?>