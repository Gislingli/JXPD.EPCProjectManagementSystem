import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FilterData from './components/FilterData';
import { Icon,Input,InputNumber,Button,Card,Table,Divider,Popconfirm,message,Row,Col,Cascader,DatePicker } from 'antd';
import axios from 'axios';
import { GetList } from '@/services/engineering';
import router from 'umi/router';
import styles from './List.less';

class List extends Component{
    constructor(props){
        super(props);
        this.state={
            datasource:[],
            area:[],
            queryMinInvest:0,
            queryMaxInvest:0,
            queryName:'',
            queryArea:'',
            queryDate:'',
        }

        this.Cols = [
            {
                title:'序号',
                width: 80,
                dataIndex:'ID',
                render:(text,record,index) => `${index + 1}`
            },
            {
                title:'名称',
                dataIndex:'EngineeringName',
                key:'EngineeringName'
            },
            {
                title:'区域',
                dataIndex:'AreaName',
                key:'AreaName'    
            },
            {
                title:'投资金额',
                dataIndex:'EngineeringInvest',
                key:'EngineeringInvest'
            },
            {
                title:'工期',
                dataIndex:'EngineeringDate',
                key:'EngineeringDate'
            },
            {
                title:'工程负责人',
                dataIndex:'EngineeringLeader',
                key:'EngineeringLeader'
            },
            {
                title:'操作',
                key:'action',
                render:(text,record) => (
                    <span>
                        <a href="javascrips:;" onClick={this.handleDetails.bind(this,record)}>
                            <Icon type="edit" />详情
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={this.handleDelete.bind(this,record)}>
                            <a href="javascript:;">
                                <Icon type="delete" />删除
                            </a>
                        </Popconfirm>
                        
                    </span>
                )
            }
        ];

        this.handleQueryNameChange = this.handleQueryNameChange.bind(this);
        this.handleMinInvestChange = this.handleMinInvestChange.bind(this);
        this.handleMaxInvestChange = this.handleMaxInvestChange.bind(this);
        this.handleQueryDate = this.handleQueryDate.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.queryEngineeringByName = this.queryEngineeringByName.bind(this);
    }


    //获取数据
    getData = () => {
        const areaData = [{
            value: 'zhejiang',
            label: '浙江',
            children: [{
              value: 'hangzhou',
              label: '杭州',
              children: [{
                value: 'xihu',
                label: '西湖区',
              }],
            },
            {
                value: 'jiaxing',
                label: '嘉兴',
                children: [{
                    value: 'nanhu',
                    label: '南湖区',
                    children: [{
                        value: 'jianshe',
                        label: '建设街道',
                      },
                      {
                        value: 'jianshe',
                        label: '新嘉街道',
                      }],
                },
                {
                    value: 'xiuzhou',
                    label: '秀洲区',
                },
                {
                    value: 'haining',
                    label: '海宁市',
                },
                {
                    value: 'pinghu',
                    label: '平湖市',
                }],
            }],
          }, {
            value: 'jiangsu',
            label: '江苏',
            children: [{
              value: 'nanjing',
              label: '南京',
              children: [{
                value: 'jianye',
                label: '建业区',
              },{
                value: 'jiangning',
                label: '江宁区',
              }],
            }],
          }];
        // const data = [
        //     {Id:'7049E6B8-0769-4BAD-B25A-B8CCB8D7ACB5',EngineeringName:'背街小巷',EngineeringArea:'新嘉街道',EngineeringOwner:'南湖城投',EngineeringSupervisor:'南湖区住建局',EngineeringInvest:'512572.14',EngineeringDate:'2019/01/01-2020/02/02',EngineeringLeader:'韩冰'},
        //     {Id:'B0C21F4B-481D-467E-9CDE-C130551C01A8',EngineeringName:'老旧小区',EngineeringArea:'新嘉街道',EngineeringOwner:'南湖城投',EngineeringSupervisor:'南湖区住建局',EngineeringInvest:'8574734.32',EngineeringDate:'2018/11/21-2020/05/15',EngineeringLeader:'金明辉'}
        // ];

        axios.post(GetList,{}).then((res) => {
            debugger;
            let result = res.data;
            if(result.Status){
                const data = result.Data.EngineeringPlainViewModel;
                this.setState({
                    datasource:data,
                    area:areaData
                })
            }
        })
        
        
    }

