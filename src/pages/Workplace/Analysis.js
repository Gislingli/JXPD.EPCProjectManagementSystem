import React,{Component} from 'react';
import {
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Table,
    Radio,
    DatePicker,
    Tooltip,
    Menu,
    Dropdown,
  } from 'antd';
  import {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    Field,
    Bar,
    Pie,
    TimelineChart,
  } from '@/components/Charts';
import Yuan from '@/utils/Yuan';
import Trend from '@/components/Trend';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import moment from 'moment';
import styles from './Analysis.less';
import ReactEcharts from 'echarts-for-react';

const visitData = [];
const beginDay = new Date().getTime();
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const { TabPane } = Tabs;

class Analysis extends Component{
    constructor(props){
        super(props);
    }

    render(){

        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
            style: { marginBottom: 24 },
        };

        return (
            <GridContent>
                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title='本季度资金'
                            action={
                                <Tooltip title='当季度项目资金总量'>
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={()=><Yuan>346511</Yuan>}
                            footer={
                                <Field 
                                    label='总投资金额'
                                    value={`￥12,656,510`}
                                ></Field>
                            }
                            contentHeight={46}
                        >
                            <Trend flag="up" style={{ marginRight: 16 }}>
                                本季度同比
                                <span className={styles.trendText}>12%</span>
                            </Trend>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                    <ChartCard
                        bordered={false}
                        title='项目活跃指数'
                        action={
                            <Tooltip title='通过项目总体更新频次得出'>
                                <Icon type="info-circle-o" />
                            </Tooltip>
                        }
                        total='41'
                        footer={
                            <Field 
                                label='项目日活跃度'
                                value={`5`}
                            ></Field>
                        }
                        contentHeight={46}
                    >
                        <MiniArea color="#975FE4" data={visitData} />
                    </ChartCard>  
                    </Col>
                </Row>

                <Card bordered={false} bodyStyle={{ padding: 0 }}>
                    <div className={styles.salesCard}>
                        <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
                            <TabPane tab='类型统计' key='typeSta'>
                                <ReactEcharts 
                                    option={this.getTypeOption()} 
                                />
                            </TabPane>
                            <TabPane tab='网格统计' key='blockSta'>
                            
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>
            </GridContent>
        )
    }

    getTypeOption = () =>{
        return(
            {
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['老旧小区', '背街小巷']
                },
                calculable: true,
                xAxis: {
                    type: 'category',
                    data: ['谋划', '规划', '立项', '设计', '招投标', '施工', '竣工验收']
                },
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '老旧小区',
                        type: 'bar',
                        data: [30, 10, 50, 74, 30, 20, 40],
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        }
                    },
                    {
                        name: '背街小巷',
                        type: 'bar',
                        data: [57, 10, 35, 43, 46, 10, 20],
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        }
                    }
                ]
            }
        )
    }
}

export default Analysis;