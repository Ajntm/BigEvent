$(function () {
    var form = layui.form;
    // 获取数据，渲染表格
    function getSort() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类失败！')
                }
                // console.log(res.data);
                var htmlStr = template('sortList', res)
                $('#tb').html(htmlStr)
            }
        })
    }
    getSort();

    // 点击弹出弹出层
    var index = null
    $('.layui-card-header button').on('click', function () {

        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',

            // 将html代码写到html文档中，然后调用设置
            content: $('#htmlAdd').html()
        });
    })

    // 提交表单添加分类
    // 分类表单是由点击以后渲染出来的，所以要使用事件代理添加提交事件
    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('添加分类失败！')
                }
                getSort();

                // 定义一个全局的变量，赋值为null,这样就可以在另外的函数使用了
                // 关闭弹出层
                layer.close(index);
            }
        })
    })


    // 修改分类
    // 其父元素可以是拼接以后的html元素
    $('tbody').on('click', '#btn_change', function () {
        indexChange = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',

            // 将html代码写到html文档中，然后调用设置
            content: $('#htmlChange').html()
        });


        // $(this)指当前点击的按钮元素
        var id = $(this).attr('data-id')
        $.ajax({
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类信息失败')
                }

                form.val('form_change', res.data)
            }
        })

        $('body').on('submit', '#form_change', function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/my/article/updatecate',

                data: $('#form_change').serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('修改分类信息失败')
                    }
                    layer.msg('修改分类信息成功')

                    getSort();
                    layer.close(indexChange);
                }
            })
        })


    })

    // 删除分类
    $('tbody').on('click', '#btn_del', function () {
        var id = $(this).attr('data-id')
        layer.confirm('是否确认删除分类?', { icon: 3, title: '提示' }, function (index) {

            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败')
                    }
                    layer.msg('删除分类成功')
                    getSort();

                    // 在成功之后才关闭弹出层
                    layer.close(index);
                }
            })
        });

    })
})