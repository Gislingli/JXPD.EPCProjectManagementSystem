import React,{Component} from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card,Icon, Form,Table,Input,InputNumber,Button,Radio,Tooltip,Select,message,Slider,Cascader,Row,Col,Modal,Transfer } from 'antd';
import axios from 'axios';
import router from 'umi/router';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
function amountFormatter(value) {
    return `${value}%`;
  }

class AddForm extends Component{
    constructor(props){
        super(props);
        this.state={
            InvestmentPercentage:0,
            constructionOrganizations:[],
            selectStakeholder:[],
            visible:false,
            Projects:[],
            rightData:[],
            leftData:[],
            selectProjects:[],
        };
        this.Cols = [
            {
                title:'序号',
                width: 70,
                dataIndex:'Id',
                render:(text,record,index) => `${index + 1}`
              },
              {
                title:'项目编号',
                dataIndex:'ProjectNumber',
                key:'ProjectNumber'
              },
              {
                title:'项目名称',
                dataIndex:'ProjectName',
                key:'ProjectName'
              },
              {
                title:'行政区域',
                dataIndex:'area',
                key:'area'
              },
              {
                title:'投资金额',
                dataIndex:'Investment',
                key:'Investment'
              },
              {
                title:'主管单位',
                dataIndex:'LeaderDepart',
                key:'LeaderDepart'
              },
              {
                title:'投资单位',
                dataIndex:'ConDepart',
                key:'ConDepart'
              }
        ];
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
            }],
            }],
        }];

        const members = [
            {Id:'1',Name:'韩冰'},
            {Id:'2',Name:'金明辉'},
            {Id:'3',Name:'苏友富'},
            {Id:'4',Name:'万学良'},
            {Id:'5',Name:'徐超'},
            {Id:'6',Name:'董翰翔'}
        ];

        const constructionOrganizations = [
            {Id:'1',Name:'子城联合建设集团有限公司',Stakeholder:[{SId:'1',Name:'张皓',Phone:'13967381851',Type:'公司责任人'},{SId:'2',Name:'马秀鹏',Phone:'13905731031',Type:'分管领导'},{SId:'3',Name:'吴明忠',Phone:'13605739385',Type:'项目经理'},{SId:'4',Name:'周火荣',Phone:'13967381851',Type:'专职安全员'},{SId:'5',Name:'张建忠',Phone:'13967381851',Type:'现场负责人'},{SId:'6',Name:'陈文忠',Phone:'13967381851',Type:'施工负责人'},{SId:'7',Name:'张建',Phone:'13967381851',Type:'公司责任人'},{SId:'8',Name:'王明',Phone:'13967381851',Type:'分管领导'},{SId:'9',Name:'王健',Phone:'13967381851',Type:'公司责任人'}]},
            {Id:'2',Name:'中元建设集团股份有限公司',Stakeholder:[{SId:'1',Name:'丁爱忠',Phone:'13967381851',Type:'公司责任人'},{SId:'2',Name:'尤海涛',Phone:'13905731031',Type:'分管领导'},{SId:'3',Name:'桂浩伟',Phone:'13605739385',Type:'项目经理'},{SId:'4',Name:'周火荣',Phone:'13967381851',Type:'专职安全员'},{SId:'5',Name:'张建忠',Phone:'13967381851',Type:'现场负责人'},{SId:'6',Name:'陈文忠',Phone:'13967381851',Type:'施工负责人'}]},
            {Id:'3',Name:'浙江航洋建设有限公司',Stakeholder:[{SId:'1',Name:'滕金良',Phone:'13967381851',Type:'公司责任人'},{SId:'2',Name:'钮慧琪',Phone:'13905731031',Type:'分管领导'},{SId:'3',Name:'周益峰',Phone:'13605739385',Type:'项目经理'},{SId:'4',Name:'周火荣',Phone:'13967381851',Type:'专职安全员'},{SId:'5',Name:'张建忠',Phone:'13967381851',Type:'现场负责人'},{SId:'6',Name:'陈文忠',Phone:'13967381851',Type:'施工负责人'}]},
            {Id:'4',Name:'浙江年代建设工程有限公司',Stakeholder:[{SId:'1',Name:'沈志红',Phone:'13967381851',Type:'公司责任人'},{SId:'2',Name:'陶俊俊',Phone:'13905731031',Type:'分管领导'},{SId:'3',Name:'徐聪',Phone:'13605739385',Type:'项目经理'},{SId:'4',Name:'周火荣',Phone:'13967381851',Type:'专职安全员'},{SId:'5',Name:'张建忠',Phone:'13967381851',Type:'现场负责人'},{SId:'6',Name:'陈文忠',Phone:'13967381851',Type:'施工负责人'}]},
            {Id:'5',Name:'万宝盛建设集团股份有限公司',Stakeholder:[{SId:'1',Name:'蒋关水',Phone:'13967381851',Type:'公司责任人'},{SId:'2',Name:'许宏伟',Phone:'13905731031',Type:'分管领导'},{SId:'3',Name:'蒋关尧',Phone:'13605739385',Type:'项目经理'},{SId:'4',Name:'周火荣',Phone:'13967381851',Type:'专职安全员'},{SId:'5',Name:'张建忠',Phone:'13967381851',Type:'现场负责人'},{SId:'6',Name:'陈文忠',Phone:'13967381851',Type:'施工负责人'}]},
            {Id:'6',Name:'浙江年代建设工程有限公司',Stakeholder:[{SId:'1',Name:'张桂林',Phone:'13967381851',Type:'公司责任人'},{SId:'2',Name:'许飞琳',Phone:'13905731031',Type:'分管领导'},{SId:'3',Name:'石士平',Phone:'13605739385',Type:'项目经理'},{SId:'4',Name:'周火荣',Phone:'13967381851',Type:'专职安全员'},{SId:'5',Name:'张建忠',Phone:'13967381851',Type:'现场负责人'},{SId:'6',Name:'陈文忠',Phone:'13967381851',Type:'施工负责人'}]},
        ];

        const projectData = [
            {Id:'1',ProjectNumber:1,ProjectName:'三水湾公园路',area:'浙江/嘉兴/南湖区/新嘉街道',Investment:308.51,LeaderDepart:'南湖区住建局',ConDepart:'南湖城投'},
            {Id:'2',ProjectNumber:42,ProjectName:'华美路',area:'浙江/嘉兴/南湖区/新嘉街道',Investment:1308.51,LeaderDepart:'南湖区住建局',ConDepart:'南湖城投'},
            {Id:'3',ProjectNumber:31,ProjectName:'勤俭路870号（饮服公司宿舍）',area:'浙江/嘉兴/南湖区/新嘉街道',Investment:28112.51,LeaderDepart:'南湖区住建局',ConDepart:'南湖城投'},
            {Id:'4',ProjectNumber:124,ProjectName:'妇保院宿舍',area:'浙江/嘉兴/南湖区/新嘉街道',Investment:5308.51,LeaderDepart:'南湖区住建局',ConDepart:'南湖城投'},
            {Id:'5',ProjectNumber:25,ProjectName:'干戈弄15号',area:'浙江/嘉兴/南湖区/新嘉街道',Investment:15308.51,LeaderDepart:'南湖区住建局',ConDepart:'南湖城投'}
        ];

        let leftData = [];
        projectData.map(item => {
            leftData.push({
                key:item.Id,
                title:item.ProjectName
            })
        })

        setTimeout(()=>{
            this.setState({
                area:areaData,
                designerLeader:members,
                constructionLeader:members,
                constructionOrganizations:constructionOrganizations,
                Projects:projectData,
                leftData:leftData,
            })
        },1000);
    }


    componentDidMount = () => {
        this.getData();
    }

    //施工单位相关人员团队
    handleConstructionOrganization = (value) => {
        
        let Stakeholders = this.state.constructionOrganizations.filter(o => o.Id == value)[0].Stakeholder;
        console.log(Stakeholders.filter(o => o.Type == '分管领导'))
        this.setState({
            selectStakeholder:Stakeholders,
        })

        // console.log(data);
    }

    showModal = () => {
        this.setState({
            visible:true
        })
    }

    handleOk = (e) => {
        let selects = [];
        this.state.rightData.map(item => {
            selects.push(this.state.Projects.filter(o=>o.Id == item)[0]);
        })
        this.setState({
            visible: false,
            selectProjects:selects,
        });

    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1

    handleProjectsChange = (targetKeys) => {
        this.setState({ 
            rightData:targetKeys 
        });
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

        const titleContent = (
            <div>
                <label>标段列表</label>
                <Button type="primary" style={{float:'right'}} onClick={()=>{router.go(-1)}}>
                    <Icon type="bars" />标段列表
                </Button>
            </div>
        ); 

        return(
            <PageHeaderWrapper title={titleContent} >
                <Form>
                    <Card title={<h4><Icon type="book" style={{marginRight:'10px'}}/>基本信息</h4>} style={{margin:'15px 0'}}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem
                                    {...formItemLayout}
                                    label='标段序号'
                                >
                                    {getFieldDecorator('BidSectionCode',{
                                        rules:[{required:true,message:'标段序号不能为空!'}]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    {...formItemLayout}
                                    label='标段名称'
                                >
                                    {getFieldDecorator('BidSectionName',{
                                        rules:[{required:true,message:'标段名称不能为空!'}]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    {...formItemLayout}
                                    label='所在区域'
                                >
                                    {getFieldDecorator('Area',{
                                        rules:[{required:true,message:'标段名称不能为空!'}]
                                    })(
                                        <Cascader 
                                            options={this.state.area} 
                                            placeholder="选择区域" 
                                            expandTrigger="hover"
                                            onChange={this.handleAreaChange}
                                        />
                                    )}
                                    
                                </FormItem>    
                            </Col>
                            <Col span={8}>
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
                                            style={{width:'100%'}}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
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
                                            style={{width:'100%'}}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    {...formItemLayout}
                                    label='实际投资金额'
                                >
                                    {getFieldDecorator('ActualInvestmentAmount',{  
                                        initialValue: 0,
                                        rules:[{required:true,message:'合同金额不能为空!'}],
                                    }
                                    )(
                                        <InputNumber 
                                            min={0}
                                            step={0.01}
                                            style={{width:'100%'}}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    {...formItemLayout}
                                    label='设计总监'
                                >
                                    {getFieldDecorator('DesignerLeader',{
                                        rules:[{required:true,message:'设计总监不能为空!'}]
                                    })(
                                        <Select placeholder="选择标段设计总监">
                                            {
                                                this.state.designerLeader!=undefined?
                                                    (this.state.designerLeader.map(item =>
                                                        <Option key={item.Id}>
                                                            {item.Name}
                                                        </Option>)
                                                    ):null
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    {...formItemLayout}
                                    label='施工总监'
                                >
                                    {getFieldDecorator('ConstructionLeader',{
                                        rules:[{required:true,message:'施工总监不能为空!'}]
                                    })(
                                        <Select placeholder="选择标段施工总监">
                                            {
                                                this.state.constructionLeader!=undefined?
                                                (this.state.constructionLeader.map(item =>
                                                    <Option key={item.Id}>
                                                        {item.Name}
                                                    </Option>)
                                                ):null
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
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
                            </Col>
                            <Col span={24}>
                                <FormItem
                                    {...formItemLayout}
                                    label='范围说明'
                                >
                                    {getFieldDecorator('BidSectionDescription')(
                                        <TextArea placeholder='描述标段具体建设范围' />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem
                                    {...formItemLayout}
                                    label='备注'
                                >
                                    {getFieldDecorator('BidSectionRemark')(
                                        <TextArea placeholder='标段备注' />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Card>
                    <Card title={<h4><Icon type="tool" style={{marginRight:'10px'}}/>施工单位</h4>} style={{margin:'15px 0'}}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem 
                                    label='施工单位' 
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ConstructionOrganization',{
                                        rules:[{required:true,message:'施工单位不能为空!'}]
                                    })(<Select onChange={this.handleConstructionOrganization}>
                                    {
                                        this.state.constructionOrganizations!=undefined?
                                        (this.state.constructionOrganizations.map(item =>
                                                <Option key={item.Id} value={item.Id}>
                                                    {item.Name}
                                                </Option>)
                                            ):null
                                    }
                                    </Select> )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem 
                                    label='公司责任人'
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ConstructionOrganizationFZ')(
                                        <Select placeholder={this.state.selectStakeholder.length>0?'请选择公司责任人':'请先选施工单位'}>
                                            {
                                                this.state.selectStakeholder.length>0?(this.state.selectStakeholder.filter(o => o.Type == '公司责任人').map(item => {
                                                    return(<Option key={item.SId}>{item.Name}</Option>)
                                                })):null
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem 
                                    label='分管领导' 
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ConstructionOrganizationLD')(
                                        <Select placeholder={this.state.selectStakeholder.length>0?'请选择分管领导':'请先选施工单位'}>
                                            {
                                                this.state.selectStakeholder.length>0?(this.state.selectStakeholder.filter(o => o.Type == '分管领导').map(item => {
                                                    return(<Option key={item.SId}>{item.Name}</Option>)
                                                })):null
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem 
                                    label='项目经理' 
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ConstructionOrganizationJL')(
                                        <Select placeholder={this.state.selectStakeholder.length>0?'请选择项目经理':'请先选施工单位'}>
                                            {
                                                this.state.selectStakeholder.length>0?(this.state.selectStakeholder.filter(o => o.Type == '项目经理').map(item => {
                                                    return(<Option key={item.SId}>{item.Name}</Option>)
                                                })):null
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem 
                                    label='专职安全员' 
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ConstructionOrganizationAQ')(
                                        <Select placeholder={this.state.selectStakeholder.length>0?'请选择专职安全员':'请先选施工单位'}>
                                        {
                                            this.state.selectStakeholder.length>0?(this.state.selectStakeholder.filter(o => o.Type == '专职安全员').map(item => {
                                                return(<Option key={item.SId}>{item.Name}</Option>)
                                            })):null
                                        }
                                    </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem 
                                    label='现场负责人' 
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ConstructionOrganizationAQ')(
                                        <Select placeholder={this.state.selectStakeholder.length>0?'请选择现场负责人':'请先选施工单位'}>
                                        {
                                            this.state.selectStakeholder.length>0?(this.state.selectStakeholder.filter(o => o.Type == '现场负责人').map(item => {
                                                return(<Option key={item.SId}>{item.Name}</Option>)
                                            })):null
                                        }
                                    </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Card>
                    <Card title={<h4><Icon type="copy" style={{marginRight:'10px'}}/>项目清单</h4>} style={{margin:'15px 0'}}>
                        <Row span={24}>
                            <Col span={24}>
                                <Button type='primary' style={{marginBottom:'20px'}} onClick={this.showModal}>
                                    <Icon type="plus" />
                                    选择项目
                                </Button>
                                <Table
                                    size='small'
                                    style={{marginBottom:'20px'}}
                                    //rowKey={record => record.Id}
                                    columns={this.Cols}
                                    dataSource={this.state.selectProjects}
                                >
                                </Table>
                            </Col>
                        </Row>
                    </Card>
                    <Card style={{marginTop:'15px'}}>
                        <Row span={24}>
                            <Col span={2}>
                                <FormItem
                                    {...formBtnLayout}
                                >
                                    <Button type='primary'>提交</Button>
                                </FormItem>
                            </Col>
                            <Col span={2}>
                                <FormItem
                                    {...formBtnLayout}
                                >
                                    <Button>重置</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Card>
                </Form>
                <Modal
                    width={730}
                    title='项目选取'
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
                        titles={['项目资料库', '标段所属项目']}
                        filterOption={this.filterOption}
                        onChange={this.handleProjectsChange}
                        showSearch
                        targetKeys={this.state.rightData}
                        render={item => item.title}
                    />
                </Modal>
            </PageHeaderWrapper>
        )
    }

}

const Add = Form.create()(AddForm);
export default Add;