import React, { PureComponent } from 'react';
import { Card,Icon, Cascader,Form,Input,Button,Tooltip,Select,DatePicker,message  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

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

class FilterDataForm extends PureComponent{
    constructor(props){
        super(props);
    }
    /*表单提交*/
    handleSubmit = (e) =>{
        e.preventDefault();
        e.preventDefault();
       this.props.form.validateFields((err, values) => {
        if (!err) {
        this.props.formProjectByName(values);
       }
    });
    }
    /*表单重置*/
    reset = (e) =>{
        e.preventDefault();
        this.props.form.resetFields();
    }

    render(){


        const { getFieldDecorator } = this.props.form;
        return(
            <Card>
                <Form layout='inline' onSubmit={this.handleSubmit}>
                    <FormItem
                        label='项目名称'
                    >
                        {getFieldDecorator('ProjectName',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>
                    <Form.Item
         
          label="日期"
        >
          {getFieldDecorator('range-picker', {
      rules: [{ type: 'array', required: false }],
    })(
            <RangePicker />
          )}
        </Form.Item>
        
        <Form.Item
         
          label="行政区域"
        >
          {getFieldDecorator('residence', {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [{ type: 'array', required: false}],
          })(
            <Cascader options={residences}  width={{width:'250px'}}/>
          )}
        </Form.Item>
                    <FormItem>
                        <Button type="primary" htmlType="submit">
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