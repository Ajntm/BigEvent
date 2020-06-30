$(function () {
    // window.parent.getUserInfo()
    var form = layui.form
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo(form);

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        // console.log($(this).serialize());

        $.ajax({
            type: 'post',
            url: '/my/userinfo',


            // ?????/ 参数没id
            // 使用隐藏域设置id
            data: $(this).serialize(),
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('修改信息失败')
                }
                layer.msg('修改信息成功');

                window.parent.getUserInfo();
            }
        })
    })


    // 修改信息表单重置
    $('[type="reset"]').on('click', function (e) {
        e.preventDefault();
        initUserInfo(form);
    })
})

function initUserInfo(form) {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取信息失败')
            }


            // ????????????????????????????????
            // input框的name属性需要与返回参数相同！！！！！！！！！！！！！！！！！！！！！！
            
            form.val('formUserInfo', res.data)
        }
    })
}