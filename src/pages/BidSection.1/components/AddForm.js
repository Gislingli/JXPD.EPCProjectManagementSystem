import React, { PureComponent } from 'react';
import { Card,Icon, Form,Table,Input,InputNumber,Button,Radio,Tooltip,Select,message,Slider,  } from 'antd';
import axios from 'axios';
import AddFormProjects from './AddFormProjects';
import { bidSectionAdd,bidSectionProp } from '@/services/bidSection';
import router from 'umi/router';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
function amountFormatter(value) {
    return `${value}%`;
  }


class AddFormView extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            streets:[],                         //街道
            contractAmountPercentage:0,         //资金进度
            contractDesigners:[],               //设计负责人
            contractManagers:[],                //施工负责人
            roadProjects:[],                    //背街小巷
            courtProjects:[],                   //老旧小区
            selectRoads:[],                     //本标段背街小巷
            selectCourts:[],                    //本标段老旧小区
        }

        this.projectCols=[{
                title:'序号',
                width: 50,
                dataIndex:'ID',
                render:(text,record,index) => `${index + 1}`
            },
            {
                title:'项目名称',
                dataIndex:'ProjectName',
                key:'ProjectlName'
            },
            {
                title:'竣工日期',
                dataIndex:'CompletedDate',
                key:'CompletedDate'
            },
            {
                title:'投资估算',
                dataIndex:'ProjectAmount',
                key:'ProjectAmount'
            },
            {
                title:'合同金额',
                dataIndex:'ContractAmount',
                key:'ContractAmount'
            }];

    }

    //验证Decimal(18,2)类型
    checkContractPrice = (rule,value,callback) =>{
        const reg = /^\d{1,18}(.\d{1,2})?$/gi;
        if(!reg.test(value)){
            callback('合同价格异常！');
            return;
        }

        callback();
    }

    //获取街道
    getArea = () =>{
        let streets=[
            {'code':'x1','name':'南湖区'},
            {'code':'x2','name':'秀洲区'},
            {'code':'x3','name':'经开区'}
        ];
        return streets;
    }

    //标段提交
    submit = (e) =>{
        e.preventDefault();
        let _form = this.props.form;
        //console.log(this.state);
        _form.validateFields((err, values) => {
            if (!err) {
                debugger;

                let addModel={        
                    BidSectionName: values.BidSectionName,
                    BidSectionCode: values.BidSectionCode,
                    BidSectionWork: values.BidSectionWork,
                    StreetCode: values.Street,
                    Street: values.Street,
                    ScopeDesc: values.ScopeDesc,
                    ContractManagerId: values.ContractManager,
                    ContractDesignerId: values.ContractDesigner,
                    Invest:values.Invest,
                    ContractAmount: values.ContractAmount,
                    ContractAmountPercentage: values.ContractAmountPercentage,
                    Builder: values.Builder,
                    BuilderLeader: values.BuilderLeader,
                    BuilderManager: values.BuilderManager,
                    BuilderSecurity: values.BuilderSecurity,
                    BuilderBoss: values.BuilderBoss,
                    Remark: values.Remark
                }

                let courtProjectsID = [];
                this.state.selectCourts.map(item => {
                    courtProjectsID.push(item.ID)
                });
                let roadProjectsID = [];
                this.state.selectRoads.map(item =>{
                    roadProjectsID.push(item.ID)
                })
                
                axios.post(bidSectionAdd,{bidSection:addModel,courtProjects:courtProjectsID,roadProjects:roadProjectsID}).then((res)=>{
                    const data = res.data;
                    if(data.status){
                        message.success('添加成功!');
                        router.push('/bidSection/bidSectionlist')
                    }
                    else{
                        message.error('添加失败:' + data.message);
                        router.push('/bidSection/add')
                    }

                    _form.resetFields();
                })
            }
          });
    }

    //街道
    handleAreaChange = (e) =>{
        const name = e.target.value;
        if(window.allStreets.length>0){
            debugger
            const selectStreet = window.allStreets.filter(item => item.AreaName == name);
            console.log(selectStreet);
            this.setState({
                streets:selectStreet
            })
        }
    }

    //资金进度
    handleAmountChange = (value) =>{
        this.setState({
            contractAmountPercentage:value
        })
    }

    getRoads = (content) =>{
        let sroads = [];
        content.map(item => {
            let road = this.state.roadProjects.filter(o=>o.ID == item);
            sroads.push(road[0]);
        });

        //let roads = this.state.roadProjects.filter(key => !sroads.includes(key));
        this.setState({
            selectRoads:[...sroads],
        });
    }

    getCourts = (content) =>{
        let scourts = [];
        content.map(item => {
            let court = this.state.courtProjects.filter(o=>o.ID == item);
            scourts.push(court[0]);
        });

        this.setState({
            selectCourts:[...scourts],
        });

    }

    componentDidMount = () =>{
        let _self = this;
        axios.post(bidSectionProp).then((res) =>{
            //debugger;
            let data = res.data.Data;
            window.allStreets = data.areas;
            let courts = [];
            let roads = [];
            data.courtProjects.map((item) => {
                let rowdata = {
                    ID:item.ID,
                    ProjectName: item.ProjectName,
                    CompletedDate: item.CheckDate,
                    ProjectAmount: item.Investment,
                    ContractAmount: item.ContractAmount,
                }
                courts.push(rowdata);
            });

            data.roadProjects.map((item) => {
                let rowdata = {
                    ID:item.ID,
                    ProjectName: item.RoadName,
                    CompletedDate: item.CheckDate,
                    ProjectAmount: item.Investment,
                    ContractAmount: item.ContractAmount,
                }
                roads.push(rowdata);
            });

            this.setState({
                contractDesigners:data.designers,
                contractManagers:data.leadsers,
                courtProjects:courts,
                roadProjects:roads,
            })
        })
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
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Card title='基本信息'>
                    <FormItem
                        {...formItemLayout}
                        label='标段序号'
                    >
                        {getFieldDecorator('BidSectionCode',{
                            rules:[{required:true,message:'标段序号不能为空!'}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='标段名称'
                    >
                        {getFieldDecorator('BidSectionName',{
                            rules:[{required:true,message:'标段名称不能为空!'}]
                        })(<Input />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='所在区县'
                    >
                        <Radio.Group 
                            buttonStyle='solid'
                        >
                            <Radio.Group 
                                buttonStyle='solid'
                                onChange={this.handleAreaChange}
                            >
                                {this.getArea().map(item => 
                                    <Radio.Button key={item.code} value={item.name}>
                                        {item.name}
                                    </Radio.Button>
                                )}
                            </Radio.Group>
                        </Radio.Group>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='所属街道'
                    >
                        {getFieldDecorator('Street',{
                            rules:[{required:true,message:'所属街道不能为空!'}],
                        })(
                            <Radio.Group 
                                buttonStyle='solid'
                            >
                                {this.state.streets.length>0?
                                    (this.state.streets.map(item => 
                                        <Radio.Button key={item.StreetCode} value={item.StreetCode}>
                                            {item.StreetName}
                                        </Radio.Button>)):
                                    (<span>（请先选择区县）</span>)
                                }
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='投资估算'
                    >
                        {getFieldDecorator('Invest',{
                            initialValue: 0,
                            rules:[{required:true,message:'投资估算不能为空!'}],
                        }
                        )(
                            <InputNumber 
                                min={0}
                                step={0.01}
                                style={{width:'180px'}}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='合同金额'
                    >
                        {getFieldDecorator('ContractAmount',{
                            initialValue: 0,
                            rules:[{required:true,message:'合同金额不能为空!'}],
                        }
                        )(
                            <InputNumber 
                                min={0}
                                step={0.01}
                                style={{width:'180px'}}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="资金进度"
                    >
                        {getFieldDecorator('ContractAmountPercentage',
                            {
                                rules: [{ required: true, message: '资金进度不能为空!' }],
                                initialValue: this.state.contractAmountPercentage,  
                            }
                        )(
                            <InputNumber 
                                min={0}
                                max={100}
                                step={0.01}
                                onChange={this.handleAmountChange}
                                //value={typeof(this.state.contractAmountPercentage) === 'number'?this.state.contractAmountPercentage:0}
                            />
                        )}
                        <Slider
                            tipFormatter={amountFormatter}
                            min={0}
                            max={100}
                            step={0.01}
                            onChange={this.handleAmountChange}
                            value={typeof(this.state.contractAmountPercentage) === 'number'?this.state.contractAmountPercentage:0}
                            marks={{
                                0: '0', 
                                25: {
                                    style: {
                                    color: '#3CB371',
                                    },
                                    label: <strong>25%</strong>,
                                }, 50: {
                                    style: {
                                    color: '#FFD700',
                                    },
                                    label: <strong>50%</strong>,
                                }, 75: {
                                    style: {
                                    color: '#f50',
                                    },
                                    label: <strong>75%</strong>,
                                }, 100: {
                                    style: {
                                    color: 'red',
                                    },
                                    label: <strong>100%</strong>,
                                },
                            }}
                        />
                        
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='范围描述'
                    >
                        {getFieldDecorator('ScopeDesc')(
                            <TextArea placeholder='描述标段具体范围' />
                        )}
                        
                    </FormItem>
                </Card>
                <Card title='人员进度' style={{marginTop:'15px'}}>
                    <FormItem
                        {...formItemLayout}
                        label='设计负责人'
                    >
                        {getFieldDecorator('ContractDesigner',{
                            rules:[{required:true,message:'设计负责人不能为空!'}]
                        })(
                            <Select placeholder="选择标段设计负责人">
                                {
                                    this.state.contractDesigners.map(item =>
                                        <Option key={item.Id}>
                                            {item.Name}
                                        </Option>
                                        )
                                }
                            </Select>
                        )}
                        
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='施工负责人'
                    >
                        {getFieldDecorator('ContractManager',{
                            rules:[{required:true,message:'现场负责人不能为空!'}]
                        })(
                            <Select placeholder="选择标段现场负责人">
                                {
                                    this.state.contractManagers.map(item =>
                                        <Option key={item.Id}>
                                            {item.Name}
                                        </Option>
                                        )
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="工作进度"
                    >
                        {getFieldDecorator('BidSectionWork')(
                            <Slider
                            tooltipVisible={false}
                                max={4}
                                marks={{
                                    0: '方案', 
                                    1: '施工图', 
                                    2: '开工', 
                                    3: '完工', 
                                    4: '竣工',
                            }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='备注'
                    >
                        {getFieldDecorator('Remark')(
                            <TextArea placeholder='标段备注' />
                        )}
                        
                    </FormItem>
                </Card>
                <Card title='施工单位' style={{marginTop:'15px'}}>
                <FormItem
                    {...formItemLayout}
                    label='施工单位'
                >
                    {getFieldDecorator('Builder',{
                        rules:[{required:true,message:'施工单位不能为空!'}]
                    })(<Input />)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='施工单位分管领导'
                >
                    {getFieldDecorator('BuilderLeader')(<Input />)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='施工单位项目经理'
                >
                    {getFieldDecorator('BuilderManager')(<Input />)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='施工单位专职安全员'
                >
                    {getFieldDecorator('BuilderSecurity')(<Input />)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='施工单位承包老板'
                >
                    {getFieldDecorator('BuilderBoss')(<Input />)}
                </FormItem>
            </Card>
                <Card title='子项目信息' style={{marginTop:'15px'}}>
                <FormItem
                    {...formItemLayout}
                    label='背街小巷'
                >
                    <AddFormProjects 
                        title='背街小巷项目'
                        data={this.state.roadProjects}
                        selectData={this.state.selectRoads}
                        getKeys={this.getRoads}
                    />
                    <Table
                        size='small'
                        columns={this.projectCols}
                        dataSource={this.state.selectRoads}
                    >

                    </Table>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='老旧小区'
                >
                    <AddFormProjects 
                        title='老旧小区项目'
                        data={this.state.courtProjects}
                        selectData={this.state.selectCourts}
                        getKeys={this.getCourts}
                    />
                    <Table
                        size='small'
                        columns={this.projectCols}
                        dataSource={this.state.selectCourts}
                    >

                    </Table>
                </FormItem>
                <FormItem {...formBtnLayout}>
                    <Button 
                        type="primary" 
                        onClick={this.submit}
                    >
                        提交
                    </Button>
                    <Button 
                        onClick={this.submit}
                        style={{marginLeft:'20px'}}
                    >
                        重置
                    </Button>
                </FormItem>        
            </Card>
        </Form>
        )
    }
}

const AddForm = Form.create()(AddFormView);
export default AddForm;
