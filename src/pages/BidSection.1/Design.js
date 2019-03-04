import React,{ PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Button, Icon, message, Card, Table, Divider, Popconfirm,Modal } from 'antd';
import { addFiles,deleteFiles,QueryFiles} from '../../services/bidSection';
import AddFormDesign from './components/AddFormDesign';
import axios from 'axios';

function GetDateFormat(str) { 
    return new Date(parseInt(str.substr(6, 13))).toLocaleDateString(); 
}

class Design extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            datasource:[],
            visible:false
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
                title:'文件名称',
                dataIndex:'FileName',
                key:'FileName'
            },
            {
                title:'文件类型',
                dataIndex:'FileExtension',
                key:'FileExtension'
            },
            {
                title:'上传人员',
                dataIndex:'LoadPerson',
                key:'LoadPerson'
            },
            {
                title:'上传时间',
                dataIndex:'LoadDate',
                key:'LoadDate',
                render:(text) => {
                    return GetDateFormat(text)
                }
            },
            {
                title:'操作',
                key:'action',
                render:(text,record) => (
                    <span>
                        <Popconfirm title="确定下载?" onConfirm={this.handleDownload.bind(this,record)}>
                            <a href="javascript:;">
                                <Icon type="download" />下载
                            </a>
                        </Popconfirm>
                        <Divider type="vertical" />
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

    handleDownload = (record) => {
        let downloadPath = `/qiapi/Files/${record.ID+record.FileExtension}`;
        window.open(downloadPath);
    }

    handleDeleteBid = (record) => {
        let ids = [];
        ids.push(record.ID);
        axios.post(deleteFiles,{fileIds:ids}).then(res => {
            let data = res.data;
            if(data.status){
                message.success('已删除');
                this.getData();
            }
        })
    }

    getData = () => {
        axios.post(QueryFiles,{BId:this.Id}).then(res => {
            let data = res.data;
            console.log(data);
            if(data.Status == 'true'){
                this.setState({
                    datasource:data.Data.files
                })
            }
        })
    }

    componentDidMount = () => {
        this.getData();
    }

    onChange = (e) => {
        if(e.file.status == 'done'){
            message.success('上传成功');
            this.getData();
        }
    }

    render(){
        let uploadprops = {
            name:'file',
            action:addFiles,
            data:{BId:this.Id},
            onChange:this.onChange
        }

        return(
            <PageHeaderWrapper
                title='设计管理'
            >
                <Card>
                <Button type="primary" onClick={()=>{this.setState({visible:true})}}>
                        <Icon type="plus" /> 上传文件
                        </Button>
                    <Divider />
                    <div>
                        <Table
                        title={()=> <h3><Icon type="hdd" style={{marginRight:'10px'}}/>施工图</h3>}
                            size='small'
                            rowKey={record => record.ID}
                            columns={this.tableCols}
                            dataSource={this.state.datasource}
                        ></Table>
                    </div>
                    <Divider />
                    <div>
    
                        <Table
                        title={()=> <h3><Icon type="hdd" style={{marginRight:'10px'}}/>设计图</h3>}
                            size='small'
                            rowKey={record => record.ID}
                            columns={this.tableCols}
                            dataSource={this.state.datasource}
                        ></Table>
                    </div>
                    <Divider />
                    <div>
                  
                        <Table
                        title={()=> <h3><Icon type="hdd" style={{marginRight:'10px'}}/>洽商</h3>}
                            size='small'
                            rowKey={record => record.ID}
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
                   >

                   <AddFormDesign/>
                 </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default Design;