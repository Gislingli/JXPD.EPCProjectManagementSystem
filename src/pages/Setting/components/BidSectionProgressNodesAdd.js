import React,{ Component,Fragment } from 'react';
import { Button,Icon,Modal,Form,Input } from 'antd';

const FormItem = Form.Item;

class BidSectionProgressNodesAddForm extends Component{
    constructor(props){
        super(props)
    }

    handleOk = (e) => {
        this.props.AddModalOk();
    }

    handleCancel = (e) => {
        this.props.AddModalCancel();
    }

    render(){

        const { getFieldDecorator } = this.props.form;
        
        return(
            <Modal
                width={720}
                title='添加节点'
                visible={this.props.modalVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form layout="inline">
                    <FormItem label='项目进度节点'>
                        {getFieldDecorator('ProgressNodeName',{
                                rules:[{required:true,message:'项目节点不能为空！'}]
                            })(<Input />)
                        }
                    </FormItem>
                    <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        添加
                    </Button>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const BidSectionProgressNodesAdd = Form.create()(BidSectionProgressNodesAddForm);
export default BidSectionProgressNodesAdd;