    //查询工程名称
    queryEngineeringByName = () => {
        const queryStr = this.state.queryName;
        if(queryStr.length>0){
            const data = [{Id:'7049E6B8-0769-4BAD-B25A-B8CCB8D7ACB5',EngineeringName:'背街小巷',EngineeringArea:'新嘉街道',EngineeringOwner:'南湖城投',EngineeringSupervisor:'南湖区住建局',EngineeringInvest:'512572.14',EngineeringDate:'2019/01/01-2020/02/02',EngineeringLeader:'韩冰'}];

            setTimeout(()=>{
                this.setState({
                    datasource:data
                })
            },1000);
        }
        else{
            message.error('关键字不能为空!');
            this.getData();
        }
        
    }

    //详情
    handleDetails = (record) => {
        console.log(record)
        const Id = record.Id;
        router.push('/engineering/list/details/'+Id)
    }

    //删除
    handleDelete = (record) => {
        const params ={Id:record.key};
        // axios.post(specialDelete,params).then((res) => {
        //     const data = res.data;
        //     if(data.status){
        //         message.success('删除成功!');
        //         _self.getData();
        //     }
        //     else{
        //         message.error(data.message);
        //     }
        // })
    }

    componentDidMount = () =>{
        this.getData();
    }

    //监测名称查询
    handleQueryNameChange(e){
        const value = e.target.value;
        this.setState({
            queryName:value
        });
    }

    //监测区域查询
    handleAreaChange(value){
        console.log(value);
        this.setState({
            queryArea:value[2]
        })
    }

    //监测金额最小值
    handleMinInvestChange(value){
        this.setState({
            queryMinInvest:value
        });
    }

    //监测金额最大值
    handleMaxInvestChange(value){
        this.setState({
            queryMaxInvest:value
        })
    }

    //按日期查询
    handleQueryDate(date,dateString){
        this.setState({
            queryDate:dateString
        })
        //console.log(date,dateString);
    }

    render(){
        const titleContent = (
            <div>
                <label>工程清单</label>
                <Button type="primary" style={{float:'right'}} onClick={()=>{router.push('/engineering/list/add')}}>
                    <Icon type="plus" />工程新增
                </Button>
            </div>
        ); 

        return(
            <PageHeaderWrapper
                title={titleContent}
            >
                <Card>
                    <Row className={styles.rowSpace}>
                        <Col span={11}>
                            <span>名称：</span>
                            <Input className={styles.ctrl}  onChange={this.handleQueryNameChange}/>
                            <Button type='primary' onClick={this.queryEngineeringByName}>查询</Button>
                        </Col>
                        <Col span={11}>
                            <span>金额：</span>
                            <span className={styles.marginRight}>
                                <InputNumber defaultValue={0} onChange={this.handleMinInvestChange}/>
                                    <span style={{margin:'0 10px'}}>-</span>
                                <InputNumber defaultValue={0} onChange={this.handleMaxInvestChange}/>
                            </span>
                            <Button type='primary'>查询</Button>
                        </Col>
                    </Row>
                    <Row className={styles.rowSpace}>
                        <Col span={11}>
                            <span>区域：</span>
                            <Cascader 
                                className={styles.ctrl} 
                                options={this.state.area} 
                                placeholder="选择区域" 
                                expandTrigger="hover"
                                onChange={this.handleAreaChange}
                            />
                        </Col>
                        <Col span={11}>
                            <span>日期：</span>
                            <DatePicker onChange={this.handleQueryDate} />
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <Table
                        rowKey={record => record.Id}
                        columns={this.Cols}
                        dataSource={this.state.datasource}
                    >
                    </Table>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default List;