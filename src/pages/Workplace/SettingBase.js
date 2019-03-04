import React,{Component} from 'react';
import { Form, Input, Select, Button } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class SettingBaseForm extends Component{
    constructor(props){
        super(props)
    }

    render = () => {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="vertical" style={{width:'700px',margin:'0 auto'}}>
                <FormItem label='用户账号'>
                    {getFieldDecorator('Account',{
                        rules:[{required:true,message:'用户账号不能为空!'}]
                    })(<Input />)}
                </FormItem>
                <FormItem label='用户姓名'>
                    {getFieldDecorator('Name',{
                        rules:[{required:true,message:'用户姓名不能为空!'}]
                    })(<Input />)}
                </FormItem>
                <FormItem label='邮箱'>
                    {getFieldDecorator('Email',{})(<Input />)}
                </FormItem>
                <FormItem label='联系方式'>
                    {getFieldDecorator('Phone',{})(<Input />)}
                </FormItem>
                <FormItem label='所属单位'>
                    {getFieldDecorator('Group',{})(<Input />)}
                </FormItem>
                <FormItem>
                    <Button 
                        type="primary" 
                    >
                        提交
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const SettingBase = Form.create()(SettingBaseForm);
export default SettingBase