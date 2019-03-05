import React, { PureComponent } from 'react';
import { Card,Icon, Form,Input,Button,Tooltip,Select,DatePicker,message,Cascader  } from 'antd';
import axios from 'axios';
// import { getStakeholders } from '@/services/user';
// import { specialAdd } from '@/services/special';
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
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
    handleValidator=(rule, val, callback)=>{
        if (!val) {
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
                        label='项目名称'
                    >
                        {getFieldDecorator('ProjectName',{
                            rules:[{required:true,message:'项目名称不能为空!'}]
                        })(<Input placeholder="请填写项目名称"/>)}
                    </FormItem>
                    <Form.Item
                        label="行政区域"
                        {...formItemLayout}
                     >
                        {getFieldDecorator('residence', {
                            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                            rules: [{ type: 'array', required: false}],
                        })(
                            <Cascader options={residences}  />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="建设分类"
                    >
                        {getFieldDecorator('ConType', {
                        rules: [{ required: false },],})(
                            <Select placeholder="请选择建筑分类">
                                <Option value="1">背街小巷</Option>
                                <Option value="2">老旧小区</Option>
                            </Select>
                        )}
                    </Form.Item>    
                    <FormItem
                        {...formItemLayout}
                        label='建设规模描述'
                    >
                        {getFieldDecorator('ConDes',{
                            rules:[{required:false}]
                        })(<TextArea rows={4} placeholder="请填写建设规模描述"/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='面积'
                    >
                        {getFieldDecorator('Areas',{
                            rules:[{validator:this.handleValidator, message: "请输入正确的数字！"},{required:false}]
                        })(<Input addonAfter="平方米"/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='户数'
                    >
                        {getFieldDecorator('HouseHolds',{
                            rules:[{validator:this.handleValidator, message: "请输入正确的数字！"},{required:false}]
                        })(<Input addonAfter="户"/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='人口数'
                    >
                        {getFieldDecorator('PersonCount',{
                            rules:[{validator:this.handleValidator, message: "请输入正确的数字！"}, {required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='起点'
                    >
                        {getFieldDecorator('StartingPoint',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>   
                    <FormItem
                        {...formItemLayout}
                        label='终点'
                    >
                        {getFieldDecorator('EndingPoint',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>  
                    <FormItem
                        {...formItemLayout}
                        label='长度'
                    >
                        {getFieldDecorator('Length',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem> 
                    <FormItem
                        {...formItemLayout}
                        label='车行道宽度'
                    >
                        {getFieldDecorator('DriveWidth',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='人行道宽度'
                    >
                        {getFieldDecorator('FootwalkWidth',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='人行道宽度'
                    >
                        {getFieldDecorator('FootwalkWidth',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem> 
                    <FormItem
                        {...formItemLayout}
                        label='车行道面积'
                    >
                        {getFieldDecorator('DriveAreas',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem> 
                    <FormItem
                        {...formItemLayout}
                        label='人行道面积'
                    >
                        {getFieldDecorator('FootwalkAreas',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='投资估算'
                    >
                        {getFieldDecorator('Investment',{
                            rules:[{validator:this.handleValidator, message: "请输入正确的数字！"},{required:false}]
                        })(<Input addonAfter="元"/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='合同金额'
                    >
                        {getFieldDecorator('ContractValue',{
                            rules:[{validator:this.handleValidator, message: "请输入正确的数字！"},{required:false}]
                        })(<Input addonAfter="元"/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='实际投入金额'
                    >
                        {getFieldDecorator('ActualValue',{
                            rules:[{validator:this.handleValidator, message: "请输入正确的数字！"},{required:false}]
                        })(<Input addonAfter="元"/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='实施年限'
                    >
                        {getFieldDecorator('ConDate',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='牵头单位'
                    >
                        {getFieldDecorator('LeaderDepart',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem> 
                    <FormItem
                        {...formItemLayout}
                        label='建设内容'
                    >
                        {getFieldDecorator('ConContent',{
                            rules:[{required:false}]
                        })(<TextArea rows={4}/>)}
                    </FormItem> 
                    <FormItem
                        {...formItemLayout}
                        label='实施主体'
                    >
                        {getFieldDecorator('ConDepart',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='建设性质'
                    >
                        {getFieldDecorator('ConProperty',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='谋划时间'
                    >
                        {getFieldDecorator('IdeaDate',{
                            rules:[{type: 'object',required:false}]
                        })(<Input />)}
                    </FormItem> 
                    <FormItem
                        {...formItemLayout}
                        label='规划时间'
                    >
                        {getFieldDecorator('PlanDate',{
                            rules:[{type: 'object',required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='立项时间'
                    >
                        {getFieldDecorator('SetupDate',{
                            rules:[{type: 'object',required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='计划设计时间'
                    >
                        {getFieldDecorator('DesignDate',{
                            rules:[{type: 'object',required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='计划招投标时间'
                    >
                        {getFieldDecorator('BidDate',{
                            rules:[{type: 'object',required:false}]
                        })(<Input />)}
                    </FormItem> 
                    <FormItem
                        {...formItemLayout}
                        label='计划施工开始时间'
                    >
                        {getFieldDecorator('ConStartDate',{
                            rules:[{type: 'object',required:false}]
                        })(<Input />)}
                    </FormItem> 
                    <FormItem
                        {...formItemLayout}
                        label='计划施工结束时间'
                    >
                        {getFieldDecorator('ConEndDate',{
                            rules:[{type: 'object',required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='计划竣工验收时间'
                    >
                        {getFieldDecorator('CheckDate',{
                            rules:[{type: 'object',required:false}]
                        })(<Input />)}
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

const AddForm = Form.create()(AddFormView);
export default AddForm;
