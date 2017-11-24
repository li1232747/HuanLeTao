$( function() {
    // 发送ajax请求一级分类数据
    $.ajax( {
        type: 'get',
        url: '/category/queryTopCategory',
        success: function( info ) {
            // console.log( info );

            $( '.category_left .mui-scroll' ).html( template( 'tpl_left', info ) );

            renderSecond( info.rows[ 0 ].id );
        }
    } );

    // 二级分类渲染
    function renderSecond( id ) {
        $.ajax( {
            type: 'get',
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            success: function( info ) {
                // console.log(info);
                $( '.category_right .mui-scroll' ).html( template( 'tpl_right', info ) );
            }
        } );
    }


    // 给一级分类category_left 下li注册点击事件
    $( '.category_left .mui-scroll' ).on( 'click', 'li', function() {
        // 获取当前li的id
        var id = $( this ).data( 'id' );
        // 当前类添加active
        $( this ).addClass( 'active' ).siblings().removeClass( 'active' );
        // 重新渲染页面
        renderSecond( id );

        //100毫秒滚动到顶
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0, 0, 100);
    } );

} );