$(function () {
    getUserInfo();
    //=========退出功能========
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');//清除确认数据缓存
            location.href = '/login.html';//跳转页面
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {//请求头
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            renderAvatar(res.data);
        }
        // complete: function (res) {//无论成功还是失败，都会调用这个函数
        //     console.log(res);
        //     if (res.responseJSON.status !== 0 || res.responseJSON.message !== "获取用户基本信息成功！") {
        //         localStorage.removeItem('token')//强制清空 token
        //         location.href = '/login.html';//强制跳转
        //     }
        // }
    })
}
//==============渲染头像函数============
function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}
