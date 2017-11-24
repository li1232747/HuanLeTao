$( function() {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax( {
            type: 'get',
            url: '/product/queryProductDetailList',
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

        // 发送ajax请求获取二级分类名称
        $.ajax( {
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function( info ) {
                // console.log( info );
                $( '.dropdown-menu' ).html( template( 'tpl2', info ) );
            }
        } );
    } );

    // 给下拉菜单里a注册点击事件
    $( '.dropdown-menu' ).on( 'click', 'a', function() {
        $( '.second_check' ).text( $( this ).text() );
        $( '[name="brandId"]' ).val( $( this ).data( 'id' ) );

        // 改变字段状态
        $form.data( 'bootstrapValidator' ).updateStatus( 'brandId', 'VALID' );
    } );

    // 表单验证
    var $form = $( 'form' );
    $form.bootstrapValidator( {
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请正确输入库存数'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品价格'
                    },
                    regexp: {
                        regexp: /^\d*$/,
                        message: '请正确输入价格'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价格'
                    },
                    regexp: {
                        regexp: /^\d*$/,
                        message: '请正确输入价格'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入尺码(如:12-15)'
                    },
                    regexp: {
                        regexp: /^\d{2}.\d{2}$/,
                        message: '请正确输入尺码(如:12-15)'
                    }
                }
            },
            proLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传商品图片(三张)'
                    }
                }
            }
        }
    } );

    var pics = []; // 存储图片信息

    // 图片上传
    $( '#fileupload' ).fileupload( {
        dataType: 'json',
        done: function( e, data ) {
            // console.log( data.result );

            if ( pics.length >= 3 ) {
                return false;
            }

            // 图片显示到页面中
            $( '.img_box' ).append( '<img src="' + data.result.picAddr + '" width="150" height="150" alt="">' );

            pics.push( data.result );
            // console.log( pics );

            if ( pics.length == 3 ) {
                // 改变字段状态
                $form.data( 'bootstrapValidator' ).updateStatus( 'proLogo', 'VALID' );
            } else {
                // 改变字段状态
                $form.data( 'bootstrapValidator' ).updateStatus( 'proLogo', 'INVALID' );
            }

        }
    } );

    // 表单校验成功事件
    $form.on( 'success.form.bv', function( e ) {
        e.preventDefault();

        // 拼接图片参数
        var param = $form.serialize();

        param += "&picName1=" + pics[ 0 ].picName + "&picAddr1=" + pics[ 0 ].picAddr;
        param += "&picName2=" + pics[ 1 ].picName + "&picAddr2=" + pics[ 1 ].picAddr;
        param += "&picName3=" + pics[ 2 ].picName + "&picAddr3=" + pics[ 2 ].picAddr;

        console.log(param);
        // 发送ajax请求
        $.ajax( {
            type: 'post',
            url: '/product/addProduct',
            data: param,
            success: function( info ) {
                if ( info.success ) {
                    // 关闭模态框
                    $( '#addModal' ).modal( 'hide' );
                    // 重新渲染第一页
                    currentPage = 1;
                    render();

                    // 重置表单内容和样式
                    $form[0].reset();
                    $form.data('bootstrapValidator').resetForm();

                    $('[name="brandId"]').val('');
                    $('.second_check').text( '请选择二级分类' );
                    $('.img_box img').remove();
                    pics = [];
                }
            }
        } );
    } );
} );