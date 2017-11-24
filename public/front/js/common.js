$(function(){
    // 初始化 scroll 控件
    mui('.mui-scroll-wrapper').scroll({
        //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        deceleration: 0.0005,
        indicators: false // 不显示滚动条
    });

    // 轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
    });
});