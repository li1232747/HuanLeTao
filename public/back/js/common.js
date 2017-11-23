// 进度条功能
// 禁用进度环
NProgress.configure( {
    showSpinner: false
} );

// ajax 请求开始时触发
$( document ).ajaxStart( function() {
    // 开启进度条
    NProgress.start();
} );

// ajax 请求结束时触发
$( document ).ajaxStop( function() {
    // 关闭进度条
    NProgress.done();
} );


// 给分类管理注册点击事件，显示和隐藏分类
$( '.cate_admin' ).on( 'click', function() {
    $( this ).next().slideToggle();
} );

// 给菜单图标注册点击事件，显示和隐藏侧边栏
$( '.lt_menu' ).on( 'click', function() {
    $( '.lt_aside' ).toggleClass( 'now' );
    $( '.lt_main' ).toggleClass( 'now' );
} );


// 退出功能
$( '.lt_logout' ).on( 'click', function() {

    // 显示模态框
    $( '#logoutModal' ).modal( 'show' );

    // 给退出按钮注册点击事件
    $( '.btn_logout' ).off().on( 'click', function() {
        // 发送ajax请求
        $.ajax( {
            type: 'get',
            url: '/employee/employeeLogout',
            success: function( info ) {
                // console.log(info);
                if ( info.success ) {
                    // 退出成功,跳转到登录页面
                    location.href = 'login.html';
                }
            }
        } );

    } );

} );


// 给非登录页都验证登录操作
if ( location.href.indexOf( 'login.html' ) === -1 ) {
    // 发送 ajax 请求
    $.ajax( {
        type: 'get',
        url: '/employee/checkRootLogin',
        success: function( info ) {
            // console.log(info);
            if ( info.error === 400 ) {
                // 未登录，跳转到登录页
                location.href = 'login.html';
            }
        }
    } );
}