import React,{ PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Upload, Button, Icon, message, Card, Table, Divider, Popconfirm, Modal, Select, Row, Col, Form, Input } from 'antd';
import { addFiles,deleteFiles,QueryFiles} from '../../services/bidSection';
import axios from 'axios';

function GetDateFormat(str) { 
    return new Date(parseInt(str.substr(6, 13))).toLocaleDateString(); 
}

const Option = Select.Option;

class Design extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            datasource:[],
            DesignModules:[],
            uploading: false,
            visible:false,
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
                title:'文件类型',
                dataIndex:'FileType',
                key:'FileType'
            },
            {
                title:'文件名称',
                dataIndex:'FileName',
                key:'FileName'
            },
            {
                title:'文件说明',
                dataIndex:'Remark',
                key:'Remark'
            },
            {
                title:'文件格式',
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

    //下载
    handleDownload = (record) => {
        let downloadPath = `/qiapi/Files/${record.ID+record.FileExtension}`;
        window.open(downloadPath);
    }

    //删除
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
        // axios.post(QueryFiles,{BId:this.Id,module:'资料管理'}).then(res => {
        //     let data = res.data;
        //     console.log(data);
        //     if(data.Status == 'true'){
        //         this.setState({
        //             datasource:data.Data.files
        //         })
        //     }
        // })

        const Modules = [
            {Id:1,ModuleName:'施工图'},
            {Id:2,ModuleName:'设计变更管理'},
            {Id:3,ModuleName:'洽商记录管理'},
        ]

        setTimeout(() => {
            this.setState({
                uploading: false,
                DesignModules:Modules
            })
        },1000)
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

    //一级文件类型Change事件
    handleFileTypeChange = (value) => {
        const Children = this.state.DesignModules.filter(o => o.Id == value)[0].Children;
        if(Children!=undefined && Children.length>0){
            this.setState({
                FileTypes:Children
            })
        }
        this.setState({
            fileType:value
        })
    }

    //二级文件类型Change事件
    handleChildFileTypeChange = (value) => {
        this.setState({
            childFileType:value
        })
    }

    //提交
    handleSubmit = () => {
        debugger;
        if(this.state.fileList!=undefined){
            let formData = new FormData();
            //formData.append('file',this.state)
            this.state.fileList.forEach((file) => {
              formData.append('files[]', file);
            });
    
            formData.append('BId',this.Id);
            formData.append('remark',this.refs.textRemark.state.value);

            this.setState({
                uploading: true,
            })
        }
  

        this.setState({

            visible:false,
          });
    }

    render(){
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
          };

        const { uploading, fileList } = this.state;

        const uploadprops = {
            name:'file',
            onRemove: (file) => {
                this.setState((state) => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                    fileList: newFileList,
                };
                });
            },
            beforeUpload: (file) => {
                const  isLt10M = file.size / 1024 / 1024 < 11;
                if(!isLt10M){
                    message.error('检测到文件超过10MB，请控制文件大小');
                }

                this.setState(state => ({
                fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        }

        return(
            <PageHeaderWrapper  title='设计管理' >
                <Card>
                    <Button type="primary" onClick={()=>{this.setState({visible:true})}}>
                        <Icon type="plus" /> 上传文件
                    </Button>
                    {this.state.DesignModules.length>0?
                    this.state.DesignModules.map(item => {
                        return(
                            <div key={item.Id}>
                                <Divider />
                                <Table
                                    title={() => <h4><Icon type="book" style={{marginRight:'10px'}}/>{item.ModuleName}</h4>}
                                    size='small'
                                    rowKey={record => record.ID}
                                    columns={this.tableCols}
                                >
                                </Table>
                            </div>
                        )
                    }):(
                        <div>请配置相关模块</div>
                    )}
                </Card>
                <Modal
                    title="新增"
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{this.setState({visible:false})}}
                    destroyOnClose={true}
                >
                    <Form>
                        <Form.Item
                            {...formItemLayout}
                            label="文件类型"
                        >
                            <Select style={{width:'160px'}} onChange={this.handleFileTypeChange}>
                                {
                                    this.state.DesignModules.length>0?
                                    this.state.DesignModules.map(item => {
                                        return(
                                            <Option key={item.Id}>
                                                {item.ModuleName}
                                            </Option>
                                        )
                                    }):null
                                }
                            </Select>
                            {
                                this.state.FileTypes!=undefined?
                                (
                                    <Select style={{width:'160px',marginLeft:'10px'}} onChange={this.handleChildFileTypeChange}>
                                        {this.state.FileTypes.map(item => {
                                            return (
                                                <Option key={item.Id}>
                                                    {item.ModuleName}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                ):null
                            }
                            
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="文件说明"
                        >
                            <Input  ref='textRemark'/>
                        </Form.Item>
                        <Form.Item
                        {...formItemLayout}
                        label="上传"
                        >
                            <Upload {...uploadprops} >
                                <Button>
                                    <Icon type="upload" /> 点击上传文件
                                </Button>
                                </Upload>
                        </Form.Item>
                    </Form>
                 </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default Design;