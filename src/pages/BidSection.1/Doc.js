import React,{ PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Upload, Button, Icon, message, Card, Table, Divider, Popconfirm, Modal } from 'antd';
import { addFiles,deleteFiles,QueryFiles} from '../../services/bidSection';
import AddFormFile from './components/AddFormFile';
import axios from 'axios';

function GetDateFormat(str) { 
    return new Date(parseInt(str.substr(6, 13))).toLocaleDateString(); 
}

class Doc extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            datasource:[]
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
                title:'文件备注',
                dataIndex:'Remark',
                key:'Remark'
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
        axios.post(QueryFiles,{BId:this.Id,module:'资料管理'}).then(res => {
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

        let datahyjy = this.state.datasource.length>0?this.state.datasource.filter(item => item.FileType == '会议纪要'):null;
        let dataphoto = this.state.datasource.length>0?this.state.datasource.filter(item => item.FileType == '日常照片'):null;
        let datagczl = this.state.datasource.length>0?this.state.datasource.filter(item => item.FileType == '工程资料形象管理'):null;
        let dataweekly = this.state.datasource.length>0?this.state.datasource.filter(item => item.FileType == '每周工作情况汇总'):null;
        let datacontact = this.state.datasource.length>0?this.state.datasource.filter(item => item.FileType == '相关工作联系单'):null;
        let databjzl = this.state.datasource.length>0?this.state.datasource.filter(item => item.FileType == '相关报批报建资料'):null;
        let datazfwj = this.state.datasource.length>0?this.state.datasource.filter(item => item.FileType == '政府相关文件'):null;

        return(
            <PageHeaderWrapper
                title='资料管理'
            >
                <Card>
                    <Button type="primary" onClick={()=>{this.setState({visible:true})}}>
                        <Icon type="plus" /> 上传文件
                    </Button>
                    {/* <Upload {...uploadprops}>
                        <Button>
                        <Icon type="upload" /> 上传资料
                        </Button>
                    </Upload> */}
                    <Divider />
                    <div>
                        <Table
                            title={()=> <h3><Icon type="hdd" style={{marginRight:'10px'}}/>会议纪要</h3>}
                            size='small'
                            rowKey={record => record.ID}
                            columns={this.tableCols}
                            dataSource={datahyjy}
                        ></Table>
                    </div>
                    <Divider />
                    <div>
                        <Table
                            title={()=> <h3><Icon type="hdd" style={{marginRight:'10px'}}/>日常照片</h3>}
                            size='small'
                            rowKey={record => record.ID}
                            columns={this.tableCols}
                            dataSource={dataphoto}
                        ></Table>
                    </div>
                    <Divider />
                    <div>
                        <Table
                            title={()=> <h3><Icon type="hdd" style={{marginRight:'10px'}}/>工程资料形象管理</h3>}
                            size='small'
                            rowKey={record => record.ID}
                            columns={this.tableCols}
                            dataSource={datagczl}
                        ></Table>
                    </div>
                    <Divider />
                    <div>
                        <Table
                            title={()=> <h3><Icon type="hdd" style={{marginRight:'10px'}}/>每周工作情况汇总</h3>}
                            size='small'
                            rowKey={record => record.ID}
                            columns={this.tableCols}
                            dataSource={dataweekly}
                        ></Table>
                    </div>
                    <Divider />
                    <div>
                        <Table
                            title={()=> <h3><Icon type="hdd" style={{marginRight:'10px'}}/>相关工作联系单</h3>}
                            size='small'
                            rowKey={record => record.ID}
                            columns={this.tableCols}
                            dataSource={datacontact}
                        ></Table>
                    </div>
                    <Divider />
                    <div>
                        <Table
                            title={()=> <h3><Icon type="hdd" style={{marginRight:'10px'}}/>相关报批报建资料</h3>}
                            size='small'
                            rowKey={record => record.ID}
                            columns={this.tableCols}
                            dataSource={databjzl}
                        ></Table>
                    </div>
                    <Divider />
                    <div>
                        <Table
                            title={()=> <h3><Icon type="hdd" style={{marginRight:'10px'}}/>政府相关文件</h3>}
                            size='small'
                            rowKey={record => record.ID}
                            columns={this.tableCols}
                            dataSource={datazfwj}
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

                   <AddFormFile 
                        getFileContent={this.getData.bind(this)}
                        bId = {this.Id}
                    />
                 </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default Doc;