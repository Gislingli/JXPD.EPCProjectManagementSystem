import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox, InputNumber,message
  } from 'antd';
  import { AddQS } from '@/services/bidSection';
  import axios from 'axios';
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
      let BID = this.props.BID;

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            values.BID=BID;
          
            axios.post(AddQS,{qs:values}).then(res => {
              if(res.data.status){message.success('添加成功！');this.props.addSuccess();}
          })
          }
        });
      }


    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 8 },
          wrapperCol: { span: 12 },
        };
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item
             {...formItemLayout}
             label="质安检查情况"
            >
              {getFieldDecorator('QSSituation', {
                rules: [{ required: true, message: '输入治安检查情况!' }],
              })(
                <Input placeholder="治安检查情况" />
              )}
            </Form.Item>
            <Form.Item
             {...formItemLayout}
             label="主要相关责任人"
            >
              {getFieldDecorator('QSManager', {
                rules: [{ required: true, message: '输入主要相关责任人!' }],
              })(
                <Input  placeholder="主要相关责任人" />
              )}
            </Form.Item>
                        <Form.Item
                        {...formItemLayout}
                        label="原材料检测情况"
                        >

            {getFieldDecorator('RMTestSituation', {
                rules: [{ required: true, message: '输入原材料检测情况!' }],
              })(
                <Input  placeholder="原材料检测情况" />
              )}

            </Form.Item>
                        <Form.Item
                         {...formItemLayout}
                         label="主要原材料抽检情况"
                        >

            {getFieldDecorator('MainRMTestSituation', {
                rules: [{ required: true, message: '输入主要原材料抽检情况!' }],
              })(
                <Input  placeholder="主要原材料抽检情况" />
              )}

            </Form.Item>
                                    <Form.Item
                                    {...formItemLayout}
                                    label="关键节点抽检情况"
                                    >

            {getFieldDecorator('KeyNodeTestSituation', {
                rules: [{ required: true, message: '输入关键节点抽检情况!' }],
              })(
                <Input  placeholder="关键节点抽检情况" />
              )}

            </Form.Item>
            <Form.Item  style={{textAlign:'center'}}>

           
          <Button type="primary" htmlType="submit" className="login-form-button">
         上传
          </Button>
         
        </Form.Item>
          </Form>
        );
    }
}
const AddFormQualSecu = Form.create()(NormalLoginForm);

export default AddFormQualSecu;