import React, { PureComponent } from 'react';
import { Card,Icon, Form,Input,Button,Tooltip,Select,DatePicker,message,Cascader  } from 'antd';
import axios from 'axios';
import {ProjectProgressAdd  } from '@/services/Progress';
// import { getStakeholders } from '@/services/user';
// import { specialAdd } from '@/services/special';
const {RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AddFormView extends PureComponent{
    constructor(props){
        super(props);
        this.state={
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
            
            if(values.PlanTime!=undefined){
                values.PlanStartTime=values.PlanTime[0].format("YYYY-MM-DD");
                values.PlanEndTime=values.PlanTime[1].format("YYYY-MM-DD");
               
            }else{
                values.PlanStartTime=null;
                values.PlanEndTime=null;
            }
            delete values['PlanTime'];
            if(values.AdjustPlanTime!=undefined){
                values.AdjustPlanStartTime=values.AdjustPlanTime[0].format("YYYY-MM-DD");
                values.AdjustPlanEndTime=values.AdjustPlanTime[1].format("YYYY-MM-DD");
                
            }else{
                values.AdjustPlanStartTime=null;
                values.AdjustPlanEndTime=null;

            }
            delete values['AdjustPlanTime'];
            if(values.ActualTime!=undefined){
                values.ActualStartTime=values.ActualTime[0].format("YYYY-MM-DD");
                values.ActualEndTime=values.ActualTime[1].format("YYYY-MM-DD");
               
            }else{
                values.ActualStartTime=null;
                values.ActualEndTime=null;
            }
            delete values['ActualTime'];

            values.ProID = this.props.ProID;
            values.ProgressCode=values.ProgressName.split(',')[0];
            values.ProgressName=values.ProgressName.split(',')[1];
            values.Sort=values.ProgressCode;
            
            if (!err) {
                axios.post(ProjectProgressAdd,{obj:values}).then((res)=>{
                    this.setState({btloading:false});
                    if(res.data.Status){
                        message.success('添加成功!');
                        this.props.getProgressData();
                    }
                    else{
                        message.error('添加失败:' + res.data.ErrorMessage);
                    }

                    _form.resetFields();
                });
            }
          });

    }

    renderOptions = () => {
        if(this.props.progressDictionary.length){  return this.props.progressDictionary.map(element =>
            <Option key={element.Code+','+element.Name} value={element.Code+','+element.Name}> {element.Name}</Option>);}
      
      };
    
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
                        label='进度名称'
                    >
                        {getFieldDecorator('ProgressName',{
                            rules:[{required:true,message:'进度名称不能为空!'}]
                        })(<Select>
                            {this.renderOptions()}
                        </Select>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='计划时间'
                    >
                        {getFieldDecorator('PlanTime',{
                            rules:[{required:false}]
                        })(<RangePicker format={ 'YYYY/MM/DD'}/> )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='调整计划时间'
                    >
                        {getFieldDecorator('AdjustPlanTime',{
                            rules:[{required:false}]
                        })(<RangePicker format={ 'YYYY/MM/DD'}/>)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='实际时间'
                    >
                        {getFieldDecorator('ActualTime',{
                            rules:[{required:false}]
                        })(<RangePicker format={ 'YYYY/MM/DD'}/>)}
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
                        <Button type="primary" htmlType="submit" loading={this.state.btloading}>
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
