import React, { PureComponent } from 'react';
import { Card,Icon, Form,Input,Button,Tooltip,Select,DatePicker,message  } from 'antd';
import axios from 'axios';
import { specialGetById,specialUpdate } from '@/services/special';
import { getStakeholders } from '@/services/user';
import router from 'umi/router';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const rangeConfig = {
    rules: [{ type: 'array', required: true, message: '请选择日期' }],
};

class EditFormView extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            specialStakeholders:[]
        }
        this.checkContractPrice = this.checkContractPrice.bind(this);
        this.Id = this.props.specialId;
    }

    //验证Decimal(18,2)类型
    checkContractPrice = (rule,value,callback) =>{
        const reg = /^\d{1,18}(.\d{1,2})?$/gi;
        if(!reg.test(value)){
            callback('合同价格异常！');
            return;
        }

        callback();
    }

    //获取项目干系人
    getSpecialStakeholders = () =>{
        axios.post(getStakeholders).then((res)=>{
            const data = res.data.Data.list;
            let selectItems=[];
            data.map((item) =>{
                let obj={};
                obj.value=item.Id;
                obj.title=item.Name;
                selectItems.push(obj);
            });
            
            this.setState({
                specialStakeholders:selectItems,
            });
        })
    }

    getDetails = () =>{
        let _self = this;
        axios.post(specialGetById,{Id: _self.Id}).then((res) => {
            console.log(res)
            let data = res.data.Data;
            let special = data.special;
            let specialStakeholders = data.specialStakeholders;
            let Stakeholders = [];
            specialStakeholders.map((item) =>{
                Stakeholders.push(item.UserId);
            })
            _self.props.form.setFieldsValue({
                "SpecialName":special.SpecialName,
                "SpecialInvest":special.SpecialInvest,
                "SpecialOwner":special.SpecialOwner,
                "SpecialSupervisor":special.SpecialSupervisor,
                "SpecialDateRange":[moment(special.SpecialStartDate),moment(special.SpecialEndDate)],
                "SpecialStakeholders":Stakeholders
            })
        })
    }

    componentDidMount = () => {
        this.getSpecialStakeholders();
        this.getDetails();
    }

    submit = (e) => {
        let _self = this;
        e.preventDefault();
        let _form = this.props.form;
        _form.validateFields((err, values) => {
            if (!err) {
                let editModel={
                    Id: _self.Id,
                    SpecialName: values.SpecialName,
                    SpecialOwner: values.SpecialOwner,
                    SpecialStartDate: values.SpecialDateRange[0].format('YYYY/MM/DD'),
                    SpecialEndDate: values.SpecialDateRange[1].format('YYYY/MM/DD'),
                    SpecialInvest: values.SpecialInvest,
                    SpecialSupervisor: values.SpecialSupervisor
                }

                let specialStakeholders = values.SpecialStakeholders;
                axios.post(specialUpdate,{special:editModel,users:specialStakeholders}).then((res)=>{
                    debugger;
                    const data = res.data;
                    if(data.status){
                        message.success('提交成功');
                        _self.returnBack();
                    }
                    else{
                        message.error('编辑失败:'+data.message);
                    }
                });
            }
        });
    }

    returnBack = () => {
        router.push('/special/specialList');
    }

    render(){
        const formItemLayout = {
            labelCol: {
              xs: { span: 26 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
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
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label='专项名称'
                    >
                        {getFieldDecorator('SpecialName',{
                            rules:[{required:true,message:'专项名称不能为空!'}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='关联业主'
                    >
                        {getFieldDecorator('SpecialOwner',{
                            rules:[{required:true,message:'业主单位不能为空!'}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='监理单位'
                    >
                        {getFieldDecorator('SpecialSupervisor',{
                            rules:[{required:true,message:'监理单位不能为空!'}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                合同价&nbsp;
                                <Tooltip  title='合同价小数最多2位'>
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('SpecialInvest',{
                            rules:[{
                                required:true,
                                whitespace: true,
                                validator:this.checkContractPrice
                            }]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='工期'
                    >
                        {getFieldDecorator('SpecialDateRange', rangeConfig)(
                            <RangePicker />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                项目干系人&nbsp;
                                <Tooltip  title='项目主要管理人员'>
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('SpecialStakeholders', {
                            rules: [
                            { required: true, message: '选择项目主要管理人员', type: 'array' },
                            ],
                        })(
                            <Select mode="multiple" placeholder="选择项目主要管理人员">
                                {
                                    this.state.specialStakeholders.length>0?
                                        (this.state.specialStakeholders.map(specialStakeholde => 
                                            <Option key={specialStakeholde.value} value={specialStakeholde.value}>
                                                {specialStakeholde.title}
                                            </Option>)):null
                                }
                            </Select>
                        )}
                    </FormItem>
                    <Form.Item {...formBtnLayout}>
                        <Button type="primary" onClick={this.submit}>
                            提交
                        </Button>
                        <Button style={{marginLeft:'10px'}} onClick={this.getDetails}>
                            重置
                        </Button>
                        <Button style={{marginLeft:'10px'}} onClick={this.returnBack}>
                            返回
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

const EditForm = Form.create()(EditFormView);

export default EditForm;
