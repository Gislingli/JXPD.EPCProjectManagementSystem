import React, { PureComponent } from 'react';
import { Card,Icon, Form,Input,Button,Tooltip,Select,Radio,message  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class FilterDataForm extends PureComponent{
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
        this.reset = this.reset.bind(this);
    }

    submit = (e) =>{
        e.preventDefault();
        let queryStr = this.props.form.getFieldValue('BidSectionName');
    }

    reset = (e) =>{
        e.preventDefault();
        this.props.form.resetFields();
        this.props.formInit();
    }

    componentDidMount = () =>{
    }

    render(){
        const formItemLayout = {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        } ;
        const buttonItemLayout = {
          wrapperCol: { span: 14, offset: 4 },
        };
        const { getFieldDecorator } = this.props.form;
        return(
            <Card>
                <Form layout='inline'>
                    <FormItem
                        label='标段序号'
                    >
                        {getFieldDecorator('BidSectionName',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.submit}>
                            提交
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button onClick={this.reset}>
                            重置
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        )
    }
}

const FilterData = Form.create()(FilterDataForm);
export default FilterData;