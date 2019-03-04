import React, { PureComponent } from 'react';
import { Card,Icon, Form,Input,Button,Tooltip,Select,DatePicker,message  } from 'antd';
import axios from 'axios';
// import { getStakeholders } from '@/services/user';
// import { specialAdd } from '@/services/special';
import { userAdd } from '@/services/contacts';
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;


class AddFormView extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            specialStakeholders:[]
        }

     
    }



    //获取全部组织
    getAllGroups = () =>{
        // axios.post(getStakeholders).then((res)=>{
        //     const data = res.data.Data.list;
        //     let selectItems=[];
        //     data.map((item) =>{
        //         let obj={};
        //         obj.value=item.Id;
        //         obj.title=item.Name;
        //         selectItems.push(obj);
        //     });
            
        //     this.setState({
        //         specialStakeholders:selectItems,
        //     });
        // })
    }

    //数据提交
    handleSubmit = (e) =>{
        e.preventDefault();
        let _form = this.props.form;
        _form.validateFields((err, values) => {
            if (!err) {
               
                axios.post(userAdd,{obj:values}).then((res)=>{
                    debugger
                    // const data = res.data;
                    // if(data.status){
                    //     message.success('添加成功!');
                    // }
                    // else{
                    //     message.error('添加失败:' + data.message);
                    // }

                    // _form.resetFields();
                });
            }
          });

    }

    componentDidMount = () =>{
       
    }

    render(){
        const formItemLayout = {
            labelCol: {
              xs: { span: 26 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 18 },
              sm: { span: 10 },
            },
        };
        const formBtnLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 26 },
                sm: { span: 16, offset: 6 },
                
              },
        }

        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
          })(
            <Select style={{ width: 70 }}>
              <Option value="86">+86</Option>
              <Option value="852">+852</Option>
              <Option value="853">+853</Option>
              <Option value="886">+886</Option>
              <Option value="1">+1</Option>
              <Option value="82">+82</Option>
              <Option value="81">+81</Option>
            </Select>
          );
        return(
            <Card>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label='姓名'
                    >
                        {getFieldDecorator('UserName',{
                            rules:[{required:true,message:'姓名不能为空!'}]
                        })(<Input />)}
                    </FormItem>
                    <Form.Item
          {...formItemLayout}
          label="单位"
       
        >
          {getFieldDecorator('Organization', {
            rules: [
              { required: true, message: '单位不能为空!' },
            ],
          })(
            <Select placeholder="请选择单位">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          )}
             </Form.Item>
          <FormItem
                        {...formItemLayout}
                        label='部门'
                    >
                        {getFieldDecorator('Department',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='手机'
                    >
                        {getFieldDecorator('Phone',{
                            rules:[{required:false}]
                        })(<Input addonBefore={prefixSelector}/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='联系地址'
                    >
                        {getFieldDecorator('Address',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='职务/岗位'
                    >
                        {getFieldDecorator('Position',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='邮箱'
                    >
                        {getFieldDecorator('EMail',{
                            rules:[{
                                type: 'email', message: '邮箱格式不正确！',
                              }, {required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='描述'
                    >
                        {getFieldDecorator('Description',{
                            rules:[{required:false}]
                        })(<TextArea rows={4} />)}
                    </FormItem>   
                    <FormItem
                        {...formItemLayout}
                        label='备注'
                    >
                        {getFieldDecorator('Remark',{
                            rules:[{required:false}]
                        })(<TextArea rows={4} />)}
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

const AddForm = Form.create()(AddFormView);
export default AddForm;
