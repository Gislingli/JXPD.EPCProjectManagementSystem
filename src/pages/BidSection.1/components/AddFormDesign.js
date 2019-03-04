import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox, InputNumber,Upload,Select
  } from 'antd';
  const { Option } = Select;
class NormalLoginForm  extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            leftData:[],
            rightData:[],
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          };
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item
                {...formItemLayout}
                label="选择上传类型"
            >
              {getFieldDecorator('situation', {
                rules: [{ required: true, message: '选择上传类型!' }],
              })(
                <Select placeholder="选择上传类型">
                <Option value="china">施工图</Option>
                <Option value="usa">设计图</Option>
                <Option value="us">洽商</Option>
              </Select>
              )}
            </Form.Item>
            <Form.Item
            {...formItemLayout}
          label="上传"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" >
              <Button>
                <Icon type="upload" /> 点击上传文件
              </Button>
            </Upload>
          )}
        </Form.Item>
          </Form>
        );
    }
}
const AddFormDesign = Form.create()(NormalLoginForm);

export default AddFormDesign;