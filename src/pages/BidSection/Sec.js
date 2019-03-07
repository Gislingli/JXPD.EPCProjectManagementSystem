import React,{ PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Upload, Button, Icon, message, Card, Table, Divider, Popconfirm, Modal, Select, Row, Col, Form, Input, Radio } from 'antd';
import { GetQSByBID,DeleteQS} from '../../services/bidSection';
import { QueryModelByCode } from '@/services/module';
import axios from 'axios';

function GetDateFormat(str) { 
    return new Date(parseInt(str.substr(6, 13))).toLocaleDateString(); 
}

const Option = Select.Option;
const RadioGroup = Radio.Group;

class Sec extends PureComponent{
    constructor(props){
        
        super(props);
        this.state={
            datasource:[],
            visible:false,
            uploading: false,
            SecModules:[],
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
                title:'是否合格',
                dataIndex:'IsQualified',
                key:'IsQualified'
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

     changeConfirmLoading=()=>{
        if(this.state.confirmLoading)this.setState({confirmLoading:false});else this.setState({confirmLoading:true});
     }

    getData = () =>{
        const Modules = [
            {Id:1,ModuleName:'单位备案情况'},
            {Id:2,ModuleName:'质安交底情况'},
            {Id:3,ModuleName:'质安检查情况'},
            {Id:4,ModuleName:'突发（特殊）事件处理情况'},
            {Id:5,ModuleName:'原材料抽检情况'},
            {Id:6,ModuleName:'关键节点内部验收情况',Children:[]},
            {Id:7,ModuleName:'奖罚情况',Children:[]}
        ]

        axios.post(QueryModelByCode,{parenteModuleCode: 300}).then(res => {
            if(res.data.Status){
                let Modules = res.data.Data.ModuleManageViewModel;

                this.setState({
                    SecModules:Modules
                })
            }
        })

    }

    componentDidMount = () =>{
        this.getData();
    }

    //Upload上传
    onChange = (e) => {
        if(e.file.status == 'done'){
            message.success('上传成功');
            this.getData();
        }
    }

    //一级文件类型Change事件
    handleFileTypeChange = (value) => {
        const Children = this.state.SecModules.filter(o => o.Id == value)[0].Children;
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

    //是否合格
    handleQualifiedChange = (value) => {
        this.setState({Qualified:value});
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
            <PageHeaderWrapper
                title='质安管理'
            >
                <Card>
                    <Button type="primary" onClick={()=>{this.setState({visible:true})}}>
                        <Icon type="plus" /> 上传文件
                    </Button>
                    {this.state.SecModules.length>0?
                    this.state.SecModules.map(item => {
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
                                    this.state.SecModules.length>0?
                                    this.state.SecModules.map(item => {
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
                            label="是否合格"
                        >
                            <RadioGroup onChange={this.handleQualifiedChange}>
                                <Radio value={true}>合格</Radio>
                                <Radio value={false}>不合格</Radio>
                            </RadioGroup>
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

export default Sec;