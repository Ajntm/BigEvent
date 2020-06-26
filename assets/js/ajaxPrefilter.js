$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 对需要权限的接口，统一配置 headers 请求头
    // options.headers = { Authorization: localStorage.getItem('token') || '' }
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }

    // 统一设置登陆拦截
    options.complete = function (res) {
        if (res.responseJSON.status !== 0 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = './login.html'
        }
    }
})