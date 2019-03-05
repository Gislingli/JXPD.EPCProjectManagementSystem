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
                        label='进度编码'
                    >
                        {getFieldDecorator('ProgressCode',{
                            rules:[{required:true,message:'进度编码不能为空!'}]
                        })(<Input placeholder="请填写进度编码"/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='进度名称'
                    >
                        {getFieldDecorator('ProgressName',{
                            rules:[{required:true,message:'进度名称不能为空!'}]
                        })(<Input placeholder="请填写进度名称"/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='排序'
                    >
                        {getFieldDecorator('Sort',{
                            rules:[{required:true,message:'排序不能为空!'}]
                        })(<Input placeholder="请填写排序"/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='计划时间'
                    >
                        {getFieldDecorator('PlanTime',{
                            rules:[{type: 'object',required:false}]
                        })(<DatePicker />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='调整计划时间'
                    >
                        {getFieldDecorator('AdjustPlanTime',{
                            rules:[{type: 'object',required:false}]
                        })(<DatePicker />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='实际时间'
                    >
                        {getFieldDecorator('ActualTime',{
                            rules:[{type: 'object',required:false}]
                        })(<DatePicker />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='进度状况'
                    >
                        {getFieldDecorator('Status',{
                            rules:[{required:false}]
                        })(
              <Select placeholder="请选择进度状况">
              <Option value="1">正常</Option>
              <Option value="2">提前</Option>
              <Option value="3">延期（可控）</Option>
              <Option value="4">延期（不可控）</Option>
                </Select>


                        )}
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

const AddFormForProgress = Form.create()(AddFormView);
export default AddFormForProgress;
