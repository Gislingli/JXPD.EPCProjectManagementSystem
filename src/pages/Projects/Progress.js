import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Icon,Button,Card,Table,Divider,Popconfirm,message,Row,Col } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import { Chart } from "react-google-charts";
const { Description } = DescriptionList;
class Progress extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            datasource:[
               
        ]
        }
    }
    tableCols = () => {
        return [
                {
                    title:'序号',
                    width: 80,
                    dataIndex:'ID',
                    render:(text,record,index) => `${index + 1}`
                },
                {
                    title:'进度编码',
                    dataIndex:'ProgressCode',
                    key:'ProgressCode'
                },
                {
                    title:'进度名称',
                    dataIndex:'ProgressName',
                    key:'ProgressName'
                },
                {
                    title:'排序',
                    dataIndex:'Sort',
                    key:'Sort'
                },
                {
                    title:'计划时间',
                    dataIndex:'PlanTime',
                    key:'PlanTime'
                },
                {
                    title:'调整计划时间',
                    dataIndex:'AdjustPlanTime',
                    key:'AdjustPlanTime'
                },
                {
                    title:'实际时间',
                    dataIndex:'AdjustPlanTime',
                    key:'AdjustPlanTime'
                },
                {
                    title:'进度状况',
                    dataIndex:'Status',
                    key:'Status'
                },
                {
                    title:'备注',
                    dataIndex:'Remark',
                    key:'Remark'
                },
            ]
    }
    render(){
        return(
            <PageHeaderWrapper
                title='进程管理'
            >
             <Card title='进度款情况' style={{ margin: '15px 0' }}>
                <DescriptionList>
                    <Description term='记录时间'>2016.12.2</Description>
                    <Description term='记录人'>大帅哥</Description>
                    <Description term='备注'>浙江</Description>
                    <Description term='支付金额'>10000</Description>
                </DescriptionList>
                
            </Card>
            <Card>
                    <Table
                        columns={this.tableCols()}
                        dataSource={this.state.datasource}
                    >
                    </Table>

                </Card>
                <Card style={{ margin: '15px 0' }}>
                <Chart
  width={'100%'}
  height={'200px'}
  chartType="Timeline"
  loader={<div>Loading Chart</div>}
  data={[
    [
      { type: 'string', id: 'President' },
      { type: 'string', id: 'dummy bar label' },
      { type: 'string', role: 'tooltip' },
      { type: 'date', id: 'Start' },
      { type: 'date', id: 'End' },
    ],
    [
      'Washington',
      null,
      'George',
      new Date(1789, 3, 29),
      new Date(1797, 2, 3),
    ],
    ['Adams', null, 'John', new Date(1797, 2, 3), new Date(1801, 2, 3)],
    ['Jefferson', null, 'Thomas', new Date(1801, 2, 3), new Date(1809, 2, 3)],
  ]}
  options={{
    allowHtml: true,
  }}
  rootProps={{ 'data-testid': '10' }}
/>
                </Card>
               
            </PageHeaderWrapper>
        )
    }
}

export default Progress;