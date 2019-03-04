import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import axios from 'axios';
import FilterData from './components/FilterDataForGroup';
import { Icon,Button,Card,Table,Divider,Popconfirm,message } from 'antd';
class Groups extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            datasource:[]
        }
    }
    /*表头*/
    tableCols = () => {
        return [
                {
                    title:'序号',
                    width: 80,
                    dataIndex:'ID',
                    render:(text,record,index) => `${index + 1}`
                },
                {
                    title:'单位名称',
                    dataIndex:'Name',
                    key:'Name'
                },
                {
                    title:'联系方式',
                    dataIndex:'Phone',
                    key:'Phone'
                },
                {
                    title:'联系地址',
                    dataIndex:'Address',
                    key:'Address'
                },
                {
                    title:'描述',
                    dataIndex:'Description',
                    key:'Description'
                },
                {
                    title:'备注',
                    dataIndex:'Remark',
                    key:'Remark'
                },

                {
                    title:'信用评分',
                    dataIndex:'CreditScore',
                    key:'CreditScore'
                },
                {
                    title:'操作',
                    key:'action',
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
     /*查询单位*/
     queryGroupByName = (queryContent) => {
            debugger
    }
    /*获取数据*/
    getData = () => {
        axios.post(specialList).then((res) => {
            debugger;
            const data = res.data;
            if(data.Status){
                window.specialData = data.Data.list;
                this.setState({
                    datasource:data.Data.list
                });
            }
        })
    } 
    /*渲染*/
    render(){
        return(
            <PageHeaderWrapper
                title='单位'
            >
             <FilterData formQueryByName = {this.queryGroupByName.bind(this)}/>
             <Card>                    <Table
                        columns={this.tableCols()}
                        dataSource={this.state.datasource}
                    >
                    </Table></Card>
            </PageHeaderWrapper>
        )
    }
}

export default Groups;