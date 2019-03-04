import React,{ Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Icon,Button,Card,Table,Divider,Popconfirm,message } from 'antd';
import { bidSectionsQuery,bidSectionDelete } from '@/services/bidSection';
import FilterData from './components/FilterData';
import router from 'umi/router';
import axios from 'axios';

class List extends Component{
    constructor(props){
        super(props);
        this.state={
            datasource:[]
        }
    }

    tableCols = () => {
        return [
            {
                title:'序号',
                width: 70,
                dataIndex:'Id',
                render:(text,record,index) => `${index + 1}`
            },
            {
                title:'标段序号',
                dataIndex:'BidSectionCode',
                key:'BidSectionCode'
            },
            {
                title:'所属街道',
                dataIndex:'Street',
                key:'Street'
            },
            {
                title:'工作阶段',
                dataIndex:'WorkStageName',
                key:'WorkStageName'
            },
            {
                title:'投资估算',
                dataIndex:'Invest',
                key:'Invest'
            },
            {
                title:'合同金额',
                dataIndex:'ContractAmount',
                key:'ContractAmount'
            },
            {
                title:'合同额',
                children:[{
                    title:'背街小巷',
                    dataIndex:'CourtAmount',
                    width:80,
                    key:'CourtAmount'
                },
                {
                    title:'老旧小区',
                    dataIndex:'RoadAmount',
                    width:80,
                    key:'RoadAmount'
                }]
            },
            {
                title:'设计负责',
                dataIndex:'ContractDesigner',
                key:'ContractDesigner'
            },
            {
                title:'施工负责',
                dataIndex:'ContractManager',
                key:'ContractManager'
            },
            {
                title:'施工单位',
                children:[{
                    title:'单位名称',
                    dataIndex:'Builder',
                    key:'Builder'
                },{
                    title:'分管领导',
                    dataIndex:'BuilderLeader',
                    key:'BuilderLeader'
                }]
            },
            
            {
                title:'操作',
                key:'action',
                render:(text,record) => (
                    <span>
                        <a href="javascrips:;" onClick={this.handleEditBid.bind(this,record)}>
                            <Icon type="search" />详情
                        </a>
                            <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={this.handleDeleteBid.bind(this,record)}>
                            <a href="javascript:;">
                                <Icon type="delete" />删除
                            </a>
                        </Popconfirm>
                        
                    </span>
                )
            }
        ]
    }

    getData = () => {
        axios.post(bidSectionsQuery,{}).then(res => {
            debugger;
            const data = res.data;
            if(data.Status){
                window.bidData = data.Data.bidSections;
                this.setState({
                    datasource:data.Data.bidSections
                });
            }
        })
    }

    handleEditBid = (record) =>{
        const Id = record.Id;
        router.push('/bidSection/details/'+Id);
    }

    handleDeleteBid = (record) =>{
        let _self = this;
        debugger;
        const params ={Id:record.Id};
        axios.post(bidSectionDelete,params).then((res) => {
            const data = res.data;
            if(data.status){
                message.success('删除成功!');
                _self.getData();
            }
            else{
                message.error(data.message);
            }
        })
    }

    toAdd = () => {
        router.push('/bidSection/add');
    }

    componentDidMount = () =>{
        this.getData();
    }

    render(){
        const titleContent = (
            <div>
                <label>标段清单</label>
                <Button type="primary" style={{float:'right'}} onClick={this.toAdd}>
                    <Icon type="plus" />添加标段
                </Button>
            </div>
        ); 

        return(
            <PageHeaderWrapper
                title={titleContent}
            >
                <FilterData />
                <Card style={{marginTop:'20px'}}>
                    <Table
                        size='small'
                        rowKey={record => record.Id}
                        columns={this.tableCols()}
                        dataSource={this.state.datasource}
                    >

                    </Table>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default List;