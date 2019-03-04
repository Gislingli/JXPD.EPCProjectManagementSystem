import React,{ PureComponent, Fragment } from 'react';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import { bidSectionQuery } from '@/services/bidSection';

Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

class ProgressGantt extends PureComponent{
    constructor(porps){
        super(porps);
        this.state={
            tasks: ['方案设计', '施工图设计(公示)', '立面施工', '强电施工', '给水施工', '路面、景观绿化'],
            tasksPlan:[], 
            tasksfact:[]
        }
    }
    

    componentDidMount = () =>{
    }

    getGanttOption = () =>{
        let st = this.state;
        return (
            {
                title: {
                    text: "",
                    x: "center"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: "shadow"        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    extraCssText:"",
                    formatter: function (params) {
                        //console.log(params[3].data);
                        let relVal = params[0].axisValueLabel;
                        const getDateStr=(hideBar,dataBar)=>{
                            let str='';
                            str+=new Date(new Date().getTime() + (86400000) * hideBar.value).Format("yyyy-M-d")+" 至 "+new Date(new Date().getTime() + (86400000) * (hideBar.value+dataBar.value)).Format("yyyy-M-d");
                            return str;
                        }
                        //relVal+="<br/>计划："+getDateStr(params[0],params[1])+"<br/>实际："+getDateStr(params[2],params[3]);
                        relVal+="<br/>计划："+getDateStr(params[0],params[1])+"<br/>实际："+(params[3].data>0?getDateStr(params[2],params[3]):'暂无');
                        return relVal;
                    }
                },
                legend: {
                    data: ["计划", "实际"],
                    x: 30
                },
                toolbox: {
                    show: true,
                    feature: {  //数据视图
                        mark: true,
                        dataView: {readOnly: false},
                        restore: true,
                        saveAsImage: true
                    }
                },
                grid: {
                    left: "3%",
                    right: "3%",
                    bottom: "3%",
                    containLabel: true
                },
                yAxis: {
                    type: "category",
                    splitLine: {show: false},
                    data: st.tasks
                },
                xAxis: {
                    type: "value",
                    boundaryGap: [0, 0.01],
                    axisLabel: {
                        show: true,
                        interval: 0,
                        formatter: function (value) {
                            return new Date(new Date().getTime() + (86400000) * value).Format("MM-dd")    //86400000，一天的毫秒数
                        }
                    }
                },
                series: [
                    {
                        name: "planDate",
                        type: "bar",
                        stack: "plan",
                        barCategoryGap: "10%",
                        itemStyle: {
                            normal: {
                                borderColor: "rgba(0,0,0,0)",
                                color: "rgba(0,0,0,0)"
                            },
                            emphasis: {
                                borderColor: "rgba(0,0,0,0)",
                                color: "rgba(0,0,0,0)"
                            }
                        },
                        data: [0, 160, 67, 112, 148, 179]   //计划的起始位置
                    },
                    {
                        name: "计划",
                        type: "bar",
                        stack: "plan",
                        barWidth: "30",
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: "right",
                                    textStyle: {
                                        fontSize:14
                                    },
                                     formatter: function (obj) {
                                        return obj.value+'天';
                                    }
                                },
                                color: "#c23531"
                            }
                        },
                        data: [50, 50, 50, 50, 50, 50]		//计划的数据内容
                    },
                    {
                        name: "factDate",
                        type: "bar",
                        stack: "fact",
                        itemStyle: {
                            normal: {
                                borderColor: "rgba(0,0,0,0)",
                                color: "rgba(0,0,0,0)"
                            },
                            emphasis: {
                                borderColor: "rgba(0,0,0,0)",
                                color: "rgba(0,0,0,0)"
                            }
                        },
                        data: [0, 160, 67, 112, 148, 179]   //实际进度的起始位置
                    },
                    {
                        name: "实际",
                        type: "bar",
                        stack: "fact",
                        barWidth: "30",
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: "right",
                                    textStyle: {
                                        fontSize: 14
                                    },
                                    formatter: function (obj) {
                                        return obj.value+'天';
                                    }
                                },
                                color: "#91c7ae"
                            }
                        },
                        data: [33, 16, 60, 22]   //实际进度行数据内容
                    }, {
                        type: "bar",
                        stack: "none",
                        barWidth: "2",
                        itemStyle: {
                            normal: {
                                borderColor: "rgba(0,0,0,0)",
                                color: "rgba(0,0,0,0)"
                            },
                            emphasis: {
                                borderColor: "rgba(0,0,0,0)",
                                color: "rgba(0,0,0,0)"
                            }
                        },
                        data: [0, 0, 0, 0, 0, 0]
                    }
                ]
            }
        )

        //end
    }

    render() {
        const description = (
            <div>进度总览/管理</div>
        )

        return(
            <Fragment>
                <ReactEcharts 
                    style = {{ height:'600px',margin:'30px 0'}}
                    option={this.getGanttOption()} 
                />
            </Fragment>
        )
    }
}

export default ProgressGantt;