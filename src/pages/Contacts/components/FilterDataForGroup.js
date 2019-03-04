import React, { PureComponent } from 'react';
import { Card,Icon, Form,Input,Button,Tooltip,Select,Radio,message  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

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
        this.props.formQueryByName(values);
       }
    });
    }
    /*表单重置*/
    reset = (e) =>{
        e.preventDefault();
        this.props.form.resetFields();
    }

    render(){
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          } ;
        const { getFieldDecorator } = this.props.form;
        return(
            <Card>
                <Form layout='inline' onSubmit={this.handleSubmit}>
                    <FormItem
                        label='单位名称'
                      
                    >
                        {getFieldDecorator('GroupName',{
                            rules:[{required:false}]
                        })(<Input />)}
                    </FormItem>
                    <Form.Item
         
          label="单位类型"
        
        >
          {getFieldDecorator('单位类型', {
            rules: [
              { required: false},
            ],
          })(
            <Select style={{width:'200px'}}>
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
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