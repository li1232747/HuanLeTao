$( function() {

    // 约定本地缓存 key 为 search_history

    // 获取本地缓存历史记录,返回一个数组
    function getHistory() {
        var str = localStorage.getItem( 'search_history' );
        // 转化为数组
        var arr = JSON.parse( str ) || [];
        // console.log(arr);
        return arr;
    }

    // 渲染页面
    function render() {
        var arr = getHistory();
        $( '.lt_history' ).html( template( 'tpl', {
            list: arr
        } ) );
    }

    render();

    // 清空历史记录
    $( '.lt_history' ).on( 'click', '.empty_record', function() {
        // 弹出消息框
        mui.confirm( "您确定要清空历史记录吗?", "温馨提示", [ "否", "是" ], function( e ) {
            if ( e.index === 1 ) {
                // 移除 search_history
                localStorage.removeItem( 'search_history' );
                // 重新渲染
                render();
            }
        } );
    } );

    // 删除单条记录
    $( '.lt_history' ).on( 'click', '.btn_delete', function() {
        // 获取当前下标
        var index = $( this ).data( 'index' );

        // 弹出消息框
        mui.confirm( "确定要删除此记录吗?", "温馨提示", [ "否", "是" ], function( e ) {
            if ( e.index === 1 ) {
                // 获取历史记录
                var arr = getHistory();

                // 删除数组中 index 对应的值
                arr.splice( index, 1 );

                // 重新设置到缓存中
                localStorage.setItem( 'search_history', JSON.stringify(arr) );

                // 重新渲染
                render();
            }
        } );
    } );

    // 给搜索按钮注册点击事件
    $('.btn_search').on('click', function(){
        // 获取input的val值
        var value = $( '.input_search' ).val().trim();
        
        if( value === '' ){
            mui.toast( "请输入搜索关键字" );
            return false;
        }
        // 清空input框
        $( '.input_search' ).val('');

        // 获取历史记录
        var arr = getHistory();

        // 判断重复
        var index = arr.indexOf( value );
        if( index != -1 ){
            // 历史记录中有输入的值，删除对应的
            arr.splice( index, 1 );
        }

        if( arr.length >= 10 ){
            // 删除最后一个
            arr.pop();
        }

        // 添加到数组中
        arr.unshift( value );

        // 重新设置到缓存中
        localStorage.setItem( 'search_history', JSON.stringify( arr ) );

        // 重新渲染
        render();

        // 跳转到searchList页面
        location.href = 'searchList.html?key='+ value;
    });
} );