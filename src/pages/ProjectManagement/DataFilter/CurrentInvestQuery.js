import React,{Component,Fragment} from 'react';
import { Row,Col,Form,InputNumber ,Input,Select, Button } from 'antd';

const FormItem = Form.Item;

class CurrentInvestQueryForm extends Component{
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
                        <FormItem label="项目金额">
                            {getFieldDecorator('currentNode')(
                                <div>
                                    <InputNumber defaultValue={0} formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/> - <InputNumber defaultValue={10000} formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>
                                </div>
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

const CurrentInvestQuery = Form.create()(CurrentInvestQueryForm)
export default CurrentInvestQuery;