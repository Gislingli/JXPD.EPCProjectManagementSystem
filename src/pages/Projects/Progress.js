import React, { PureComponent,Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Icon,Button,Card,Table,Divider,Popconfirm,message,Row,Col,Modal } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import AddFormForProgressPay from './components/AddFormForProgressPay';
import AddFormForProgress from './components/AddFormForProgress';
import axios from 'axios';
import { ProjectPaymentList,ProjectPaymentDelete,ProjectProgressList,ListByCategoryId } from '@/services/Progress';
import { Chart } from "react-google-charts";
const { Description } = DescriptionList;
class Progress extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            ProgressDatasource:[],
            PaymentDatasource:[],
            progressDictionary:[],
            visible:false,
            payVisible:true,
            progressBt:false
        }
        this.Id = this.props.match.params.id;
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
                    key:'Code'
                },
                {
                    title:'进度名称',
                    dataIndex:'ProgressName',
                    key:'Name'
                },
                {
                    title:'排序',
                    dataIndex:'Sort',
                    key:'Sort'
                },
                {
                    title:'计划时间',
                    dataIndex:'PlanTime',
                    key:'PlanTime',
                    render:(text,record) =>{
                        
                        return <span>{record.PlanStartTime+' 至 '+record.PlanEndTime}</span>

                    }
                },
                {
                    title:'调整计划时间',
                    dataIndex:'AdjustPlanTime',
                    key:'AdjustPlanTime',
                    render:(text,record) =>{
                        
                        return <span>{record.PlanStartTime+' 至 '+record.PlanEndTime}</span>

                    }
                },
                {
                    title:'实际时间',
                    dataIndex:'ActualTime',
                    key:'ActualTime',
                    render:(text,record) =>{
                        
                        return <span>{record.PlanStartTime+' 至 '+record.PlanEndTime}</span>

                    }
                },
                {
                    title:'进度状况',
                    dataIndex:'Status',
                    key:'Status',
                    render:(text,record) =>{
                        
                        if(text.toString()=='1')return<span>正常</span>
                        if(text.toString()=='2')return<span>提前</span>
                        if(text.toString()=='3')return<span>延期（可控）</span>
                        if(text.toString()=='4')return<span>延期（不可控）</span>
                    }
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
                    title:'支付金额（元）',
                    dataIndex:'PayValue',
                    key:'PayValue'
                },
                {
                    title:'操作',
                    key:'action',
                    fixed: 'right',
                    width: 150,
                    render:(text,record) => (
                        <span>

                            <Popconfirm title="确定删除?" onConfirm={this.handleDelete.bind(this,record)}>
                                <a href="javascript:;">
                                    <Icon type="delete" />删除
                                </a>
                            </Popconfirm>
                            
                        </span>
                    )
                }
            ]
    }
    changeForm =(v)=>{
            if (v=="pay")this.setState({payVisible:true});else this.setState({payVisible:false});
    }
    /*获取数据*/
    getPaymentData = () => {
    axios.post(ProjectPaymentList,{projectId : this.Id }).then((res) => {
    
        if(res.data.Status){
                this.setState({PaymentDatasource:res.data.Data.ProjectPayment});
        }else{
            message.error('列表数据读取失败，请重试！');
        }
        })
    }
    /*获取数据*/
    getProgressData = () => {
    axios.post(ProjectProgressList,{projectId:this.Id }).then((res) => {
 
        if(res.data.Status){
                this.setState({ProgressDatasource:res.data.Data.ProjectProgress},()=>{
                    this.getListByCategoryId(res.data.Data.ProjectProgress);
                });
                if(res.data.Data.ProjectProgress.length==11)this.setState({progressBt:true});
        }else{
            message.error('列表数据读取失败，请重试！');
        }
        })
    }
     /*获取数据*/
    getListByCategoryId = (ProjectProgress) => {
        axios.post(ListByCategoryId,{categoryId : 'ProjectProgress' }).then((res) => {
 
            if(res.data.Status){
                let arr = [];

                if(ProjectProgress.length){
                    for (let item of res.data.Data.Dictionary){
                        let isSame = false;
                        for(let i=0;i<ProjectProgress.length;i++){
                            if(ProjectProgress[i].ProgressCode.toString()==item.Code.toString()) isSame = true;
                        }
                        if(!isSame)arr.push(item);
                   }
                   this.setState({progressDictionary:arr});
                }else{
                    this.setState({progressDictionary:res.data.Data.Dictionary});
                }
               
            }else{
                message.error('列表数据读取失败，请重试！');
            }
        })
    }
    handleDelete=(record)=>{
        let arr = [];
        arr.push(record.Id);
        axios.post(ProjectPaymentDelete,{ids :  arr}).then((res) => {
  
    if(res.data.Status){
        message.success('删除成功!');
        this.getPaymentData();
    }
    else{
        message.error('删除失败:' + res.data.ErrorMessage);
    }
        })
    }
    componentDidMount=()=>{

        this.getPaymentData();
        this.getProgressData();
        
    }
    render(){

        return(
            <PageHeaderWrapper
            title='进度管理'
            action={
                <Fragment>
                    <Button type="primary" onClick={()=>{this.setState({visible:true});this.changeForm('pay')}}>
                        <Icon type="plus" />进度款新增
                    </Button>
                    <Button type="primary" disabled={this.state.progressBt} onClick={()=>{this.setState({visible:true});this.changeForm('progress')}}>
                    <Icon type="plus" />进度新增
                    </Button>
                </Fragment>
            }
            >
             <Card title='进度款情况' style={{ margin: '15px 0' }}>
             <Table
                        columns={this.PaymenttableCols()}
                        dataSource={this.state.PaymentDatasource}
                    >
                    </Table>
                
            </Card>
            <Card title='进度情况'>
                    <Table
                        columns={this.tableCols()}
                        dataSource={this.state.ProgressDatasource}
                        pagination={false}
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
        {this.state.payVisible?(<AddFormForProgressPay ProID={this.Id} getPaymentData={this.getPaymentData}/>):(<AddFormForProgress progressDictionary={this.state.progressDictionary} ProID={this.Id} getProgressData={this.getProgressData}/>)}
            
        </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default Progress;