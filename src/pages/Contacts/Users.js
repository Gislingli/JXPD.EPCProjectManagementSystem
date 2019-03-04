import React, { PureComponent } from 'react';
import axios from 'axios';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FilterData from './components/FilterData';
import { Icon,Button,Card,Table,Divider,Popconfirm,message } from 'antd';

class Users extends PureComponent{
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
                            title:'姓名',
                            dataIndex:'Name',
                            key:'Name'
                        },
                        {
                            title:'单位',
                            dataIndex:'Organization',
                            key:'Organization'
                        },
                        {
                            title:'部门',
                            dataIndex:'Department',
                            key:'Department'
                        },
                        {
                            title:'手机',
                            dataIndex:'Phone',
                            key:'Phone'
                        },
                        {
                            title:'联系地址',
                            dataIndex:'Address',
                            key:'Address'
                        },
                        {
                            title:'职务/岗位',
                            dataIndex:'Position',
                            key:'Position'
                        },
                        {
                            title:'邮箱',
                            dataIndex:'EMail',
                            key:'EMail'
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
    /*查询用户*/
    queryUserByName = (queryContent) => {
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
                title='人员管理'
            >
            <FilterData formQueryByName = {this.queryUserByName.bind(this)}/>
            <Card>
                    <Table
                        columns={this.tableCols()}
                        dataSource={this.state.datasource}
                    >
                    </Table>

                </Card>
                
            </PageHeaderWrapper>
        )
    }
}

export default Users;