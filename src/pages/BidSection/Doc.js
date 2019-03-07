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

class Doc extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            DocModules:[],
            FixedFiles:[],
            fileList: [],
            selectCode:'',
            uploading: false,
            visible:false,
        }
        this.Id = this.props.match.params.id;
        this.getData = this.getData.bind(this);
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
            else{
                console.log(res.data.ErrorMessage);
            }
        })
    }

    getData = () => {

        axios.post(QueryModelByCode,{parenteModuleCode: 100}).then(res => {
            if(res.data.Status){
                let Modules = res.data.Data.ModuleManageViewModel;

                const Fixeds = [
                    {Id:104,ModuleName:'审图报告',IsUpload:true},
                    {Id:105,ModuleName:'开工报告',IsUpload:false},
                    {Id:106,ModuleName:'施工许可证',IsUpload:true},
                    {Id:107,ModuleName:'竣工报告',IsUpload:true},
                    {Id:108,ModuleName:'竣工验收证书',IsUpload:false}
                ]

                this.setState({
                    FixedFiles:Fixeds,
                    DocModules:Modules
                })

                axios.post(GetModuleData,{bidSectionId: this.Id}).then(result => {
                    let modules = this.state.DocModules;
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

       
        // const Modules = [
        //     {Id:1,ModuleName:'合同'},
        //     {Id:2,ModuleName:'会议纪要'},
        //     {Id:3,ModuleName:'日常影像资料'},
        //     {Id:4,ModuleName:'工程形象进度资料'},
        //     {Id:5,ModuleName:'每周工作情况汇总'},
        //     {Id:6,ModuleName:'工作联系单',Children:[{Id:101,ModuleName:'总包'},{Id:102,ModuleName:'监理'},{Id:103,ModuleName:'主管部门'}]},
        //     {Id:7,ModuleName:'报批报建资料',Children:[{Id:104,ModuleName:'审图报告'},{Id:105,ModuleName:'开工报告'},{Id:106,ModuleName:'施工许可证'},{Id:107,ModuleName:'竣工报告'},{Id:108,ModuleName:'竣工验收证书'}]},
        //     {Id:8,ModuleName:'政府相关文件'}
        // ]

        

        // setTimeout(() => {
        //     this.setState({
        //         uploading: false,
        //         FixedFiles:Fixeds,
        //         DocModules:Modules
        //     })
        // },1000)
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
        const Children = this.state.DocModules.filter(o => o.ModuleCode == value)[0].Children;
        if(Children!=undefined && Children.length>0){
            this.setState({
                fileTypes:Children
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
           
            let BidSectionDoc = {
                ModuleCode:null,
                FileRemark:this.refs.textRemark.state.value,
                BidSectionId:this.Id
            }
    
            formData.append('FileRemark',this.refs.textRemark.state.value);
            formData.append('ModuleCode',parseInt(this.state.selectCode));
            formData.append('BidSectionId',this.Id);

            this.setState({
                uploading: true,
            });

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
                    message.success('上传成功');
                    this.getData();
                }
                else{
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
            <PageHeaderWrapper  title='资料管理' >
                <Card title='固定资料'>
                    {/* <Button onClick={()=>{console.log(this.state)}} /> */}
                    <table style={{width:'100%',textAlign:'center'}}>
                        <thead>
                            <tr>
                                {this.state.FixedFiles.length>0?this.state.FixedFiles.map(item => {
                                    return (
                                        <th key={item.Id}>{item.ModuleName}</th>
                                    )
                                }):null}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {this.state.FixedFiles.length>0?this.state.FixedFiles.map(item => {
                                    return (
                                        <td key={item.Id}>{item.IsUpload?'已上传':'-'}</td>
                                    )
                                }):null}
                            </tr>
                        </tbody>
                    </table>
                </Card>
                <Card>
                    <Button type="primary" onClick={()=>{this.setState({visible:true})}}>
                        <Icon type="plus" /> 上传文件
                    </Button>
                    {this.state.DocModules.length>0?
                    this.state.DocModules.map(item => {
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
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            key="文件类型"
                            {...formItemLayout}
                            label="文件类型"
                        >
                            <Select style={{width:'160px'}} onChange={this.handleFileTypeChange}>
                                {
                                    this.state.DocModules.length>0?
                                    this.state.DocModules.map(item => {
                                        return(
                                            <Option key={item.ModuleCode}>
                                                {item.ModuleName}
                                            </Option>
                                        )
                                    }):null
                                }
                            </Select>
                            {
                                this.state.fileTypes != undefined?
                                (
                                    <Select style={{width:'160px',marginLeft:'10px'}} onChange={this.handleChildFileTypeChange}>
                                        {this.state.fileTypes.map(item => {
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
                            key="文件说明"
                            {...formItemLayout}
                            label="文件说明"
                        >
                            <Input  ref='textRemark'/>
                        </Form.Item>
                        <Form.Item
                            key="文件上传"
                            {...formItemLayout}
                            label="文件上传"
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

export default Doc;