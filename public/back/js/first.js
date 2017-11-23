$( function() {
    var currentPage = 1;
    var pageSize = 5;

    function render(){
        // 发送 ajax请求
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                // 渲染表格
                $('tbody').html(template('tpl', info));

                // 渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / pageSize),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }

    render();

    // 给添加按钮注册点击事件
    $( '.btn_add' ).on( 'click', function(){
        // 显示模态框
        $( '#addModal' ).modal( 'show' );
    } );

    // 表单校验
    var $form = $( 'form' );
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类名称'
                    }
                }
            }
        }
    });

    // 注册表单校验成功事件
    $form.on( 'success.form.bv', function(e){
        // 阻止表单提交
        e.preventDefault();

        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $form.serialize(),
            success: function( info ){
                if( info.success ){
                    // 添加成功，关闭模态框
                    $( '#addModal' ).modal( 'hide' );
                    // 重新渲染第一页
                    currentPage = 1;
                    render();

                    // 重置表单内容和样式
                    $form[0].reset();
                    $form.data( 'bootstrapValidator' ).resetForm();
                }
            }
        });
    } );
} );