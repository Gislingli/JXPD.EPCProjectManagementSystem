import React,{Component,Fragment} from 'react';
import { Row,Col,Form,Icon,Input,Select, Button } from 'antd';

const FormItem = Form.Item;

class CurrentNodeQueryForm extends Component{
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
                        <FormItem label="项目进度">
                            {getFieldDecorator('currentNode')(
                                <Fragment>
                                    <Select placeholder="请选择" style={{ width: '100%' }}>
                                        <Option value="1">谋划</Option>
                                        <Option value="2">规划</Option>
                                        <Option value="3">立项</Option>
                                        <Option value="4">方案设计</Option>
                                        <Option value="5">招投标</Option>
                                        <Option value="6">施工</Option>
                                        <Option value="7">竣工验收</Option>
                                    </Select>
                                </Fragment>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
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

const CurrentNodeQuery = Form.create()(CurrentNodeQueryForm)
export default CurrentNodeQuery;