import React,{ Component,Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Button,Icon,Table,Popconfirm,Card } from 'antd';
import BidSectionProgressNodesAdd from './components/BidSectionProgressNodesAdd';

class BidSectionProgressNodes extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            datasource:[
                {Id:0,ProgressNodeName:'方案设计'},
                {Id:1,ProgressNodeName:'施工图设计(公示)'},
                {Id:2,ProgressNodeName:'拆违、拆迁'},
                {Id:3,ProgressNodeName:'商户、住户协商'},
                {Id:4,ProgressNodeName:'排水管道施工'},
                {Id:5,ProgressNodeName:'立面施工'},
                {Id:6,ProgressNodeName:'强电施工'},
                {Id:7,ProgressNodeName:'弱点施工'},
                {Id:8,ProgressNodeName:'给水施工'},
                {Id:9,ProgressNodeName:'路灯施工'},
                {Id:10,ProgressNodeName:'燃气施工'},
                {Id:11,ProgressNodeName:'路面、景观绿化'}
            ]
        }
    }

    tableCols = () => {
        return [
            {
                title:'序号',
                dataIndex:'Id',
                render:(text,record,index) => `${index + 1}`
            },
            {
                title:'进度节点名称',
                dataIndex:'ProgressNodeName'
            },
            {
                title:'操作',
                key:'action',
                render:(text,record) => (
                    <span>
                        <Popconfirm title="确定删除?" onConfirm={this.handleDeleteNode.bind(this,record)}>
                            <a href="javascript:;">
                                <Icon type="delete" />删除
                            </a>
                        </Popconfirm>
                    </span>
                )
            }
        ]
    }

    showAddModal = () => {
        debugger;
        this.setState({
            visible: true,
        });
    }

    handleAddModalOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleAddModalCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleDeleteNode = (e) => {

    }

    render(){
        return(
            <PageHeaderWrapper
                title='标段进度节点配置'
                action={
                    <Fragment>
                        <Button type="primary" onClick={this.showAddModal.bind(this)}>
                            <Icon type="plus" />添加
                        </Button>
                    </Fragment>
                }
            >
                <BidSectionProgressNodesAdd 
                    modalVisible={this.state.visible}
                    AddModalOk={this.handleAddModalOk.bind(this)}
                    AddModalCancel={this.handleAddModalCancel.bind(this)}
                />
                <Card>
                    <Table
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

export default BidSectionProgressNodes;