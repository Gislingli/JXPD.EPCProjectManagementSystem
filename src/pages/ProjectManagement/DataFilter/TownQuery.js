import React,{Component} from 'react';
import { Row,Col,Form,Icon,Input,Select, Button } from 'antd';

const FormItem = Form.Item;

class TownQueryForm extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }} >
                    <Col md={8} sm={24}>
                        <FormItem label="项目名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="街道">
                            {getFieldDecorator('town')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="嘉北">嘉北</Option>
                                    <Option value="建设">建设</Option>
                                    <Option value="解放">解放</Option>
                                    <Option value="南湖">南湖</Option>
                                    <Option value="塘汇">塘汇</Option>
                                    <Option value="新嘉">新嘉</Option>
                                    <Option value="新兴">新兴</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }}>
                            重置
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}