import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox, InputNumber, Upload, Select, message
} from 'antd';
import { addFiles } from '@/services/bidSection';
import axios from 'axios';

const { Option } = Select;
class AddFormFileView  extends Component{
    constructor(props){
        super(props);
        this.state={
          fileList: [],
          uploading: false,
          type:''
        }
        this.Id = this.props.bId;
    }

    handleSubmit = (e) => {
      let formData = new FormData();
      //formData.append('file',this.state)
      this.state.fileList.forEach((file) => {
        formData.append('files[]', file);
      });


      formData.append('BId',this.Id);
      formData.append('fileType',this.state.type);
      formData.append('remark',this.refs.textRemark.state.value);
      formData.append('module','资料管理');

      this.setState({
        uploading: true,
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      axios.post(addFiles,formData,config).then(res => {
        debugger;
        this.setState({
          fileList: [],
          uploading: false,
        });
        //console.log(res);
        this.props.getFileContent();
      })
    }

    handleChange = (e) => {
      console.log('onChange')

      // if(e.file.status == 'done'){
      //   message.success('上传成功');
      //   this.getData();
      // }
    }

    handleTypeChange = (value) => {
      this.setState({type:value})
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
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

        return (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item
              {...formItemLayout}
              label="选择上传类型"
            >
               <Select placeholder="选择上传类型" onChange={this.handleTypeChange}>
                    <Option value="会议纪要">会议纪要</Option>
                    <Option value="日常照片">日常照片</Option>
                    <Option value="工程资料形象管理">工程资料形象管理</Option>
                    <Option value="每周工作情况汇总">每周工作情况汇总</Option>
                    <Option value="相关工作联系单">相关工作联系单</Option>
                    <Option value="相关报批报建资料">相关报批报建资料</Option>
                    <Option value="政府相关文件">政府相关文件</Option>
                </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label='备注'
            >
              <Input ref='textRemark' />
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
              <Button type="primary" onClick={this.handleSubmit}>
                提交
              </Button>
            </Form>
        );
    }
}
const AddFormFile = Form.create()(AddFormFileView);

export default AddFormFile;