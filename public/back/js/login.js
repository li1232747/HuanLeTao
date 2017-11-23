$( function() {

    // 表单验证
    var $form = $( 'form' );
    $form.bootstrapValidator( {
        // 样式图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验规则
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },

            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度为6-12位'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    } );

    // 注册校验成功事件
    $form.on( 'success.form.bv', function( e ) {
        // 阻止表单提交
        e.preventDefault();

        // 发送 ajax
        $.ajax( {
            type: 'post',
            url: '/employee/employeeLogin',
            data: $form.serialize(),
            success: function( info ) {
                // console.log(info);
                if ( info.error === 1000 ) {
                    // 用户名不存在
                    // 改变字段状态
                    $form.data( 'bootstrapValidator' ).updateStatus( 'username', 'INVALID', 'callback' );
                } else if ( info.error === 1001 ){
                    // 密码错误
                    $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                } else if ( info.success ){
                    // 登录成功，跳转到主页面
                    location.href = 'index.html';
                }
            }
        } );
    } );
} );