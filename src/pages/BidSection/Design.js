import React,{ PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Upload, Button, Icon, message, Card, Table, Divider, Popconfirm, Modal, Select, Row, Col, Form, Input } from 'antd';
import { QueryModelByCode } from '@/services/module';
import { GetModuleData,UploadFiles } from '@/services/bidSectionDoc';
import axios from 'axios';

function GetDateFormat(str) { 
    return new Date(parseInt(str.substr(6, 13))).toLocaleDateString(); 
}

const Option = Select.Option;

class Design extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            DesignModules:[],
            fileList: [],
            selectCode:'',
            visible:false,
            uploading: false,
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
                dataIndex:'ModuleName',
                key:'ModuleName'
            },
            {
                title:'文件名称',
                dataIndex:'FileOriginalName',
                key:'FileOriginalName'
            },
            {
                title:'文件说明',
                dataIndex:'FileRemark',
                key:'FileRemark'
            },
            {
                title:'上传人员',
                dataIndex:'LoadPerson',
                key:'LoadPerson'
            },
            {
                title:'上传时间',
                dataIndex:'LoadDate',
                key:'LoadDate'
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
                        {/* <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={this.handleDeleteBid.bind(this,record)}>
                            <a href="javascript:;">
                                <Icon type="delete" />删除
                            </a>
                        </Popconfirm> */}
                    </span>
                )
            }
        ];

    
    }

    //下载
    handleDownload = (record) => {
        let downloadPath = `/qiapi/${record.FileLocation}`;
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

        // const Modules = [
        //     {Id:1,ModuleName:'施工图'},
        //     {Id:2,ModuleName:'设计变更管理'},
        //     {Id:3,ModuleName:'洽商记录管理'},
        // ]

        axios.post(QueryModelByCode,{parenteModuleCode: 200}).then(res => {
            if(res.data.Status){
                let Modules = res.data.Data.ModuleManageViewModel;

                this.setState({
                    DesignModules:Modules
                })

                axios.post(GetModuleData,{bidSectionId: this.Id}).then(result => {
                    let modules = this.state.DesignModules;
                    //console.log(modules);
                    debugger;
                    if(result.data.Status && modules.length >0){
                        let FileData = result.data.Data.BidSectionDoc;
                        modules.map(item => {
                            let moduleCode = item.ModuleCode;
                            let moduleData = FileData[moduleCode];

                            if(moduleData!=undefined && moduleData.length > 0){
                                //this.state[moduleCode] = moduleData;

                                var state = {};
                                state[moduleCode] = moduleData;
                                this.setState(state);
                            }
                            
                        })
                    }
                    else{
                        console.log(res.data.ErrorMessage);
                    }
                })
            }
            else{
                console.log(res.data.ErrorMessage);
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

    //一级文件类型Change事件
    handleFileTypeChange = (value) => {
        const Children = this.state.DesignModules.filter(o => o.ModuleCode == value)[0].Children;
        if(Children!=undefined && Children.length>0){
            this.setState({
                FileTypes:Children
            })
        }
        this.setState({
            fileType:value,
            selectCode:value
        })
    }

    //二级文件类型Change事件
    handleChildFileTypeChange = (value) => {
        this.setState({
            childFileType:value,
            selectCode:value
        })
    }

    //提交
    handleSubmit = () => {
        if(this.state.fileList!=undefined){
            let formData = new FormData();
            //formData.append('file',this.state)
            this.state.fileList.forEach((file) => {
              formData.append('files[]', file);
            });
    
            formData.append('FileRemark',this.refs.textRemark.state.value);
            formData.append('ModuleCode',parseInt(this.state.selectCode));
            formData.append('BidSectionId',this.Id);

            this.setState({
                uploading: true,
            })

            const config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }
    
            axios.post(UploadFiles,formData,config).then(res => {
                this.setState({
                  fileList: [],
                  uploading: false,
                  visible:false
                });
                //console.log(res);
                if(res.data.Status){
                    this.getData();
                }else{
                    console.log(res.data.ErrorMessage);
                }
            })
        }
  
        this.setState({ visible:false });
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
                                    rowKey={record => record.ModuleCode}
                                    columns={this.tableCols}
                                    dataSource={this.state[item.ModuleCode]!=undefined?this.state[item.ModuleCode]:null}
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
                            key="文件类型"
                            {...formItemLayout}
                            label="文件类型"
                        >
                            <Select style={{width:'160px'}} onChange={this.handleFileTypeChange}>
                                {
                                    this.state.DesignModules.length>0?
                                    this.state.DesignModules.map(item => {
                                        return(
                                            <Option key={item.ModuleCode}>
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
                                                <Option key={item.ModuleCode}>
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