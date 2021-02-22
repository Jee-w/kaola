<?php
    header('content-type:text/html;charset=utf-8');
    $id=$_GET['id'];
    //连接数据库
    $link=mysqli_connect('localhost','root','','qqq');
    //设置编码
    mysqli_set_charset($link,'utf8');
    //sql语句
    $sql="select*from kaola where id=$id";
    $result=mysqli_query($link,$sql);
    //获取结果集中第一条数据
    $row=mysqli_fetch_assoc($result);
    //返回字符串对象
    echo json_encode($row);
    mysqli_close($link);
?>