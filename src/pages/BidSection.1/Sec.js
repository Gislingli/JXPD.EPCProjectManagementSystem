    import React,{ PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Upload, Button, Icon, message, Card, Table, Divider, Popconfirm,Modal } from 'antd';
import { GetQSByBID,DeleteQS} from '../../services/bidSection';
import AddFormQualSecu from './components/AddFormQualSecu';
import axios from 'axios';

function GetDateFormat(str) { 
    return new Date(parseInt(str.substr(6, 13))).toLocaleDateString(); 
}

class Sec extends PureComponent{
    constructor(props){
        
        super(props);
        this.state={
            datasource:[],
            visible:false,
            confirmLoading:false
        }
        this.Id = this.props.match.params.id;
        this.tableCols=[
            {
                title:'序号',
                width: 50,
                dataIndex:'ID',
                render:(text,record,index) => `${index + 1}`
            },
            {
                title:'质安检查情况',
                dataIndex:'QSSituation',
                key:'QSSituation'
            },
            {
                title:'主要相关责任人',
                dataIndex:'QSManager',
                key:'QSManager'
            },
            {
                title:'原材料检测情况',
                dataIndex:'RMTestSituation',
                key:'RMTestSituation'
            },
            {
                title:'主要原材料抽检情况',
                dataIndex:'MainRMTestSituation',
                key:'MainRMTestSituation'
            },
            {
                title:'关键节点抽检情况',
                dataIndex:'KeyNodeTestSituation',
                key:'KeyNodeTestSituation'
            },
            {
                title:'操作',
                key:'action',
                render:(text,record) => (
                    <span>
                        <Popconfirm title="确定删除?" onConfirm={this.handleDeleteBid.bind(this,record)}>
                            <a href="javascript:;">
                                <Icon type="delete" />删除
                            </a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
    
    }

    handleDeleteBid = (record) => {
 
        axios.post(DeleteQS,{Id:record.Id}).then(res => {
            
            if(res.status==200){
                message.success('已删除');
                this.getData();
            }
        })
    }

     changeConfirmLoading=()=>{
        if(this.state.confirmLoading)this.setState({confirmLoading:false});else this.setState({confirmLoading:true});
     }


     addSuccess=()=>{

        this.setState({visible:false});
        this.getData();

     }

     getData = () =>{
        let _self = this;
        axios.post(GetQSByBID,{BId: this.props.match.params.id}).then(res => {
           
            if(res.status==200){
                if(res.data.Status=="true"){
                    let datasource = res.data.Data.list;

                    this.setState({datasource:datasource});
                }
                if(res.data.ErrorMessage=="没有数据")this.setState({datasource:[]});
            }
           
            // let data = res.data;
            // if(data.Status == 'true'){
            //     let detail = data.Data;

            //     _self.setState({
            //         bidSection:detail.bidSection,
            //     })
            // }
        })
    }

    componentDidMount = () =>{
        this.getData();
    }

    render(){


        return(
            <PageHeaderWrapper
                title='质安管理'
            >
                <Card>
                        <Button type="primary" onClick={()=>{this.setState({visible:true})}}>
                        <Icon type="plus" /> 新增
                        </Button>
                    <Divider />
                    <div>
                        <Table
                            size='small'
                            rowKey={record => record.Id}
                            columns={this.tableCols}
                            dataSource={this.state.datasource}
                        ></Table>
                    </div>
                </Card>
                <Modal
                    title="新增"
                    visible={this.state.visible}
                    onOk={()=>{this.setState({visible:false})}}
                    onCancel={()=>{this.setState({visible:false})}}
                    destroyOnClose={true}
                    confirmLoading={this.state.confirmLoading}
                    footer={null}
                   >

                   <AddFormQualSecu changeConfirmLoading={this.changeConfirmLoading} BID={this.props.match.params.id} addSuccess={this.addSuccess}/>
                 </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default Sec;