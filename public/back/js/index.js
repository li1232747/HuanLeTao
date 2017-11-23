$( function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init( document.querySelector( '.content_left' ) );

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: [ '人数' ]
        },
        xAxis: {
            data: [ "1月", "2月", "3月", "4月", "5月", "6月" ]
        },
        yAxis: {},
        series: [ {
            name: '人数',
            type: 'bar',
            data: [ 1200, 1380, 900, 1400, 1100, 1720 ]
        } ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption( option );



    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init( document.querySelector( '.content_right' ) );

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: [ '耐克', '安踏', '阿迪', '特步', '匡威' ]
        },
        series: [ {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: [ '50%', '60%' ],
            data: [ {
                    value: 335,
                    name: '耐克'
                },
                {
                    value: 310,
                    name: '安踏'
                },
                {
                    value: 234,
                    name: '匡威'
                },
                {
                    value: 135,
                    name: '特步'
                },
                {
                    value: 1548,
                    name: '阿迪'
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        } ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption( option1 );

} );