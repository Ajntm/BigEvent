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

    // 
    var form = layui.form;
    // console.log(form);
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

})