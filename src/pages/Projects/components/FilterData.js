import React, { PureComponent } from 'react';
import { Card,Icon, Cascader,Form,Input,Button,Tooltip,Select,DatePicker,message  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const areaData = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
    children: [{
      value: 'xihu',
      label: '西湖区',
    }],
  },
  {
      value: 'jiaxing',
      label: '嘉兴',
      children: [{
          value: 'nanhu',
          label: '南湖区',
          children: [{
              value: 'jianshe',
              label: '建设街道',
            },
            {
              value: 'jianshe',
              label: '新嘉街道',
            }],
      },
      {
          value: 'xiuzhou',
          label: '秀洲区',
      },
      {
          value: 'haining',
          label: '海宁市',
      },
      {
          value: 'pinghu',
          label: '平湖市',
      }],
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
    children: [{
      value: 'jianye',
      label: '建业区',
    },{
      value: 'jiangning',
      label: '江宁区',
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
            <Cascader options={areaData}  width={{width:'250px'}}/>
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