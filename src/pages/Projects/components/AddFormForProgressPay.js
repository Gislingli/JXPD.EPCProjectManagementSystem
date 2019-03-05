import React, { PureComponent } from 'react';
import { Card,Icon, Form,Input,Button,Tooltip,Select,DatePicker,message,Cascader  } from 'antd';
import axios from 'axios';
// import { getStakeholders } from '@/services/user';
// import { specialAdd } from '@/services/special';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AddFormView extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            specialStakeholders:[]
        }

     
    }

    handleValidator=(rule, val, callback)=>{
        if ((val==null)||(val=='')||(val==undefined)) {
            callback();
        }
        var patrn = /^\d+(\.\d+)?$/;
        let validateResult = !patrn.exec(val);  // 自定义规则
        if (validateResult) {
            callback("请输入正确的数字！");
        }
        callback();
    }
    //项目提交
    handleSubmit = (e) =>{
        e.preventDefault();
        let _form = this.props.form;
        _form.validateFields((err, values) => {
            if (!err) {
                // axios.post(specialAdd,{special:addModel,users:specialStakeholders}).then((res)=>{
                //     const data = res.data;
                //     if(data.status){
                //         message.success('添加成功!');
                //     }
                //     else{
                //         message.error('添加失败:' + data.message);
                //     }

                //     _form.resetFields();
                // });
            }
          });

    }

    componentDidMount = () =>{
       
    }

    render(){
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 18 },
              sm: { span: 15 },
            },
        };
        const formBtnLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 18  },
                sm: { span: 24, offset: 5 },
                
              },
        }

        const { getFieldDecorator } = this.props.form;

        return(
            <Card>
                <Form onSubmit={this.handleSubmit}>
                <FormItem
                        {...formItemLayout}
                        label='金额'
                    >
                        {getFieldDecorator('PayValue',{
                            rules:[{validator:this.handleValidator, message: "请输入正确的数字！"},{required:false}]
                        })(<Input addonAfter="元"/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='备注'
                    >
                        {getFieldDecorator('Remark',{
                            rules:[{required:false}]
                        })(<TextArea rows={4}/>)}
                    </FormItem>
                    <Form.Item {...formBtnLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            
        )
    }
}

const AddFormForProgressPay = Form.create()(AddFormView);
export default AddFormForProgressPay;
