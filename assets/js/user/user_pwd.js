$(function () {
    var form = layui.form;

    // 写在这？？？
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {

            // 属性选择器？？？？？？？？？？
            // val()????????????????????
            var oldPwd = $('[name = oldPwd]').val()
            if (value === oldPwd) {
                return '新密码不能与旧密码相同！'
            }
        },
        rePwd: function (value) {
            var newPwd = $('[name = newPwd]').val()
            if (value !== newPwd) {
                return '两次密码不相同！'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        // 1.阻止默认行为
        e.preventDefault()
        // 2.调用接口
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status!==0) {
                return layer.msg('失败');
                }
                layer.msg('成功');

                // DOM对象重置表单方法
                $('.layui-form')[0].reset()
            }
        })
    })
})