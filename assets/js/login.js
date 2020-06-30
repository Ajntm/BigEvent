$(function () {
    // 切换登录注册
    $('#toReg').on('click', function () {
        $('.reg_form').show();
        $('.login_form').hide();
    });
    $('#toLogin').on('click', function () {
        $('.reg_form').hide();
        $('.login_form').show();
    });


    // 从layui中获取form对象
    var form = layui.form;


    // ?????????????????????????????????
    // 应该可以不导入这个，可以使用layer这个对象
    var layer = layui.layer;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {

            // jQuery的 属性选择器，获取输入框对象内的值
            var thePwd = $('.reg_form').find('[name = "password"]').val()
            if (value !== thePwd) {
                return '两次密码不一致'
            }
        }
    })

    // 注册
    $('#reg_form').on('submit', function (e) {
        e.preventDefault();

        // 使用val()方法获取表单内容
        var data = { username: $('#reg_form [name="username"]').val(), password: $('#reg_form').find('[name=password]').val() }
        // console.log(data);

        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // console.log(res.message);
                return layer.msg(res.message)
            }


            // 需要获取layer对象
            layer.msg('注册成功，请登录');
            $('#toLogin').click();
        })
    })


    // 登录
    $('#login_form').on('submit', function (e) {
        e.preventDefault();

        // 使用serialize()方法快速获取表单内容
        var data = $(this).serialize()
        console.log(data);

        $.post('/api/login', data, function (res) {
            console.log(res);

            if (res.status !== 0) {
                // console.log(res.message);
                return layer.msg('登陆失败！')
            }

            layer.msg('登陆成功！')
            // 本地存储
            // 将登录成功得到的 token 字符串（验证身份），保存到 localStorage 中
            localStorage.setItem('token', res.token)

            // Location 对象包含有关当前 URL 的信息
            // ??????????????????????
            location.href = '/index.html'
        })
    })

})