// 初始化 scroll 控件
mui( '.mui-scroll-wrapper' ).scroll( {
    //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    deceleration: 0.0005,
    indicators: false // 不显示滚动条
} );

// 轮播图
var gallery = mui( '.mui-slider' );
gallery.slider( {
    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
} );


// 获取地址栏参数
var tools = {
    getSearchObj: function() {
        // 获取地址栏参数,并将代码解码
        var search = decodeURI( location.search );
        
        search = search.slice( 1 );

        var obj = {};

        var arr = search.split( '&' );
        arr.forEach( function( v ) {
            var key = v.split( '=' )[ 0 ];
            var value = v.split( '=' )[ 1 ];
            obj[ key ] = value;
        } );

        return obj;
    },

    getSearch: function( key ){
        return this.getSearchObj()[ key ];
    }
};