$( function() {
    // 当前页数
    var currentPage = 1;
    // 每页显示信息数
    var pageSize = 5;

    function render() {
        // 发送 ajax 请求
        $.ajax( {
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function( info ) {
                // console.log(info);
                // 渲染表格
                $( 'tbody' ).html( template( 'tpl', info ) );

                // 渲染分页
                $( '#paginator' ).bootstrapPaginator( {
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil( info.total / pageSize ),
                    onPageClicked: function( a, b, c, page ) {
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
                } );
            }
        } );
    }

    render();

    // 给表格中所有按钮注册点击事件
    $( 'tbody' ).on( 'click', 'button', function() {
        var id = $( this ).parent().data( 'id' );
        var isDelete = $( this ).hasClass( 'btn-danger' ) ? '0' : '1';

        // 显示模态框
        $( '#updateModal' ).modal( 'show' );

        // 给确定按钮注册点击事件
        $( '.btn_update' ).off().on( 'click', function() {
            // 发送 ajax 请求
            $.ajax( {
                type: 'post',
                url: '/user/updateUser',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function( info ) {
                    // console.log( info );
                    // 关闭模态框
                    $( '#updateModal' ).modal( 'hide' );
                    // 重新渲染页面
                    render();
                }
            } );

        } );

    } );

} );