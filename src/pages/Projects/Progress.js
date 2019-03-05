import React, { PureComponent,Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Icon,Button,Card,Table,Divider,Popconfirm,message,Row,Col,Modal } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import AddFormForProgressPay from './components/AddFormForProgressPay';
import AddFormForProgress from './components/AddFormForProgress';
import { Chart } from "react-google-charts";
const { Description } = DescriptionList;
class Progress extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            datasource:[],
            visible:false,
            payVisible:true,
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
                    dataIndex:'ActualTime',
                    key:'ActualTime'
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
    PaymenttableCols = () => {
        return [
                {
                    title:'序号',
                    width: 80,
                    dataIndex:'ID',
                    render:(text,record,index) => `${index + 1}`
                },
                {
                    title:'记录时间',
                    dataIndex:'RecordTime',
                    key:'RecordTime'
                },
                {
                    title:'记录人',
                    dataIndex:'RecordPerson',
                    key:'RecordPerson'
                },
                {
                    title:'备注',
                    dataIndex:'Remark',
                    key:'Remark'
                },
                {
                    title:'支付金额',
                    dataIndex:'PayValue',
                    key:'PayValue'
                }
            ]
    }
    changeFrom =(v)=>{
            if (v=="pay")this.setState({payVisible:true});else this.setState({payVisible:false});
    }
    render(){

        return(
            <PageHeaderWrapper
            title='项目清单'
            action={
                <Fragment>
                    <Button type="primary" onClick={()=>{this.setState({visible:true});this.changeFrom('pay')}}>
                        <Icon type="plus" />进度款新增
                    </Button>
                    <Button type="primary" onClick={()=>{this.setState({visible:true});this.changeFrom('progress')}}>
                    <Icon type="plus" />进度新增
                    </Button>
                </Fragment>
            }
            >
             <Card title='进度款情况' style={{ margin: '15px 0' }}>
             <Table
                        columns={this.PaymenttableCols()}
                        dataSource={this.state.datasource}
                    >
                    </Table>
                
            </Card>
            <Card title='进度情况'>
                    <Table
                        columns={this.tableCols()}
                        dataSource={this.state.datasource}
                    >
                    </Table>

                </Card>
                <Card title='进度情况甘特图' style={{ margin: '15px 0' }}>
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
                <Modal
          title="新增"
          visible={this.state.visible}
          footer={null}
          onCancel={()=>{this.setState({visible:false})}}
          destroyOnClose
          width={700}
        >
        {this.state.payVisible?(<AddFormForProgressPay/>):(<AddFormForProgress/>)}
            
        </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default Progress;