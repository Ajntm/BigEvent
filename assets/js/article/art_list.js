$(function () {
    var form = layui.form;
    var laypage = layui.laypage;



    // ！！！！！！！！！！！！！！！！
    // 查询参数对象
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    getNewsList();
    getSortList();

    template.defaults.imports.timeFilter = function (date) {
        var td = new Date(date);
        var y = zero(td.getFullYear());
        var m = zero(td.getMonth() + 1);
        var d = zero(td.getDate());
        var hh = zero(td.getHours());
        var mm = zero(td.getMinutes());
        var ss = zero(td.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function zero(n) {
        return n < 10 ? '0' + n : n
    }



    // 点击筛选文章
    // 根据筛选信息获得文章
    $('#select_form').on('submit', function (e) {
        e.preventDefault();
        q.cate_id = $('[name="cate_id"]').val();
        q.state = $('[name="state"]').val();
        getNewsList()
    })



    // 根据id删除文章
    $('tbody').on('click', '.btn_del', function () {


        // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        // 获取删除按钮的剩余个数
        // 设置id的只能用一个
        var len = $('.btn_del').length
        console.log(len);


        var id = $(this).attr('data-id')
        layer.confirm('确认删除该文章?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('根据id删除文章失败')
                    }
                    layer.msg('删除文章成功');


                    // 第四页数据删除完，删除渲染第四页，但分页跳到第三页是layui框架的作用
                    // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
                    // console.log($('#tbList tr').length);

                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    getNewsList();
                    layer.close(index);
                }
            })
        });
    })


    // 根据id编辑文章
    $('tbody').on('click', '.btn_change', function () {

        location.href = './art_change.html';

    })


    // 获取文章列表
    function getNewsList() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                // console.log(res);
                var htmlStr = template('tpl-table', res);
                $('#tbList').html(htmlStr);

                // 分页
                renderpage(res.total);
            }
        })
    }

    // 分类选择框
    function getSortList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败')
                }
                var htmlStr = template('tpl-cate', res);
                $('[name="cate_id"]').html(htmlStr);


                // 通过 layui 重新渲染表单区域的UI结构
                // 表单元素是动态插入，需要重新渲染表单区域
                form.render()
            }
        })
    }

    // 分页渲染
    function renderpage(total) {

        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageArea', //注意，这里的 test1 是 ID，不用加 # 号


            // 数据总数，需要在获取文章列表函数中得到
            count: total,//数据总数，从服务端得到
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            limits: [2, 5, 10, 15],

            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],



            // 分页发生切换的时候，触发 jump 回调
            // 触发 jump 回调的方式有两种：
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function (obj, first) {

                q.pagenum = obj.curr //得到当前页，以便向服务端请求对应页的数据。

                // 设置下拉框中，每页显示的条数
                q.pagesize = obj.limit

                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 如果 first 的值为 true，证明是方式2触发的
                // 否则就是方式1触发的
                //首次不执行
                if (!first) {
                    getNewsList();
                }
            }
        })
    }
})