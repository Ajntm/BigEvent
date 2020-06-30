$(function () {
    getUserInfo();

    $('#exitbtn').on('click', function () {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的token
            localStorage.removeItem('token');
            location.href = './login.html'
            // 关闭 confirm 询问框
            layer.close(index);
        });
    })
})


// 获取用户信息并渲染页面
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',

        // ???????????????????????????????
        // headers：请求头配置对象
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {

                // ???????????????????????????????????????
                return layer.msg('获取用户信息失败！')
            }
            renderAvater(res.data);
            // ????????????????????????????????????????????
            // $('.layui-nav-img')
            //     .attr('src', res.data.user_pic)
        },

        // 登陆拦截
        // complete: function (res) {
        //     // console.log(res);
        //     if (res.responseJSON.status !== 0 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = './login.html'
        //     }
        // }
    })
}



// ！！！！！！！！！！！！！！渲染用户头像
function renderAvater(user) {

    // ????????????????????
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎 &nbsp;&nbsp;' + name)
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.txtAvatar').hide();
        // return
    } else {
        var first = name[0].toUpperCase()
        $('.txtAvatar').html(first).show();
        $('.layui-nav-img').hide();
    }

}




// 自己写
// 发布文章以后导航栏切换到文章列表
function changeList() {
    $('#dasdasdasdads dd').removeClass('layui-this');
    $('#dasdasdasdads dd:eq(1)').addClass('layui-this');
}