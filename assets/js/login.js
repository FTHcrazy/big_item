$(function () {
    //==========点击跳转注册页面=========
    $('#link_reg').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show()
    });
    //==========点击跳转登录页面===========
    $('#link_login').on('click', function () {
        $('.login_box').show();
        $('.reg_box').hide()
    });
    //===========自定义校验规则=====
    var form = layui.form;//let {form}=layui对象解构
    var layer = layui.layer;
    //通过form.verify
    form.verify({
        pwd: [/^[\S]{6,12}$/, "请输入6-12位密码，且不能出现空格"],
        repwd: function (value) {
            let pwd = $('#pwd').val();
            if (value !== pwd) {
                return "两次密码不一致"
            }
        }
    });
    //=============
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };

        $.post('/api/reguser', data, res => {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message);
            $('#link_login').click();
        })
    });
    //=======================
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功');
                localStorage.setItem("token", res.token);//储存检验码
                location.href = '/index.html';//跳转页面
            }
        })
    });
})