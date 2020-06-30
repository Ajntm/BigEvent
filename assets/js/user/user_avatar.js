$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    $('#changeImageBtn').on('click', function () {
        $('#files').click()
    })



    // 更改图片
    $('#files').on('change', function (e) {

        // ???????????没作用啊？？？？？？
        if (e.target.files.length === 0) {
            return layer.msg('请上传图片！')
        }
        // e.target指当前选中的元素，相当于this    不相当于$(this)
        var file = this.files[0];
        // ????????????????????????
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    $('#loadImageBtn').on('click', function () {

        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('上传头像错误')
                }
                layer.msg('上传头像成功');

                // 调用父页面的方法
                // 未成功是因为在新窗口打开，找不到父页面
                window.parent.getUserInfo()
                // console.log(window.parent);
                
            }
        })
    })
})