import React, { PureComponent } from 'react';
import { Card,Icon, Form,Input,Button,Tooltip,Select,DatePicker,InputNumber,message,Cascader,Row,Col,Table,Modal,Transfer  } from 'antd';
import axios from 'axios';
//import { getStakeholders } from '@/services/user';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const rangeConfig = {
        rules: [{ type: 'array', required: true, message: '请选择日期' }],
    };

class EditForm extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            leftData:[],
            rightData:[],
            bidsections:[],                 //选中+空闲的标段
            selectbidsections:[],           //选中的标段
        }
        this.Id = this.props.match.params.id;
        this.checkContractPrice = this.checkContractPrice.bind(this);
        this.Cols = [
            {
              title:'序号',
              width: 70,
              dataIndex:'Id',
              render:(text,record,index) => `${index + 1}`
            },
            {
              title:'标段序号',
              dataIndex:'BidSectionCode',
              key:'BidSectionCode'
            },
            {
              title:'标段名称',
              dataIndex:'BidSectionName',
              key:'BidSectionName'
            },
            {
              title:'工作阶段',
              dataIndex:'BidSectionWork',
              key:'BidSectionWork'
            },
            {
              title:'所在区域',
              dataIndex:'BidSectionArea',
              key:'BidSectionArea'
            },
            {
              title:'投资估算',
              dataIndex:'PlanInvestmentAmount',
              key:'PlanInvestmentAmount'
            },
            {
              title:'合同金额',
              dataIndex:'ContractAmount',
              key:'ContractAmount'
            },
            {
              title:'实际投入',
              dataIndex:'ActualInvestmentAmount',
              key:'ActualInvestmentAmount'
            },
            {
              title:'资金进度',
              dataIndex:'InvestmentPercentage',
              key:'InvestmentPercentage'
            },
            {
              title:'标段负责人',
              dataIndex:'BidSectionLeader',
              key:'BidSectionLeader'
            }
          ];
    }

    //验证Decimal(18,2)类型
    checkContractPrice = (rule,value,callback) => {
        const reg = /^\d{1,18}(.\d{1,2})?$/gi;
        if(!reg.test(value)){
            callback('合同价格异常！');
            return;
        }

        callback();
    }

    //提交
    submit = (e) => {
        e.preventDefault();
        let _form = this.props.form;
        _form.validateFields((err, values) => {
            if (!err) {
                let model = {}
            }
        })
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = () => {
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
              }],
            }],
          }];

        const data = {Id:'7049E6B8-0769-4BAD-B25A-B8CCB8D7ACB5',EngineeringName:'背街小巷',EngineeringArea:['浙江','嘉兴','南湖区'],EngineeringOwner:'南湖城投',EngineeringSupervisor:'南湖区住建局',EngineeringInvest:'512572.14',EngineeringDate:'2019/01/01-2020/02/02',EngineeringLeader:'韩冰',EngineeringMembers:['苏友富','万学良']};

        const bidData = [
            {Id:'1',BidSectionCode:3,BidSectionName:'新嘉三标段',BidSectionWork:'开工',BidSectionArea:'新嘉街道',PlanInvestmentAmount:31142.71,ContractAmount:56142.75,ActualInvestmentAmount:35225.35,InvestmentPercentage:'32.8%',BidSectionLeader:'金明辉'},
            {Id:'2',BidSectionCode:1,BidSectionName:'建设一标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'},
            {Id:'3',BidSectionCode:1,BidSectionName:'建设一标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'},
            {Id:'4',BidSectionCode:1,BidSectionName:'建设一标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'}
        ];

        const selectData = [
            {Id:'5',BidSectionCode:1,BidSectionName:'建设二标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'},
            {Id:'6',BidSectionCode:1,BidSectionName:'建设四标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'}
        ];

        let selectBids = [];
        let leftData = [];
        selectData.map(item => {
            selectBids.push(item.Id);
            leftData.push({
                key:item.Id,
                title:item.BidSectionName
            });
        });

        bidData.map(item => {
            leftData.push({
                key:item.Id,
                title:item.BidSectionName
            })
        });

        this.setState({
            //enginneering:data,
            leftData:[...leftData],
            rightData:[...selectBids],
            bidsections:[...selectData,...bidData],
            selectbidsections:selectData,
            area:areaData
        });

        this.props.form.setFieldsValue({
            EngineeringName:data.EngineeringName,
            EngineeringArea:data.EngineeringArea,
            EngineeringOwner:data.EngineeringOwner,
            EngineeringSupervisor:data.EngineeringSupervisor,
            EngineeringInvest:data.EngineeringInvest,
            //EngineeringDate:EngineeringDate,
            EngineeringLeader:data.EngineeringLeader,
            EngineeringMembers:data.EngineeringMembers,
        })
    }

    showModal = () => {
        this.setState({
            visible:true
        })
    }

    handleOk = (e) => {
        let selects = [];
        this.state.rightData.map(item => {
            selects.push(this.state.bidsections.filter(o=>o.Id == item)[0]);
        })

        this.setState({
            visible: false,
            selectbidsections:selects,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1

    handleBidSectionChange = (targetKeys) => {
        this.setState({ 
            rightData:targetKeys 
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <PageHeaderWrapper
                title='工程编辑'
            >
                <Card>
                    <Form>
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem label='工程名称'>
                                    {getFieldDecorator('EngineeringName',{
                                        rules:[{required:true,message:'工程名称不能为空!'}]
                                    })(<Input style={{width:'300px'}}/>)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='行政区域'>
                                    {getFieldDecorator('EngineeringArea',{
                                        rules:[{required:true,message:'业主单位不能为空!'}]
                                    })(
                                        <Cascader  
                                            style={{width:'300px'}}
                                            options={this.state.area} 
                                            placeholder="选择区域" 
                                            expandTrigger="hover"
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='业主单位'>
                                    {getFieldDecorator('EngineeringOwner',{
                                        rules:[{required:true,message:'业主单位不能为空!'}]
                                    })(
                                        <Select style={{width:'300px'}}></Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='监理单位'>
                                    {getFieldDecorator('EngineeringSupervisor',{
                                        rules:[{required:true,message:'监理单位不能为空!'}]
                                    })(
                                        <Select style={{width:'300px'}}></Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label='合同价'>
                                    {getFieldDecorator('EngineeringInvest',{
                                        initialValue: 0,
                                        rules:[{required:true,message:'监理单位不能为空!'}]
                                    })(
                                        <InputNumber style={{width:'300px'}} min={0} step={0.01}/>
                                    )}
                                </FormItem>     
                            </Col>
                            <Col span={8}>
                                <FormItem label='工程工期'>
                                    {getFieldDecorator('EngineeringDate', rangeConfig)(
                                        <RangePicker style={{width:'300px'}} />
                                    )}
                                </FormItem>          
                            </Col>
                            <Col span={8}>
                                <FormItem label='项目负责人'>
                                    {getFieldDecorator('EngineeringLeader', rangeConfig)(
                                        <Select style={{width:'300px'}}></Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={14}>
                                <FormItem label='工程参与成员'>
                                    {getFieldDecorator('EngineeringMembers', { 
                                        required: true, message: '选择工程参与成员', type: 'array' 
                                    },)(
                                        <Select mode="multiple" placeholder="选择工程参与成员"></Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <Button type='primary' style={{marginBottom:'20px'}} onClick={this.showModal}>
                                    <Icon type="plus" />
                                    选择标段
                                </Button>
                                <Table
                                    size='small'
                                    style={{marginBottom:'20px'}}
                                    rowKey={record => record.Id}
                                    columns={this.Cols}
                                    dataSource={this.state.selectbidsections}
                                >
                                </Table>
                            </Col>
                            <Col span={2}>
                                <FormItem>
                                    <Button type="primary" onClick={this.submit}>
                                        提交
                                    </Button>
                                </FormItem>
                            </Col>
                            <Col span={2}>
                                <FormItem>
                                    <Button onClick={()=>{this.props.form.resetFields()}}>
                                        重置
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Modal
                    width={730}
                    title='标段选取'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Transfer 
                        dataSource={this.state.leftData}
                        listStyle={{
                            width: 310,
                            height: 300,
                        }}
                        titles={['标段资料库', '工程所属标段']}
                        filterOption={this.filterOption}
                        onChange={this.handleBidSectionChange}
                        showSearch
                        targetKeys={this.state.rightData}
                        render={item => item.title}
                    />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

const Edit = Form.create()(EditForm);
export default Edit;