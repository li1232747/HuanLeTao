$( function() {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax( {
            type: 'get',
            url: '/category/querySecondCategoryPaging',
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
                        render();
                    }
                } );
            }
        } );
    }

    render();

    // 给添加按钮注册点击事件
    $( '.btn_add' ).on( 'click', function() {
        // 显示模态框
        $( '#addModal' ).modal( 'show' );

        // 发送ajax请求一级分类名称
        $.ajax( {
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 50
            },
            success: function( info ) {
                // console.log(info);
                // 渲染模板
                $( '.dropdown-menu' ).html( template( 'tpl2', info ) );
            }
        } );
    } );

    // 给一级分类里的所有 a标签 注册点击事件
    $( '.dropdown-menu' ).on( 'click', 'a', function() {
        // console.log(11);
        $( '.first_check' ).text( $( this ).text() );

        $( '[name="categoryId"]' ).val( $( this ).data( 'id' ) );

        // 手动改变字段状态
        $form.data( 'bootstrapValidator' ).updateStatus( 'categoryId', 'VALID' );
    } );

    // 图片上传
    $( "#fileupload" ).fileupload( {
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function( e, data ) {
            // console.log(data);
            // 图片地址 data.result.picAddr
            $( 'form img' ).attr( 'src', data.result.picAddr );
            $( '[name="brandLogo"]' ).val( data.result.picAddr );

            // 手动改变字段状态
            $form.data( 'bootstrapValidator' ).updateStatus( 'brandLogo', 'VALID' );
        }
    } );

    // 表单校验
    var $form = $( 'form' );
    $form.bootstrapValidator( {
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传品牌LOGO'
                    }
                }
            }
        }
    } );

    // 注册校验成功事件
    $form.on( 'success.form.bv', function( e ) {
        // 阻止表单提交
        e.preventDefault();

        // 发送 ajax请求
        $.ajax( {
            type: 'post',
            url: '/category/addSecondCategory',
            data: $form.serialize(),
            success: function( info ) {
                // console.log(info);
                if ( info.success ) {
                    // 关闭模态框
                    $( '#addModal' ).modal( 'hide' );
                    // 重新渲染第一页
                    currentPage = 1;
                    render();

                    // 重置表单
                    $form[ 0 ].reset();
                    $form.data( 'bootstrapValidator' ).resetForm();

                    $( '.first_check' ).text( '请选择一级分类' );
                    $( 'form img' ).attr( 'src', './images/none.png' );

                    $( '[name="categoryId"]' ).val( '' );
                    $( '[name="brandLogo"]' ).val( '' );
                }
            }
        } );
    } );
} );