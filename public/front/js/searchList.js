$( function() {

    // 获取地址栏参数
    var key = tools.getSearch( 'key' );
    // console.log(key);
    // 设置到input框中
    $( '.input_search' ).val( key );

    // 封装一个渲染页面的函数
    function render() {
        // 加载动画
        $('.lt_product').html('<div class="loading"></div>');

        // 准备ajax请求的参数
        var param = {};

        // page pageSize proName 必须的 
        param.page = 1;
        param.pageSize = 100;
        param.proName = $( '.input_search' ).val();

        // num page 参数
        var $active = $( '.lt_sort li.active' );
        if ( $active.length > 0 ) {
            // 表示需要排序 176 0126 4557
            var type = $active.data( 'type' );
            var value = $active.find( 'i' ).hasClass( 'fa-angle-down' ) ? 2 : 1;
            param[ type ] = value;
        }

        $.ajax( {
            type: 'get',
            url: '/product/queryProduct',
            data: param,
            success: function( info ) {
                // console.log( info );

                setTimeout(function() {
                    $( '.lt_product' ).html( template( 'tpl', info ) );
                }, 1000);
            }
        } );

    };
    // 进来先渲染一次
    render();

    // 搜索按钮注册点击事件
    $( '.btn_search' ).on( 'click', function() {
        // 移除排序的active类
        $( '.lt_sort li' ).removeClass( 'active' );

        // 让所有箭头向下
        $( '.lt_sort i' ).addClass( 'fa-angle-down' ).removeClass( 'fa-angle-up' );

        render();
    } );

    // 点击排序
    $( '.lt_sort [data-type]' ).on( 'click', function() {
        var $this = $( this );
        // 判断是否有 active 类
        if ( $this.hasClass( 'active' ) ) {
            // 改变箭头指向
            $this.find( 'i' ).toggleClass( 'fa-angle-down' ).toggleClass( 'fa-angle-up' );

        } else {
            // 当前类添加 active ，移除其他类的 active
            $this.addClass( 'active' ).siblings().removeClass( 'active' );
            // 让其它的所有箭头向下
            $( '.lt_sort i' ).addClass( 'fa-angle-down' ).removeClass( 'fa-angle-up' );
        }
        // 重新渲染
        render();
    } );
} );