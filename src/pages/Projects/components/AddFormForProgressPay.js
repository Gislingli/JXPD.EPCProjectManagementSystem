import React, { PureComponent } from 'react';
import { Card,Icon, Form,Input,Button,Tooltip,Select,DatePicker,message,Cascader  } from 'antd';
import axios from 'axios';
// import { getStakeholders } from '@/services/user';
import { ProjectPaymentAdd } from '@/services/Progress';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AddFormView extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            specialStakeholders:[],
            btloading:false
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

        this.setState({btloading:true});
        e.preventDefault();
        let _form = this.props.form;
        
        _form.validateFields((err, values) => {
            if (!err) {
                values.RecordTime=values.RecordTime.format("YYYY-MM-DD");
                values.ProID = this.props.ProID;
                axios.post(ProjectPaymentAdd,{obj:values}).then((res)=>{
                    this.setState({btloading:false});
                    if(res.data.Status){
                        message.success('添加成功!');
                        this.props.getPaymentData();
                    }
                    else{
                        message.error('添加失败:' + res.data.ErrorMessage);
                    }
                   
                    _form.resetFields();
                });
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
                        label='记录时间'
                    >
                        {getFieldDecorator('RecordTime',{
                            rules:[{required:false}]
                        })(<DatePicker   format="YYYY-MM-DD"/>)}
                    </FormItem> 
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
                        <Button type="primary" htmlType="submit" loading={this.state.btloading}>
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
