import React,{ PureComponent } from 'react';
import { Card,Icon,Form,DatePicker,Button,Input,InputNumber,Modal,Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class ProgressEditForm extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            nodes:[
                {id:0,nodeName:'方案设计'},
                {id:1,nodeName:'施工图设计(公示)'},
                {id:2,nodeName:'拆违、拆迁'},
                {id:3,nodeName:'商户、住户协商'},
                {id:4,nodeName:'排水管道施工'},
                {id:5,nodeName:'立面施工'},
                {id:6,nodeName:'强电施工'},
                {id:7,nodeName:'弱点施工'},
                {id:8,nodeName:'给水施工'},
                {id:9,nodeName:'路灯施工'},
                {id:10,nodeName:'燃气施工'},
                {id:11,nodeName:'路面、景观绿化'}
            ]
        }
    }

    submit = () => {

    }

    handleOk = (e) => {
        this.props.ModalOk();
    }

    handleCancel = (e) => {
        this.props.ModalCancel();
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
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: '请确认时间！' }],
          };
        const { getFieldDecorator } = this.props.form;
        return(
            <Modal
                width={720}
                title='添加项目节点'
                visible={this.props.modalVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label='项目节点'
                    >
                        {getFieldDecorator('ProgressNode',{
                            rules:[{required:true,message:'项目节点不能为空！'}]
                        })(
                            <Select>
                                {
                                    this.state.nodes.map(item => 
                                        <Option key={item.id}>
                                            {item.nodeName}
                                        </Option>)
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='节点计划时间'
                    >
                        {getFieldDecorator('NodePlanDate', rangeConfig)(
                            <RangePicker />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='节点实际时间'
                    >
                        {getFieldDecorator('NodeFactDate', rangeConfig)(
                            <RangePicker />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='节点实际完成率'
                    >
                        {getFieldDecorator('NodeCompletion',
                            {
                                rules: [{ required: true, message: '资金进度不能为空!' }],
                                initialValue: 0,  
                            }
                        )(
                            <InputNumber 
                                min={0}
                                max={100}
                                step={0.1}
                            />
                        )}
                    </FormItem>
                    <FormItem {...formBtnLayout}>
                        <Button 
                            type="primary" 
                            onClick={this.submit}
                        >
                        提交
                        </Button>
                    </FormItem>  
                </Form>
            </Modal>
        )
    }
}

const ProgressEdit = Form.create()(ProgressEditForm);
export default ProgressEdit;