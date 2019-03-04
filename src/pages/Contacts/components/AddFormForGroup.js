import React, { PureComponent } from 'react';
import { Card,Icon, Form,Input,Button,Tooltip,Select,DatePicker,message  } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

// import { getStakeholders } from '@/services/user';
// import { specialAdd } from '@/services/special';

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
        return(
            <Card>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label='单位名称'
                    >
                        {getFieldDecorator('Name',{
                            rules:[{required:true,message:'姓名不能为空!'}]
                        })(<Input />)}
                    </FormItem>
                    <Form.Item
          {...formItemLayout}
          label="单位类型"
       
        >
          {getFieldDecorator('GroupType', {
            rules: [
              { required: true, message: '单位类型不能为空!' },
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
                        label='联系方式'
                    >
                        {getFieldDecorator('Phone',{
                            rules:[{required:false}]
                        })(<Input />)}
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
