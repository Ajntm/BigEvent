$(function () {
    var form = layui.form;

    // 根据id获取文章信息
    // var id = $(this).attr('data-id')

    var id = new URLSearchParams(location.search).get("id");



    // 根据id获取信息，渲染列表
    $.ajax({
        url: '/my/article/' + id,
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('根据id获取文章信息失败')
            }
            console.log(res);

            // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
            // 编辑文章的分类选中
            $('[value = "res.data.cate_id"]').addClass('layui-this');


            // 将原来的封面图片替换上去
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', 'http://ajax.frontend.itheima.net' + res.data.cover_img)  // 重新设置图片路径
                .cropper(options)        // 重新初始化裁剪区域

            // ???????????????????????????????????????????????/
            form.val('writeddd', res.data);
        }
    })


    getSortList();

    // 初始化富文本
    initEditor();

    // 1. 初始化图片裁剪器
    var $image = $('#image');
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };
    // 3. 初始化裁剪区域
    $image.cropper(options);


    // 切换上传图片
    $('#selectImg').on('click', () => {
        $('#filesAdd').click()
    })
    $('#filesAdd').on('change', function (e) {
        console.log('12132');

        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    // 点击发布文章
    var isSave = '已发布';
    $('#btnchange').on('click', function () {
        postNews();
    })

    // 发布草稿
    $('#btnSave').on('click', function () {
        isSave = '草稿';
        postNews();
    })


    // 发布文章请求函数
    function postNews() {
        $('#writeNews').on('submit', function (e) {
            e.preventDefault();
            // 对form表单创建并填充成FormData对象，传参必须是DOM对象
            var fd = new FormData($('#writeNews')[0]);
            fd.append('state', isSave);


            // 裁切的图片
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    fd.append('cover_img', blob)


                    // blob是裁剪的文件，如果将上面的返回赋值给一个变量，返回的是base64格式的字符串图片
                    $.ajax({
                        type: 'post',
                        url: '/my/article/edit',
                        data: fd,

                        // 注意：向服务器提交的数据是FormData类型数据，必须设置contentType:false 和 processData:false
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            if (res.status !== 0) {
                                return layer.msg('发布文章失败')
                            }
                            layer.msg('发布文章成功');
                            location.href = './art_list.html';
                            window.parent.changeList();
                        }
                    })
                })
        })
    }




    // 下拉框中的分类选择
    // 不使用change事件，直接加载时渲染
    function getSortList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('获取分类失败')
                }
                var htmlStr = template('tpl-select', res);
                $('[name="cate_id"]').html(htmlStr)
                form.render()
            }
        })
    }
})